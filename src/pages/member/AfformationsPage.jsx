import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { useCopy } from '../../context/SiteCopyContext';
import { emphasise } from '../../lib/emphasise';

const AfformationsPage = () => {
    const copy = useCopy();
    const [cards, setCards] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeFilter, setActiveFilter] = useState('All');
    const [expandedCardId, setExpandedCardId] = useState(null);

    useEffect(() => {
        let active = true;
        (async () => {
            const { data, error } = await supabase
                .from('afformation_cards')
                .select('id, title, tags, afformation_questions(text, sort_order)')
                .eq('is_active', true)
                .order('sort_order', { ascending: true });
            if (!active) return;
            if (error) {
                console.error('Could not load afformations:', error.message);
                setLoading(false);
                return;
            }
            const mapped = (data || []).map(c => ({
                id: c.id,
                title: c.title,
                categories: c.tags || [],
                questions: (c.afformation_questions || [])
                    .slice()
                    .sort((a, b) => a.sort_order - b.sort_order)
                    .map(q => q.text),
            }));
            setCards(mapped);
            setExpandedCardId(mapped[0]?.id ?? null);
            setLoading(false);
        })();
        return () => { active = false; };
    }, []);

    // Filter chips are drawn from the tags actually in use, exactly as before.
    const uniqueCategories = ['All', ...new Set(cards.flatMap(card => card.categories))];

    const filteredCards = activeFilter === 'All'
        ? cards
        : cards.filter(card => card.categories.includes(activeFilter));

    const toggleCard = (id) => {
        setExpandedCardId(prev => (prev === id ? null : id));
    };

    return (
        <div className="min-h-screen relative font-sans">
            {/* Global Fixed Background Image */}
            <div className="fixed inset-0 z-0">
                <img
                    src={import.meta.env.BASE_URL + "images/Extra Backgrounds.webp"}
                    alt=""
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Main Scrolling Content */}
            <div className="relative z-10 pb-32">
                {/* Fixed Nav Link */}
                <Link
                    to="/dashboard"
                    className="fixed top-8 left-8 z-50 inline-flex items-center gap-2 text-[#3F5D4D] bg-[#F4F1EC]/85 backdrop-blur-md px-5 py-2.5 rounded-full hover:bg-[#F4F1EC] transition-colors shadow-sm border border-white/40 group mix-blend-normal"
                >
                    <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
                    </svg>
                    <span className="text-sm font-medium tracking-wide">{copy('afformations.hero.back')}</span>
                </Link>

                {/* SECTION 1: INTRO / HERO AREA */}
                <section className="px-6 pt-[120px] pb-[60px] md:pt-[160px] md:pb-[80px] flex items-center justify-center">
                    <div className="w-full max-w-[700px] mx-auto text-center animate-fade-in-up bg-[#F4F1EC]/85 backdrop-blur-md p-8 md:p-12 rounded-[32px] shadow-sm border border-white/40">
                        <h1 className="font-serif text-[40px] md:text-[48px] text-[#1F2422] font-medium mb-6">
                            {emphasise(copy('afformations.hero.title'), 'italic text-[#3F5D4D]')}
                        </h1>

                        <h2 className="whitespace-pre-line text-[18px] md:text-[20px] text-[#5E6A65] leading-[1.6] mb-8 font-sans">
                            {copy('afformations.hero.subtitle')}
                        </h2>

                        <p className="whitespace-pre-line text-[16px] text-[#5E6A65] leading-[1.7] max-w-[680px] mx-auto mb-8">
                            {copy('afformations.hero.body')}
                        </p>

                        <p className="whitespace-pre-line text-[16px] md:text-[17px] text-[#5E6A65] italic leading-relaxed">
                            {copy('afformations.hero.invitation')}
                        </p>
                    </div>
                </section>

                {/* SECTION 2: CATEGORY FILTER BAR */}
                <section className="relative z-20 pt-[32px] md:pt-[48px] px-6 max-w-[1200px] mx-auto">
                    <div className="flex items-center gap-2 md:gap-3 overflow-x-auto pb-4 hide-scrollbar justify-start lg:justify-center">
                        {uniqueCategories.map(category => (
                            <button
                                key={category}
                                onClick={() => setActiveFilter(category)}
                                className={`whitespace-nowrap rounded-full px-5 py-2 text-[13px] md:text-[14px] font-medium transition-all duration-300 ${activeFilter === category
                                    ? 'bg-[#3F5D4D] text-[#F4F1EC] border border-[#3F5D4D] shadow-sm'
                                    : 'bg-white/90 backdrop-blur-md text-[#5E6A65] border border-[#D6C7B8] hover:bg-white hover:text-[#1F2422] shadow-sm'
                                    }`}
                            >
                                {category === 'All' ? copy('afformations.filters.all') : category}
                            </button>
                        ))}
                    </div>
                </section>

                {/* SECTION 3: AFFORMATION CARD GRID */}
                <section className="relative z-20 pt-[24px] px-6 max-w-[1000px] mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 items-start">
                        {filteredCards.map((card) => {
                            const isExpanded = expandedCardId === card.id;

                            return (
                                <div
                                    key={card.id}
                                    className={`bg-[#FFFFFF] border border-[#D6C7B8] rounded-[12px] overflow-hidden transition-all duration-300 ${isExpanded ? 'shadow-[0_8px_30px_rgba(31,36,34,0.06)]' : 'shadow-sm hover:border-[#3F5D4D]/30'}`}
                                >
                                    {/* Accordion Header */}
                                    <button
                                        onClick={() => toggleCard(card.id)}
                                        className="w-full flex items-start justify-between p-[20px] md:p-[24px] focus:outline-none"
                                        aria-expanded={isExpanded}
                                    >
                                        <div className="text-left pr-4">
                                            <h3 className="font-serif text-[16px] md:text-[18px] font-medium text-[#1F2422] mb-3">
                                                {card.title}
                                            </h3>
                                            <div className="flex flex-wrap gap-2">
                                                {card.categories.map(cat => (
                                                    <span key={cat} className="bg-[#F4F1EC] text-[#5E6A65] text-[11px] md:text-[12px] uppercase tracking-wider px-[12px] py-[4px] rounded-full">
                                                        {cat}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="flex-shrink-0 pt-1">
                                            <svg
                                                className={`w-5 h-5 text-[#8C857A] transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </div>
                                    </button>

                                    {/* Accordion Content Container */}
                                    <div
                                        className={`transition-all duration-300 ease-in-out overflow-hidden ${isExpanded ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}
                                    >
                                        <div className="px-[20px] md:px-[24px] pb-[24px] pt-2 border-t border-[#F4F1EC]">
                                            <ul className="space-y-[10px] md:space-y-[12px]">
                                                {card.questions.map((question, idx) => (
                                                    <li key={idx} className="flex items-start text-[14px] md:text-[15px] text-[#5E6A65] leading-[1.6]">
                                                        <span className="text-[#C89A5B] mr-3 mt-[7px] text-[8px] flex-shrink-0">●</span>
                                                        <span>{question}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {!loading && filteredCards.length === 0 && (
                        <div className="text-center py-20 bg-[#FFFFFF] rounded-[16px] border border-[#D6C7B8]/50">
                            <p className="text-[16px] text-[#5E6A65]">No afformation moments found in this category.</p>
                        </div>
                    )}
                </section>
            </div>
        </div>
    );
};

export default AfformationsPage;
