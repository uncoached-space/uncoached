import { useState, useEffect } from 'react';

const testimonials = [
    {
        image: "https://randomuser.me/api/portraits/women/44.jpg",
        name: "Sarah T.",
        role: "Registered Psychotherapist",
        quote: "Uncoached has become a steady place I return to between sessions. It supports reflection without directing the process, which makes it something I genuinely feel comfortable recommending."
    },
    {
        image: "https://randomuser.me/api/portraits/men/32.jpg",
        name: "Alex M.",
        role: "Leadership Coach",
        quote: "This is the first space where I did not feel pressure to optimize or fix myself. It helped me slow down and actually integrate what I was already learning."
    },
    {
        image: "https://randomuser.me/api/portraits/women/68.jpg",
        name: "Maya R.",
        role: "Somatic Practitioner",
        quote: "Uncoached respects the nervous system. The pacing, the language, the lack of agenda all matter. It feels supportive without being invasive."
    },
    {
        image: "https://randomuser.me/api/portraits/women/55.jpg",
        name: "Jordan K.",
        role: "Mindfulness Teacher",
        quote: "Finally, a digital space that doesn't feel like another self-improvement app. It meets you where you are without pushing you anywhere."
    },
    {
        image: "https://randomuser.me/api/portraits/men/45.jpg",
        name: "Chris L.",
        role: "Therapist",
        quote: "I recommend Uncoached to clients who need support between sessions. It complements our work beautifully without replacing it."
    },
    {
        image: "https://randomuser.me/api/portraits/women/33.jpg",
        name: "Emma S.",
        role: "Life Coach",
        quote: "The gentle approach is what sets Uncoached apart. There's no pressure to perform or achieve—just space to be."
    }
];

const StarRating = () => (
    <div className="flex gap-0.5">
        {[...Array(5)].map((_, i) => (
            <span key={i} className="text-golden-light text-sm">★</span>
        ))}
    </div>
);

const TestimonialsSection = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const testimonialsPerPage = 3;
    const totalSlides = Math.ceil(testimonials.length / testimonialsPerPage);

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

    // Chunk testimonials for slides
    const slides = [];
    for (let i = 0; i < testimonials.length; i += testimonialsPerPage) {
        slides.push(testimonials.slice(i, i + testimonialsPerPage));
    }

    return (
        <section className="py-24 relative overflow-hidden" id="testimonials">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <img
                    src={import.meta.env.BASE_URL + "bg/S6_ What Others Say - homepage.webp"}
                    alt=""
                    className="w-full h-full object-cover"
                />
                {/* Soft wash: keeps the photograph as texture while making sure
                    the wording never depends on it happening to be pale. */}
                <div className="absolute inset-0 bg-bone/30"></div>
            </div>

            <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
                <div className="text-center mb-16 lg:bg-bone/35 lg:backdrop-blur-[3px] lg:rounded-3xl lg:p-8 xl:p-10 lg:border lg:border-white/50 lg:shadow-lg lg:[&_p]:text-text-dark/85 lg:[&_li]:text-text-dark/85 lg:max-w-3xl lg:mx-auto">
                    <h2 className="font-display text-4xl md:text-5xl text-text-dark">What Others Say</h2>
                </div>

                {/* Testimonials Carousel */}
                <div className="relative group/carousel mb-8">
                    {/* Navigation Arrows */}
                    <button
                        onClick={prevSlide}
                        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-20 w-10 h-10 bg-white/50 hover:bg-white rounded-full flex items-center justify-center text-sage shadow-md backdrop-blur-sm transition-all opacity-0 group-hover/carousel:opacity-100 lg:-translate-x-12"
                    >
                        ←
                    </button>
                    <button
                        onClick={nextSlide}
                        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-20 w-10 h-10 bg-white/50 hover:bg-white rounded-full flex items-center justify-center text-sage shadow-md backdrop-blur-sm transition-all opacity-0 group-hover/carousel:opacity-100 lg:translate-x-12"
                    >
                        →
                    </button>

                    <div className="overflow-hidden">
                        <div
                            className="flex transition-transform duration-700 ease-in-out"
                            style={{ transform: getTransform() }}
                        >
                            {slides.map((slideTestimonials, slideIndex) => (
                                <div key={slideIndex} className="flex-shrink-0 w-full grid md:grid-cols-3 gap-6 lg:gap-8">
                                    {slideTestimonials.map((testimonial, index) => (
                                        <div
                                            key={index}
                                            className="bg-white rounded-2xl p-8 shadow-sm border border-clay/30 hover:shadow-lg transition-all duration-300"
                                        >
                                            <div className="flex items-center gap-4 mb-4">
                                                <img
                                                    src={testimonial.image}
                                                    alt={testimonial.name}
                                                    className="w-14 h-14 rounded-full object-cover"
                                                />
                                                <div>
                                                    <p className="font-semibold text-text-dark">{testimonial.name}</p>
                                                    <StarRating />
                                                    <p className="text-text-tertiary text-xs">{testimonial.role}</p>
                                                </div>
                                            </div>
                                            <p className="text-text-muted leading-relaxed text-sm mb-4">
                                                "{testimonial.quote}"
                                            </p>
                                            <StarRating />
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Navigation Dots */}
                <div className="flex justify-center gap-2">
                    {[...Array(totalSlides)].map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentSlide(index)}
                            className={`w-2 h-2 rounded-full transition-all ${index === currentSlide ? 'bg-sage' : 'bg-clay'
                                }`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TestimonialsSection;
