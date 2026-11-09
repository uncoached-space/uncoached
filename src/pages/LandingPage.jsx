import Navbar from '../components/Navbar'
import HeroSection from '../components/HeroSection'
import IntegrationSection from '../components/IntegrationSection'
import DeeperWorkSection from '../components/DeeperWorkSection'
import ServicesSection from '../components/ServicesSection'
import ThoughtfulResourcesSection from '../components/ThoughtfulResourcesSection'
import MeetFieldSection from '../components/MeetFieldSection'
import TestimonialsSection from '../components/TestimonialsSection'
import GiftSection from '../components/GiftSection'
import SubscribeSection from '../components/SubscribeSection'
import Footer from '../components/Footer'
import Seo from '../components/Seo';

function LandingPage() {
    return (
        <div className="bg-bone text-text-dark font-body antialiased">
            <Seo title="" path="/" />
            <Navbar />
            <HeroSection />
            <IntegrationSection />
            <DeeperWorkSection />
            <ServicesSection />
            <ThoughtfulResourcesSection />
            <MeetFieldSection />
            {/* <TestimonialsSection /> */}
            <GiftSection />
            <SubscribeSection />
            <Footer />
        </div>
    )
}

export default LandingPage
