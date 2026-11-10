import { useState, useEffect, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../context/AuthContext';
import { useCopy } from '../../context/SiteCopyContext';

const PocketPromptsPage = () => {
    const { user } = useAuth();
    const copy = useCopy();
    const location = useLocation();
    const [copiedId, setCopiedId] = useState(null);
    const [activeCategory, setActiveCategory] = useState('all');
    const [purchasedIds, setPurchasedIds] = useState(new Set());
    const [unlockingId, setUnlockingId] = useState(null);
    const [unlockNotice, setUnlockNotice] = useState(() =>
        new URLSearchParams(window.location.search).has('session_id')
            ? { level: 'info', text: 'Confirming your payment…' }
            : null);

    const [categories, setCategories] = useState([{ id: 'all', title: 'All Prompts', slug: 'all' }]);
    const [prompts, setPrompts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            setLoading(true);

            // Fetch categories
            const { data: categoriesData, error: categoriesError } = await supabase
                .from('pocket_prompt_categories')
                .select('id, title, slug')
                .order('sort_order', { ascending: true });

            if (categoriesError) throw categoriesError;

            if (categoriesData) {
                setCategories([{ id: 'all', title: 'All Prompts', slug: 'all' }, ...categoriesData]);
            }

            // Fetch active prompts
            const { data: promptsData, error: promptsError } = await supabase
                .from('pocket_prompts')
                .select(`
                    *,
                    pocket_prompt_categories (
                        title,
                        slug
                    )
                `)
                .eq('is_active', true)
                .order('sort_order', { ascending: true });

            if (promptsError) throw promptsError;

            setPrompts(promptsData || []);

        } catch (error) {
            console.error('Error fetching pocket prompts data:', error);
        } finally {
            setLoading(false);
        }
    };

    const filteredPrompts = activeCategory === 'all'
        ? prompts
        : prompts.filter(p => p.category_id === activeCategory);

    const handleCopy = async (prompt, type = 'free') => {
        try {
            const textToCopy = type === 'free' ? prompt.content_free : prompt.content_premium;

            await navigator.clipboard.writeText(textToCopy);
            setCopiedId(`${prompt.id}-${type}`);
            setTimeout(() => setCopiedId(null), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    // Which high-level prompts this member has unlocked ($2 each).
    const loadPurchases = useCallback(async () => {
        if (!user) return;
        const { data, error } = await supabase
            .from('prompt_purchases')
            .select('prompt_id')
            .eq('user_id', user.id);
        // A missing table or a blocked read used to fail silently here and just
        // leave everything locked. Say so, so it can be found.
        if (error) console.error('Could not load prompt purchases:', error.message);
        const ids = new Set((data || []).map(r => r.prompt_id));
        setPurchasedIds(ids);

        // Self-heal: ask the server to rebuild unlocks from Stripe, so a prompt
        // she paid for can't stay locked because a webhook was missed.
        try {
            const { data: { session } } = await supabase.auth.getSession();
            if (!session?.access_token) return;
            const res = await fetch(`${import.meta.env.VITE_API_URL}/stripe/reconcile-prompt-purchases`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ accessToken: session.access_token }),
            });
            const result = await res.json();
            if (Array.isArray(result.unlocked) && result.unlocked.length) {
                setPurchasedIds(new Set(result.unlocked));
            }
        } catch (err) {
            // Reconcile is a safety net; the direct read above already ran.
            console.error('Prompt purchase reconcile failed:', err);
        }
    }, [user]);

    useEffect(() => { loadPurchases(); }, [loadPurchases]);

    // Back from Stripe checkout: confirm the payment with the server and record
    // it, rather than hoping the webhook has already landed. Then reload.
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const sessionId = params.get('session_id');
        if (!sessionId || !user) return;

        let active = true;
        (async () => {
            try {
                const res = await fetch(`${import.meta.env.VITE_API_URL}/stripe/verify-prompt-purchase`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ sessionId, userId: user.id }),
                });
                const data = await res.json();
                if (!active) return;

                if (data.unlocked) {
                    await loadPurchases();
                    setUnlockNotice({ level: 'ok', text: 'Payment received — your high-level prompt is unlocked and yours to keep.' });
                } else if (data.status && data.status !== 'paid') {
                    setUnlockNotice({ level: 'warn', text: 'Your payment is still processing. Give it a moment and refresh this page.' });
                } else {
                    setUnlockNotice({ level: 'error', text: `Your payment went through, but we couldn't save the unlock: ${data.error || 'unknown error'}. Please email hello@uncoached.space and it will be sorted by hand — you won't be charged twice.` });
                }
            } catch (err) {
                if (!active) return;
                console.error('verify-prompt-purchase failed:', err);
                setUnlockNotice({ level: 'warn', text: "We couldn’t confirm the payment just now. If the prompt still shows as locked in a minute, refresh this page." });
            } finally {
                // Drop the checkout params so a refresh doesn't re-run this.
                window.history.replaceState({}, '', location.pathname);
            }
        })();
        return () => { active = false; };
    }, [location.search, location.pathname, user, loadPurchases]);

    // First N lines of the high-level prompt, shown as a free taste.
    const previewOf = (text, lines = 8) => (text || '').split('\n').slice(0, lines).join('\n');

    const handleUnlock = async (prompt) => {
        if (!user) return;
        setUnlockingId(prompt.id);
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/stripe/create-prompt-checkout`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userId: user.id,
                    userEmail: user.email,
                    promptId: prompt.id,
                    promptTitle: prompt.title
                })
            });
            const data = await res.json();
            if (data.url) {
                window.location.assign(data.url);
            } else {
                console.error('Prompt checkout failed:', data.error);
                setUnlockingId(null);
            }
        } catch (err) {
            console.error('Prompt checkout error:', err);
            setUnlockingId(null);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-bone flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-sage border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen relative">
            {/* Global Fixed Background Image */}
            <div className="fixed inset-0 z-0">
                <img
                    src={import.meta.env.BASE_URL + "images/Extra Backgrounds (4).jpg"}
                    alt=""
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Main Scrolling Content */}
            <div className="relative z-10 pb-24">
                {/* Fixed Nav Link */}
                <Link
                    to="/dashboard"
                    className="fixed top-8 left-8 z-50 inline-flex items-center gap-2 text-[#3F5D4D] bg-[#F4F1EC]/85 backdrop-blur-md px-5 py-2.5 rounded-full hover:bg-[#F4F1EC] transition-colors shadow-sm border border-white/40 group mix-blend-normal"
                >
                    <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
                    </svg>
                    <span className="text-sm font-medium tracking-wide">{copy('prompts.back')}</span>
                </Link>

                {/* Payment confirmation, after returning from checkout */}
                {unlockNotice && (
                    <div className="px-6 pt-[100px] md:pt-[120px] -mb-[70px] md:-mb-[100px] flex justify-center">
                        <div role="status" className={`w-full max-w-[700px] rounded-2xl px-5 py-3.5 text-sm shadow-sm border backdrop-blur-md ${
                            unlockNotice.level === 'ok' ? 'bg-sage/95 text-bone border-sage'
                            : unlockNotice.level === 'error' ? 'bg-red-50/95 text-red-700 border-red-200'
                            : unlockNotice.level === 'warn' ? 'bg-golden-light/25 text-golden-deep border-golden-light/50'
                            : 'bg-[#F4F1EC]/90 text-text-dark border-white/40'}`}>
                            {unlockNotice.text}
                        </div>
                    </div>
                )}

                {/* SECTION 1: INTRO / HERO AREA */}
                <section className="px-6 pt-[120px] pb-[60px] md:pt-[160px] md:pb-[80px] flex items-center justify-center">
                    <div className="w-full max-w-[700px] mx-auto text-center animate-fade-in-up bg-[#F4F1EC]/85 backdrop-blur-md p-8 md:p-12 rounded-[32px] shadow-sm border border-white/40">
                        <h1 className="font-serif text-[40px] md:text-[48px] text-[#1F2422] font-medium mb-6">
                            {copy('prompts.hero.title')}
                        </h1>

                        <h2 className="whitespace-pre-line text-[18px] md:text-[20px] text-[#5E6A65] leading-[1.6] mb-8 font-sans">
                            {copy('prompts.hero.subtitle')}
                        </h2>

                        <p className="whitespace-pre-line text-[16px] text-[#5E6A65] leading-[1.7] max-w-[680px] mx-auto mb-8">
                            {copy('prompts.hero.body')}
                        </p>

                        <p className="whitespace-pre-line text-[16px] md:text-[17px] text-[#5E6A65] italic leading-relaxed">
                            {copy('prompts.hero.note')}
                        </p>
                    </div>
                </section>

                {/* Prompts Library */}
                <section className="py-12 px-6">
                    <div className="max-w-4xl mx-auto">
                        {/* Category Filters */}
                        {categories.length > 1 && (
                            <div className="flex flex-wrap justify-center gap-3 mb-12">
                                {categories.map(cat => (
                                    <button
                                        key={cat.id}
                                        onClick={() => setActiveCategory(cat.id)}
                                        className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${activeCategory === cat.id
                                            ? 'bg-sage text-white shadow-sm'
                                            : 'bg-white/90 backdrop-blur-md text-text-muted hover:bg-white hover:text-text-dark border border-clay/20 shadow-sm'
                                            }`}
                                    >
                                        {cat.id === 'all' ? copy('prompts.filters.all') : cat.title}
                                    </button>
                                ))}
                            </div>
                        )}

                        {/* Prompts List */}
                        {filteredPrompts.length === 0 ? (
                            <div className="text-center py-16 bg-white/50 rounded-3xl border border-clay/10">
                                <p className="text-text-muted text-lg">No prompts found in this category.</p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {filteredPrompts.map(prompt => (
                                    <div
                                        key={prompt.id}
                                        className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-clay/20 hover:shadow-md transition-all group"
                                    >
                                        <div className="flex flex-col gap-6">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <span className="text-sage text-xs font-medium uppercase tracking-wider bg-sage/10 px-2 py-1 rounded inline-block mb-2">
                                                        {prompt.pocket_prompt_categories?.title || copy('prompts.card.uncategorized')}
                                                    </span>
                                                    <h3 className="font-display text-2xl text-text-dark mb-2">
                                                        {prompt.title}
                                                    </h3>
                                                </div>
                                            </div>

                                            {/* Metadata Sections */}
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-bone/50 p-5 rounded-xl border border-clay/20">
                                                <div>
                                                    <h4 className="font-bold text-text-dark mb-3 flex items-center gap-2">
                                                        <span>🕰️</span> {copy('prompts.card.when_to_use')}
                                                    </h4>
                                                    <ul className="text-sm text-text-muted space-y-2 list-none pl-1">
                                                        {prompt.when_to_use?.split('\n').filter(Boolean).map((line, i) => (
                                                            <li key={i} className="flex items-start gap-2">
                                                                <span className="text-sage mt-0.5">•</span>
                                                                <span>{line.replace(/^•\s*/, '')}</span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>

                                                <div className="space-y-4">
                                                    <div>
                                                        <h4 className="font-bold text-text-dark mb-1 flex items-center gap-2">
                                                            <span>🎯</span> {copy('prompts.card.purpose')}
                                                        </h4>
                                                        <p className="text-sm text-text-muted">{prompt.purpose}</p>
                                                    </div>
                                                    <div>
                                                        <h4 className="font-bold text-text-dark mb-1 flex items-center gap-2">
                                                            <span>💬</span> {copy('prompts.card.example')}
                                                        </h4>
                                                        <p className="text-sm text-text-muted italic">"{prompt.example_scenario}"</p>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* What Each Version Does */}
                                            <div className="mt-2">
                                                <h4 className="font-bold text-text-dark mb-3 flex items-center gap-2">
                                                    <span>✨</span> {copy('prompts.card.versions_title')}
                                                </h4>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    <div className="bg-white p-4 rounded-lg border border-clay/20 shadow-sm relative overflow-hidden">
                                                        <div className="absolute top-0 left-0 w-1 h-full bg-sage/50"></div>
                                                        <h5 className="font-bold text-sm text-text-dark mb-2">{copy('prompts.card.free_title')}</h5>
                                                        <p className="text-xs text-text-muted leading-relaxed">{prompt.what_free_offers}</p>
                                                    </div>
                                                    <div className="bg-white p-4 rounded-lg border border-golden/30 shadow-sm relative overflow-hidden">
                                                        <div className="absolute top-0 left-0 w-1 h-full bg-golden/80"></div>
                                                        <h5 className="font-bold text-sm text-text-dark mb-2 flex items-center gap-1.5">
                                                            <svg className="w-3.5 h-3.5 text-golden" fill="currentColor" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" /></svg>
                                                            {copy('prompts.card.premium_title')}
                                                        </h5>
                                                        <p className="text-xs text-text-muted leading-relaxed">{prompt.what_premium_offers}</p>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Free Prompt Area */}
                                            <div className="mt-4 border-t border-clay/20 pt-6">
                                                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                                                    <div className="flex-1">
                                                        <div className="flex items-center gap-2 mb-3">
                                                            <span className="text-xs font-bold text-sage uppercase tracking-wider">{copy('prompts.free.label')}</span>
                                                        </div>
                                                        <div className="bg-sage/5 p-5 rounded-xl border border-sage/20 text-sm text-text-dark/90 whitespace-pre-wrap leading-relaxed font-mono">
                                                            {prompt.content_free}
                                                        </div>
                                                    </div>
                                                    <button
                                                        onClick={() => handleCopy(prompt, 'free')}
                                                        className={`flex-shrink-0 px-4 py-2 mt-8 rounded-lg text-sm font-medium transition-all self-start ${copiedId === `${prompt.id}-free`
                                                            ? 'bg-sage text-white shadow-sm'
                                                            : 'bg-bone text-text-dark/70 hover:bg-sage hover:text-white'
                                                            }`}
                                                    >
                                                        {copiedId === `${prompt.id}-free` ? copy('prompts.copied') : copy('prompts.free.copy')}
                                                    </button>
                                                </div>
                                            </div>

                                            {/* High-Level (Premium) — $2 one-time unlock, with a free preview */}
                                            {prompt.content_premium && (
                                                <div className="mt-2 pt-6 border-t border-clay/20">
                                                    <div className="flex items-center gap-2 mb-3">
                                                        <svg className="w-4 h-4 text-golden-deep" fill="currentColor" viewBox="0 0 24 24">
                                                            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                                                        </svg>
                                                        <span className="text-xs font-bold text-golden-deep uppercase tracking-wider">
                                                            {copy('prompts.premium.label')} {purchasedIds.has(prompt.id) ? copy('prompts.premium.unlocked') : copy('prompts.premium.preview')}
                                                        </span>
                                                    </div>

                                                    {purchasedIds.has(prompt.id) ? (
                                                        <div className="animate-fade-in flex flex-col md:flex-row md:items-start justify-between gap-4">
                                                            <div className="flex-1">
                                                                <div className="bg-golden-light/10 p-5 rounded-xl border border-golden-light/30 text-sm text-text-dark/90 whitespace-pre-wrap leading-relaxed font-mono">
                                                                    {prompt.content_premium}
                                                                </div>
                                                            </div>
                                                            <button
                                                                onClick={() => handleCopy(prompt, 'premium')}
                                                                className={`flex-shrink-0 px-4 py-2 rounded-lg text-sm font-medium transition-all self-start ${copiedId === `${prompt.id}-premium`
                                                                    ? 'bg-golden-deep text-white shadow-sm'
                                                                    : 'bg-bone text-text-dark/70 hover:bg-golden-deep hover:text-white'
                                                                    }`}
                                                            >
                                                                {copiedId === `${prompt.id}-premium` ? copy('prompts.copied') : copy('prompts.premium.copy')}
                                                            </button>
                                                        </div>
                                                    ) : (
                                                        <div>
                                                            <div className="relative">
                                                                <div className="bg-golden-light/10 p-5 rounded-xl border border-golden-light/30 text-sm text-text-dark/90 whitespace-pre-wrap leading-relaxed font-mono max-h-56 overflow-hidden select-none">
                                                                    {previewOf(prompt.content_premium, 8)}
                                                                </div>
                                                                <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white via-white/80 to-transparent rounded-b-xl pointer-events-none" />
                                                            </div>
                                                            <div className="mt-4 flex flex-col sm:flex-row sm:items-center gap-3">
                                                                <button
                                                                    onClick={() => handleUnlock(prompt)}
                                                                    disabled={unlockingId === prompt.id}
                                                                    className="inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-golden-deep text-bone text-sm font-medium rounded-full hover:bg-golden-deep/90 transition-colors shadow-sm disabled:opacity-70"
                                                                >
                                                                    {unlockingId === prompt.id ? 'Opening checkout…' : copy('prompts.premium.unlock')}
                                                                </button>
                                                                <span className="text-xs text-text-muted">{copy('prompts.premium.unlock_note')}</span>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default PocketPromptsPage;
