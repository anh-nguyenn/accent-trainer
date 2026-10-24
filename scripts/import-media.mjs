import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';

const ROOT = process.cwd();
const SRC = path.join(ROOT, 'source-media/files');
const TSV = path.join(ROOT, 'source-media/media.tsv');
const OUT_MEDIA = path.join(ROOT, 'public/media/drills');
const PLAN = path.join(ROOT, 'source-media/media-plan.json');
const PLAN_ONLY = process.argv.includes('--plan');

const modules = {
  '01': { label: 'Course orientation', slug: '01-orientation' },
  '02': { label: 'TH', slug: '02-th' },
  '03': { label: 'V', slug: '03-v' },
  '04': { label: 'P, T and K airflow', slug: '04-p-t-k' },
  '05': { label: 'N', slug: '05-n' },
  '06': { label: 'NG', slug: '06-ng' },
  '07': { label: 'SH', slug: '07-sh' },
  '08': { label: 'CH', slug: '08-ch' },
  '09': { label: 'J', slug: '09-j' },
  '10': { label: 'R', slug: '10-r' },
  '11': { label: 'L', slug: '11-l' },
  '12': { label: 'T', slug: '12-t' },
  '13': { label: 'D', slug: '13-d' },
  '14': { label: 'H', slug: '14-h' },
  '15': { label: 'W', slug: '15-w' },
  '16': { label: 'Y glide', slug: '16-y' },
  '17': { label: 'Z', slug: '17-z' },
  '18': { label: 'Voicing', slug: '18-voicing' },
  '19': { label: 'Final consonants', slug: '19-final-consonants' },
  '20': { label: 'Consonant clusters', slug: '20-clusters' },
  '22': { label: 'IH /ɪ/', slug: '22-ih' },
  '23': { label: 'AA /æ/', slug: '23-aa' },
  '24': { label: 'AH /ɑ/', slug: '24-ah' },
  '25': { label: 'Schwa /ə/', slug: '25-schwa' },
  '26': { label: 'UH /ʌ/', slug: '26-uh' },
  '27': { label: 'Upsilon /ʊ/', slug: '27-upsilon' },
  '28': { label: 'EE /i/', slug: '28-ee' },
  '29': { label: 'EH /ɛ/', slug: '29-eh' },
  '30': { label: 'OO /u/', slug: '30-oo' },
  '31': { label: 'AI /aɪ/', slug: '31-ai' },
  '32': { label: 'EI /eɪ/', slug: '32-ei' },
  '33': { label: 'OH /oʊ/', slug: '33-oh' },
  '34': { label: 'AU /aʊ/', slug: '34-au' },
  '35': { label: 'OI /ɔɪ/', slug: '35-oi' },
  '36': { label: 'English exceptions', slug: '36-exceptions' },
  '37': { label: 'Stress patterns', slug: '37-stress' },
  '38': { label: 'Syllabic stress', slug: '38-syllabic-stress' },
  '39': { label: 'Intonation', slug: '39-intonation' },
  '40': { label: 'Fluency and linking', slug: '40-fluency' },
  '41': { label: 'Reductions and contractions', slug: '41-reductions' },
  '43': { label: 'Going forward', slug: '43-going-forward' },
};

const lessonFor = (module, title) => {
  const n = Number(module);
  if (n === 1) return 1;
  if ([22, 23, 28, 29].includes(n)) return 2;
  if ([24, 25, 26, 27, 30].includes(n)) return 3;
  if ([10, 31, 32, 33, 34, 35].includes(n)) return 4;
  if ([2, 3, 4, 14, 17, 18].includes(n)) return 5;
  if ([5, 6, 7, 8, 9, 11, 15, 16].includes(n)) return 6;
  if (n === 38) return 7;
  if (n === 37) return /NEW INFORMATION STRESS/i.test(title) ? 14 : 8;
  if (n === 41) return 9;
  if (n === 40) return /PHRASING/i.test(title) ? 13 : 10;
  if ([19, 20].includes(n)) return 11;
  if ([12, 13, 36].includes(n)) return 12;
  if (n === 39) return 15;
  if (n === 43) return 16;
  return null;
};

