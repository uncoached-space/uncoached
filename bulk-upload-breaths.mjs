/**
 * Bulk Audio Upload Script for Audio Breaths
 * Uploads WAV files to Supabase storage, compresses to MP3 if over 50MB.
 * 
 * Usage: node bulk-upload-breaths.mjs
 */

import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import ffmpegPath from 'ffmpeg-static';

const supabaseUrl = 'https://vgzepwglrtaqzsfqfqdo.supabase.co';
const serviceRoleKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZnemVwd2dscnRhcXpzZnFmcWRvIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MDA2Njg2OSwiZXhwIjoyMDg1NjQyODY5fQ.iSYh6TZrEY-dH-HBXxTw4pP_ivL9w99r7wwLCVwOVZA';
const supabase = createClient(supabaseUrl, serviceRoleKey);

const AUDIO_DIR = String.raw`C:\Users\boyev\Downloads\Audio Breaths - Completed Audio Tracks-20260317T145945Z-3-001\Audio Breaths - Completed Audio Tracks`;
const TEMP_DIR = path.join(AUDIO_DIR, '_compressed');

// Mapping: audio filename → breath ID in database
const FILE_TO_BREATH_MAP = {
    'AB - Anxiety Downshift.wav': 'anxiety-downshift',
    'AB - Before You React.wav': 'before-you-react',
    'AB - Boundary Setting.wav': 'boundary-setting',
    'AB - Confidence Charge-Up.wav': 'confidence-charge-up',
    'AB - Creative Spark.wav': 'creative-spark',
    'AB - Emergency Grounding.wav': 'emergency-grounding',
    'AB - Grief Companion.wav': 'grief-companion',
    'AB - Joy Amplifier.wav': 'joy-amplifier',
    'AB - Morning Spark.wav': 'morning-spark',
    'AB - Overwhelm Unclench.wav': 'overwhelm-unclench',
    'AB - Settle into Sleep.wav': 'settle-into-sleep',
    'AB - Shame Release.wav': 'shame-release',
    'AB - Single-Task Focus.wav': 'single-task-focus',
    'AB - Social Nerves Reset.wav': 'social-nerves-reset',
    'AB - Transition Support.wav': 'transition-support',
};

const STORAGE_BUCKET = 'audio-breaths';

async function main() {
    console.log('=== Bulk Audio Upload for Audio Breaths ===\n');

    // Check if bucket exists, create if not
    const { data: buckets } = await supabase.storage.listBuckets();
    const bucketExists = buckets?.some(b => b.name === STORAGE_BUCKET);
    if (!bucketExists) {
        console.log(`Creating storage bucket: ${STORAGE_BUCKET}...`);
        const { error } = await supabase.storage.createBucket(STORAGE_BUCKET, { public: true });
        if (error) {
            console.error('Failed to create bucket:', error.message);
            // Try using guided-shifts bucket as fallback
            console.log('Using guided-shifts bucket instead...');
        } else {
            console.log('Bucket created!\n');
        }
    }

    const actualBucket = bucketExists || !(await supabase.storage.listBuckets()).data?.some(b => b.name === STORAGE_BUCKET)
        ? STORAGE_BUCKET : 'guided-shifts';

    if (!fs.existsSync(TEMP_DIR)) fs.mkdirSync(TEMP_DIR, { recursive: true });

    // Fetch all breaths
    const { data: breaths, error: fetchError } = await supabase
        .from('audio_breaths')
        .select('id, title, family_id, audio_url');

    if (fetchError) {
        console.error('Failed to fetch breaths:', fetchError.message);
        process.exit(1);
    }

    const breathLookup = {};
    for (const b of breaths) {
        breathLookup[b.id] = { family_id: b.family_id, title: b.title, audio_url: b.audio_url };
    }

    let uploaded = 0, skipped = 0, failed = 0;

    for (const [filename, breathId] of Object.entries(FILE_TO_BREATH_MAP)) {
        const wavPath = path.join(AUDIO_DIR, filename);

        if (!fs.existsSync(wavPath)) {
            console.log(`⚠️  File not found: ${filename}`);
            skipped++;
            continue;
        }

        const breathInfo = breathLookup[breathId];
        if (!breathInfo) {
            console.log(`⚠️  No breath in DB: ${breathId}`);
            skipped++;
            continue;
        }

        if (breathInfo.audio_url) {
            console.log(`⏭️  SKIP: "${breathInfo.title}" already has audio`);
            skipped++;
            continue;
        }

        const wavSize = fs.statSync(wavPath).size;
        const wavSizeMB = (wavSize / (1024 * 1024)).toFixed(1);
        let uploadBuffer, contentType, fileExt;

        if (wavSize > 49 * 1024 * 1024) {
            const mp3Path = path.join(TEMP_DIR, filename.replace('.wav', '.mp3'));
            console.log(`🔄 Compressing: ${filename} (${wavSizeMB}MB) → MP3...`);
            try {
                execSync(`"${ffmpegPath}" -i "${wavPath}" -codec:a libmp3lame -b:a 192k -y "${mp3Path}"`, { stdio: 'pipe' });
                const mp3Size = fs.statSync(mp3Path).size;
                console.log(`   Compressed to ${(mp3Size / (1024 * 1024)).toFixed(1)}MB`);
                uploadBuffer = fs.readFileSync(mp3Path);
                contentType = 'audio/mpeg';
                fileExt = 'mp3';
            } catch (err) {
                console.error(`   ❌ Compression failed: ${err.message}`);
                failed++;
                continue;
            }
        } else {
            uploadBuffer = fs.readFileSync(wavPath);
            contentType = 'audio/wav';
            fileExt = 'wav';
        }

        const storagePath = `${breathInfo.family_id}/${breathId}-${Date.now()}.${fileExt}`;
        console.log(`📤 Uploading: "${breathInfo.title}" (${breathId}, ${wavSizeMB}MB)...`);

        try {
            const { error: uploadError } = await supabase.storage
                .from(STORAGE_BUCKET)
                .upload(storagePath, uploadBuffer, { contentType, upsert: true });

            if (uploadError) {
                console.error(`   ❌ Upload failed: ${uploadError.message}`);
                failed++;
                continue;
            }

            const { data: { publicUrl } } = supabase.storage
                .from(STORAGE_BUCKET)
                .getPublicUrl(storagePath);

            const { error: dbError } = await supabase
                .from('audio_breaths')
                .update({ audio_url: publicUrl })
                .eq('id', breathId);

            if (dbError) {
                console.error(`   ❌ DB update failed: ${dbError.message}`);
                failed++;
                continue;
            }

            console.log(`   ✅ Done!`);
            uploaded++;
            await new Promise(r => setTimeout(r, 500));
        } catch (err) {
            console.error(`   ❌ Error: ${err.message}`);
            failed++;
        }
    }

    console.log(`\n=== Upload Complete ===`);
    console.log(`✅ Uploaded: ${uploaded}`);
    console.log(`⏭️  Skipped: ${skipped}`);
    console.log(`❌ Failed: ${failed}`);
    console.log(`📊 Total: ${Object.keys(FILE_TO_BREATH_MAP).length}`);

    if (fs.existsSync(TEMP_DIR)) {
        fs.rmSync(TEMP_DIR, { recursive: true });
        console.log('🧹 Temp files cleaned up');
    }
}

main().catch(console.error);
