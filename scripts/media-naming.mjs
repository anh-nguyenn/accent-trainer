export const VIDEO_RELEASE = 'course-media-v1';
export const VIDEO_BASE = `https://github.com/anh-nguyenn/accent-trainer/releases/download/${VIDEO_RELEASE}`;

export const modules = {
  '01': { label: 'Course orientation', slug: '01-orientation', driveName: '01 - PART 1' },
  '02': { label: 'TH', slug: '02-th', driveName: '02 - Important Consonants in English TH' },
  '03': { label: 'V', slug: '03-v', driveName: '03 - Important Consonants in English V' },
  '04': { label: 'P, T and K airflow', slug: '04-p-t-k', driveName: '04 - Important Consonants in English P T & K Airflow' },
  '05': { label: 'N', slug: '05-n', driveName: '05 - Important Consonants in English N' },
  '06': { label: 'NG', slug: '06-ng', driveName: '06 - Important Consonants in English NG' },
  '07': { label: 'SH', slug: '07-sh', driveName: '07 - Important Consonants in English SH' },
  '08': { label: 'CH', slug: '08-ch', driveName: '08 - Important Consonants in English CH' },
  '09': { label: 'J', slug: '09-j', driveName: '09 - Important Consonants in English J' },
  '10': { label: 'R', slug: '10-r', driveName: '10 - Important Consonants in English R' },
  '11': { label: 'L', slug: '11-l', driveName: '11 - Important Consonants in English L' },
  '12': { label: 'T', slug: '12-t', driveName: '12 - Important Consonants in English T' },
  '13': { label: 'D', slug: '13-d', driveName: '13 - Important Consonants in English D' },
  '14': { label: 'H', slug: '14-h', driveName: '14 - Important Consonants in English H' },
  '15': { label: 'W', slug: '15-w', driveName: '15 - Important Consonants in English W' },
  '16': { label: 'Y glide', slug: '16-y', driveName: '16 - Y Glide' },
  '17': { label: 'Z', slug: '17-z', driveName: '17 - Important Consonants in English Z' },
  '18': { label: 'Voicing', slug: '18-voicing', driveName: '18 - Voicing' },
  '19': { label: 'Final consonants', slug: '19-final-consonants', driveName: '19 - Final Consonant Sounds' },
  '20': { label: 'Consonant clusters', slug: '20-clusters', driveName: '20 - Consonant Clusters in English' },
  '21': { label: 'Vowel section intro', slug: '21-vowels-intro', driveName: '21 - PART THREE All About English Vowels' },
  '22': { label: 'IH /ɪ/', slug: '22-ih', driveName: '22 - Important Vowels in English IH I' },
  '23': { label: 'AA /æ/', slug: '23-aa', driveName: '23 - Important Vowels in English AA æ' },
  '24': { label: 'AH /ɑ/', slug: '24-ah', driveName: '24 - Important Vowels in English AH a' },
  '25': { label: 'Schwa /ə/', slug: '25-schwa', driveName: '25 - Important Vowels in English The Schwa  UH' },
  '26': { label: 'UH /ʌ/', slug: '26-uh', driveName: '26 - Important Vowels in English The UH ^ Vowel' },
  '27': { label: 'Upsilon /ʊ/', slug: '27-upsilon', driveName: '27 - Important Vowels in English The Upsilon EUH' },
  '28': { label: 'EE /i/', slug: '28-ee', driveName: '28 - Important Vowels in English EE i' },
  '29': { label: 'EH /ɛ/', slug: '29-eh', driveName: '29 - Important Vowels in English EH ε' },
  '30': { label: 'OO /u/', slug: '30-oo', driveName: '30 - Important Vowels in English OO u' },
  '31': { label: 'AI /aɪ/', slug: '31-ai', driveName: '31 - Important Vowels in English AH EE ai' },
  '32': { label: 'EI /eɪ/', slug: '32-ei', driveName: '32 - Important Vowels in English EH EE ei' },
  '33': { label: 'OH /oʊ/', slug: '33-oh', driveName: '33 - Important Vowels in English OH o' },
  '34': { label: 'AU /aʊ/', slug: '34-au', driveName: '34 - Important Vowels in English AA OO au' },
  '35': { label: 'OI /ɔɪ/', slug: '35-oi', driveName: '35 - Important Vowels in English OH EE oi' },
  '36': { label: 'English exceptions', slug: '36-exceptions', driveName: '36 - PART FOUR English Exceptions' },
  '37': { label: 'Stress patterns', slug: '37-stress', driveName: '37 - PART FIVE Stress Patterns in English' },
  '38': { label: 'Syllabic stress', slug: '38-syllabic-stress', driveName: '38 - Syllabic Stress in English' },
  '39': { label: 'Intonation', slug: '39-intonation', driveName: '39 - Intonation in English' },
  '40': { label: 'Fluency and linking', slug: '40-fluency', driveName: '40 - Fluency in American English' },
  '41': { label: 'Reductions and contractions', slug: '41-reductions', driveName: '41 - Reductions and Contractions Speaking Fluency in English' },
  '42': { label: 'What to work on first', slug: '42-what-to-work-on-first', driveName: '42 - What to Work on First' },
  '43': { label: 'Going forward', slug: '43-going-forward', driveName: '43 - GOING FORWARD' },
  '44': { label: 'Bonus', slug: '44-bonus', driveName: '44 - BONUS' },
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