const ACRONYMS = new Set(['TH','SH','CH','NG','IPA','B','EE','IH','AH','AA','EH','OO','AI','EI','OH','AU','OI','UH','EUH','VS','PDF','R','L','W','Y','Z','T','D','H','V','P','N','J','K']);
const titleCase = (raw) => {
  const words = raw.toLowerCase().split(' ').filter(Boolean);
  return words.map((w, i) => {
    const up = w.toUpperCase();
    if (ACRONYMS.has(up)) return up;
    if (up === 'ENGLISH' || up === 'AMERICAN') return up.charAt(0) + up.slice(1).toLowerCase();
    return i === 0 ? up.charAt(0) + up.slice(1).toLowerCase() : w;
  }).join(' ');
};
const titleFrom = (name) => {
  let s = name.replace(/\.[a-z0-9]+$/i, '');
  s = s.replace(/^\d{3}\s+/, '');
  let prev;
  do { prev = s; s = s.replace(/[-_\s](power[\s-]?point|audio|file|only|video|udem\s?y)$/i, ''); } while (s !== prev);
  s = s.replace(/^\d{2,3}[A-Z]?[-\s]+/i, '');
  s = s.replace(/^udem\s?y[-\s]+/i, '');
  s = s.replace(/^part[-\s](one|two|three|four|five)[-\s]+/i, '');
  s = s.replace(/-[0-9a-f]{16,}$/i, '');
  s = s.replace(/[-_]+/g, ' ').replace(/\s+/g, ' ').trim();
  return titleCase(s);
};
const slugify = (s) => s.toLowerCase().normalize('NFKD').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const trackOf = (name) => {
  const m = name.match(/^(\d{3})\s/);
  return m ? Number(m[1]) : 9999;
};
const pairKey = (name) => titleFrom(name).toLowerCase().replace(/[^a-z0-9]/g, '');

const rows = fs.readFileSync(TSV, 'utf8').split('\n').slice(1).filter(Boolean).map((line) => {
  const [rel, id, size, mime] = line.split('\t');
  const folder = rel.split('/')[0];
  const name = rel.split('/').slice(1).join('/');
  const module = folder.match(/^(\d{2})/)?.[1];
  return { rel, id, size: Number(size), mime, folder, name, module };
});

const byModule = new Map();
for (const row of rows) {
  if (!row.module || !modules[row.module]) continue;
  if (!byModule.has(row.module)) byModule.set(row.module, []);
  byModule.get(row.module).push(row);
}

const plan = [];
const usedPaths = new Set();
for (const [module, files] of byModule) {
  const groups = new Map();
  for (const file of files) {
    const track = trackOf(file.name);
    const key = track !== 9999 ? `t${track}` : `n${pairKey(file.name)}`;
    if (!groups.has(key)) groups.set(key, { key, track, mp3s: [], pdfs: [] });
    const g = groups.get(key);
    if (/\.mp3$/i.test(file.name)) g.mp3s.push(file);
    else if (/\.pdf$/i.test(file.name)) g.pdfs.push(file);
  }
  const items = [];
  for (const g of groups.values()) {
    if (g.mp3s.length === 1 && g.pdfs.length === 1) {
      items.push({ track: g.track, title: titleFrom(g.pdfs[0].name), audio: g.mp3s[0], pdf: g.pdfs[0] });
    } else {
      for (const f of g.mp3s) items.push({ track: g.track, title: titleFrom(f.name), audio: f, pdf: null });
      for (const f of g.pdfs) items.push({ track: g.track, title: titleFrom(f.name), audio: null, pdf: f });
    }
  }
  items.sort((a, b) => a.track - b.track || a.title.localeCompare(b.title));
  const out = [];
  for (const item of items) {
    const title = item.title;
    const lesson = lessonFor(module, title);
    if (!lesson) continue;
    let base = `${item.track === 9999 ? '' : String(item.track).padStart(3, '0') + '-'}${slugify(title) || 'drill'}`;
    let candidate = base;
    let n = 2;
    const dir = `${module}-${modules[module].slug ? '' : ''}`.length ? modules[module].slug : module;
    while (usedPaths.has(`${dir}/${candidate}`)) candidate = `${base}-${n++}`;
    usedPaths.add(`${dir}/${candidate}`);
    out.push({
      lesson,
      module,
      moduleLabel: modules[module].label,
      moduleSlug: modules[module].slug,
      title,
      track: item.track,
      audioSource: item.audio ? path.join(SRC, item.audio.rel) : null,
      pdfSource: item.pdf ? path.join(SRC, item.pdf.rel) : null,
      audio: item.audio ? `media/drills/${modules[module].slug}/${candidate}.mp3` : null,
      pdf: item.pdf ? `media/drills/${modules[module].slug}/${candidate}.pdf` : null,
      audioBytes: item.audio?.size ?? 0,
      pdfBytes: item.pdf?.size ?? 0,
    });
  }
  plan.push(...out);
}

