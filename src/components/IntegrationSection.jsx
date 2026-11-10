import { useCopy } from '../context/SiteCopyContext';

const pillars = [
    {
        titleKey: 'home.integrate.card1_title',
        bodyKey: 'home.integrate.card1_body',
        icon: (
            <svg className="w-10 h-10 text-sage" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 12a1.8 1.8 0 1 1 1.9 1.8 3.6 3.6 0 1 1 3.4-3.9A6.6 6.6 0 1 1 5.6 14.6" />
            </svg>
        )
    },
    {
        titleKey: 'home.integrate.card2_title',
        bodyKey: 'home.integrate.card2_body',
        icon: (
            <svg className="w-10 h-10 text-sage" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
            </svg>
        )
    },
    {
        titleKey: 'home.integrate.card3_title',
        bodyKey: 'home.integrate.card3_body',
        icon: (
            <svg className="w-10 h-10 text-sage" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
            </svg>
        )
    }
];

const IntegrationSection = () => {
    const copy = useCopy();
    return (
        <section className="whitespace-pre-line py-24 relative overflow-hidden" id="integrate">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <img
                    src={import.meta.env.BASE_URL + "bg/S2_ How We Help You Integrate - homepage.webp"}
                    alt=""
                    className="w-full h-full object-cover"
                />
                {/* Soft wash: keeps the photograph as texture while making sure
                    the wording never depends on it happening to be pale. */}
                <div className="absolute inset-0 bg-bone/30"></div>
            </div>

            <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
                <div className="text-center mb-16 lg:bg-bone/35 lg:backdrop-blur-[3px] lg:rounded-3xl lg:p-8 xl:p-10 lg:border lg:border-white/50 lg:shadow-lg lg:[&_p]:text-text-dark/85 lg:[&_li]:text-text-dark/85 lg:max-w-4xl lg:mx-auto">
                    <h2 className="font-display text-4xl md:text-5xl text-text-dark mb-6">
                        {copy('home.integrate.title')}
                    </h2>
                    <p className="text-text-muted max-w-3xl mx-auto text-lg leading-relaxed">
                        {copy('home.integrate.intro')}
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
                    {pillars.map((pillar, index) => (
                        <div
                            key={index}
                            className="group bg-white rounded-2xl p-8 shadow-sm border border-clay/30 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center"
                        >
                            <div className="mb-4">
                                {pillar.icon}
                            </div>
                            <h3 className="font-display text-xl font-semibold mb-3 text-text-dark">{copy(pillar.titleKey)}</h3>
                            <p className="text-text-muted leading-relaxed">
                                {copy(pillar.bodyKey)}
                            </p>
                        </div>
                    ))}
                </div>

                <p className="text-center text-text-tertiary text-sm italic mt-12">
                    {copy('home.integrate.footnote')}
                </p>
            </div>
        </section>
    );
};

export default IntegrationSection;

