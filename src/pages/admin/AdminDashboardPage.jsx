import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const plural = (n, one, many) => `${n} ${n === 1 ? one : many}`;

// One headline number. Real data only.
const StatTile = ({ label, value, note, to, progress }) => {
    const body = (
        <div className="h-full bg-white/50 backdrop-blur-xl border border-white/60 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all">
            <p className="text-xs uppercase tracking-widest text-text-muted mb-3">{label}</p>
            <p className="text-3xl font-display text-text-dark">{value}</p>
            {note && <p className="text-xs text-text-muted mt-1">{note}</p>}
            {progress !== undefined && (
                <div className="mt-3 h-1.5 bg-bone rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-golden-light to-golden-deep rounded-full transition-all duration-1000" style={{ width: `${progress}%` }} />
                </div>
            )}
        </div>
    );
    return to ? <Link to={to} className="block">{body}</Link> : body;
};

const AdminDashboardPage = () => {
    const [stats, setStats] = useState({
        guidedShifts: { total: 0, withAudio: 0, categories: 0 },
        audioBreaths: { total: 0, withAudio: 0, families: 0 },
        pocketPrompts: { total: 0, categories: 0 },
        clarityCards: { total: 0 },
        afformations: { total: 0, categories: 0 },
        voiceNotes: { total: 0, withAudio: 0 },
    });
    const [business, setBusiness] = useState({ members: 0, gifts: 0, pending: 0, live: 0, shiftsMissingAudio: 0, comingSoon: 0 });
    const [serviceBreakdown, setServiceBreakdown] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentTime, setCurrentTime] = useState(new Date());

    // Repair member access (pulls their live Stripe subscription and saves it)
    const [repairEmail, setRepairEmail] = useState('');
    const [repairing, setRepairing] = useState(false);
    const [repairMsg, setRepairMsg] = useState(null); // { ok, text }

    const handleRepair = async (e) => {
        e.preventDefault();
        if (!repairEmail.trim()) return;
        setRepairing(true);
        setRepairMsg(null);
        try {
            const { data: { session } } = await supabase.auth.getSession();
            const res = await fetch(`${import.meta.env.VITE_API_URL}/stripe/repair-subscription`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ accessToken: session?.access_token, targetEmail: repairEmail.trim() })
            });
            const data = await res.json();
            if (data.success) {
                setRepairMsg({ ok: true, text: `Access restored for ${data.email} (${data.status}). They can log in now.` });
                setRepairEmail('');
            } else {
                setRepairMsg({ ok: false, text: data.error || 'Could not repair access.' });
            }
        } catch (err) {
            console.error('Repair error:', err);
            setRepairMsg({ ok: false, text: 'Something went wrong. Please try again.' });
        } finally {
            setRepairing(false);
        }
    };

    useEffect(() => {
        fetchAllStats();
        const timer = setInterval(() => setCurrentTime(new Date()), 60000);
        return () => clearInterval(timer);
    }, []);

    const fetchAllStats = async () => {
        try {
            setLoading(true);

            // Fetch all counts in parallel
            const [
                { count: shiftsTotal },
                { data: shiftsWithAudio },
                { count: shiftCategories },
                { count: breathsTotal },
                { data: breathsWithAudio },
                { count: audioFamilies },
                { count: promptsTotal },
                { count: promptCategories },
                { count: cardsTotal },
                { count: afformationsTotal },
                { count: afformationCategories },
                { count: voiceNotesTotal },
                { data: voiceNotesWithAudio },
                { data: liveSubs },
                { count: pendingApps },
                { count: liveApps },
                { count: shiftsMissingAudio },
                { count: comingSoon },
            ] = await Promise.all([
                supabase.from('guided_shifts').select('*', { count: 'exact', head: true }),
                supabase.from('guided_shifts').select('id').not('audio_url', 'is', null),
                supabase.from('guided_shift_categories').select('*', { count: 'exact', head: true }),
                supabase.from('audio_breaths').select('*', { count: 'exact', head: true }),
                supabase.from('audio_breaths').select('id').not('audio_url', 'is', null),
                supabase.from('audio_families').select('*', { count: 'exact', head: true }),
                supabase.from('pocket_prompts').select('*', { count: 'exact', head: true }),
                supabase.from('pocket_prompt_categories').select('*', { count: 'exact', head: true }),
                supabase.from('clarity_cards').select('*', { count: 'exact', head: true }),
                supabase.from('afformation_cards').select('*', { count: 'exact', head: true }),
                supabase.from('afformation_questions').select('*', { count: 'exact', head: true }),
                supabase.from('voice_notes').select('*', { count: 'exact', head: true }),
                supabase.from('voice_notes').select('id').not('audio_url', 'is', null),
                supabase.from('subscriptions').select('plan, status').in('status', ['active', 'trialing']),
                supabase.from('practitioner_applications').select('*', { count: 'exact', head: true }).eq('status', 'pending'),
                supabase.from('practitioner_applications').select('*', { count: 'exact', head: true }).eq('status', 'approved'),
                supabase.from('guided_shifts').select('*', { count: 'exact', head: true }).eq('is_active', true).is('audio_url', null),
                supabase.from('guided_shifts').select('*', { count: 'exact', head: true }).eq('is_active', false),
            ]);

            setBusiness({
                members: liveSubs?.length || 0,
                gifts: (liveSubs || []).filter((x) => String(x.plan || '').startsWith('gift-')).length,
                pending: pendingApps || 0,
                live: liveApps || 0,
                shiftsMissingAudio: shiftsMissingAudio || 0,
                comingSoon: comingSoon || 0,
            });

            const newStats = {
                guidedShifts: { total: shiftsTotal || 0, withAudio: shiftsWithAudio?.length || 0, categories: shiftCategories || 0 },
                audioBreaths: { total: breathsTotal || 0, withAudio: breathsWithAudio?.length || 0, families: audioFamilies || 0 },
                pocketPrompts: { total: promptsTotal || 0, categories: promptCategories || 0 },
                clarityCards: { total: cardsTotal || 0 },
                afformations: { total: afformationsTotal || 0, categories: afformationCategories || 0 },
                voiceNotes: { total: voiceNotesTotal || 0, withAudio: voiceNotesWithAudio?.length || 0 },
            };

            setStats(newStats);

            // Build service breakdown for bar chart
            setServiceBreakdown([
                { name: 'Guided Shifts', count: newStats.guidedShifts.total, fill: '#3F5D4D' },
                { name: 'Audio Breaths', count: newStats.audioBreaths.total, fill: '#C89A5B' },
                { name: 'Pocket Prompts', count: newStats.pocketPrompts.total, fill: '#D6C7B8' },
                { name: 'Clarity Cards', count: newStats.clarityCards.total, fill: '#8F6A3D' },
                { name: 'Better Questions', count: newStats.afformations.total, fill: '#5E6A65' },
                { name: 'Voice Notes', count: newStats.voiceNotes.total, fill: '#8C857A' },
            ]);


        } catch (error) {
            console.error('Error fetching admin stats:', error);
        } finally {
            setLoading(false);
        }
    };

    const totalContent = stats.guidedShifts.total + stats.audioBreaths.total +
        stats.pocketPrompts.total + stats.clarityCards.total +
        stats.afformations.total + stats.voiceNotes.total;

    const totalAudioUploaded = stats.guidedShifts.withAudio + stats.audioBreaths.withAudio + stats.voiceNotes.withAudio;
    // Coming-soon tracks have no audio on purpose, so they don't count as missing.
    const totalAudioNeeded = (stats.guidedShifts.total - business.comingSoon) + stats.audioBreaths.total + stats.voiceNotes.total;
    const audioProgress = totalAudioNeeded > 0 ? Math.round((totalAudioUploaded / totalAudioNeeded) * 100) : 0;

    const attentionItems = [
        { count: business.pending, label: business.pending === 1 ? 'practitioner application waiting for review' : 'practitioner applications waiting for review', link: '/admin/practitioners', urgent: true },
        { count: business.shiftsMissingAudio, label: business.shiftsMissingAudio === 1 ? 'live guided shift has no audio' : 'live guided shifts have no audio', link: '/admin/guided-shifts', urgent: true },
        { count: stats.audioBreaths.total - stats.audioBreaths.withAudio, label: 'audio breaths with no audio yet', link: '/admin/audio-breaths', urgent: true },
        { count: stats.voiceNotes.total - stats.voiceNotes.withAudio, label: 'voice notes with no audio yet', link: '/admin/voice-notes', urgent: true },
        { count: business.comingSoon, label: business.comingSoon === 1 ? 'guided shift marked coming soon' : 'guided shifts marked coming soon', link: '/admin/guided-shifts', urgent: false },
    ].filter((item) => item.count > 0);

    const services = [
        {
            name: 'Guided Shifts',
            icon: 'field guided shift.png',
            total: stats.guidedShifts.total,
            subtitle: `${stats.guidedShifts.categories} series • ${stats.guidedShifts.withAudio} with audio`,
            link: '/admin/guided-shifts',
            gradient: 'from-[#3F5D4D]/80 to-[#3F5D4D]/40',
            accent: '#3F5D4D',
        },
        {
            name: 'Audio Breaths',
            icon: 'field audio breath.png',
            total: stats.audioBreaths.total,
            subtitle: `${stats.audioBreaths.families} families • ${stats.audioBreaths.withAudio} with audio`,
            link: '/admin/audio-breaths',
            gradient: 'from-[#C89A5B]/80 to-[#C89A5B]/40',
            accent: '#C89A5B',
        },
        {
            name: 'Pocket Prompts',
            icon: 'field pocket prompts.png',
            total: stats.pocketPrompts.total,
            subtitle: `${stats.pocketPrompts.categories} categories`,
            link: '/admin/pocket-prompts',
            gradient: 'from-[#8F6A3D]/80 to-[#8F6A3D]/40',
            accent: '#8F6A3D',
        },
        {
            name: 'Clarity Cards',
            icon: 'field clarity cards.png',
            total: stats.clarityCards.total,
            subtitle: 'Single collection',
            link: '/admin/clarity-cards',
            gradient: 'from-[#5E6A65]/80 to-[#5E6A65]/40',
            accent: '#5E6A65',
        },
        {
            name: 'Better Questions',
            icon: 'field better questions.png',
            total: stats.afformations.total,
            subtitle: `${stats.afformations.categories} questions`,
            link: '/admin/afformations',
            gradient: 'from-[#D6C7B8]/80 to-[#D6C7B8]/40',
            accent: '#D6C7B8',
        },
        {
            name: 'Voice Notes',
            icon: 'field chat.png',
            total: stats.voiceNotes.total,
            subtitle: `${stats.voiceNotes.withAudio} with audio`,
            link: '/admin/voice-notes',
            gradient: 'from-[#8C857A]/80 to-[#8C857A]/40',
            accent: '#8C857A',
        },
    ];

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-charcoal/90 backdrop-blur-xl text-white px-4 py-3 rounded-xl shadow-2xl border border-white/10">
                    <p className="text-xs text-white/60 mb-1">{label}</p>
                    {payload.map((p, i) => (
                        <p key={i} className="text-sm font-medium">
                            Items: <span className="text-golden-light">{p.value}</span>
                        </p>
                    ))}
                </div>
            );
        }
        return null;
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-2 border-sage/30 border-t-sage rounded-full animate-spin" />
                    <p className="text-text-muted text-sm animate-pulse">Loading dashboard...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-bone via-bone to-clay/20 p-6 md:p-8 lg:p-10">
            {/* Header */}
            <div className="mb-10">
                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
                    <div>
                        <p className="text-text-muted text-sm tracking-widest uppercase mb-2">
                            Admin Portal
                        </p>
                        <h1 className="font-display text-4xl md:text-5xl text-text-dark">
                            Dashboard
                        </h1>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="bg-white/60 backdrop-blur-xl border border-white/40 rounded-2xl px-5 py-3 shadow-sm">
                            <p className="text-xs text-text-muted">Last Refresh</p>
                            <p className="text-sm font-medium text-text-dark">
                                {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </p>
                        </div>
                        <button
                            onClick={fetchAllStats}
                            className="bg-white/60 backdrop-blur-xl border border-white/40 rounded-2xl p-3 shadow-sm hover:bg-white/80 transition-all hover:scale-105 active:scale-95"
                            title="Refresh Data"
                        >
                            <svg className="w-5 h-5 text-text-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Repair member access */}
            <div className="mb-8 bg-white/60 backdrop-blur-xl border border-white/60 rounded-2xl p-5 shadow-sm">
                <div className="flex items-start gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-sage/10 flex items-center justify-center flex-shrink-0">
                        <svg className="w-5 h-5 text-sage" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                        </svg>
                    </div>
                    <div>
                        <h3 className="font-display text-lg text-text-dark">Fix a member's access</h3>
                        <p className="text-sm text-text-muted">
                            If a paying member can't get in, enter the email they paid with — this pulls their
                            live subscription from Stripe and restores access instantly.
                        </p>
                    </div>
                </div>
                <form onSubmit={handleRepair} className="flex flex-col sm:flex-row gap-3">
                    <input
                        type="email"
                        value={repairEmail}
                        onChange={(e) => setRepairEmail(e.target.value)}
                        placeholder="member@email.com"
                        className="flex-1 px-4 py-2.5 bg-white border border-clay/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-sage/40 text-text-dark text-sm"
                    />
                    <button
                        type="submit"
                        disabled={repairing}
                        className="px-6 py-2.5 bg-sage text-bone rounded-xl font-medium text-sm hover:bg-sage/90 transition-colors disabled:opacity-60 whitespace-nowrap"
                    >
                        {repairing ? 'Fixing…' : 'Restore access'}
                    </button>
                </form>
                {repairMsg && (
                    <p className={`text-sm mt-3 ${repairMsg.ok ? 'text-sage' : 'text-red-600'}`}>{repairMsg.text}</p>
                )}
            </div>

            {/* Top Stats Row — real numbers only */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <StatTile
                    label="Active members"
                    value={business.members}
                    note={business.gifts ? `${business.gifts} on a gift` : 'Paying or on a gift'}
                />
                <StatTile
                    label="Applications waiting"
                    value={business.pending}
                    note={`${plural(business.live, 'practitioner', 'practitioners')} live`}
                    to="/admin/practitioners"
                />
                <StatTile label="Content items" value={totalContent} note="Across all six tools" />
                <StatTile
                    label="Audio uploaded"
                    value={`${totalAudioUploaded}/${totalAudioNeeded}`}
                    note={`${audioProgress}% complete`}
                    progress={audioProgress}
                />
            </div>

            {/* Charts Row */}
            <div className="grid lg:grid-cols-5 gap-6 mb-8">
                {/* Needs attention — the things waiting on Johanna */}
                <div className="lg:col-span-3 bg-white/50 backdrop-blur-xl border border-white/60 rounded-2xl p-6 shadow-sm">
                    <h2 className="font-display text-xl text-text-dark mb-1">Needs attention</h2>
                    <p className="text-xs text-text-muted mb-5">Things waiting on you, with a link straight to each</p>
                    {attentionItems.length === 0 ? (
                        <div className="flex items-center gap-3 py-10 justify-center text-text-muted">
                            <span className="w-8 h-8 rounded-full bg-sage/10 text-sage flex items-center justify-center">✓</span>
                            <span>All clear. Nothing needs you right now.</span>
                        </div>
                    ) : (
                        <ul className="divide-y divide-clay/20">
                            {attentionItems.map((item) => (
                                <li key={item.label}>
                                    <Link to={item.link} className="flex items-center gap-4 py-3.5 group">
                                        <span className={`min-w-[2.25rem] text-center text-sm font-medium px-2.5 py-1 rounded-full ${item.urgent ? 'bg-golden-light/20 text-golden-deep' : 'bg-sage/10 text-sage'}`}>
                                            {item.count}
                                        </span>
                                        <span className="flex-1 text-text-dark text-sm">{item.label}</span>
                                        <span className="text-xs text-text-muted group-hover:text-sage transition-colors">Open →</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                {/* Service Breakdown */}
                <div className="lg:col-span-2 bg-white/50 backdrop-blur-xl border border-white/60 rounded-2xl p-6 shadow-sm">
                    <h2 className="font-display text-xl text-text-dark mb-1">Service Breakdown</h2>
                    <p className="text-xs text-text-muted mb-6">Items per service</p>
                    <ResponsiveContainer width="100%" height={220}>
                        <BarChart data={serviceBreakdown} margin={{ top: 5, right: 5, left: -25, bottom: 0 }} barCategoryGap="25%">
                            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#8C857A', fontSize: 9 }} interval={0} />
                            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#8C857A', fontSize: 11 }} />
                            <Tooltip content={<CustomTooltip />} />
                            <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                                {serviceBreakdown.map((entry, index) => (
                                    <rect key={index} fill={entry.fill} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Service Cards Grid */}
            <div className="mb-6">
                <h2 className="font-display text-2xl text-text-dark mb-1">Services</h2>
                <p className="text-sm text-text-muted mb-6">Manage your content across all services</p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {services.map((service) => (
                    <Link
                        key={service.name}
                        to={service.link}
                        className="group relative bg-white/40 backdrop-blur-xl border border-white/50 rounded-2xl p-6 shadow-sm hover:shadow-lg hover:bg-white/60 transition-all duration-300 hover:-translate-y-1 overflow-hidden"
                    >
                        {/* Gradient Accent */}
                        <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-[0.04] transition-opacity duration-300 rounded-2xl`} />

                        {/* Content */}
                        <div className="relative z-10">
                            <div className="flex items-start justify-between mb-4">
                                <div className="w-14 h-14 rounded-2xl bg-bone/80 flex items-center justify-center p-2 group-hover:scale-110 transition-transform duration-300 shadow-sm">
                                    <img
                                        src={import.meta.env.BASE_URL + 'images/Field Icons/' + service.icon}
                                        alt={service.name}
                                        className="w-full h-full object-contain"
                                    />
                                </div>
                                <div className="flex items-center gap-1 text-text-muted group-hover:text-sage transition-colors">
                                    <span className="text-xs font-medium">Manage</span>
                                    <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </div>
                            </div>

                            <h3 className="font-display text-lg text-text-dark mb-1">{service.name}</h3>

                            <div className="flex items-baseline gap-2 mb-2">
                                <span className="text-3xl font-display text-text-dark">{service.total}</span>
                                <span className="text-sm text-text-muted">items</span>
                            </div>

                            <p className="text-xs text-text-muted">{service.subtitle}</p>

                            {/* Bottom accent line */}
                            <div className="mt-4 h-0.5 rounded-full bg-bone overflow-hidden">
                                <div
                                    className="h-full rounded-full transition-all duration-500 group-hover:w-full"
                                    style={{
                                        backgroundColor: service.accent,
                                        width: service.total > 0 ? '60%' : '0%',
                                        opacity: 0.4
                                    }}
                                />
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

            {/* Quick Actions */}
            <div className="mt-8 bg-white/40 backdrop-blur-xl border border-white/50 rounded-2xl p-6 shadow-sm">
                <h2 className="font-display text-xl text-text-dark mb-4">Quick Actions</h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    <Link
                        to="/admin/guided-shifts"
                        className="flex items-center gap-3 px-4 py-3 rounded-xl bg-sage/5 hover:bg-sage/10 border border-sage/10 transition-all group"
                    >
                        <div className="w-8 h-8 rounded-lg bg-sage/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                            <svg className="w-4 h-4 text-sage" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                        </div>
                        <span className="text-sm font-medium text-text-dark">Add Guided Shift</span>
                    </Link>
                    <Link
                        to="/admin/audio-breaths"
                        className="flex items-center gap-3 px-4 py-3 rounded-xl bg-golden-light/5 hover:bg-golden-light/10 border border-golden-light/10 transition-all group"
                    >
                        <div className="w-8 h-8 rounded-lg bg-golden-light/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                            <svg className="w-4 h-4 text-golden-light" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                        </div>
                        <span className="text-sm font-medium text-text-dark">Add Audio Breath</span>
                    </Link>
                    <Link
                        to="/admin/pocket-prompts"
                        className="flex items-center gap-3 px-4 py-3 rounded-xl bg-golden-deep/5 hover:bg-golden-deep/10 border border-golden-deep/10 transition-all group"
                    >
                        <div className="w-8 h-8 rounded-lg bg-golden-deep/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                            <svg className="w-4 h-4 text-golden-deep" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                        </div>
                        <span className="text-sm font-medium text-text-dark">Add Pocket Prompt</span>
                    </Link>
                    <Link
                        to="/admin/voice-notes"
                        className="flex items-center gap-3 px-4 py-3 rounded-xl bg-text-muted/5 hover:bg-text-muted/10 border border-text-muted/10 transition-all group"
                    >
                        <div className="w-8 h-8 rounded-lg bg-text-muted/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                            <svg className="w-4 h-4 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                        </div>
                        <span className="text-sm font-medium text-text-dark">Add Voice Note</span>
                    </Link>
                </div>
            </div>

            {/* Footer */}
            <div className="mt-8 text-center">
                <p className="text-xs text-text-tertiary">
                    uncoached admin • {new Date().getFullYear()}
                </p>
            </div>
        </div>
    );
};

export default AdminDashboardPage;
