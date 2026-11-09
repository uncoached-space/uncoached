// Portal search: finds words anywhere in the text a member can read on a
// resource, not just its title, and shows the wording around the match.
// No React or Supabase in here, so it can be checked on its own.

const STOP_WORDS = new Set([
    'a', 'am', 'an', 'and', 'are', 'at', 'be', 'for', 'how', 'i', "i'm", 'im', 'in', 'is', 'it',
    'me', 'my', 'of', 'on', 'or', 'so', 'the', 'to', 'what', 'when', 'why', 'with',
]);

const normalise = (s) => (s || '').toLowerCase().replace(/’/g, "'");
const toPattern = (word) => word.replace(/[.*+?^${}()|[\]\\/]/g, '\\$&').replace(/'/g, "['’]");

// Text matches from the start of a word, so "art" finds "artist" but not "heart".
const atWordStart = (pattern, flags) => new RegExp(`(^|[^\\p{L}\\p{N}])(${pattern})`, flags);

const parseQuery = (query) => {
    const words = normalise(query).split(/\s+/)
        .map((w) => w.replace(/^[^\p{L}\p{N}]+|[^\p{L}\p{N}]+$/gu, ''))
        .filter(Boolean);
    const meaningful = words.filter((w) => !STOP_WORDS.has(w));
    return { words, terms: meaningful.length ? meaningful : words };
};

/** One clean string per field, ready for an entry's `text`. Skips empty fields. */
export function searchableText(...values) {
    return values.flat()
        .filter(Boolean)
        .map((v) => String(v).replace(/\s+/g, ' ').trim())
        .filter(Boolean);
}

/** "Use this when" is saved as a list, but older rows hold it as JSON text. */
export function linesOfUseWhen(value) {
    if (typeof value !== 'string') return Array.isArray(value) ? value : [];
    try {
        const parsed = JSON.parse(value);
        return Array.isArray(parsed) ? parsed : [value];
    } catch {
        return [value];
    }
}

const SNIPPET_BEFORE = 45;
const SNIPPET_AFTER = 110;

// The wording around a match, split into parts so the matched words can be bold.
const buildSnippet = (field, matchAt, terms) => {
    let from = Math.max(0, matchAt - SNIPPET_BEFORE);
    let to = Math.min(field.length, matchAt + SNIPPET_AFTER);
    if (from > 0) from = field.indexOf(' ', from) + 1 || from;
    if (to < field.length) to = field.lastIndexOf(' ', to) > matchAt ? field.lastIndexOf(' ', to) : to;
    const excerpt = `${from > 0 ? '…' : ''}${field.slice(from, to)}${to < field.length ? '…' : ''}`;

    const longestFirst = [...terms].sort((a, b) => b.length - a.length).map(toPattern).join('|');
    const parts = [];
    let cursor = 0;
    for (const m of excerpt.matchAll(atWordStart(longestFirst, 'giu'))) {
        const start = m.index + m[1].length;
        if (start > cursor) parts.push({ text: excerpt.slice(cursor, start), hit: false });
        parts.push({ text: m[2], hit: true });
        cursor = start + m[2].length;
    }
    if (cursor < excerpt.length) parts.push({ text: excerpt.slice(cursor), hit: false });
    return parts;
};

const findSnippet = (text, phrase, termMatchers, terms) => {
    const withPhrase = text.find((f) => phrase.test(f));
    if (withPhrase) {
        const m = phrase.exec(withPhrase);
        return buildSnippet(withPhrase, m.index + m[1].length, terms);
    }
    // No exact wording: use the field that holds the most of the words.
    const hits = (f) => termMatchers.filter((re) => re.test(f)).length;
    const field = text.reduce((best, f) => (hits(f) > hits(best) ? f : best), text[0]);
    const matcher = termMatchers.find((re) => re.test(field));
    if (!matcher) return null;
    const m = matcher.exec(field);
    return buildSnippet(field, m.index + m[1].length, terms);
};

/**
 * Best matches first: everything that holds all the words, or, when nothing
 * does, whatever holds the most of them. Each result keeps its entry's fields
 * and gets `snippet` when the match is in the body text rather than the title.
 */
export function searchPortal(entries, query, limit = 20) {
    const { words, terms } = parseQuery(query);
    if (!terms.length) return [];

    const phrase = atWordStart(words.map(toPattern).join('\\s+'), 'iu');
    const termMatchers = terms.map((t) => atWordStart(toPattern(t), 'iu'));
    const wholeQuery = words.join(' ');

    const scored = entries.map((entry, order) => {
        const title = normalise(`${entry.label} ${entry.keywords || ''}`);
        const text = entry.text || [];
        const titleHits = terms.filter((t) => title.includes(t)).length;
        const matched = terms.filter((t, i) => title.includes(t) || text.some((f) => termMatchers[i].test(f))).length;
        return {
            entry,
            order,
            matched,
            titleHits,
            titlePhrase: normalise(entry.label).includes(wholeQuery) ? 1 : 0,
            textPhrase: text.some((f) => phrase.test(f)) ? 1 : 0,
        };
    });

    const best = Math.max(...scored.map((s) => s.matched), 0);
    if (best === 0) return [];
    const minimum = best === terms.length ? best : 1;

    return scored
        .filter((s) => s.matched >= minimum)
        .sort((a, b) => b.matched - a.matched
            || b.titlePhrase - a.titlePhrase
            || b.titleHits - a.titleHits
            || b.textPhrase - a.textPhrase
            || a.order - b.order)
        .slice(0, limit)
        .map(({ entry, titleHits }) => ({
            ...entry,
            snippet: titleHits < terms.length && entry.text?.length
                ? findSnippet(entry.text, phrase, termMatchers, terms)
                : null,
        }));
}
