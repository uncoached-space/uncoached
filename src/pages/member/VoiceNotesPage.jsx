import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { useCopy } from '../../context/SiteCopyContext';

const VoiceNotesPage = () => {
    const copy = useCopy();
    const [currentlyPlaying, setCurrentlyPlaying] = useState(null);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const audioRef = useRef(null);

    const [voiceNotes, setVoiceNotes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchNotes();
    }, []);

    const fetchNotes = async () => {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('voice_notes')
                .select('*')
                .eq('is_active', true)
                .order('sort_order', { ascending: true });

            if (error) throw error;
            setVoiceNotes(data || []);
        } catch (error) {
            console.error('Error fetching voice notes:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
        const handleLoadedMetadata = () => setDuration(audio.duration);
        const handleEnded = () => {
            setCurrentlyPlaying(null);
            setCurrentTime(0);
            setDuration(0);
        };

        const handlePlay = () => {
            if (audio.duration && !isNaN(audio.duration)) {
                setDuration(audio.duration);
            }
        };

        audio.addEventListener('timeupdate', handleTimeUpdate);
        audio.addEventListener('loadedmetadata', handleLoadedMetadata);
        audio.addEventListener('ended', handleEnded);
        audio.addEventListener('play', handlePlay);

        return () => {
            audio.removeEventListener('timeupdate', handleTimeUpdate);
            audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
            audio.removeEventListener('ended', handleEnded);
            audio.removeEventListener('play', handlePlay);
        };
    }, [currentlyPlaying]);

    const handlePlay = (note) => {
        if (currentlyPlaying?.id === note.id) {
            if (audioRef.current) {
                audioRef.current.pause();
            }
            setCurrentlyPlaying(null);
        } else {
            setCurrentlyPlaying(note);
            setCurrentTime(0);
            setDuration(0);
        }
    };

    const formatTime = (time) => {
        if (!time || isNaN(time)) return '0:00';
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
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
                    src={import.meta.env.BASE_URL + "images/Extra Backgrounds (2).jpg"}
                    alt=""
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Hidden Audio Element */}
            {currentlyPlaying?.audio_url && (
                <audio
                    ref={audioRef}
                    src={currentlyPlaying.audio_url}
                    autoPlay={true}
                />
            )}

            {/* Main Scrolling Content */}
            <div className="relative z-10 pb-24">
                {/* Fixed Nav Link */}
                <Link
                    to="/dashboard"
                    className="fixed top-8 left-8 z-50 inline-flex items-center gap-2 text-[#3F5D4D] bg-[#F4F1EC]/85 backdrop-blur-md px-5 py-2.5 rounded-full hover:bg-white hover:text-[#1F2422] transition-colors shadow-sm border border-white/40 group mix-blend-normal"
                >
                    <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
                    </svg>
                    <span className="text-sm font-medium tracking-wide">{copy('voicenotes.back')}</span>
                </Link>

                {/* SECTION 1: HERO AREA */}
                <section className="px-6 pt-[120px] pb-[60px] md:pt-[160px] md:pb-[80px] flex items-center justify-center">
                    <div className="w-full max-w-[700px] mx-auto text-center animate-fade-in-up bg-[#F4F1EC]/85 backdrop-blur-md p-8 md:p-12 rounded-[32px] shadow-sm border border-white/40">
                        <h1 className="font-serif text-[40px] md:text-[48px] text-[#1F2422] font-medium mb-6">
                            {copy('voicenotes.hero.title')}
                        </h1>

                        <h2 className="whitespace-pre-line text-[18px] md:text-[20px] text-[#5E6A65] leading-[1.6] mb-8 font-sans">
                            {copy('voicenotes.hero.subtitle')}
                        </h2>

                        <p className="whitespace-pre-line text-[16px] text-[#5E6A65] leading-[1.7] max-w-[680px] mx-auto mb-8">
                            {copy('voicenotes.hero.body')}
                        </p>

                        <p className="whitespace-pre-line text-[16px] md:text-[17px] text-[#5E6A65] italic leading-relaxed">
                            {copy('voicenotes.hero.note')}
                        </p>
                    </div>
                </section>

                {/* SECTION 2: VOICE NOTES LIBRARY */}
                <section className="py-8 px-6">
                    <div className="max-w-3xl mx-auto">
                        {voiceNotes.length === 0 ? (
                            <div className="text-center py-16 bg-white/90 backdrop-blur-md rounded-[24px] border border-white/40 shadow-sm">
                                <p className="text-[#5E6A65] text-lg">No voice notes available right now.</p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {voiceNotes.map(note => (
                                    <div
                                        key={note.id}
                                        className={`bg-white/90 backdrop-blur-md rounded-[20px] p-6 shadow-sm border transition-all duration-300 ${currentlyPlaying?.id === note.id
                                            ? 'border-[#3F5D4D] shadow-md ring-1 ring-[#3F5D4D]/20'
                                            : 'border-white/40 hover:shadow-md hover:border-[#D6C7B8]'
                                            }`}
                                    >
                                        <div className="flex items-center gap-4">
                                            {/* Play/Pause Button */}
                                            <button
                                                onClick={() => handlePlay(note)}
                                                className={`w-14 h-14 flex-shrink-0 rounded-full flex items-center justify-center transition-all duration-300 ${currentlyPlaying?.id === note.id
                                                    ? 'bg-[#3F5D4D] text-[#F4F1EC] shadow-md'
                                                    : 'bg-[#3F5D4D]/10 text-[#3F5D4D] hover:bg-[#3F5D4D] hover:text-[#F4F1EC]'
                                                    }`}
                                            >
                                                {currentlyPlaying?.id === note.id ? (
                                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                                        <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                                                    </svg>
                                                ) : (
                                                    <svg className="w-6 h-6 ml-1" fill="currentColor" viewBox="0 0 24 24">
                                                        <path d="M8 5v14l11-7z" />
                                                    </svg>
                                                )}
                                            </button>

                                            {/* Info */}
                                            <div className="flex-1 min-w-0">
                                                <h3 className="font-serif text-[18px] md:text-[20px] text-[#1F2422] font-medium truncate">
                                                    {note.title}
                                                </h3>
                                                <p className="text-[#5E6A65] text-[14px] truncate mt-1">
                                                    {note.description}
                                                </p>

                                                {/* Progress Bar (when playing) */}
                                                {currentlyPlaying?.id === note.id && (
                                                    <div className="mt-3">
                                                        <div className="h-1.5 bg-[#D6C7B8]/40 rounded-full overflow-hidden">
                                                            <div
                                                                className="h-full bg-[#3F5D4D] transition-all rounded-full"
                                                                style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
                                                            />
                                                        </div>
                                                        <div className="flex justify-between text-[12px] text-[#5E6A65] mt-1.5">
                                                            <span>{formatTime(currentTime)}</span>
                                                            <span>{formatTime(duration)}</span>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Duration badge (when not playing) */}
                                            {currentlyPlaying?.id !== note.id && note.duration && (
                                                <span className="text-[12px] text-[#5E6A65] bg-[#F4F1EC] px-3 py-1.5 rounded-full font-medium flex-shrink-0">
                                                    {note.duration}
                                                </span>
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

export default VoiceNotesPage;
