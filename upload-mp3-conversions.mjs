// Swaps the six WAV Audio Breaths over to the MP3 versions.
//
// The WAVs were 32–46MB each (245MB in total) and members were downloading all
// of that on their phones. Converted to MP3 at 192kbps stereo 48kHz — exactly
// the settings the other tracks on the site already use — they are 4–6MB, and
// every one was checked to decode cleanly and match the original's length.
//
// This uploads the MP3s alongside the WAVs and repoints each row at the new
// file. THE WAVS ARE LEFT IN PLACE, so if anything sounds wrong the old URL can
// simply be put back. Nothing is deleted.
//
// Run it from the project folder, with the service role key in your own shell:
//
//   $env:SUPABASE_SERVICE_ROLE_KEY = "the-key-from-Render"
//   node upload-mp3-conversions.mjs --check      # look, change nothing
//   node upload-mp3-conversions.mjs              # do it
//
// Safe to run twice: a file that is already uploaded and pointed at is skipped.

import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { createClient } from '@supabase/supabase-js';

const MP3_DIR = 'C:\\Users\\boyev\\Downloads\\uncoached-mp3';
const BUCKET = 'audio-breaths';
const DRY_RUN = process.argv.includes('--check');

const env = readFileSync('.env.local', 'utf8');
const fromEnv = (k) => (env.match(new RegExp(`^${k}=(.*)$`, 'm')) || [])[1]?.trim();

const url = process.env.VITE_SUPABASE_URL || fromEnv('VITE_SUPABASE_URL');
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!serviceKey) {
    console.error('\nSet the service role key first (it is in Render, under the API service):\n');
    console.error('  $env:SUPABASE_SERVICE_ROLE_KEY = "..."\n');
    process.exit(1);
}
if (!existsSync(MP3_DIR)) {
    console.error(`Can't find the MP3s at ${MP3_DIR}`);
    process.exit(1);
}

const db = createClient(url, serviceKey, { auth: { persistSession: false } });

const { data: rows, error } = await db
    .from('audio_breaths')
    .select('id,title,family_id,audio_url');
if (error) throw error;

const wavRows = rows.filter((r) => /\.wav$/i.test(r.audio_url || ''));
const mp3Files = readdirSync(MP3_DIR).filter((f) => f.endsWith('.mp3'));

console.log(`\n${wavRows.length} tracks still on WAV, ${mp3Files.length} MP3s ready.`);
if (DRY_RUN) console.log('--check: nothing will be changed.\n');

let done = 0;
for (const row of wavRows) {
    const wavName = row.audio_url.split('/').pop();
    const mp3Name = wavName.replace(/\.wav$/i, '.mp3');

    if (!mp3Files.includes(mp3Name)) {
        console.log(`  SKIP  ${row.title} — no MP3 named ${mp3Name}`);
        continue;
    }

    const body = readFileSync(`${MP3_DIR}\\${mp3Name}`);
    const path = `${row.family_id}/${mp3Name}`;
    const sizeMB = (body.length / 1048576).toFixed(1);

    if (DRY_RUN) {
        console.log(`  would upload ${path} (${sizeMB}MB) and repoint "${row.title}"`);
        continue;
    }

    const { error: upErr } = await db.storage
        .from(BUCKET)
        .upload(path, body, { contentType: 'audio/mpeg', upsert: true });
    if (upErr) {
        console.log(`  FAILED upload ${path}: ${upErr.message}`);
        continue;
    }

    const publicUrl = db.storage.from(BUCKET).getPublicUrl(path).data.publicUrl;

    // Confirm the file really is there and the right size before repointing the
    // row — never leave a track pointing at something that isn't playable.
    const head = await fetch(publicUrl, { method: 'HEAD' });
    const served = Number(head.headers.get('content-length') || 0);
    if (!head.ok || served !== body.length) {
        console.log(`  FAILED check ${path}: served ${served} of ${body.length} bytes`);
        continue;
    }

    const { error: dbErr } = await db
        .from('audio_breaths')
        .update({ audio_url: publicUrl })
        .eq('id', row.id);
    if (dbErr) {
        console.log(`  FAILED update ${row.title}: ${dbErr.message}`);
        continue;
    }

    console.log(`  OK    ${row.title.padEnd(22)} now ${sizeMB}MB  (WAV kept as a backup)`);
    done += 1;
}

if (!DRY_RUN) {
    console.log(`\n${done} of ${wavRows.length} switched over.`);
    console.log('Play one in the members area to check, then the old WAVs can be deleted');
    console.log('from Supabase > Storage > audio-breaths whenever you are happy.\n');
}
