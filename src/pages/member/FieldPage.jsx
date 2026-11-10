import { Link } from 'react-router-dom';
import FieldChat from '../../components/FieldChat';
import { useCopy } from '../../context/SiteCopyContext';

// Field runs through our own chat box (see components/FieldChat.jsx) so the
// conversation is never stored in the ChatBase dashboard or on our servers.

const FieldPage = () => {
    const copy = useCopy();
    return (
        <div className="min-h-screen relative">
            {/* Background Image */}
            <div className="fixed inset-0 z-0">
                <img
                    src={import.meta.env.BASE_URL + "images/Membership/Members Field.webp"}
                    alt=""
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-charcoal/30"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 min-h-screen flex flex-col">
                {/* Header */}
                <header className="flex items-center justify-between px-4 sm:px-6 py-4">
                    <Link
                        to="/dashboard"
                        className="flex items-center gap-2 text-[#3F5D4D] bg-[#F4F1EC]/85 backdrop-blur-md px-5 py-2.5 rounded-full hover:bg-white hover:text-[#1F2422] transition-colors shadow-sm border border-white/40 group"
                    >
                        <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
                        </svg>
                        <span className="text-sm font-medium tracking-wide">{copy('fieldpage.header.back')}</span>
                    </Link>

                    <div className="flex items-center gap-2">
                        <img
                            src={import.meta.env.BASE_URL + "images/Field Icons/field chat.webp"}
                            alt="Field"
                            className="w-8 h-8"
                        />
                        <span className="text-bone font-display text-lg">{copy('fieldpage.header.name')}</span>
                    </div>

                    <div className="w-10 sm:w-24" aria-hidden="true" />
                </header>

                {/* Intro */}
                <div className="text-center px-6 pt-4 pb-6">
                    <h1 className="font-display text-3xl md:text-4xl text-bone mb-2 drop-shadow">
                        {copy('fieldpage.intro.title')}
                    </h1>
                    <p className="text-bone/80 text-sm md:text-base">
                        {copy('fieldpage.intro.subtitle')}
                    </p>
                </div>

                {/* Chat */}
                <div className="flex-1 flex flex-col w-full max-w-3xl mx-auto px-4 pb-6">
                    <div className="flex-1 min-h-[60vh] h-[60vh] rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
                        <FieldChat />
                    </div>
                    <p className="text-bone/70 text-xs text-center mt-4">
                        {copy('fieldpage.chat.come_back')}
                    </p>
                    <p className="whitespace-pre-line text-bone/60 text-xs text-center italic mt-2">
                        {copy('fieldpage.chat.disclaimer')}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default FieldPage;
