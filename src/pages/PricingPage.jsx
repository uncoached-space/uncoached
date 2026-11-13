import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCopy } from '../context/SiteCopyContext';
import Seo from '../components/Seo';

const PricingPage = () => {
    const copy = useCopy();
    const [loading, setLoading] = useState(null);
    const [error, setError] = useState('');
    const { user, loading: authLoading } = useAuth();
    const navigate = useNavigate();

    // The wording comes from Website Text > Pricing. The prices themselves stay
    // here, next to the Stripe price they belong to, so the amount shown can
    // never drift from the amount charged.
    const lines = (key) => copy(key).split('\n').map((l) => l.trim()).filter(Boolean);
    const plans = [
        { id: 'monthly', price: '$22', period: '/month', priceId: import.meta.env.VITE_STRIPE_MONTHLY_PRICE_ID },
        { id: 'quarterly', price: '$62', period: '/3 months', priceId: import.meta.env.VITE_STRIPE_QUARTERLY_PRICE_ID },
        { id: 'biannual', price: '$120', period: '/6 months', priceId: import.meta.env.VITE_STRIPE_BIANNUAL_PRICE_ID, popular: true },
        { id: 'annual', price: '$220', period: '/year', priceId: import.meta.env.VITE_STRIPE_ANNUAL_PRICE_ID },
    ].map((plan, i) => ({
        ...plan,
        name: copy(`pricing.plan${i + 1}_name`),
        description: copy(`pricing.plan${i + 1}_note`),
        cta: copy(`pricing.plan${i + 1}_cta`),
        badge: copy(`pricing.plan${i + 1}_badge`).trim(),
        features: lines(`pricing.plan${i + 1}_features`),
    }));

    const handleSelectPlan = async (plan) => {
        // Debug logging
        console.log('Auth state:', { user, authLoading });

        // Wait for auth to finish loading before checking
        if (authLoading) return;

        if (!user) {
            navigate('/signup');
            return;
        }

        setLoading(plan.id);
        setError('');

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/stripe/create-checkout-session`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    priceId: plan.priceId,
                    userId: user.id,
                    userEmail: user.email
                })
            });

            const data = await response.json();

            if (data.url) {
                window.location.assign(data.url);
            } else {
                setError('Failed to create checkout session');
                setLoading(null);
            }
        } catch (err) {
            console.error('Checkout error:', err);
            setError('Something went wrong. Please try again.');
            setLoading(null);
        }
    };

    return (
        <div className="whitespace-pre-line min-h-screen bg-bone py-24 px-6">
            <Seo title="Membership" description="Choose your path. Simple monthly, quarterly, biannual, or annual membership to Uncoached — cancel any time." path="/pricing" />
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="text-center mb-16">
                    <Link to="/">
                        <img
                            src={import.meta.env.BASE_URL + "logo/Uncoached Logo Primary Lora Font.webp"}
                            alt="Uncoached"
                            className="h-16 mx-auto mb-8"
                        />
                    </Link>
                    <h1 className="font-display text-4xl md:text-5xl text-text-dark mb-4">
                        {copy('pricing.title')}
                    </h1>
                    <p className="text-text-muted text-lg max-w-xl mx-auto">
                        {copy('pricing.subtitle')}
                    </p>
                </div>

                {/* Error Message */}
                {error && (
                    <div className="max-w-md mx-auto mb-8 bg-red-50 text-red-600 p-4 rounded-xl text-center">
                        {error}
                    </div>
                )}

                {/* Pricing Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    {plans.map((plan) => (
                        <div
                            key={plan.id}
                            className={`relative bg-white rounded-2xl p-8 shadow-sm border ${plan.popular
                                ? 'border-sage ring-2 ring-sage'
                                : 'border-clay/30'
                                } hover:shadow-lg transition-all duration-300`}
                        >
                            {plan.badge && (
                                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                                    <span className="bg-sage text-bone text-xs font-semibold px-4 py-1 rounded-full whitespace-nowrap">
                                        {plan.badge}
                                    </span>
                                </div>
                            )}

                            <div className="text-center mb-6">
                                <h3 className="font-display text-xl text-text-dark mb-2">
                                    {plan.name}
                                </h3>
                                <div className="flex items-baseline justify-center gap-1">
                                    <span className="font-display text-4xl text-text-dark">
                                        {plan.price}
                                    </span>
                                    <span className="text-text-muted text-sm">
                                        {plan.period}
                                    </span>
                                </div>
                                <p className="text-text-muted text-sm mt-2">
                                    {plan.description}
                                </p>
                            </div>

                            <ul className="space-y-3 mb-8">
                                {plan.features.map((feature, idx) => (
                                    <li key={idx} className="flex items-start gap-2 text-text-muted text-sm">
                                        <svg className="w-5 h-5 text-sage flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            <button
                                onClick={() => handleSelectPlan(plan)}
                                disabled={loading === plan.id || authLoading}
                                className={`w-full py-3 rounded-full font-medium transition-all ${plan.popular
                                    ? 'bg-sage text-bone hover:bg-sage/90'
                                    : 'bg-charcoal text-bone hover:bg-charcoal/90'
                                    } disabled:opacity-50`}
                            >
                                {loading === plan.id ? 'Loading...' : authLoading ? 'Please wait...' : plan.cta}
                            </button>
                        </div>
                    ))}
                </div>

                {/* Universal messaging */}
                <p className="text-center font-display text-xl text-text-dark mb-10">
                    {copy('pricing.universal')}
                </p>

                {/* Detail dropdowns */}
                <div className="max-w-2xl mx-auto space-y-4 mb-12">
                    <details className="group bg-white rounded-2xl border border-clay/30 overflow-hidden">
                        <summary className="flex items-center justify-between cursor-pointer list-none px-6 py-5 font-display text-lg text-text-dark">
                            {copy('pricing.included_title')}
                            <span className="material-symbols-outlined text-text-muted transition-transform group-open:rotate-180">
                                expand_more
                            </span>
                        </summary>
                        <div className="px-6 pb-6 text-text-muted text-sm">
                            <p className="mb-3">{copy('pricing.included_intro')}</p>
                            <ul className="space-y-2">
                                {lines('pricing.included_list').map((item) => (
                                    <li key={item} className="flex items-start gap-2">
                                        <svg className="w-5 h-5 text-sage flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </details>

                    <details className="group bg-white rounded-2xl border border-clay/30 overflow-hidden">
                        <summary className="flex items-center justify-between cursor-pointer list-none px-6 py-5 font-display text-lg text-text-dark">
                            {copy('pricing.extras_title')}
                            <span className="material-symbols-outlined text-text-muted transition-transform group-open:rotate-180">
                                expand_more
                            </span>
                        </summary>
                        <div className="px-6 pb-6 text-text-muted text-sm leading-relaxed">
                            {copy('pricing.extras_body')}
                        </div>
                    </details>
                </div>

                {/* Disclaimer */}
                <div className="max-w-2xl mx-auto text-center">
                    <p className="text-text-tertiary text-xs leading-relaxed mb-6">
                        {copy('pricing.disclaimer')}
                    </p>
                    <p className="font-display text-lg text-text-dark mb-6">
                        {copy('pricing.closing')}
                    </p>
                    <p className="text-text-muted text-sm">
                        {copy('pricing.secure_note')}
                    </p>
                    <p className="text-text-muted text-sm mt-4">
                        <Link to="/redeem" className="text-sage hover:underline">
                            {copy('pricing.gift_link')}
                        </Link>
                    </p>
                    {!user && (
                        <p className="text-text-muted text-sm mt-4">
                            {copy('pricing.signin_prompt')}{' '}
                            <Link to="/signin" className="text-sage hover:underline">
                                {copy('pricing.signin_link')}
                            </Link>
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PricingPage;
