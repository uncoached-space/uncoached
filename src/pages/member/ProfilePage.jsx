import { useState, useRef, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useCopy } from '../../context/SiteCopyContext';
import { supabase } from '../../lib/supabase';
import { Link } from 'react-router-dom';

const ProfilePage = () => {
    const { user, updateProfile } = useAuth();
    const copy = useCopy();
    const [displayName, setDisplayName] = useState('');
    const [isSaving, setIsSaving] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const fileInputRef = useRef(null);

    // Initialize from user metadata
    useEffect(() => {
        if (user?.user_metadata?.display_name) {
            setDisplayName(user.user_metadata.display_name);
        } else if (user?.email) {
            setDisplayName(user.email.split('@')[0]);
        }
    }, [user]);

    const avatarUrl = user?.user_metadata?.avatar_url || null;

    const handleSaveProfile = async (e) => {
        e.preventDefault();
        setIsSaving(true);
        setMessage('');
        setError('');

        const { error: updateError } = await updateProfile(displayName, undefined);

        if (updateError) {
            setError(updateError.message || 'Failed to update profile');
        } else {
            setMessage('Profile updated successfully!');
        }
        setIsSaving(false);
    };

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Basic validation
        if (!file.type.startsWith('image/')) {
            setError('Please upload an image file');
            return;
        }

        if (file.size > 5 * 1024 * 1024) { // 5MB limit
            setError('Image must be less than 5MB');
            return;
        }

        setIsUploading(true);
        setError('');
        setMessage('');

        try {
            // Create a unique file path
            const fileExt = file.name.split('.').pop();
            const fileName = `${user.id}-${Math.random()}.${fileExt}`;
            const filePath = `${user.id}/${fileName}`; // Group by user ID folder

            // Upload the file to Supabase storage
            const { error: uploadError } = await supabase.storage
                .from('avatars')
                .upload(filePath, file, { upsert: true });

            if (uploadError) {
                console.error("Upload error details:", uploadError);
                throw uploadError;
            }

            // Get the public URL for the newly uploaded image
            const { data: publicUrlData } = supabase.storage
                .from('avatars')
                .getPublicUrl(filePath);

            const publicUrl = publicUrlData.publicUrl;

            // Update the user's metadata with the new avatar URL
            const { error: updateError } = await updateProfile(undefined, publicUrl);

            if (updateError) throw updateError;

            setMessage('Profile picture updated!');
        } catch (err) {
            console.error('Error uploading image:', err);
            setError(err.message || 'Failed to upload image. Make sure the "avatars" bucket is public.');
        } finally {
            setIsUploading(false);
            // Clear the file input
            if (fileInputRef.current) fileInputRef.current.value = '';
        }
    };

    return (
        <div className="min-h-screen relative bg-bone">

            {/* Navigation Bar (Simple for inner pages) */}
            <nav className="fixed w-full z-20 top-0 bg-bone/90 backdrop-blur-md border-b border-clay/20 px-6 py-4 flex items-center justify-between">
                <Link to="/dashboard" className="flex items-center gap-2 text-text-muted hover:text-text-dark transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    {copy('profile.back')}
                </Link>
                <div className="font-display text-lg text-text-dark">{copy('profile.nav_title')}</div>
                <div className="w-24"></div> {/* Spacer for centering */}
            </nav>


            {/* Content Container */}
            <div className="relative z-10 pt-32 pb-24 px-6 max-w-2xl mx-auto flex flex-col items-center">

                {/* Profile Image Section */}
                <div className="mb-10 flex flex-col items-center">
                    <div className="relative mb-4 group">
                        {/* Avatar Image */}
                        <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-md bg-clay/20 flex items-center justify-center">
                            {avatarUrl ? (
                                <img src={avatarUrl} alt="Profile" className="w-full h-full object-cover" />
                            ) : (
                                <span className="text-4xl text-sage/80 font-display">
                                    {displayName?.charAt(0).toUpperCase() || 'U'}
                                </span>
                            )}
                        </div>

                        {/* Upload Overlay */}
                        <label className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 text-white rounded-full opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity duration-200">
                            <svg className="w-8 h-8 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <span className="text-xs font-medium">
                                {isUploading ? 'Uploading...' : copy('profile.photo_change')}
                            </span>
                            <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={handleImageUpload}
                                ref={fileInputRef}
                                disabled={isUploading}
                            />
                        </label>
                    </div>

                    <p className="text-sm text-text-muted">{copy('profile.photo_help')}</p>
                </div>

                {/* Status Messages */}
                {message && (
                    <div className="w-full mb-6 p-4 bg-sage/10 text-sage border border-sage/20 rounded-xl text-sm px-6 text-center">
                        {message}
                    </div>
                )}
                {error && (
                    <div className="w-full mb-6 p-4 bg-red-500/10 text-red-600 border border-red-500/20 rounded-xl text-sm px-6 text-center">
                        {error}
                    </div>
                )}


                {/* Profile Details Form */}
                <form onSubmit={handleSaveProfile} className="w-full bg-white p-8 rounded-3xl shadow-sm border border-clay/10">
                    <h2 className="font-display text-2xl text-text-dark mb-6">{copy('profile.details_heading')}</h2>

                    <div className="mb-6">
                        <label htmlFor="displayName" className="block text-sm font-medium text-text-muted mb-2">
                            {copy('profile.name_label')}
                        </label>
                        <input
                            type="text"
                            id="displayName"
                            value={displayName}
                            onChange={(e) => setDisplayName(e.target.value)}
                            className="w-full px-4 py-3 bg-bone/30 border border-clay/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-sage/50 text-text-dark transition-all"
                            placeholder={copy('profile.name_placeholder')}
                            required
                        />
                        <p className="mt-2 text-xs text-text-muted">
                            {copy('profile.name_help')}
                        </p>
                    </div>

                    <div className="mb-8">
                        <label className="block text-sm font-medium text-text-muted mb-2">
                            {copy('profile.email_label')}
                        </label>
                        <input
                            type="email"
                            value={user?.email || ''}
                            disabled
                            className="w-full px-4 py-3 bg-clay/5 border border-clay/20 rounded-xl text-text-muted cursor-not-allowed"
                        />
                        <p className="mt-2 text-xs text-text-muted">
                            {copy('profile.email_help')}
                        </p>
                    </div>

                    <button
                        type="submit"
                        disabled={isSaving}
                        className={`w-full py-4 rounded-xl font-medium text-white transition-all duration-300 shadow-sm
                            ${isSaving ? 'bg-sage/70 cursor-not-allowed' : 'bg-sage hover:bg-sage/90 hover:shadow-md'}`}
                    >
                        {isSaving ? 'Saving Changes...' : copy('profile.save_button')}
                    </button>
                </form>

                {/* Membership & Billing */}
                <div className="w-full mt-6 bg-white p-8 rounded-3xl shadow-sm border border-clay/10">
                    <h2 className="font-display text-2xl text-text-dark mb-2">{copy('profile.billing_heading')}</h2>
                    <p className="whitespace-pre-line text-sm text-text-muted mb-6 leading-relaxed">
                        {copy('profile.billing_body')}
                    </p>
                    <Link
                        to="/dashboard/billing"
                        className="block text-center w-full py-4 rounded-xl font-medium transition-all duration-300 shadow-sm bg-charcoal text-bone hover:bg-charcoal/90"
                    >
                        {copy('profile.billing_button')}
                    </Link>
                </div>

            </div>
        </div>
    );
};

export default ProfilePage;
