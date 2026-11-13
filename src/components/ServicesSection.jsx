import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCopy } from '../context/SiteCopyContext';
import { emphasise, plain } from '../lib/emphasise';

const services = [
    'images/Field Icons/field chat.webp',
    'images/Field Icons/field audio breath.webp',
    'images/Field Icons/field clarity cards.webp',
    'images/Field Icons/field pocket prompts.webp',
    'images/Field Icons/field guided shift.webp',
    'images/Field Icons/field better questions.webp',
    'images/Field Icons/field voice notes.webp',
    'images/Field Icons/field coming soon2.webp',
].map((icon, i) => ({ icon, titleKey: `home.services.card${i + 1}_title`, bodyKey: `home.services.card${i + 1}_body` }));

const ServicesSection = () => {
    const copy = useCopy();
    const [currentSlide, setCurrentSlide] = useState(0);
    const totalSlides = 3; // 8 items, 3 per view = 3 slides (last slide has 2 items)

    // Auto-scroll. Depending on currentSlide restarts the timer after every
    // change (including manual nav), so a click is never immediately followed by
    // an auto-advance — which is what made it feel too fast.
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % totalSlides);
        }, 6000);
        return () => clearInterval(interval);
    }, [totalSlides, currentSlide]);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % totalSlides);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
    };

    const getTransform = () => {
        return `translateX(-${currentSlide * 100}%)`;
    };

    const renderCard = (service, index) => (
        <div
            key={index}
            className="bg-white rounded-2xl p-8 shadow-sm border border-clay/30 hover:shadow-lg transition-all duration-300 flex flex-col items-center text-center"
        >
            <div className="mb-6">
                <img
                    src={import.meta.env.BASE_URL + service.icon}
                    alt={plain(copy(service.titleKey))}
                    className="w-32 h-32 object-contain drop-shadow-lg"
                    style={{ imageRendering: 'crisp-edges' }}
                />
            </div>
            <h3 className="font-display text-lg font-semibold text-text-dark mb-3">
                {emphasise(copy(service.titleKey))}
            </h3>
            <p className="text-text-muted text-sm leading-relaxed">
                {copy(service.bodyKey)}
            </p>
        </div>
    );

    return (
        <section className="whitespace-pre-line py-24 relative overflow-hidden" id="whats-inside">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <img
                    src={import.meta.env.BASE_URL + "bg/S4_ What You'll Find Inside - homepage.webp"}
                    alt=""
                    className="w-full h-full object-cover"
                />
                {/* Soft wash: keeps the photograph as texture while making sure
                    the wording never depends on it happening to be pale. */}
                <div className="absolute inset-0 bg-bone/30"></div>
            </div>

            <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
                <div className="text-center mb-12 lg:bg-bone/35 lg:backdrop-blur-[3px] lg:rounded-3xl lg:p-8 xl:p-10 lg:border lg:border-white/50 lg:shadow-lg lg:[&_p]:text-text-dark/85 lg:[&_li]:text-text-dark/85 lg:max-w-4xl lg:mx-auto">
                    <h2 className="font-display text-4xl md:text-5xl mb-4 text-text-dark">
                        {copy('home.services.title')}
                    </h2>
                    <p className="text-text-muted text-lg mb-2">
                        {copy('home.services.subtitle')}
                    </p>
                    <p className="text-text-muted max-w-2xl mx-auto">
                        {copy('home.services.intro')}
                    </p>
                </div>

                {/* Cards Grid */}
                <div className="relative group/carousel">
                    {/* Navigation Arrows */}
                    <button
                        onClick={prevSlide}
                        aria-label="Previous resources"
                        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-20 w-10 h-10 bg-white/50 hover:bg-white rounded-full flex items-center justify-center text-sage shadow-md backdrop-blur-sm transition-all opacity-0 group-hover/carousel:opacity-100 focus-visible:opacity-100 lg:-translate-x-12"
                    >
                        ←
                    </button>
                    <button
                        onClick={nextSlide}
                        aria-label="Next resources"
                        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-20 w-10 h-10 bg-white/50 hover:bg-white rounded-full flex items-center justify-center text-sage shadow-md backdrop-blur-sm transition-all opacity-0 group-hover/carousel:opacity-100 focus-visible:opacity-100 lg:translate-x-12"
                    >
                        →
                    </button>

                    <div className="overflow-hidden">
                        <div
                            className="flex transition-transform duration-700 ease-in-out"
                            style={{ transform: getTransform() }}
                        >
                            {/* Slide 1 - First 3 items */}
                            <div className="flex-shrink-0 w-full grid md:grid-cols-3 gap-6">
                                {services.slice(0, 3).map((service, index) => renderCard(service, index))}
                            </div>

                            {/* Slide 2 - Next 3 items */}
                            <div className="flex-shrink-0 w-full grid md:grid-cols-3 gap-6">
                                {services.slice(3, 6).map((service, index) => renderCard(service, index + 3))}
                            </div>

                            {/* Slide 3 - Last 2 items */}
                            <div className="flex-shrink-0 w-full grid md:grid-cols-3 gap-6">
                                {services.slice(6, 8).map((service, index) => renderCard(service, index + 6))}
                            </div>
                        </div>
                    </div>

                    {/* Dots Navigation */}
                    <div className="flex justify-center gap-2 mt-8">
                        {[...Array(totalSlides)].map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentSlide(index)}
                                aria-label={`Show resources, page ${index + 1} of ${totalSlides}`}
                                aria-current={index === currentSlide ? 'true' : undefined}
                                className={`w-2 h-2 rounded-full transition-all ${index === currentSlide ? 'bg-sage' : 'bg-clay'
                                    }`}
                            />
                        ))}
                    </div>
                </div>

                {/* CTA Button */}
                <div className="text-center mt-10">
                    <Link
                        to="/pricing"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-sage text-bone rounded-full font-medium shadow-lg hover:bg-sage/90 hover:scale-105 transition-all duration-300"
                    >
                        {copy('home.services.cta')}
                    </Link>
                </div>

                <p className="text-center text-text-tertiary text-sm italic mt-12">
                    {copy('home.services.footnote')}
                </p>
            </div>
        </section>
    );
};

export default ServicesSection;
