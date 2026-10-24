import fs from 'node:fs';
import path from 'node:path';
import { spawn } from 'node:child_process';

const ROOT = process.cwd();
const OUT = path.join(ROOT, 'public/media/peaks.json');
const BARS = 360;
const RATE = 2000;

const audio = new Map();
for (let lesson = 1; lesson <= 16; lesson++) {
  const data = JSON.parse(fs.readFileSync(path.join(ROOT, `public/lessons/lesson-${lesson}.json`), 'utf8'));
  for (const group of data.drills || []) {
    for (const item of group.items) {
      if (item.audio && !audio.has(item.audio)) audio.set(item.audio, item.duration || 0);
    }
  }
}

const decode = (rel) => new Promise((resolve, reject) => {
  const child = spawn('ffmpeg', ['-v', 'error', '-i', path.join(ROOT, 'public', rel), '-ac', '1', '-ar', String(RATE), '-f', 's16le', '-']);
  const chunks = [];
  let length = 0;
  child.stdout.on('data', (chunk) => { chunks.push(chunk); length += chunk.length; });
  child.on('error', reject);
  child.on('close', (code) => code === 0 ? resolve(Buffer.concat(chunks, length)) : reject(new Error(`ffmpeg ${code} for ${rel}`)));
});

const peaksFor = (buffer) => {
  const samples = Math.floor(buffer.length / 2);
  const bucket = Math.max(1, Math.floor(samples / BARS));
  const peaks = new Array(BARS).fill(0);
  for (let i = 0; i < samples; i++) {
    const value = Math.abs(buffer.readInt16LE(i * 2)) / 32768;
    const index = Math.min(BARS - 1, Math.floor(i / bucket));
    if (value > peaks[index]) peaks[index] = value;
  }
  return peaks.map((value) => Math.round(value * 1000) / 1000);
};

const entries = [...audio.entries()];
const result = {};
let done = 0;
let next = 0;
const workers = Array.from({ length: 4 }, async () => {
  while (next < entries.length) {
    const [rel, duration] = entries[next++];
    const buffer = await decode(rel);
    result[rel] = { d: Math.round(duration) || Math.round(buffer.length / 2 / RATE), p: peaksFor(buffer) };
    done++;
    if (done % 40 === 0) console.log(`${done}/${entries.length}`);
  }
});
await Promise.all(workers);

const ordered = {};
for (const rel of [...audio.keys()].sort()) ordered[rel] = result[rel];
fs.writeFileSync(OUT, JSON.stringify(ordered));
console.log(`wrote ${path.relative(ROOT, OUT)}: ${audio.size} files, ${(fs.statSync(OUT).size / 1e6).toFixed(2)} MB`);
