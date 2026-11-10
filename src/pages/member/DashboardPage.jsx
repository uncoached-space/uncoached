import { useState, useEffect, useMemo } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { useCopy } from '../../context/SiteCopyContext';
import { emphasise, plain } from '../../lib/emphasise';
import { searchPortal, searchableText, linesOfUseWhen } from '../../lib/portalSearch';

const PORTAL_SECTIONS = [
    { label: 'Field', type: 'Tool', link: '/dashboard/field', keywords: 'chat support reflect talk' },
    { label: 'Audio Breaths', type: 'Tool', link: '/dashboard/audio-breaths', keywords: 'breathe breathing nervous system calm' },
    { label: 'Guided Shifts', type: 'Tool', link: '/dashboard/guided-shifts', keywords: 'reset state regulate' },
    { label: 'Pocket Prompts', type: 'Tool', link: '/dashboard/pocket-prompts', keywords: 'questions reflection' },
    { label: 'Clarity Cards', type: 'Tool', link: '/dashboard/clarity-cards', keywords: 'journal journaling cards' },
    { label: 'Afformations', type: 'Tool', link: '/dashboard/afformations', keywords: 'affirmations affirmation questions' },
    { label: 'Voice Notes', type: 'Tool', link: '/dashboard/voice-notes', keywords: 'audio messages identity' },
];

