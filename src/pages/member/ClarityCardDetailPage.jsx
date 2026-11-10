import { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { useCopy } from '../../context/SiteCopyContext';

const ClarityCardDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const copy = useCopy();

    const [card, setCard] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCard = async () => {
            try {
                const { data, error } = await supabase
                    .from('clarity_cards')
                    .select('*')
                    .eq('id', id)
                    .single();

                if (error) throw error;

                if (!data) {
                    navigate('/dashboard/clarity-cards');
                    return;
                }

                setCard(data);
            } catch (error) {
                console.error('Error fetching clarity card:', error);
                navigate('/dashboard/clarity-cards');
            } finally {
                setLoading(false);
            }
        };

        fetchCard();
    }, [id, navigate]);

    if (loading) {
        return (
            <div className="min-h-screen bg-[#F4F1EC] flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-[#D6C7B8] border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!card) return null;

    return (
        <div className="min-h-screen bg-[#F4F1EC] font-sans">
            {/* Fixed Nav Link */}
            <Link
                to="/dashboard/clarity-cards"
                className="fixed top-8 left-8 z-50 inline-flex items-center gap-2 text-[#3F5D4D] bg-[#F4F1EC]/85 backdrop-blur-md px-5 py-2.5 rounded-full hover:bg-white hover:text-[#1F2422] transition-colors shadow-sm border border-white/40 group mix-blend-normal"
            >
                <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
                </svg>
                <span className="text-sm font-medium tracking-wide">{copy('carddetail.back')}</span>
            </Link>

            {/* Main Content */}
            <section className="relative min-h-screen flex items-center justify-center py-24 px-6">

                <div className="w-full max-w-[800px] mx-auto animate-fade-in-up">
                    <div className="bg-[#FFFFFF] rounded-[16px] p-8 md:p-14 border border-[#D6C7B8] shadow-sm relative overflow-hidden">

                        {/* Decorative background elements inside the card */}
                        <div className="absolute -top-32 -right-32 w-64 h-64 bg-[#C89A5B]/5 rounded-full blur-[80px] pointer-events-none"></div>
                        <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-[#3F5D4D]/5 rounded-full blur-[80px] pointer-events-none"></div>

                        <div className="relative z-10 text-center">
                            {/* Header */}
                            <span className="inline-block px-4 py-1.5 bg-[#F4F1EC] text-[#8C857A] text-[12px] font-medium uppercase tracking-[0.1em] rounded-full mb-8">
                                {copy('carddetail.badge')}
                            </span>

                            <h1 className="font-serif text-[32px] md:text-[44px] text-[#1F2422] mb-6 leading-tight">
                                {card.title}
                            </h1>

                            {/* Divider */}
                            <div className="flex justify-center mb-10">
                                <span className="text-[#D6C7B8]">✧ ✧ ✧</span>
                            </div>

                            {/* Prompt/Description */}
                            {card.description && (
                                <p className="text-[18px] md:text-[22px] font-serif italic leading-relaxed text-[#1F2422]/90 mb-12 max-w-[600px] mx-auto">
                                    "{card.description}"
                                </p>
                            )}

                            {/* Added content (fallback to generic text if none) */}
                            <div className="text-[16px] leading-[1.7] text-[#5E6A65] mb-14 max-w-[500px] mx-auto">
                                {card.content?.body ? (
                                    <div dangerouslySetInnerHTML={{ __html: card.content.body }} />
                                ) : (
                                    <p className="whitespace-pre-line">{copy('carddetail.fallback_body')}</p>
                                )}
                            </div>

                            {/* Download Action */}
                            <div className="pt-8 border-t border-[#D6C7B8]/40 flex flex-col items-center">
                                <h3 className="font-serif text-[20px] text-[#1F2422] mb-3">
                                    {copy('carddetail.print_heading')}
                                </h3>
                                <p className="whitespace-pre-line text-[14px] text-[#5E6A65] mb-6">
                                    {copy('carddetail.print_body')}
                                </p>

                                {card.file_url ? (
                                    <a
                                        href={card.file_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 px-[28px] py-[12px] bg-[#3F5D4D] hover:bg-[#2c4236] text-[#F4F1EC] font-serif rounded-[8px] text-[15px] transition-all duration-300 shadow-[0_4px_14px_rgba(63,93,77,0.25)] hover:shadow-[0_6px_20px_rgba(63,93,77,0.35)]"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                        </svg>
                                        {copy('carddetail.download_button')}
                                    </a>
                                ) : (
                                    <div className="inline-flex items-center gap-2 px-[28px] py-[12px] bg-[#F4F1EC] text-[#8C857A] font-serif rounded-[8px] text-[15px] border border-[#D6C7B8] cursor-not-allowed">
                                        <svg className="w-4 h-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                        </svg>
                                        {copy('carddetail.no_pdf')}
                                    </div>
                                )}
                            </div>

                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ClarityCardDetailPage;
