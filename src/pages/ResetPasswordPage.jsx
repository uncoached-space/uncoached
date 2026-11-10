import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useCopy } from '../context/SiteCopyContext';

const ResetPasswordPage = () => {
    const copy = useCopy();
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [ready, setReady] = useState(false);
    const [saving, setSaving] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        // Opening the reset link establishes a temporary recovery session.
        const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
            if (event === 'PASSWORD_RECOVERY' || event === 'SIGNED_IN') setReady(true);
        });
        supabase.auth.getSession().then(({ data }) => { if (data.session) setReady(true); });
        return () => subscription.unsubscribe();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); setMessage('');
        if (password.length < 6) { setError(copy('resetpw.error_too_short')); return; }
        if (password !== confirm) { setError(copy('resetpw.error_mismatch')); return; }

        setSaving(true);
        const { error } = await supabase.auth.updateUser({ password });
        if (error) {
            setError(error.message);
            setSaving(false);
        } else {
            setMessage(copy('resetpw.success'));
            setTimeout(() => navigate('/dashboard'), 1200);
        }
    };

    return (
        <div className="min-h-screen bg-bone flex items-center justify-center px-6">
            <div className="max-w-md w-full">
                <div className="text-center mb-8">
                    <Link to="/">
                        <img src={import.meta.env.BASE_URL + "logo/Uncoached Logo Primary Lora Font.webp"} alt="Uncoached" className="h-16 mx-auto mb-4" />
                    </Link>
                    <h1 className="font-display text-3xl text-text-dark">{copy('resetpw.title')}</h1>
                </div>

                {error && <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-6 text-center">{error}</div>}
                {message && <div className="bg-sage/10 text-sage p-4 rounded-xl mb-6 text-center">{message}</div>}

                {!ready ? (
                    <p className="whitespace-pre-line text-center text-text-muted">
                        {copy('resetpw.not_ready')}{' '}<Link to="/signin" className="text-sage hover:underline">{copy('resetpw.not_ready_link')}</Link>.
                    </p>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input
                            type="password" placeholder={copy('resetpw.password_placeholder')} value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-6 py-3 bg-white border border-clay/30 rounded-full focus:outline-none focus:ring-2 focus:ring-sage/50" required
                        />
                        <input
                            type="password" placeholder={copy('resetpw.confirm_placeholder')} value={confirm}
                            onChange={(e) => setConfirm(e.target.value)}
                            className="w-full px-6 py-3 bg-white border border-clay/30 rounded-full focus:outline-none focus:ring-2 focus:ring-sage/50" required
                        />
                        <button type="submit" disabled={saving}
                            className="w-full px-6 py-3 bg-sage text-bone rounded-full font-medium hover:bg-sage/90 transition-all disabled:opacity-50">
                            {saving ? copy('resetpw.submit_busy') : copy('resetpw.submit')}
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default ResetPasswordPage;
