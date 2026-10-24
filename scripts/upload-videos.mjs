import fs from 'node:fs';
import path from 'node:path';
import { execFileSync, spawn } from 'node:child_process';
import { modules, titleFrom, trackOf, lessonFor, videoAssetName, VIDEO_RELEASE, VIDEO_BASE } from './media-naming.mjs';

const ROOT = process.cwd();
const TSV = path.join(ROOT, 'source-media/videos.tsv');
const SRC = path.join(ROOT, 'source-media/videos');
const STAGE = path.join(ROOT, 'source-media/video-assets');
const MAP = path.join(ROOT, 'source-media/videos-map.json');
const REPO = 'anh-nguyenn/accent-trainer';
const UPLOAD = process.argv.includes('--upload');
const LIMIT = Number(process.argv.find((a) => a.startsWith('--limit='))?.split('=')[1] || 0);

const rows = fs.readFileSync(TSV, 'utf8').split('\n').slice(1).filter(Boolean).map((line) => {
  const [rel, id, size] = line.split('\t');
  const module = rel.match(/^(\d{2})/)?.[1];
  const name = rel.split('/').slice(1).join('/');
  const track = trackOf(name);
  const title = titleFrom(name);
  return { rel, id, size: Number(size), module, name, track, title, lesson: lessonFor(module, title) };
});

const used = new Set();
const items = [];
for (const row of rows) {
  if (!modules[row.module] || !row.lesson) continue;
  let asset = videoAssetName(row.module, row.track, row.title);
  let n = 2;
  while (used.has(asset)) asset = videoAssetName(row.module, row.track, row.title).replace(/\.mp4$/, `-${n++}.mp4`);
  used.add(asset);
  items.push({ ...row, asset, url: `${VIDEO_BASE}/${encodeURIComponent(asset)}` });
}

fs.mkdirSync(STAGE, { recursive: true });
for (const item of items) {
  const dest = path.join(STAGE, item.asset);
  if (!fs.existsSync(dest)) fs.linkSync(path.join(SRC, item.rel), dest);
}
fs.writeFileSync(MAP, JSON.stringify(items, null, 1));
console.log(`mapped ${items.length}/${rows.length} videos, ${(items.reduce((n, i) => n + i.size, 0) / 1e9).toFixed(2)} GB`);
const byLesson = {};
for (const i of items) byLesson[i.lesson] = (byLesson[i.lesson] || 0) + 1;
console.log('per lesson', byLesson);
console.log('sample', items.slice(0, 3).map((i) => i.asset));

if (!UPLOAD) process.exit(0);

const token = process.env.GH_TOKEN || process.env.GITHUB_TOKEN || (() => {
  const hosts = fs.readFileSync(path.join(process.env.HOME, '.config/gh/hosts.yml'), 'utf8');
  const match = hosts.match(/oauth_token:\s*(\S+)/);
  if (!match) throw new Error('No GitHub token found. Run gh auth login or set GH_TOKEN.');
  return match[1];
})();
let release;
try {
  release = JSON.parse(execFileSync('gh', ['release', 'view', VIDEO_RELEASE, '--json', 'id,assets']).toString());
} catch {
  execFileSync('gh', ['release', 'create', VIDEO_RELEASE, '--title', 'Course media v1', '--notes', 'MP4 course videos used by the Accent Trainer drills.']);
  release = JSON.parse(execFileSync('gh', ['release', 'view', VIDEO_RELEASE, '--json', 'id,assets']).toString());
}
release.id = execFileSync('gh', ['api', `repos/${REPO}/releases/tags/${VIDEO_RELEASE}`, '--jq', '.id']).toString().trim();
const existing = new Set((release.assets || []).map((a) => a.name));
const todo = items.filter((i) => !existing.has(i.asset)).slice(0, LIMIT || undefined);
console.log(`uploading ${todo.length} assets to ${VIDEO_RELEASE}`);

const uploadOne = (item) => new Promise((resolve) => {
  const file = path.join(STAGE, item.asset);
  const url = `https://uploads.github.com/repos/${REPO}/releases/${release.id}/assets?name=${encodeURIComponent(item.asset)}`;
  const child = spawn('curl', [
    '-sS', '--fail', '-X', 'POST',
    '-H', `Authorization: Bearer ${token}`,
    '-H', 'Content-Type: video/mp4',
    '--data-binary', `@${file}`,
    url,
  ], { stdio: ['ignore', 'pipe', 'pipe'] });
  let err = '';
  child.stderr.on('data', (d) => { err += d; });
  child.on('close', (code) => resolve(code === 0 ? null : `${item.asset}: ${err.slice(-300)}`));
});

let next = 0, done = 0;
const failed = [];
const workers = Array.from({ length: 4 }, async () => {
  while (next < todo.length) {
    const item = todo[next++];
    const error = await uploadOne(item);
    done++;
    if (error) failed.push(error);
    if (done % 10 === 0) console.log(`${done}/${todo.length} uploaded, ${failed.length} failed`);
  }
});
await Promise.all(workers);
console.log(`done ${done}, failed ${failed.length}`);
if (failed.length) { console.log(failed.join('\n')); process.exit(1); }
