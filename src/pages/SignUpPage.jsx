import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getPendingGiftCode } from '../lib/giftCode';
import { useCopy } from '../context/SiteCopyContext';

const SignUpPage = () => {
    const copy = useCopy();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [displayName, setDisplayName] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const hasGift = Boolean(getPendingGiftCode());

    const { signUp, signInWithGoogle } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        const { data, error } = await signUp(email, password, displayName);

        // Debug logging - check browser console
        console.log('Signup response:', { data, error });

        if (error) {
            setError(error.message);
            setLoading(false);
        } else if (data?.user?.identities?.length === 0) {
            // Supabase returns success but empty identities if user already exists
            setError(copy('signup.error_exists'));
            setLoading(false);
        } else {
            setSuccess(true);
            setLoading(false);
            // Redirect to pricing after signup, or back to the gift card they came with
            setTimeout(() => navigate(hasGift ? '/redeem' : '/pricing'), 2000);
        }
    };

    const handleGoogleSignIn = async () => {
        const { error } = await signInWithGoogle();
        if (error) {
            setError(error.message);
        }
    };

    return (
        <div className="min-h-screen bg-bone flex items-center justify-center px-6">
            <div className="max-w-md w-full">
                {/* Logo */}
                <div className="text-center mb-8">
                    <Link to="/">
                        <img
                            src={import.meta.env.BASE_URL + "logo/Uncoached Logo Primary Lora Font.webp"}
                            alt="Uncoached"
                            className="h-16 mx-auto mb-4"
                        />
                    </Link>
                    <h1 className="font-display text-3xl text-text-dark">{copy('signup.title')}</h1>
                    <p className="text-text-muted mt-2">{copy('signup.subtitle')}</p>
                </div>

                {/* Success Message */}
                {success && (
                    <div className="whitespace-pre-line bg-sage/10 text-sage p-4 rounded-xl mb-6 text-center">
                        {hasGift ? copy('signup.success_gift') : copy('signup.success_plan')}
                    </div>
                )}

                {/* Error Message */}
                {error && (
                    <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-6 text-center">
                        {error}
                    </div>
                )}

                {/* Google Sign In */}
                <button
                    onClick={handleGoogleSignIn}
                    className="w-full flex items-center justify-center gap-3 px-6 py-3 bg-white border border-clay/30 rounded-full text-text-dark font-medium hover:bg-bone/50 transition-all mb-6"
                >
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                    </svg>
                    {copy('signup.google_button')}
                </button>

                <div className="relative mb-6">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-clay/30"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="px-4 bg-bone text-text-muted">{copy('signup.divider')}</span>
                    </div>
                </div>

                {/* Email Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <input
                            type="text"
                            placeholder={copy('signup.name_placeholder')}
                            value={displayName}
                            onChange={(e) => setDisplayName(e.target.value)}
                            className="w-full px-6 py-3 bg-white border border-clay/30 rounded-full focus:outline-none focus:ring-2 focus:ring-sage/50"
                            required
                        />
                    </div>
                    <div>
                        <input
                            type="email"
                            placeholder={copy('signup.email_placeholder')}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-6 py-3 bg-white border border-clay/30 rounded-full focus:outline-none focus:ring-2 focus:ring-sage/50"
                            required
                        />
                    </div>
                    <div>
                        <input
                            type="password"
                            placeholder={copy('signup.password_placeholder')}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-6 py-3 bg-white border border-clay/30 rounded-full focus:outline-none focus:ring-2 focus:ring-sage/50"
                            minLength={6}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full px-6 py-3 bg-sage text-bone rounded-full font-medium hover:bg-sage/90 transition-all disabled:opacity-50"
                    >
                        {loading ? copy('signup.submit_busy') : copy('signup.submit')}
                    </button>
                </form>

                <p className="text-center text-text-muted mt-6">
                    {copy('signup.signin_prompt')}{' '}
                    <Link to="/signin" className="text-sage hover:underline">
                        {copy('signup.signin_link')}
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default SignUpPage;
