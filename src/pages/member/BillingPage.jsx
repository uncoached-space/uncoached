import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCopy } from '../../context/SiteCopyContext';
import { supabase } from '../../lib/supabase';

const API = import.meta.env.VITE_API_URL;

// A friendly name for the plan stored on the subscription.
const planLabel = (plan) => {
    if (!plan) return 'Membership';
    const gift = plan.match(/^gift-(\d+)-month/);
    if (gift) return `Gift membership — ${gift[1] === '12' ? '1 year' : `${gift[1]} month${gift[1] === '1' ? '' : 's'}`}`;
    const map = { monthly: 'Monthly', quarterly: '3 months', biannual: '6 months', annual: 'Annual' };
    return map[plan.toLowerCase()] || (plan.charAt(0).toUpperCase() + plan.slice(1));
};

const statusLabel = (status) => {
    if (status === 'active') return 'Active';
    if (status === 'trialing') return 'Active (gift)';
    if (status === 'cancelled' || status === 'canceled') return 'Ending';
    return status || '—';
};

const prettyDate = (iso) => {
    if (!iso) return null;
    const d = new Date(iso);
    return isNaN(d) ? null : d.toLocaleDateString(undefined, { day: 'numeric', month: 'long', year: 'numeric' });
};

// Billing & invoices for members. The summary is read from the member's own
// subscription; everything transactional (invoices, payment method, cancelling)
// is handled in Stripe's secure Customer Portal, opened from here.
const BillingPage = () => {
    const { subscription, isSubscribed } = useAuth();
    const copy = useCopy();
    const [portalLoading, setPortalLoading] = useState(false);
    const [error, setError] = useState('');

    const openPortal = async () => {
        setPortalLoading(true);
        setError('');
        try {
            const { data: { session } } = await supabase.auth.getSession();
            const res = await fetch(`${API}/stripe/create-portal-session`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ accessToken: session?.access_token }),
            });
            const data = await res.json();
            if (data.url) {
                window.location.assign(data.url);
            } else {
                setError(data.error || 'Could not open the billing portal.');
                setPortalLoading(false);
            }
        } catch (err) {
            console.error('Billing portal error:', err);
            setError('Something went wrong opening the billing portal. Please try again.');
            setPortalLoading(false);
        }
    };

    const isGift = subscription?.plan?.startsWith('gift-');
    // Cancelled in the portal: still active, but it will not renew.
    const isCancelling = !isGift && subscription?.cancel_at_period_end === true;
    const endDate = prettyDate(subscription?.current_period_end);
    const endLabel = isGift
        ? copy('memberbilling.until_label')
        : isCancelling ? copy('memberbilling.ends_label') : copy('memberbilling.renews_label');

    return (
        <div className="min-h-screen bg-bone">
            <nav className="fixed w-full z-20 top-0 bg-bone/90 backdrop-blur-md border-b border-clay/20 px-6 py-4 flex items-center justify-between">
                <Link to="/dashboard" className="flex items-center gap-2 text-text-muted hover:text-text-dark transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    <span className="text-sm">{copy('memberbilling.back')}</span>
                </Link>
            </nav>

            <div className="max-w-2xl mx-auto px-6 pt-32 pb-24">
                <h1 className="font-display text-4xl text-text-dark mb-2">{copy('memberbilling.title')}</h1>
                <p className="whitespace-pre-line text-text-muted mb-10">{copy('memberbilling.intro')}</p>

                {/* Membership summary */}
                <div className="bg-white p-8 rounded-3xl shadow-sm border border-clay/10 mb-6">
                    <h2 className="font-display text-2xl text-text-dark mb-6">{copy('memberbilling.membership_heading')}</h2>

                    {isSubscribed ? (
                        <dl className="space-y-4">
                            <div className="flex justify-between items-baseline gap-4">
                                <dt className="text-text-muted">{copy('memberbilling.plan_label')}</dt>
                                <dd className="text-text-dark font-medium text-right">{planLabel(subscription?.plan)}</dd>
                            </div>
                            <div className="flex justify-between items-baseline gap-4">
                                <dt className="text-text-muted">{copy('memberbilling.status_label')}</dt>
                                <dd className="text-text-dark font-medium text-right">
                                    {isCancelling ? copy('memberbilling.cancelled_status') : statusLabel(subscription?.status)}
                                </dd>
                            </div>
                            {endDate && (
                                <div className="flex justify-between items-baseline gap-4">
                                    <dt className="text-text-muted">{endLabel}</dt>
                                    <dd className="text-text-dark font-medium text-right">{endDate}</dd>
                                </div>
                            )}
                        </dl>
                    ) : (
                        <div>
                            <p className="whitespace-pre-line text-text-muted mb-5">{copy('memberbilling.none_text')}</p>
                            <Link
                                to="/pricing"
                                className="inline-block px-6 py-3 bg-sage text-bone rounded-full font-medium hover:bg-sage/90 transition-all"
                            >
                                {copy('memberbilling.none_cta')}
                            </Link>
                        </div>
                    )}

                    {isGift && (
                        <p className="whitespace-pre-line mt-6 text-sm text-text-muted leading-relaxed bg-sage/5 border border-sage/20 rounded-xl p-4">
                            {copy('memberbilling.gift_note')}
                        </p>
                    )}
                </div>

                {/* Invoices & changes via Stripe */}
                <div className="bg-white p-8 rounded-3xl shadow-sm border border-clay/10">
                    <h2 className="font-display text-2xl text-text-dark mb-2">{copy('memberbilling.invoices_heading')}</h2>
                    <p className="whitespace-pre-line text-sm text-text-muted mb-6 leading-relaxed">
                        {copy('memberbilling.invoices_body')}
                    </p>
                    {error && <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-4 text-sm text-center">{error}</div>}
                    <button
                        type="button"
                        onClick={openPortal}
                        disabled={portalLoading}
                        className={`w-full py-4 rounded-xl font-medium transition-all duration-300 shadow-sm
                            ${portalLoading ? 'bg-bone text-text-muted cursor-not-allowed border border-clay/20' : 'bg-charcoal text-bone hover:bg-charcoal/90'}`}
                    >
                        {portalLoading ? 'Opening secure portal…' : copy('memberbilling.portal_button')}
                    </button>
                    <p className="mt-3 text-center text-xs text-text-tertiary">{copy('memberbilling.stripe_note')}</p>
                </div>
            </div>
        </div>
    );
};

export default BillingPage;
