import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Seo from '../components/Seo';
import { useCopy } from '../context/SiteCopyContext';

// Friendly 404 for any unknown URL.
const NotFoundPage = () => {
    const copy = useCopy();
    return (
        <div className="bg-bone text-text-dark font-body antialiased min-h-screen flex flex-col">
            <Seo title="Page not found" />
            <Navbar />
            <main className="flex-1 flex items-center justify-center px-6 pt-32 pb-24">
                <div className="text-center max-w-md">
                    <p className="font-display text-6xl text-sage mb-4">{copy('notfound.code')}</p>
                    <h1 className="font-display text-3xl text-text-dark mb-4">{copy('notfound.title')}</h1>
                    <p className="whitespace-pre-line text-text-muted mb-8">
                        {copy('notfound.body')}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <Link to="/" className="px-6 py-3 bg-sage text-bone rounded-full font-medium hover:bg-sage/90 transition-all">
                            {copy('notfound.cta_home')}
                        </Link>
                        <Link to="/pricing" className="px-6 py-3 bg-white border border-clay/30 text-text-dark rounded-full font-medium hover:bg-bone/50 transition-all">
                            {copy('notfound.cta_membership')}
                        </Link>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default NotFoundPage;
