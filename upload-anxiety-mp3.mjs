// Fixes the one audio that was too big: downloads Anxiety Downshift from Drive,
// converts it to a smaller MP3, uploads it, and updates the database row.
//
// RUN (from repo root, in PowerShell):
//   $env:SUPABASE_SERVICE_ROLE_KEY="paste-key-here"; node upload-anxiety-mp3.mjs

import { createClient } from '@supabase/supabase-js';
import ffmpegPath from 'ffmpeg-static';
import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import https from 'node:https';

const SUPABASE_URL = process.env.SUPABASE_URL || 'https://vgzepwglrtaqzsfqfqdo.supabase.co';
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!SERVICE_KEY) {
    console.error('❌ Set SUPABASE_SERVICE_ROLE_KEY first.');
    process.exit(1);
}
const sb = createClient(SUPABASE_URL, SERVICE_KEY);
const DRIVE_ID = '1zzmbWPC_GGvQHmFk-Z_56BvuuatvOKaP';

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

try {
    process.stdout.write('↓ Anxiety Downshift: downloading… ');
    const wavBuf = await download(DRIVE_ID);
    const wavPath = path.join(os.tmpdir(), `anxiety-${Date.now()}.wav`);
    const mp3Path = path.join(os.tmpdir(), `anxiety-${Date.now()}.mp3`);
    fs.writeFileSync(wavPath, wavBuf);
    process.stdout.write(`${(wavBuf.length / 1e6).toFixed(1)} MB → converting to mp3… `);

    const r = spawnSync(ffmpegPath, ['-y', '-i', wavPath, '-codec:a', 'libmp3lame', '-b:a', '192k', mp3Path], { stdio: 'ignore' });
    if (r.status !== 0) throw new Error('ffmpeg conversion failed');

    const mp3Buf = fs.readFileSync(mp3Path);
    process.stdout.write(`${(mp3Buf.length / 1e6).toFixed(1)} MB → uploading… `);

    const objectPath = `calm-me-down/anxiety-downshift-${Date.now()}.mp3`;
    const { error: upErr } = await sb.storage
        .from('audio-breaths')
        .upload(objectPath, mp3Buf, { contentType: 'audio/mpeg', upsert: true });
    if (upErr) throw new Error(`upload: ${upErr.message}`);

    const { data: { publicUrl } } = sb.storage.from('audio-breaths').getPublicUrl(objectPath);
    const { error: dbErr } = await sb.from('audio_breaths').update({ audio_url: publicUrl }).eq('id', 'anxiety-downshift');
    if (dbErr) throw new Error(`db: ${dbErr.message}`);

    // Clean up temp files
    try { fs.unlinkSync(wavPath); fs.unlinkSync(mp3Path); } catch { /* ignore */ }

    console.log('✓');
    console.log('\nDone →', publicUrl);
    console.log('Reload the Audio Breaths page and play Anxiety Downshift to confirm.');
} catch (err) {
    console.log(`✗ ${err.message}`);
    process.exit(1);
}
