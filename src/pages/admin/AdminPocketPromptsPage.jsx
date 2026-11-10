import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';

const AdminPocketPromptsPage = () => {
    const [prompts, setPrompts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [currentPrompt, setCurrentPrompt] = useState(null);
    const [isSaving, setIsSaving] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        category_id: '',
        title: '',
        when_to_use: '',
        purpose: '',
        example_scenario: '',
        acknowledgement: '',
        what_free_offers: '',
        what_premium_offers: '',
        content_free: '',
        content_premium: '',
        is_active: true,
        sort_order: 0
    });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            setLoading(true);

            // Fetch categories for the dropdown
            const { data: categoriesData, error: categoriesError } = await supabase
                .from('pocket_prompt_categories')
                .select('id, title')
                .order('sort_order', { ascending: true });

            if (categoriesError) throw categoriesError;
            setCategories(categoriesData || []);

            // Fetch prompts with joined category data
            const { data: promptsData, error: promptsError } = await supabase
                .from('pocket_prompts')
                .select(`
                    *,
                    pocket_prompt_categories (
                        title
                    )
                `)
                .order('category_id', { ascending: true })
                .order('sort_order', { ascending: true });

            if (promptsError) throw promptsError;
            setPrompts(promptsData || []);
        } catch (error) {
            console.error('Error fetching data:', error);
            alert('Failed to load Pocket Prompts. Are the tables created?');
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (prompt) => {
        setFormData({
            category_id: prompt.category_id,
            title: prompt.title,
            when_to_use: prompt.when_to_use || '',
            purpose: prompt.purpose || '',
            example_scenario: prompt.example_scenario || '',
            acknowledgement: prompt.acknowledgement || '',
            what_free_offers: prompt.what_free_offers || '',
            what_premium_offers: prompt.what_premium_offers || '',
            content_free: prompt.content_free || '',
            content_premium: prompt.content_premium || '',
            is_active: prompt.is_active !== false,
            sort_order: prompt.sort_order || 0
        });
        setCurrentPrompt(prompt);
        setIsEditing(true);
    };

    const handleAddNew = () => {
        setFormData({
            category_id: categories.length > 0 ? categories[0].id : '',
            title: '',
            when_to_use: '',
            purpose: '',
            example_scenario: '',
            acknowledgement: '',
            what_free_offers: '',
            what_premium_offers: '',
            content_free: '',
            content_premium: '',
            is_active: true,
            sort_order: prompts.length + 1
        });
        setCurrentPrompt(null);
        setIsEditing(true);
    };

    const handleCancel = () => {
        setIsEditing(false);
        setCurrentPrompt(null);
    };

    const handleSave = async (e) => {
        e.preventDefault();
        setIsSaving(true);

        try {
            if (!formData.category_id) {
                alert('Please select a Category');
                setIsSaving(false);
                return;
            }

            const payload = {
                category_id: formData.category_id,
                title: formData.title,
                when_to_use: formData.when_to_use,
                purpose: formData.purpose,
                example_scenario: formData.example_scenario,
                acknowledgement: formData.acknowledgement,
                what_free_offers: formData.what_free_offers,
                what_premium_offers: formData.what_premium_offers,
                content_free: formData.content_free,
                content_premium: formData.content_premium,
                is_active: formData.is_active,
                sort_order: parseInt(formData.sort_order) || 0
            };

            if (currentPrompt?.id) {
                payload.id = currentPrompt.id;
            }

            const { error } = await supabase
                .from('pocket_prompts')
                .upsert(payload, { onConflict: 'id' });

            if (error) throw error;

            await fetchData();
            setIsEditing(false);
        } catch (error) {
            console.error('Error saving prompt:', error);
            alert(`Failed to save Prompt: ${error.message}`);
        } finally {
            setIsSaving(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this Pocket Prompt?')) {
            return;
        }

        try {
            const { error } = await supabase
                .from('pocket_prompts')
                .delete()
                .eq('id', id);

            if (error) throw error;
            await fetchData();
        } catch (error) {
            console.error('Error deleting prompt:', error);
            alert('Failed to delete Prompt');
        }
    };

    if (loading) {
        return <div className="p-8"><div className="w-8 h-8 border-4 border-clay border-t-transparent rounded-full animate-spin"></div></div>;
    }

    return (
        <div className="p-8 max-w-5xl mx-auto pb-24">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="font-display text-4xl text-text-dark mb-2">Pocket Prompts</h1>
                    <p className="text-text-dark/70">Manage the individual questions and prompts inside each category.</p>
                </div>
                {!isEditing && (
                    <button
                        onClick={handleAddNew}
                        className="px-5 py-2.5 bg-clay text-white font-medium rounded-xl hover:bg-clay/90 transition-colors shadow-sm"
                    >
                        + New Prompt
                    </button>
                )}
            </div>

            {isEditing ? (
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-text-dark/10">
                    <h2 className="font-display text-2xl mb-8 border-b border-text-dark/10 pb-4">
                        {currentPrompt ? 'Edit Prompt' : 'New Prompt'}
                    </h2>

                    <form onSubmit={handleSave} className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-text-dark mb-1">Title</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    className="w-full px-4 py-2 border border-text-dark/20 rounded-xl focus:ring-1 focus:ring-clay"
                                    placeholder="e.g. The Real Question"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-text-dark mb-1">Category *</label>
                                <select
                                    required
                                    value={formData.category_id}
                                    onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}
                                    className="w-full px-4 py-2 border border-text-dark/20 rounded-xl focus:ring-1 focus:ring-clay bg-white"
                                >
                                    <option value="" disabled>Select a Category...</option>
                                    {categories.map(c => (
                                        <option key={c.id} value={c.id}>{c.title}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-text-dark mb-1">Use This When</label>
                            <textarea
                                rows="3"
                                value={formData.when_to_use}
                                onChange={(e) => setFormData({ ...formData, when_to_use: e.target.value })}
                                className="w-full px-4 py-2 border border-text-dark/20 rounded-xl focus:ring-1 focus:ring-clay resize-y text-sm mb-4"
                                placeholder="Bullet points of when to use this prompt..."
                            ></textarea>

                            <label className="block text-sm font-medium text-text-dark mb-1">Purpose</label>
                            <textarea
                                rows="3"
                                value={formData.purpose}
                                onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
                                className="w-full px-4 py-2 border border-text-dark/20 rounded-xl focus:ring-1 focus:ring-clay resize-y text-sm mb-4"
                                placeholder="To help you recognise where your boundaries blur..."
                            ></textarea>

                            <label className="block text-sm font-medium text-text-dark mb-1">Example Scenario</label>
                            <textarea
                                rows="2"
                                value={formData.example_scenario}
                                onChange={(e) => setFormData({ ...formData, example_scenario: e.target.value })}
                                className="w-full px-4 py-2 border border-text-dark/20 rounded-xl focus:ring-1 focus:ring-clay resize-y text-sm mb-4"
                                placeholder="“My friend often drops by unannounced...”"
                            ></textarea>

                            <label className="block text-sm font-medium text-text-dark mb-1">Acknowledgement</label>
                            <textarea
                                rows="4"
                                value={formData.acknowledgement}
                                onChange={(e) => setFormData({ ...formData, acknowledgement: e.target.value })}
                                className="w-full px-4 py-2 border border-text-dark/20 rounded-xl focus:ring-1 focus:ring-clay resize-y text-sm mb-1"
                                placeholder="*Paid prompt informed by: ...*"
                            ></textarea>
                            <p className="text-xs text-text-dark/50 mb-4">
                                Optional. Leave it empty to hide the section. Press Enter twice to start a new paragraph. Put *stars* around a sentence to show it in italics.
                            </p>

                            <div className="grid md:grid-cols-2 gap-6 mb-4">
                                <div>
                                    <label className="block text-sm font-medium text-text-dark mb-1">What Free Version Offers</label>
                                    <textarea
                                        rows="3"
                                        value={formData.what_free_offers}
                                        onChange={(e) => setFormData({ ...formData, what_free_offers: e.target.value })}
                                        className="w-full px-4 py-2 border border-text-dark/20 rounded-xl focus:ring-1 focus:ring-clay resize-y text-sm"
                                        placeholder="Gain quick clarity on..."
                                    ></textarea>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-text-dark mb-1">What Premium Version Offers</label>
                                    <textarea
                                        rows="3"
                                        value={formData.what_premium_offers}
                                        onChange={(e) => setFormData({ ...formData, what_premium_offers: e.target.value })}
                                        className="w-full px-4 py-2 border border-text-dark/20 rounded-xl focus:ring-1 focus:ring-clay resize-y text-sm"
                                        placeholder="Create personalized scripts..."
                                    ></textarea>
                                </div>
                            </div>

                            <hr className="my-6 border-clay/20" />

                            <label className="block text-sm font-medium text-text-dark mb-1">Free Content (Visible to everyone)</label>
                            <textarea
                                rows="3"
                                required
                                value={formData.content_free}
                                onChange={(e) => setFormData({ ...formData, content_free: e.target.value })}
                                className="w-full px-4 py-2 border border-text-dark/20 rounded-xl focus:ring-1 focus:ring-clay resize-y text-sm leading-relaxed mb-4"
                                placeholder="What am I really asking myself right now?"
                            ></textarea>

                            <label className="block text-sm font-medium text-text-dark mb-1">Premium Content (Visible to subscribers only)</label>
                            <textarea
                                rows="5"
                                value={formData.content_premium}
                                onChange={(e) => setFormData({ ...formData, content_premium: e.target.value })}
                                className="w-full px-4 py-2 border border-text-dark/20 rounded-xl focus:ring-1 focus:ring-clay resize-y text-sm leading-relaxed"
                                placeholder="Paste the higher-level prompt from the PDF here..."
                            ></textarea>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="flex items-center gap-2 p-4 bg-bone/50 rounded-xl border border-text-dark/5 w-full">
                                <input
                                    type="checkbox"
                                    id="is_active"
                                    checked={formData.is_active}
                                    onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                                    className="w-5 h-5 rounded border-text-dark/20 text-sage focus:ring-clay"
                                />
                                <label htmlFor="is_active" className="text-sm font-medium text-text-dark cursor-pointer">
                                    Active (Visible in Portal)
                                </label>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-text-dark mb-1">Sort Order</label>
                                <input
                                    type="number"
                                    value={formData.sort_order}
                                    onChange={(e) => setFormData({ ...formData, sort_order: e.target.value })}
                                    className="w-full px-4 py-2 border border-text-dark/20 rounded-xl focus:ring-1 focus:ring-clay"
                                />
                            </div>
                        </div>

                        <div className="flex items-center gap-4 pt-6 border-t border-text-dark/10">
                            <button
                                type="button"
                                onClick={handleCancel}
                                className="px-5 py-2.5 text-text-dark hover:bg-bone rounded-xl transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={isSaving}
                                className="px-6 py-2.5 bg-clay text-white font-medium rounded-xl hover:bg-clay/90 transition-colors shadow-sm disabled:opacity-50 flex items-center gap-2"
                            >
                                {isSaving ? 'Saving...' : 'Save Prompt'}
                            </button>
                        </div>
                    </form>
                </div>
            ) : (
                <div className="grid gap-4">
                    {prompts.length === 0 ? (
                        <div className="text-center py-12 bg-white rounded-2xl border border-text-dark/10 shadow-sm">
                            <p className="text-text-dark/50">No prompts found. Add your first one!</p>
                        </div>
                    ) : (
                        prompts.map((prompt) => (
                            <div key={prompt.id} className={`bg-white p-5 rounded-2xl shadow-sm border border-text-dark/10 flex flex-col md:flex-row md:items-center justify-between gap-6 group ${!prompt.is_active ? 'opacity-60' : ''}`}>
                                <div className="flex-1 min-w-0">
                                    <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 mb-2">
                                        <h3 className="font-display text-xl text-text-dark shrink-0">{prompt.title}</h3>
                                        {!prompt.is_active && (
                                            <span className="text-[10px] font-bold uppercase tracking-wider bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full w-fit">
                                                Hidden
                                            </span>
                                        )}
                                        <span className="text-xs bg-bone px-2 py-1 rounded text-text-dark/60 font-medium w-fit">
                                            {prompt.pocket_prompt_categories?.title || prompt.category_id}
                                        </span>
                                    </div>
                                    <p className="text-sm text-text-dark/70 font-medium italic">
                                        "{prompt.content_free}"
                                    </p>
                                    {prompt.content_premium && (
                                        <div className="mt-2 text-xs text-sage bg-clay/10 px-2 py-1 rounded inline-block">
                                            + Premium Content Attached
                                        </div>
                                    )}
                                </div>
                                <div className="shrink-0 flex items-center justify-between md:justify-end gap-3 mt-4 md:mt-0 pt-4 md:pt-0 border-t md:border-t-0 border-text-dark/10">
                                    <span className="text-xs text-text-dark/40 mr-4">Order: {prompt.sort_order}</span>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => handleEdit(prompt)}
                                            className="text-sm font-medium px-4 py-2 rounded-xl text-text-dark hover:bg-bone transition-colors"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(prompt.id)}
                                            className="text-sm font-medium px-4 py-2 rounded-xl text-red-500 hover:bg-red-50 transition-colors"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    );
};

export default AdminPocketPromptsPage;
