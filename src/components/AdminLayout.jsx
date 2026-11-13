import { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AdminLayout = () => {
    const { signOut, user } = useAuth();
    const location = useLocation();

    const isActive = (path) => location.pathname === path;

    const [openSections, setOpenSections] = useState({
        audioBreaths: location.pathname.includes('/audio-'),
        guidedShifts: location.pathname.includes('/guided-shift'),
        pocketPrompts: location.pathname.includes('/pocket-prompt'),
        clarityCards: location.pathname.includes('/clarity-card'),
        affirmations: location.pathname.includes('/affirmation'),
        voiceNotes: location.pathname.includes('/voice-note')
    });

    const toggleSection = (section) => {
        setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
    };

    return (
        <div className="min-h-screen bg-bone flex">
            {/* Sidebar */}
            {/* Pinned: stays on screen while the page scrolls, and scrolls on its
                own if the menu is ever taller than the window. */}
            <aside className="w-64 bg-white border-r border-text-dark/10 flex-col hidden md:flex md:sticky md:top-0 md:h-screen md:self-start md:overflow-y-auto">
                <div className="p-6 border-b border-text-dark/10 text-center">
                    <p className="text-text-dark/70 text-xs tracking-[0.3em] uppercase font-medium">
                        uncoached
                    </p>
                    <p className="font-display text-lg text-text-dark mt-1">Admin Portal</p>
                    <a
                        href="/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-4 inline-flex items-center justify-center gap-2 w-full px-4 py-2 text-sm font-medium text-sage border border-sage/30 rounded-xl hover:bg-sage/5 transition-colors"
                    >
                        View website
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                    </a>
                </div>

                <nav className="flex-1 p-4 space-y-2">
                    <Link
                        to="/admin"
                        className={`w-full flex items-center px-4 py-3 rounded-xl transition-colors text-sm font-medium ${isActive('/admin')
                            ? 'bg-clay text-white shadow-sm'
                            : 'text-text-dark/70 hover:bg-clay/10 hover:text-text-dark'
                            }`}
                    >
                        Dashboard
                    </Link>

                    {/* Audio Breaths Accordion */}
                    <div className="space-y-1">
                        <button
                            onClick={() => toggleSection('audioBreaths')}
                            className="w-full flex items-center justify-between px-4 py-3 rounded-xl transition-colors text-sm font-medium text-text-dark/70 hover:bg-clay/10 hover:text-text-dark focus:outline-none"
                        >
                            <span>Audio Breaths</span>
                            <svg className={`w-4 h-4 transition-transform duration-200 ${openSections.audioBreaths ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>
                        {openSections.audioBreaths && (
                            <div className="pl-4 pr-2 space-y-1 pt-1 pb-2">
                                <Link
                                    to="/admin/audio-families"
                                    className={`w-full flex items-center px-4 py-2 rounded-lg transition-colors text-sm font-medium ${isActive('/admin/audio-families')
                                        ? 'bg-clay/10 text-clay'
                                        : 'text-text-dark/60 hover:bg-clay/10 hover:text-text-dark'
                                        }`}
                                >
                                    Families
                                </Link>
                                <Link
                                    to="/admin/audio-breaths"
                                    className={`w-full flex items-center px-4 py-2 rounded-lg transition-colors text-sm font-medium ${isActive('/admin/audio-breaths')
                                        ? 'bg-clay/10 text-clay'
                                        : 'text-text-dark/60 hover:bg-clay/10 hover:text-text-dark'
                                        }`}
                                >
                                    Tracks
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Guided Shifts Accordion */}
                    <div className="space-y-1">
                        <button
                            onClick={() => toggleSection('guidedShifts')}
                            className="w-full flex items-center justify-between px-4 py-3 rounded-xl transition-colors text-sm font-medium text-text-dark/70 hover:bg-clay/10 hover:text-text-dark focus:outline-none"
                        >
                            <span>Guided Shifts</span>
                            <svg className={`w-4 h-4 transition-transform duration-200 ${openSections.guidedShifts ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>
                        {openSections.guidedShifts && (
                            <div className="pl-4 pr-2 space-y-1 pt-1 pb-2">
                                <Link
                                    to="/admin/guided-shift-categories"
                                    className={`w-full flex items-center px-4 py-2 rounded-lg transition-colors text-sm font-medium ${isActive('/admin/guided-shift-categories')
                                        ? 'bg-clay/10 text-clay'
                                        : 'text-text-dark/60 hover:bg-clay/10 hover:text-text-dark'
                                        }`}
                                >
                                    Categories
                                </Link>
                                <Link
                                    to="/admin/guided-shifts"
                                    className={`w-full flex items-center px-4 py-2 rounded-lg transition-colors text-sm font-medium ${isActive('/admin/guided-shifts')
                                        ? 'bg-clay/10 text-clay'
                                        : 'text-text-dark/60 hover:bg-clay/10 hover:text-text-dark'
                                        }`}
                                >
                                    Shifts
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Pocket Prompts Accordion */}
                    <div className="space-y-1">
                        <button
                            onClick={() => toggleSection('pocketPrompts')}
                            className="w-full flex items-center justify-between px-4 py-3 rounded-xl transition-colors text-sm font-medium text-text-dark/70 hover:bg-clay/10 hover:text-text-dark focus:outline-none"
                        >
                            <span>Pocket Prompts</span>
                            <svg className={`w-4 h-4 transition-transform duration-200 ${openSections.pocketPrompts ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>
                        {openSections.pocketPrompts && (
                            <div className="pl-4 pr-2 space-y-1 pt-1 pb-2">
                                <Link
                                    to="/admin/pocket-prompt-categories"
                                    className={`w-full flex items-center px-4 py-2 rounded-lg transition-colors text-sm font-medium ${isActive('/admin/pocket-prompt-categories')
                                        ? 'bg-clay/10 text-clay'
                                        : 'text-text-dark/60 hover:bg-clay/10 hover:text-text-dark'
                                        }`}
                                >
                                    Categories
                                </Link>
                                <Link
                                    to="/admin/pocket-prompts"
                                    className={`w-full flex items-center px-4 py-2 rounded-lg transition-colors text-sm font-medium ${isActive('/admin/pocket-prompts')
                                        ? 'bg-clay/10 text-clay'
                                        : 'text-text-dark/60 hover:bg-clay/10 hover:text-text-dark'
                                        }`}
                                >
                                    Prompts
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Clarity Cards (Flat Link, no accordion needed since it's just one table, but sticking to design spec) */}
                    <div className="space-y-1">
                        <Link
                            to="/admin/clarity-cards"
                            className={`w-full flex items-center px-4 py-3 rounded-xl transition-colors text-sm font-medium ${isActive('/admin/clarity-cards')
                                ? 'bg-clay/10 text-clay shadow-sm'
                                : 'text-text-dark/70 hover:bg-clay/10 hover:text-text-dark'
                                }`}
                        >
                            Clarity Cards
                        </Link>
                    </div>

                    {/* Better Questions, formerly Afformations (Flat link) */}
                    <div className="space-y-1">
                        <Link
                            to="/admin/afformations"
                            className={`w-full flex items-center px-4 py-3 rounded-xl transition-colors text-sm font-medium ${isActive('/admin/afformations')
                                ? 'bg-clay/10 text-clay'
                                : 'text-text-dark/70 hover:bg-clay/10 hover:text-text-dark'
                                }`}
                        >
                            Better Questions
                        </Link>
                    </div>

                    {/* Voice Notes (Flat link) */}
                    <div className="space-y-1 pb-4">
                        <Link
                            to="/admin/voice-notes"
                            className={`w-full flex items-center px-4 py-3 rounded-xl transition-colors text-sm font-medium ${isActive('/admin/voice-notes')
                                ? 'bg-clay/10 text-clay shadow-sm'
                                : 'text-text-dark/70 hover:bg-clay/10 hover:text-text-dark'
                                }`}
                        >
                            Voice Notes
                        </Link>
                        <Link
                            to="/admin/practitioners"
                            className={`w-full flex items-center px-4 py-3 rounded-xl transition-colors text-sm font-medium ${isActive('/admin/practitioners')
                                ? 'bg-clay/10 text-clay shadow-sm'
                                : 'text-text-dark/70 hover:bg-clay/10 hover:text-text-dark'
                                }`}
                        >
                            Practitioners
                        </Link>
                        <Link
                            to="/admin/site-copy"
                            className={`w-full flex items-center px-4 py-3 rounded-xl transition-colors text-sm font-medium ${isActive('/admin/site-copy')
                                ? 'bg-clay/10 text-clay shadow-sm'
                                : 'text-text-dark/70 hover:bg-clay/10 hover:text-text-dark'
                                }`}
                        >
                            Website Text
                        </Link>
                        <Link
                            to="/admin/agreement-records"
                            className={`w-full flex items-center px-4 py-3 rounded-xl transition-colors text-sm font-medium ${isActive('/admin/agreement-records')
                                ? 'bg-clay/10 text-clay shadow-sm'
                                : 'text-text-dark/70 hover:bg-clay/10 hover:text-text-dark'
                                }`}
                        >
                            Agreement Records
                        </Link>
                        <Link
                            to="/admin/backup"
                            className={`w-full flex items-center px-4 py-3 rounded-xl transition-colors text-sm font-medium ${isActive('/admin/backup')
                                ? 'bg-clay/10 text-clay shadow-sm'
                                : 'text-text-dark/70 hover:bg-clay/10 hover:text-text-dark'
                                }`}
                        >
                            Backup
                        </Link>
                    </div>
                </nav>

                <div className="p-4 border-t border-text-dark/10">
                    <div className="flex items-center gap-3 mb-4 px-2">
                        <div className="w-8 h-8 rounded-full bg-clay text-white flex items-center justify-center font-medium shadow-sm shrink-0">
                            {user?.user_metadata?.display_name?.[0]?.toUpperCase() || user?.email?.[0]?.toUpperCase() || 'A'}
                        </div>
                        <div className="overflow-hidden">
                            <p className="text-sm font-medium text-text-dark truncate">
                                {user?.user_metadata?.display_name || 'Admin User'}
                            </p>
                            <p className="text-xs text-text-dark/60 truncate">
                                {user?.email}
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={signOut}
                        className="w-full flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        Sign Out
                    </button>
                </div>
            </aside>

            {/* Mobile Nav Header (Simplified for Mobile) */}
            <div className="md:hidden fixed top-0 left-0 right-0 bg-white border-b border-text-dark/10 p-4 flex justify-between items-center z-50">
                <p className="font-display pr-2">uncoached admin</p>
                <div className="flex gap-2 overflow-x-auto text-xs pb-1">
                    <a href="/" target="_blank" rel="noopener noreferrer" className="whitespace-nowrap px-3 py-1.5 rounded-full bg-sage text-bone">View site ↗</a>
                    <Link to="/admin" className={`whitespace-nowrap px-3 py-1.5 rounded-full ${isActive('/admin') ? 'bg-clay text-white' : 'bg-bone text-text-dark/70'}`}>Dashboard</Link>
                    <Link to="/admin/audio-families" className={`whitespace-nowrap px-3 py-1.5 rounded-full ${isActive('/admin/audio-families') ? 'bg-clay text-white' : 'bg-bone text-text-dark/70'}`}>Audio Families</Link>
                    <Link to="/admin/audio-breaths" className={`whitespace-nowrap px-3 py-1.5 rounded-full ${isActive('/admin/audio-breaths') ? 'bg-clay text-white' : 'bg-bone text-text-dark/70'}`}>Audio Breaths</Link>
                    <Link to="/admin/guided-shift-categories" className={`whitespace-nowrap px-3 py-1.5 rounded-full ${isActive('/admin/guided-shift-categories') ? 'bg-clay text-white' : 'bg-bone text-text-dark/70'}`}>Shift Categories</Link>
                    <Link to="/admin/guided-shifts" className={`whitespace-nowrap px-3 py-1.5 rounded-full ${isActive('/admin/guided-shifts') ? 'bg-clay text-white' : 'bg-bone text-text-dark/70'}`}>Guided Shifts</Link>
                </div>
            </div>

            {/* Main Content Area */}
            <main className="flex-1 overflow-auto md:pt-0 pt-16">
                <Outlet />
            </main>
        </div>
    );
};

export default AdminLayout;
