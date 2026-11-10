import { Link } from 'react-router-dom';
import { useCopy } from '../context/SiteCopyContext';

const HeroSection = () => {
    const copy = useCopy();
    return (
        <section className="whitespace-pre-line relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-20">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <img
                    src={import.meta.env.BASE_URL + "bg/S1 Hero Section.webp"}
                    alt=""
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40"></div>
            </div>

            {/* Centered Content */}
            <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
                <img
                    src={import.meta.env.BASE_URL + "logo/Uncoached Logo Primary Lora Font.webp"}
                    alt="Uncoached Logo"
                    className="h-32 w-auto mb-16 mx-auto drop-shadow-md -translate-y-12"
                />
                <h1 className="font-display text-5xl md:text-6xl lg:text-7xl leading-tight mb-6 text-white drop-shadow-lg">
                    {copy('home.hero.title')} <span className="italic">{copy('home.hero.title_emphasis')}</span>
                </h1>
                <p className="text-lg md:text-xl text-white/90 mb-8 font-light leading-relaxed max-w-2xl mx-auto drop-shadow-md">
                    {copy('home.hero.subtitle')}
                </p>

                <div className="flex flex-col sm:flex-row gap-4 mb-6 justify-center">
                    <Link
                        className="px-8 py-4 bg-sage text-bone rounded-full font-medium shadow-lg hover:bg-sage/90 hover:scale-105 transition-all duration-300 text-center"
                        to="/pricing"
                    >
                        {copy('home.hero.cta_primary')}
                    </Link>
                    <a
                        className="px-8 py-4 bg-sage text-white rounded-full font-medium shadow-lg hover:bg-sage/90 hover:scale-105 transition-all duration-300 text-center"
                        href="#whats-inside"
                    >
                        {copy('home.hero.cta_secondary')}
                    </a>
                </div>

                <p className="text-white/70 text-sm italic drop-shadow">{copy('home.hero.note')}</p>
            </div>
        </section>
    );
};

export default HeroSection;