plan.sort((a, b) => a.lesson - b.lesson || a.module.localeCompare(b.module) || a.track - b.track);
fs.writeFileSync(PLAN, JSON.stringify(plan, null, 1));

const summary = {};
for (const item of plan) {
  summary[item.lesson] ??= { items: 0, mp3: 0, pdf: 0, pdfOnly: 0, audioBytes: 0 };
  const s = summary[item.lesson];
  s.items++;
  if (item.audio) { s.mp3++; s.audioBytes += item.audioBytes; } else s.pdfOnly++;
  if (item.pdf) s.pdf++;
}
console.log('lesson  items  mp3  pdf  audioMB');
for (const [lesson, s] of Object.entries(summary)) {
  console.log(String(lesson).padStart(6), String(s.items).padStart(6), String(s.mp3).padStart(4), String(s.pdf).padStart(4), (s.audioBytes / 1e6).toFixed(1).padStart(8));
}
console.log('total items', plan.length, 'audio MB', (plan.reduce((n, i) => n + i.audioBytes, 0) / 1e6).toFixed(1));
console.log('unmapped lessons', [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16].filter((l) => !summary[l]));
console.log('sample titles:');
for (const item of plan.slice(0, 12)) console.log(' ', item.lesson, '|', item.moduleLabel, '|', item.title, '|', item.audio ? 'mp3' : '', item.pdf ? 'pdf' : '');
console.log('plan written to', PLAN);

if (PLAN_ONLY) process.exit(0);

const lessonDrills = new Map();
for (const item of plan) {
  if (!lessonDrills.has(item.lesson)) lessonDrills.set(item.lesson, new Map());
  const groups = lessonDrills.get(item.lesson);
  if (!groups.has(item.moduleLabel)) groups.set(item.moduleLabel, []);
  groups.get(item.moduleLabel).push(item);
}

let encoded = 0;
for (const item of plan) {
  const dir = path.join(OUT_MEDIA, item.moduleSlug);
  fs.mkdirSync(dir, { recursive: true });
  if (item.audioSource) {
    const dest = path.join(ROOT, 'public', item.audio);
    if (!fs.existsSync(dest) || fs.statSync(dest).size < 1000) {
      execFileSync('ffmpeg', ['-v', 'error', '-y', '-i', item.audioSource, '-map', '0:a:0', '-ac', '1', '-ar', '44100', '-codec:a', 'libmp3lame', '-b:a', '64k', dest]);
    }
    const duration = Number(execFileSync('ffprobe', ['-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', dest]).toString().trim());
    item.duration = Math.round(duration);
    encoded++;
    if (encoded % 40 === 0) console.log(`checked ${encoded}/${plan.filter((i) => i.audioSource).length}`);
  }
  if (item.pdfSource) {
    const dest = path.join(ROOT, 'public', item.pdf);
    if (!fs.existsSync(dest)) fs.copyFileSync(item.pdfSource, dest);
  }
}

const expected = new Set(plan.flatMap((item) => [item.audio, item.pdf].filter(Boolean)).map((rel) => path.join(ROOT, 'public', rel)));
const walk = (dir) => {
  if (!fs.existsSync(dir)) return;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (!expected.has(full)) fs.rmSync(full);
  }
};
walk(OUT_MEDIA);

for (const [lesson, groups] of lessonDrills) {
  const file = path.join(ROOT, `public/lessons/lesson-${lesson}.json`);
  const data = JSON.parse(fs.readFileSync(file, 'utf8'));
  data.drills = [...groups.entries()].map(([label, items]) => ({
    module: label,
    items: items.map(({ title, track, audio, pdf, duration }) => ({
      title,
      track,
      ...(audio ? { audio } : {}),
      ...(pdf ? { pdf } : {}),
      ...(duration ? { duration } : {}),
    })),
  }));
  fs.writeFileSync(file, JSON.stringify(data, null, 2) + '\n');
}
fs.writeFileSync(PLAN, JSON.stringify(plan, null, 1));
console.log('done: encoded', encoded);
