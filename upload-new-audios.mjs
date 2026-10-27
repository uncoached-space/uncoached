// Re-upload the 4 fixed audio files (from Johanna's Drive) to Supabase storage
// and point the database rows at them.
//
// HOW TO RUN (from the repo root):
//   1. Get your Supabase service-role key: Supabase dashboard -> Project Settings
//      -> API -> "service_role" secret (or copy it from Render's env vars).
//   2. Run:
//        SUPABASE_URL="https://vgzepwglrtaqzsfqfqdo.supabase.co" \
//        SUPABASE_SERVICE_ROLE_KEY="paste-key-here" \
//        node upload-new-audios.mjs
//   (On Windows PowerShell:
//        $env:SUPABASE_URL="https://vgzepwglrtaqzsfqfqdo.supabase.co";
//        $env:SUPABASE_SERVICE_ROLE_KEY="paste-key-here";
//        node upload-new-audios.mjs )

import { createClient } from '@supabase/supabase-js';
import https from 'node:https';

const SUPABASE_URL = process.env.SUPABASE_URL || 'https://vgzepwglrtaqzsfqfqdo.supabase.co';
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SERVICE_KEY) {
    console.error('❌ Set SUPABASE_SERVICE_ROLE_KEY (see instructions at top of this file).');
    process.exit(1);
}

const sb = createClient(SUPABASE_URL, SERVICE_KEY);
const ts = Date.now();

const items = [
    { name: 'The Centering Drop', drive: '1TaT2ecrTtpJfjlGFZW97ftYT-Bz-iogM', bucket: 'guided-shifts', path: `00000000-0000-0000-0000-000000000001/the-centering-drop-${ts}.wav`, table: 'guided_shifts', id: 'the-centering-drop' },
    { name: 'Vagus Nerve Switch', drive: '1ucDgyAAMjKSyCNMGGta1IZqvPOEMLa9X', bucket: 'guided-shifts', path: `00000000-0000-0000-0000-000000000002/vagus-nerve-switch-${ts}.wav`, table: 'guided_shifts', id: 'vagus-nerve-switch' },
    { name: 'Hands-as-Home', drive: '1CM6ZCTWHelzxH7jFoh9keanTNPTc1kB-', bucket: 'guided-shifts', path: `00000000-0000-0000-0000-000000000003/hands-as-home-${ts}.wav`, table: 'guided_shifts', id: 'hands-as-home' },
    { name: 'Anxiety Downshift', drive: '1zzmbWPC_GGvQHmFk-Z_56BvuuatvOKaP', bucket: 'audio-breaths', path: `calm-me-down/anxiety-downshift-${ts}.wav`, table: 'audio_breaths', id: 'anxiety-downshift' },
];

function download(fileId) {
    const url = `https://drive.google.com/uc?export=download&id=${fileId}`;
    return new Promise((resolve, reject) => {
        const get = (u) => https.get(u, (res) => {
            if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
                res.resume();
                return get(res.headers.location);
            }
            if (res.statusCode !== 200) return reject(new Error(`HTTP ${res.statusCode}`));
            const chunks = [];
            res.on('data', (c) => chunks.push(c));
            res.on('end', () => resolve(Buffer.concat(chunks)));
            res.on('error', reject);
        }).on('error', reject);
        get(url);
    });
}

for (const it of items) {
    try {
        process.stdout.write(`↓ ${it.name}: downloading… `);
        const buf = await download(it.drive);
        process.stdout.write(`${(buf.length / 1e6).toFixed(1)} MB → uploading… `);

        const { error: upErr } = await sb.storage
            .from(it.bucket)
            .upload(it.path, buf, { contentType: 'audio/wav', upsert: true });
        if (upErr) throw new Error(`upload: ${upErr.message}`);

        const { data: { publicUrl } } = sb.storage.from(it.bucket).getPublicUrl(it.path);

        const { error: dbErr } = await sb.from(it.table).update({ audio_url: publicUrl }).eq('id', it.id);
        if (dbErr) throw new Error(`db: ${dbErr.message}`);

        console.log('✓');
    } catch (err) {
        console.log(`✗ ${err.message}`);
    }
}

console.log('\nDone. Reload the Guided Shifts / Audio Breaths pages to verify playback.');
