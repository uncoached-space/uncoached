import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';

// Manage the Afformations shown in the member portal: each card has a title,
// some tags (the filter chips), and a list of questions. This is the admin the
// member page actually reads from.
const AdminAfformationsPage = () => {
    const [cards, setCards] = useState([]);
    const [loading, setLoading] = useState(true);
    const [savingId, setSavingId] = useState(null);
    const [message, setMessage] = useState('');

    useEffect(() => {
        let active = true;
        (async () => {
            const { data, error } = await supabase
                .from('afformation_cards')
                .select('id, title, tags, sort_order, is_active, afformation_questions(id, text, sort_order)')
                .order('sort_order', { ascending: true });
            if (!active) return;
            if (error) {
                setMessage(`Could not load: ${error.message}`);
            } else {
                setCards((data || []).map(c => ({
                    ...c,
                    tagsText: (c.tags || []).join(', '),
                    questions: (c.afformation_questions || []).slice().sort((a, b) => a.sort_order - b.sort_order),
                })));
            }
            setLoading(false);
        })();
        return () => { active = false; };
    }, []);

    const flash = (text) => { setMessage(text); setTimeout(() => setMessage(''), 3000); };

    const update = (cardId, patch) =>
        setCards(cs => cs.map(c => (c.id === cardId ? { ...c, ...patch } : c)));

    const updateQuestion = (cardId, qId, patch) =>
        setCards(cs => cs.map(c => c.id === cardId
            ? { ...c, questions: c.questions.map(q => (q.id === qId ? { ...q, ...patch } : q)) }
            : c));

    const addCard = async () => {
        const nextOrder = (cards[cards.length - 1]?.sort_order || 0) + 1;
        const { data, error } = await supabase
            .from('afformation_cards')
            .insert({ title: 'New moment', tags: [], sort_order: nextOrder, is_active: true })
            .select('id, title, tags, sort_order, is_active')
            .single();
        if (error) return flash(`Could not add: ${error.message}`);
        setCards(cs => [...cs, { ...data, tagsText: '', questions: [] }]);
    };

    const saveCard = async (card) => {
        setSavingId(card.id);
        const tags = card.tagsText.split(',').map(t => t.trim()).filter(Boolean);
        const { error } = await supabase
            .from('afformation_cards')
            .update({ title: card.title, tags, sort_order: Number(card.sort_order) || 0, is_active: card.is_active })
            .eq('id', card.id);
        setSavingId(null);
        if (error) return flash(`Save failed: ${error.message}`);
        update(card.id, { tags });
        flash('Saved.');
    };

    const deleteCard = async (card) => {
        if (!window.confirm(`Delete "${card.title}" and its questions?`)) return;
        const { error } = await supabase.from('afformation_cards').delete().eq('id', card.id);
        if (error) return flash(`Delete failed: ${error.message}`);
        setCards(cs => cs.filter(c => c.id !== card.id));
    };

    const addQuestion = async (card) => {
        const nextOrder = (card.questions[card.questions.length - 1]?.sort_order || 0) + 1;
        const { data, error } = await supabase
            .from('afformation_questions')
            .insert({ card_id: card.id, text: '', sort_order: nextOrder })
            .select('id, text, sort_order')
            .single();
        if (error) return flash(`Could not add question: ${error.message}`);
        update(card.id, { questions: [...card.questions, data] });
    };

    const saveQuestion = async (cardId, q) => {
        const { error } = await supabase
            .from('afformation_questions')
            .update({ text: q.text, sort_order: Number(q.sort_order) || 0 })
            .eq('id', q.id);
        if (error) return flash(`Question save failed: ${error.message}`);
        flash('Question saved.');
    };

    const deleteQuestion = async (cardId, qId) => {
        const { error } = await supabase.from('afformation_questions').delete().eq('id', qId);
        if (error) return flash(`Delete failed: ${error.message}`);
        update(cardId, { questions: cards.find(c => c.id === cardId).questions.filter(q => q.id !== qId) });
    };

    return (
        <div className="max-w-4xl">
            <div className="flex items-center justify-between mb-2">
                <h1 className="font-display text-4xl text-text-dark">Better Questions</h1>
                <button onClick={addCard} className="px-5 py-2.5 bg-clay text-white font-medium rounded-xl hover:bg-clay/90 transition-colors shadow-sm">
                    + Add card
                </button>
            </div>
            <p className="text-text-dark/70 mb-6">
                Each card is a moment (its title), with tags for the filter chips and a list of questions.
                These are exactly what members see on the Better Questions page.
            </p>

            {message && <div className="mb-4 p-3 rounded-xl bg-sage/10 text-sage text-sm">{message}</div>}
            {loading && <p className="text-text-dark/60">Loading…</p>}

            <div className="space-y-6">
                {cards.map(card => (
                    <div key={card.id} className="bg-white p-6 rounded-2xl shadow-sm border border-text-dark/10">
                        <div className="grid md:grid-cols-[1fr,auto] gap-4 items-start mb-4">
                            <div className="space-y-3">
                                <div>
                                    <label className="block text-xs font-medium text-text-dark/70 mb-1">Title</label>
                                    <input
                                        value={card.title}
                                        onChange={e => update(card.id, { title: e.target.value })}
                                        className="w-full px-4 py-2 border border-text-dark/20 rounded-xl focus:ring-1 focus:ring-clay"
                                        placeholder="When You're Waiting for an Answer"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-text-dark/70 mb-1">Tags (comma separated)</label>
                                    <input
                                        value={card.tagsText}
                                        onChange={e => update(card.id, { tagsText: e.target.value })}
                                        className="w-full px-4 py-2 border border-text-dark/20 rounded-xl focus:ring-1 focus:ring-clay"
                                        placeholder="Trust, Calm"
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col gap-2 md:w-40">
                                <div>
                                    <label className="block text-xs font-medium text-text-dark/70 mb-1">Order</label>
                                    <input
                                        type="number"
                                        value={card.sort_order}
                                        onChange={e => update(card.id, { sort_order: e.target.value })}
                                        className="w-full px-4 py-2 border border-text-dark/20 rounded-xl focus:ring-1 focus:ring-clay"
                                    />
                                </div>
                                <label className="flex items-center gap-2 text-sm text-text-dark/80 mt-1">
                                    <input type="checkbox" checked={card.is_active} onChange={e => update(card.id, { is_active: e.target.checked })} />
                                    Visible
                                </label>
                            </div>
                        </div>

                        <div className="border-t border-text-dark/10 pt-4">
                            <p className="text-xs font-medium text-text-dark/70 mb-2">Questions</p>
                            <div className="space-y-2">
                                {card.questions.map(q => (
                                    <div key={q.id} className="flex items-center gap-2">
                                        <input
                                            value={q.text}
                                            onChange={e => updateQuestion(card.id, q.id, { text: e.target.value })}
                                            onBlur={() => saveQuestion(card.id, q)}
                                            className="flex-1 px-4 py-2 border border-text-dark/20 rounded-xl focus:ring-1 focus:ring-clay text-sm"
                                            placeholder="Why do things tend to work out in my favour?"
                                        />
                                        <button onClick={() => deleteQuestion(card.id, q.id)} className="text-text-dark/40 hover:text-red-500 px-2" title="Delete question">✕</button>
                                    </div>
                                ))}
                            </div>
                            <button onClick={() => addQuestion(card)} className="mt-3 text-sm text-sage hover:underline">+ Add question</button>
                        </div>

                        <div className="flex items-center gap-3 mt-5 pt-4 border-t border-text-dark/10">
                            <button
                                onClick={() => saveCard(card)}
                                disabled={savingId === card.id}
                                className="px-5 py-2 bg-sage text-white text-sm font-medium rounded-xl hover:bg-sage/90 disabled:opacity-50"
                            >
                                {savingId === card.id ? 'Saving…' : 'Save card'}
                            </button>
                            <button onClick={() => deleteCard(card)} className="px-4 py-2 text-sm text-red-500 hover:bg-red-50 rounded-xl">
                                Delete card
                            </button>
                            <span className="text-xs text-text-dark/40 ml-auto">Question edits save when you click away.</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminAfformationsPage;
