import { useEffect } from 'react';

// Per-page title, description and canonical URL. Rather than render <title>/<meta>
// (React 19 would append a second description alongside the default in index.html),
// this updates the existing head tags in place, so there is exactly one of each.
// This drives the browser tab and what Google — which runs JavaScript — sees.
// Link scrapers that don't run JS fall back to the defaults baked into index.html.
const DEFAULT_TITLE = 'Uncoached | In-the-Moment Support';
const DEFAULT_DESC = "Work through real-life situations with AI-assisted reflection, human-guided audio, and practical tools to understand what you're experiencing and figure out what might help next.";

const setMeta = (selector, attr, value) => {
    let el = document.head.querySelector(selector);
    if (!el) {
        el = document.createElement(selector.startsWith('link') ? 'link' : 'meta');
        if (selector.startsWith('link')) el.setAttribute('rel', 'canonical');
        else el.setAttribute(selector.includes('property') ? 'property' : 'name',
            selector.replace(/.*=["']([^"']+)["'].*/, '$1'));
        document.head.appendChild(el);
    }
    el.setAttribute(attr, value);
};

const Seo = ({ title, description, path }) => {
    useEffect(() => {
        const fullTitle = title ? `${title} | Uncoached` : DEFAULT_TITLE;
        const desc = description || DEFAULT_DESC;
        const url = `https://uncoached.space${path || ''}`;

        document.title = fullTitle;
        setMeta('meta[name="description"]', 'content', desc);
        setMeta('meta[property="og:title"]', 'content', fullTitle);
        setMeta('meta[property="og:description"]', 'content', desc);
        setMeta('meta[property="og:url"]', 'content', url);
        setMeta('link[rel="canonical"]', 'href', url);

        // Leave the head in its default state when navigating away, so the next
        // page (or a page with no Seo) doesn't inherit this one's wording.
        return () => {
            document.title = DEFAULT_TITLE;
            setMeta('meta[name="description"]', 'content', DEFAULT_DESC);
        };
    }, [title, description, path]);

    return null;
};

export default Seo;
