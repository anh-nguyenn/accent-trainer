import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { modules } from './media-naming.mjs';

const ROOT = process.cwd();
const MAP = path.join(ROOT, 'source-media/videos-map.json');
const SRC = path.join(ROOT, 'source-media/videos');
const OUT = path.join(ROOT, 'public/media/videos.json');

const videos = JSON.parse(fs.readFileSync(MAP, 'utf8'));
for (const video of videos) {
  if (!video.duration) {
    const local = path.join(SRC, video.rel);
    video.duration = Math.round(Number(execFileSync('ffprobe', ['-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', local]).toString().trim()));
  }
}
fs.writeFileSync(MAP, JSON.stringify(videos, null, 1));

const byLesson = new Map();
for (const video of videos) {
  if (!byLesson.has(video.lesson)) byLesson.set(video.lesson, []);
  byLesson.get(video.lesson).push(video);
}

const labelToModule = new Map(Object.entries(modules).map(([key, value]) => [value.label, key]));
let placed = 0;
for (let lesson = 1; lesson <= 16; lesson++) {
  const file = path.join(ROOT, `public/lessons/lesson-${lesson}.json`);
  const data = JSON.parse(fs.readFileSync(file, 'utf8'));
  const groups = new Map();
  for (const group of data.drills || []) {
    const key = labelToModule.get(group.module);
    if (!key) throw new Error(`${file}: unknown module label ${group.module}`);
    groups.set(key, { module: modules[key].label, items: group.items });
  }
  const list = (byLesson.get(lesson) || []).sort((a, b) => a.module.localeCompare(b.module) || a.track - b.track || a.title.localeCompare(b.title));
  for (const video of list) {
    const key = video.module;
    if (!groups.has(key)) groups.set(key, { module: modules[key].label, items: [] });
    const group = groups.get(key);
    const pair = group.items.find((item) => item.track === video.track && !item.video);
    if (pair) {
      pair.video = video.url;
      if (!pair.duration) pair.duration = video.duration;
    } else {
      group.items.push({ title: video.title, track: video.track, video: video.url, duration: video.duration });
    }
    placed++;
  }
  data.drills = [...groups.entries()].sort((a, b) => Number(a[0]) - Number(b[0])).map(([, group]) => ({
    module: group.module,
    items: group.items.sort((a, b) => (a.track ?? 9999) - (b.track ?? 9999) || a.title.localeCompare(b.title)),
  }));
  fs.writeFileSync(file, JSON.stringify(data, null, 2) + '\n');
}

fs.writeFileSync(OUT, JSON.stringify(videos.map(({ lesson, module, title, track, url, asset, size, duration }) => ({ lesson, module, moduleLabel: modules[module].label, title, track, url, asset, bytes: size, duration })), null, 1));
console.log(`placed ${placed}/${videos.length} videos across 16 lessons; wrote ${path.relative(ROOT, OUT)}`);
