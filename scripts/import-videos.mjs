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
    const items = group.items.filter((item) => item.audio || item.pdf);
    for (const item of items) { delete item.video; if (!item.audio) delete item.duration; }
    groups.set(key, { module: modules[key].label, items });
  }
  const list = (byLesson.get(lesson) || []).sort((a, b) => a.module.localeCompare(b.module) || a.track - b.track || a.title.localeCompare(b.title));
  for (const video of list) {
    const key = video.module;
    if (!groups.has(key)) groups.set(key, { module: modules[key].label, items: [] });
    const group = groups.get(key);
    const candidates = group.items.filter((item) => item.track === video.track && !item.video);
    const pair = candidates.length === 1 ? candidates[0] : null;
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

const moduleItems = new Map();
for (let lesson = 1; lesson <= 16; lesson++) {
  const data = JSON.parse(fs.readFileSync(path.join(ROOT, `public/lessons/lesson-${lesson}.json`), 'utf8'));
  for (const group of data.drills || []) {
    const key = labelToModule.get(group.module);
    if (!moduleItems.has(key)) moduleItems.set(key, { lessons: new Set(), items: [] });
    const entry = moduleItems.get(key);
    entry.lessons.add(lesson);
    for (const item of group.items) entry.items.push(item);
  }
}
const sections = [
  { title: 'Part 1 · Foundations', from: 1, to: 1 },
  { title: 'Part 2 · Consonants', from: 2, to: 20 },
  { title: 'Part 3 · Vowels', from: 21, to: 35 },
  { title: 'Part 4 · Exceptions', from: 36, to: 36 },
  { title: 'Part 5 · Stress and fluency', from: 37, to: 41 },
  { title: 'Going forward', from: 42, to: 44 },
];
const library = {
  sections: sections.map((section) => ({
    title: section.title,
    modules: Object.keys(modules)
      .filter((key) => Number(key) >= section.from && Number(key) <= section.to)
      .sort((a, b) => Number(a) - Number(b))
      .map((key) => {
        const entry = moduleItems.get(key);
        if (!entry) throw new Error(`No items found for module ${key}`);
        return {
          module: key,
          driveName: modules[key].driveName,
          label: modules[key].label,
          lessons: [...entry.lessons].sort((a, b) => a - b),
          items: entry.items.sort((a, b) => (a.track ?? 9999) - (b.track ?? 9999) || a.title.localeCompare(b.title)),
        };
      }),
  })),
};
const moduleCount = library.sections.reduce((n, s) => n + s.modules.length, 0);
const itemCount = library.sections.reduce((n, s) => n + s.modules.reduce((m, mod) => m + mod.items.length, 0), 0);
fs.writeFileSync(path.join(ROOT, 'public/media/library.json'), JSON.stringify(library, null, 1));
console.log(`library: ${moduleCount} modules, ${itemCount} items in Drive order`);
console.log(`placed ${placed}/${videos.length} videos across 16 lessons; wrote ${path.relative(ROOT, OUT)}`);
