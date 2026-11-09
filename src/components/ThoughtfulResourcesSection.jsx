import { useCopy } from '../context/SiteCopyContext';

const BACKGROUND = 'bg/S4b-thoughtful-resources.webp';

const highlights = ['menu_book', 'auto_awesome', 'footprint'].map((icon, i) => ({
    icon,
    titleKey: `home.resources.card${i + 1}_title`,
    bodyKey: `home.resources.card${i + 1}_body`,
}));

const ThoughtfulResourcesSection = () => {
    const copy = useCopy();
    return (
        <section className="whitespace-pre-line pt-44 md:pt-56 lg:pt-20 pb-16 lg:pb-20 relative overflow-hidden" id="thoughtful-resources">
            <div className="absolute inset-0 z-0">
                {/* The leaves fill the top right of this image. On a narrow screen a
                    full-size crop would put them behind the wording, so the section
                    uses the plain left side and shows the leaves above the heading. */}
                <img src={import.meta.env.BASE_URL + BACKGROUND} alt="" className="w-full h-full object-cover object-left lg:object-right-top" />
                <img
                    src={import.meta.env.BASE_URL + BACKGROUND}
                    alt=""
                    className="lg:hidden absolute top-0 right-0 w-[150%] max-w-[900px] [mask-image:linear-gradient(to_bottom,black_70%,transparent)]"
                />
            </div>

            <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
                <h2 className="font-display text-3xl md:text-5xl leading-tight text-text-dark mb-4 max-w-xl">
                    {copy('home.resources.title')}
                </h2>
                <p className="text-text-dark/85 text-lg leading-relaxed max-w-xl mb-10 lg:mb-14">
                    {copy('home.resources.intro')}
                </p>

                <div className="grid lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-text-dark/15">
                    {highlights.map((h) => (
                        <div key={h.icon} className="flex flex-col items-center text-center py-8 lg:py-0 lg:px-8">
                            <span className="w-14 h-14 mb-4 rounded-full bg-bone/80 flex items-center justify-center" aria-hidden="true">
                                <span className="material-symbols-outlined text-text-dark !text-[30px]">{h.icon}</span>
                            </span>
                            <h3 className="font-display text-2xl font-semibold text-text-dark mb-2">
                                {copy(h.titleKey)}
                            </h3>
                            <p className="text-text-dark/85 leading-relaxed max-w-xs [text-wrap:balance]">
                                {copy(h.bodyKey)}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ThoughtfulResourcesSection;
