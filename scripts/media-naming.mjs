export const VIDEO_RELEASE = 'course-media-v1';
export const VIDEO_BASE = `https://github.com/anh-nguyenn/accent-trainer/releases/download/${VIDEO_RELEASE}`;

export const modules = {
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
  '21': { label: 'Vowel section intro', slug: '21-vowels-intro' },
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
  '42': { label: 'What to work on first', slug: '42-what-to-work-on-first' },
  '43': { label: 'Going forward', slug: '43-going-forward' },
  '44': { label: 'Bonus', slug: '44-bonus' },
};

export const lessonFor = (module, title = '') => {
  const n = Number(module);
  if (n === 1 || n === 21) return n === 1 ? 1 : 2;
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
  if ([42, 43, 44].includes(n)) return 16;
  return null;
};

const ACRONYMS = new Set(['TH','SH','CH','NG','IPA','B','EE','IH','AH','AA','EH','OO','AI','EI','OH','AU','OI','UH','EUH','VS','PDF','R','L','W','Y','Z','T','D','H','V','P','N','J','K']);

export const titleFrom = (name) => {
  let s = name.replace(/\.[a-z0-9]+$/i, '');
  s = s.replace(/^\d{3}\s+/, '');
  let prev;
  do { prev = s; s = s.replace(/[-_\s](power[\s-]?point|audio|file|only|video|udem\s?y)$/i, ''); } while (s !== prev);
  s = s.replace(/^\d{2,3}[A-Z]?[-\s]+/i, '');
  s = s.replace(/^udem\s?y[-\s]+/i, '');
  s = s.replace(/^part[-\s](one|two|three|four|five)[-\s]+/i, '');
  s = s.replace(/-[0-9a-f]{16,}$/i, '');
  s = s.replace(/[-_]+/g, ' ').replace(/\s+/g, ' ').trim();
  return s.toLowerCase().split(' ').filter(Boolean).map((w, i) => {
    const up = w.toUpperCase();
    if (ACRONYMS.has(up)) return up;
    if (up === 'ENGLISH' || up === 'AMERICAN') return up.charAt(0) + up.slice(1).toLowerCase();
    return i === 0 ? up.charAt(0) + up.slice(1).toLowerCase() : w;
  }).join(' ');
};

export const slugify = (s) => s.toLowerCase().normalize('NFKD').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

export const trackOf = (name) => {
  const m = name.match(/^(\d{3})\s/);
  return m ? Number(m[1]) : 9999;
};

export const videoAssetName = (module, track, title) => {
  const slug = (slugify(title) || 'video').slice(0, 90).replace(/-$/, '');
  const t = track === 9999 ? '' : `${String(track).padStart(3, '0')}-`;
  return `${modules[module].slug}--${t}${slug}.mp4`;
};

export const videoUrl = (asset) => `${VIDEO_BASE}/${encodeURIComponent(asset)}`;
