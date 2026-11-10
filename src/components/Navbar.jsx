import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ContactLink from './ContactLink';
import { useCopy } from '../context/SiteCopyContext';

// Each label is read from Website Text by its copy key; the routes stay here.
const NAV_LINKS = [
    { copyKey: 'nav.link_home', to: '/' },
    { copyKey: 'nav.link_about', to: '/about' },
    // Practitioners is hidden from the menu while it holds sample profiles
    // (Johanna, 10 Nov 2026). The page itself still opens at /practitioners so
    // she can show it to practitioners. Put this line back when they are real:
    // { copyKey: 'nav.link_practitioners', to: '/practitioners' },
    { copyKey: 'nav.link_gift', to: '/gift' },
    { copyKey: 'nav.link_contact', contact: true },
];

const Navbar = () => {
    const copy = useCopy();
    const [isScrolled, setIsScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    const logoDefault = import.meta.env.BASE_URL + 'logo/logouncoached.webp';
    const logoScrolled = import.meta.env.BASE_URL + 'logo/logo-notext-golden.webp';

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Lock body scroll while the mobile drawer is open.
    useEffect(() => {
        document.body.style.overflow = menuOpen ? 'hidden' : '';
        return () => {
            document.body.style.overflow = '';
        };
    }, [menuOpen]);

    const renderLink = (link, className, onClick) =>
        link.contact ? (
            <ContactLink key={link.copyKey} className={className} label={copy(link.copyKey)} onNavigate={onClick} />
        ) : (
            <Link key={link.copyKey} className={className} to={link.to} onClick={onClick}>
                {copy(link.copyKey)}
            </Link>
        );

    return (
        <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled || menuOpen ? 'bg-charcoal/95 py-2 shadow-md' : 'bg-transparent py-4'} px-6 lg:px-12`}>
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <Link to="/" onClick={() => setMenuOpen(false)}>
                        <img
                            src={isScrolled || menuOpen ? logoScrolled : logoDefault}
                            alt="Uncoached"
                            className={`transition-all duration-300 ${isScrolled || menuOpen ? 'h-10' : 'h-20'} w-auto`}
                        />
                    </Link>
                </div>

                <div className="hidden md:flex items-center gap-8 text-sm font-medium text-bone">
                    {NAV_LINKS.map((link) =>
                        renderLink(link, 'hover:text-golden-light transition-colors')
                    )}
                </div>

                <Link
                    className="hidden md:block px-6 py-2 rounded-full bg-sage text-bone hover:bg-sage/90 transition-all duration-300 text-sm font-medium shadow-sm"
                    to="/signin"
                >
                    {copy('nav.signin')}
                </Link>

                <button
                    className="md:hidden text-bone"
                    aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                    aria-expanded={menuOpen}
                    onClick={() => setMenuOpen((open) => !open)}
                >
                    <span className="material-symbols-outlined text-3xl">
                        {menuOpen ? 'close' : 'menu'}
                    </span>
                </button>
            </div>

            {/* Mobile drawer */}
            <div
                className={`md:hidden overflow-hidden transition-[max-height] duration-300 ease-in-out ${
                    menuOpen ? 'max-h-96' : 'max-h-0'
                }`}
            >
                <div className="flex flex-col gap-1 pt-4 pb-2 text-bone">
                    {NAV_LINKS.map((link) =>
                        renderLink(
                            link,
                            'py-3 px-2 border-b border-bone/10 text-base font-medium hover:text-golden-light transition-colors',
                            () => setMenuOpen(false)
                        )
                    )}
                    <Link
                        to="/signin"
                        onClick={() => setMenuOpen(false)}
                        className="mt-4 text-center px-6 py-3 rounded-full bg-sage text-bone hover:bg-sage/90 transition-all text-sm font-medium"
                    >
                        {copy('nav.signin')}
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