const DashboardPage = () => {
    const { user, signOut } = useAuth();
    const copy = useCopy();

    const meta = user?.user_metadata || {};
    // display_name (email signup), full_name/name (Google OAuth), then email prefix.
    const displayName =
        meta.display_name || meta.full_name || meta.name || user?.email?.split('@')[0] || 'Friend';

    // ---- Portal search ----
    const [query, setQuery] = useState('');
    const [searchFocused, setSearchFocused] = useState(false);
    const [searchOpened, setSearchOpened] = useState(false);
    const [searchIndex, setSearchIndex] = useState(PORTAL_SECTIONS);
    const [searchReady, setSearchReady] = useState(false);

    useEffect(() => {
        // The content text is much bigger than the titles were, so it only
        // loads once a member actually clicks into the search box.
        if (!searchOpened) return undefined;
        let cancelled = false;
        const buildIndex = async () => {
            const entries = [...PORTAL_SECTIONS];
            try {
                const [ab, gs, cc, pp, vn, af] = await Promise.all([
                    supabase.from('audio_breaths').select('id,title,intro,description,approach,use_when,science_text,science_source,spiritual_text,spiritual_source'),
                    supabase.from('guided_shifts').select('id,title,intro,description,approach,use_when,field_integration_prompt,science_text,science_source,spiritual_text,spiritual_source').eq('is_active', true),
                    supabase.from('clarity_cards').select('id,title,description').eq('is_active', true),
                    // Not content_premium: members who haven't bought a prompt must not be able to read it through search.
                    supabase.from('pocket_prompts').select('id,title,when_to_use,purpose,example_scenario,what_free_offers,what_premium_offers,content_free').eq('is_active', true),
                    supabase.from('voice_notes').select('id,title,description').eq('is_active', true),
                    supabase.from('afformation_cards').select('id,title,tags,afformation_questions(text)').eq('is_active', true),
                ]);
                const bodyOf = (r) => searchableText(r.intro, r.description, r.approach, linesOfUseWhen(r.use_when), r.field_integration_prompt, r.science_text, r.science_source, r.spiritual_text, r.spiritual_source);
                (ab.data || []).forEach(r => entries.push({ label: r.title, type: 'Audio Breath', link: `/dashboard/audio-breaths/${r.id}`, text: bodyOf(r) }));
                (gs.data || []).forEach(r => entries.push({ label: r.title, type: 'Guided Shift', link: `/dashboard/guided-shifts/${r.id}`, text: bodyOf(r) }));
                (cc.data || []).forEach(r => entries.push({ label: r.title, type: 'Clarity Card', link: `/dashboard/clarity-cards/${r.id}`, text: searchableText(r.description) }));
                (pp.data || []).forEach(r => entries.push({ label: r.title, type: 'Pocket Prompt', link: '/dashboard/pocket-prompts', text: searchableText(r.when_to_use, r.purpose, r.example_scenario, r.what_free_offers, r.what_premium_offers, r.content_free) }));
                (vn.data || []).forEach(r => entries.push({ label: r.title, type: 'Voice Note', link: '/dashboard/voice-notes', text: searchableText(r.description) }));
                (af.data || []).forEach(r => entries.push({ label: r.title, type: 'Afformation', link: '/dashboard/afformations', text: searchableText(r.tags, (r.afformation_questions || []).map(q => q.text)) }));
            } catch (err) {
                console.error('Search index build error:', err);
            }
            if (!cancelled) {
                setSearchIndex(entries);
                setSearchReady(true);
            }
        };
        buildIndex();
        return () => { cancelled = true; };
    }, [searchOpened]);

    const searchResults = useMemo(() => searchPortal(searchIndex, query), [query, searchIndex]);

    // Wording comes from Website Text > Members Area, so Johanna can reword the
    // tiles herself. Icons, links and colours stay in code.
    const navigationItems = [
        { n: 1, icon: 'images/Field Icons/field chat.webp', link: '/dashboard/field', color: 'from-sage/20 to-sage/10' },
        { n: 2, icon: 'images/Field Icons/field audio breath.webp', link: '/dashboard/audio-breaths', color: 'from-golden/20 to-golden/10' },
        { n: 3, icon: 'images/Field Icons/field guided shift.webp', link: '/dashboard/guided-shifts', color: 'from-clay/20 to-clay/10' },
        { n: 4, icon: 'images/Field Icons/field pocket prompts.webp', link: '/dashboard/pocket-prompts', color: 'from-sage/20 to-sage/10' },
        { n: 5, icon: 'images/Field Icons/field clarity cards.webp', link: '/dashboard/clarity-cards', color: 'from-golden/20 to-golden/10' },
        { n: 6, icon: 'images/Field Icons/field affirmation.webp', link: '/dashboard/afformations', color: 'from-clay/20 to-clay/10' },
    ].map((c) => ({
        ...c,
        title: emphasise(copy(`member.card${c.n}_title`), 'italic text-sage font-serif'),
        alt: plain(copy(`member.card${c.n}_title`)),
        description: copy(`member.card${c.n}_body`),
    }));

    const voiceNotes = {
        title: emphasise(copy('member.card7_title'), 'italic text-sage font-serif'),
        alt: plain(copy('member.card7_title')),
        description: copy('member.card7_body'),
        icon: 'images/Field Icons/field voice notes.webp',
        link: '/dashboard/voice-notes',
        color: 'from-sage/20 to-sage/10'
    };

    const handleSignOut = async () => {
        await signOut();
        window.location.href = '/';
    };

    return (
        <div className="min-h-screen relative">
            {/* Background Image */}
            <div className="fixed inset-0 z-0">
                <img
                    src={import.meta.env.BASE_URL + "images/Membership/Members Welcome.webp"}
                    alt=""
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-charcoal/20"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center pt-32 pb-24 px-6 md:pt-48">

                {/* Profile Avatar / Link */}
                <Link to="/dashboard/profile" className="mb-6 group relative">
                    <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-lg bg-clay/20 flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                        {user?.user_metadata?.avatar_url ? (
                            <img
                                src={user.user_metadata.avatar_url}
                                alt="Profile"
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <span className="text-3xl text-sage/80 font-display">
                                {displayName?.charAt(0).toUpperCase() || 'U'}
                            </span>
                        )}
                    </div>
                    {/* Hover tooltip */}
                    <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-3 py-1 bg-charcoal/80 text-bone text-xs rounded-full opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-sm pointer-events-none">
                        {copy('dashboard.profile_tooltip')}
                    </div>
                </Link>

                {/* Billing & invoices */}
                <Link to="/dashboard/billing" className="mb-6 -mt-2 text-sm text-text-muted hover:text-text-dark underline underline-offset-4 transition-colors">
                    {copy('dashboard.billing_link')}
                </Link>

                {/* Welcome */}
                <h1 className="font-display text-4xl md:text-5xl text-text-dark text-center mb-2">
                    {copy('dashboard.greeting')} {displayName}
                </h1>
                <p className="text-text-muted text-center mb-8">
                    {copy('dashboard.subtitle')}
                </p>

                {/* Search Bar. The results stay open while the keyboard focus is
                    anywhere inside this block, so they can be reached with Tab. */}
                <div
                    className="w-full max-w-xl mb-12 relative"
                    onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget)) setSearchFocused(false); }}
                    onKeyDown={(e) => { if (e.key === 'Escape') setSearchFocused(false); }}
                >
                    <div className="relative">
                        <input
                            type="text"
                            value={query}
                            onChange={(e) => { setQuery(e.target.value); setSearchFocused(true); }}
                            onFocus={() => { setSearchFocused(true); setSearchOpened(true); }}
                            placeholder={copy('dashboard.search_placeholder')}
                            aria-label={copy('dashboard.search_placeholder')}
                            className="w-full px-6 py-4 pl-12 bg-white/80 backdrop-blur-sm border border-clay/30 rounded-full focus:outline-none focus:ring-2 focus:ring-sage/50 text-text-dark"
                        />
                        <svg
                            className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>

                    {searchFocused && query.trim() && (
                        <div className="absolute z-30 mt-2 w-full bg-white rounded-2xl shadow-lg border border-clay/20 overflow-hidden max-h-80 overflow-y-auto text-left">
                            {searchResults.length === 0 ? (
                                <p className="px-5 py-4 text-sm text-text-muted">{searchReady ? `No matches for “${query.trim()}”.` : 'Searching…'}</p>
                            ) : (
                                searchResults.map((r, i) => (
                                    <Link
                                        key={`${r.link}-${i}`}
                                        to={r.link}
                                        onMouseDown={(e) => e.preventDefault()}
                                        onClick={() => setQuery('')}
                                        className="flex items-center justify-between gap-3 px-5 py-3 hover:bg-bone/70 focus-visible:bg-bone/70 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-sage transition-colors border-b border-clay/10 last:border-0"
                                    >
                                        <span className="min-w-0">
                                            <span className="block text-text-dark text-sm truncate">{r.label}</span>
                                            {r.snippet && (
                                                <span className="block text-text-muted text-xs leading-relaxed mt-0.5">
                                                    {r.snippet.map((part, p) => (part.hit
                                                        ? <span key={p} className="font-semibold text-text-dark">{part.text}</span>
                                                        : part.text))}
                                                </span>
                                            )}
                                        </span>
                                        <span className="text-[10px] uppercase tracking-wider text-sage bg-sage/10 px-2 py-1 rounded-full flex-shrink-0">{r.type}</span>
                                    </Link>
                                ))
                            )}
                        </div>
                    )}
                </div>

                {/* Navigation Grid */}
                <div className="w-full max-w-4xl">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        {navigationItems.map((item, index) => (
                            <Link
                                key={index}
                                to={item.link}
                                className={`bg-white/80 backdrop-blur-sm rounded-2xl p-6 text-center hover:bg-white/90 hover:shadow-lg transition-all duration-300 border border-clay/20`}
                            >
                                <img
                                    src={import.meta.env.BASE_URL + item.icon}
                                    alt={item.alt}
                                    className="w-16 h-16 mx-auto mb-4 object-contain"
                                />
                                <h3 className="font-display text-lg text-text-dark font-semibold mb-1">
                                    {item.title}
                                </h3>
                                <p className="text-text-muted text-sm">
                                    {item.description}
                                </p>
                            </Link>
                        ))}
                    </div>

                    {/* Voice Notes - Centered */}
                    <div className="flex justify-center">
                        <Link
                            to={voiceNotes.link}
                            className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 text-center hover:bg-white/90 hover:shadow-lg transition-all duration-300 border border-clay/20 w-full md:w-1/3"
                        >
                            <img
                                src={import.meta.env.BASE_URL + voiceNotes.icon}
                                alt={voiceNotes.alt}
                                className="w-16 h-16 mx-auto mb-4 object-contain"
                            />
                            <h3 className="font-display text-lg text-text-dark font-semibold mb-1">
                                {voiceNotes.title}
                            </h3>
                            <p className="text-text-muted text-sm">
                                {voiceNotes.description}
                            </p>
                        </Link>
                    </div>
                </div>

                {/* Sign Out */}
                <button
                    onClick={handleSignOut}
                    className="mt-12 px-8 py-3 bg-sage text-bone rounded-full font-medium shadow-sm hover:bg-sage/90 transition-all duration-300 text-sm tracking-wide"
                >
                    {copy('dashboard.sign_out')}
                </button>
            </div>
        </div>
    );
};

export default DashboardPage;
