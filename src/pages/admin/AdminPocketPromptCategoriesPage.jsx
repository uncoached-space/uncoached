import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';

const AdminPocketPromptCategoriesPage = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [currentCategory, setCurrentCategory] = useState(null);
    const [isSaving, setIsSaving] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        id: '',
        title: '',
        slug: '',
        sort_order: 0
    });

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('pocket_prompt_categories')
                .select('*')
                .order('sort_order', { ascending: true });

            if (error) throw error;
            setCategories(data || []);
        } catch (error) {
            console.error('Error fetching categories:', error);
            alert('Failed to load Pocket Prompt Categories.');
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (category) => {
        setFormData({
            id: category.id,
            title: category.title,
            slug: category.slug,
            sort_order: category.sort_order || 0
        });
        setCurrentCategory(category);
        setIsEditing(true);
    };

    const handleAddNew = () => {
        setFormData({
            id: '',
            title: '',
            slug: '',
            sort_order: categories.length + 1
        });
        setCurrentCategory(null);
        setIsEditing(true);
    };

    const handleCancel = () => {
        setIsEditing(false);
        setCurrentCategory(null);
    };

    const generateSlug = (title) => {
        return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    };

    const handleTitleChange = (e) => {
        const title = e.target.value;
        setFormData(prev => ({
            ...prev,
            title,
            slug: currentCategory ? prev.slug : generateSlug(title)
        }));
    };

    const handleSave = async (e) => {
        e.preventDefault();
        setIsSaving(true);

        try {
            const payload = {
                title: formData.title,
                slug: formData.slug || generateSlug(formData.title),
                sort_order: parseInt(formData.sort_order) || 0
            };

            if (currentCategory?.id) {
                payload.id = currentCategory.id;
            }

            const { error } = await supabase
                .from('pocket_prompt_categories')
                .upsert(payload, { onConflict: 'id' });

            if (error) throw error;

            await fetchCategories();
            setIsEditing(false);
        } catch (error) {
            console.error('Error saving category:', error);
            alert(`Failed to save Category: ${error.message}`);
        } finally {
            setIsSaving(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this category? All prompts inside it will be permanently deleted.')) {
            return;
        }

        try {
            const { error } = await supabase
                .from('pocket_prompt_categories')
                .delete()
                .eq('id', id);

            if (error) throw error;
            await fetchCategories();
        } catch (error) {
            console.error('Error deleting category:', error);
            alert('Failed to delete Category.');
        }
    };

    if (loading) {
        return <div className="p-8"><div className="w-8 h-8 border-4 border-clay border-t-transparent rounded-full animate-spin"></div></div>;
    }

    return (
        <div className="p-8 max-w-5xl mx-auto">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="font-display text-4xl text-text-dark mb-2">Pocket Prompt Categories</h1>
                    <p className="text-text-dark/70">Manage the thematic folders for Pocket Prompts.</p>
                </div>
                {!isEditing && (
                    <button
                        onClick={handleAddNew}
                        className="px-5 py-2.5 bg-clay text-white font-medium rounded-xl hover:bg-clay/90 transition-colors shadow-sm"
                    >
                        + New Category
                    </button>
                )}
            </div>

            {isEditing ? (
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-text-dark/10">
                    <h2 className="font-display text-2xl mb-6">{currentCategory ? 'Edit Category' : 'New Category'}</h2>
                    <form onSubmit={handleSave} className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-text-dark mb-1">Title</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.title}
                                    onChange={handleTitleChange}
                                    className="w-full px-4 py-2 border border-text-dark/20 rounded-xl focus:outline-none focus:border-clay focus:ring-1 focus:ring-clay"
                                    placeholder="e.g. Self-Reflection"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-text-dark mb-1">URL Slug</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.slug}
                                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                                    className="w-full px-4 py-2 border border-text-dark/20 rounded-xl focus:outline-none focus:border-clay"
                                    placeholder="self-reflection"
                                />
                                <p className="text-xs text-text-dark/50 mt-1">An internal name only. Members never see it, and changing it does not affect prompts or purchases.</p>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-text-dark mb-1">Sort Order</label>
                                <input
                                    type="number"
                                    value={formData.sort_order}
                                    onChange={(e) => setFormData({ ...formData, sort_order: e.target.value })}
                                    className="w-full px-4 py-2 border border-text-dark/20 rounded-xl focus:outline-none focus:border-clay"
                                />
                            </div>
                        </div>

                        <div className="flex gap-4 pt-4 border-t border-text-dark/10">
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
                                className="px-5 py-2.5 bg-clay text-white font-medium rounded-xl hover:bg-clay/90 transition-colors shadow-sm disabled:opacity-50"
                            >
                                {isSaving ? 'Saving...' : 'Save Category'}
                            </button>
                        </div>
                    </form>
                </div>
            ) : (
                <div className="grid gap-4">
                    {categories.length === 0 ? (
                        <div className="text-center py-12 bg-white rounded-2xl border border-text-dark/10 shadow-sm">
                            <p className="text-text-dark/50">No categories found. Create your first one!</p>
                        </div>
                    ) : (
                        categories.map((category) => (
                            <div key={category.id} className="bg-white p-5 rounded-2xl shadow-sm border border-text-dark/10 flex items-center justify-between gap-6">
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-3 mb-1">
                                        <h3 className="font-display text-xl text-text-dark truncate">{category.title}</h3>
                                        <span className="px-2 py-0.5 rounded text-xs font-medium bg-bone text-text-dark/60">
                                            {category.slug}
                                        </span>
                                    </div>
                                </div>
                                <div className="shrink-0 flex items-center gap-3">
                                    <span className="text-xs text-text-dark/40 mr-4">Order: {category.sort_order}</span>
                                    <button
                                        onClick={() => handleEdit(category)}
                                        className="text-text-dark/50 hover:text-sage transition-colors"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(category.id)}
                                        className="text-text-dark/40 hover:text-red-500 transition-colors"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    );
};

export default AdminPocketPromptCategoriesPage;
