import fs from 'node:fs';
const index=JSON.parse(fs.readFileSync('public/lessons/index.json'));
const ipa=JSON.parse(fs.readFileSync('public/ipa.json'));
const failures=[];
const videoMap=JSON.parse(fs.readFileSync('public/media/videos.json'));
const videoUrls=new Set(videoMap.map(v=>v.url));
if(index.length!==16)failures.push(`Expected 16 lessons, got ${index.length}`);
if(ipa.filter(x=>x.type==='vowel').length!==20||ipa.filter(x=>x.type==='consonant').length!==24)failures.push('IPA inventory must be 20 vowels and 24 consonants');
const videos=new Map();
let drills=0, audioFiles=0, videoItems=0;
for(const summary of index){
 const path=`public/lessons/lesson-${summary.id}.json`;
 const l=JSON.parse(fs.readFileSync(path));
 if(l.id!==summary.id||l.stage!==summary.stage)failures.push(`${path}: index mismatch`);
 if(l.repeat.words.length<5||l.repeat.sentences.length!==5||l.selfCheck.length!==(l.id===16?6:3))failures.push(`${path}: incomplete practice set`);
 for(const [part,clip] of [['watch',l.watch],['shadow',l.shadow]]){
  if(!/^[A-Za-z0-9_-]{11}$/.test(clip.videoId))failures.push(`${path}: bad ${part} video ID`);
  if(part==='shadow'&&(!(clip.end>clip.start)||clip.end-clip.start>30))failures.push(`${path}: bad shadow duration`);
  videos.set(clip.videoId,clip.creator||l.watch.creator);
 }
 if(!Array.isArray(l.drills)||l.drills.length===0)failures.push(`${path}: no drills`);
 for(const group of l.drills??[]){
  if(!group.module||!Array.isArray(group.items)||group.items.length===0)failures.push(`${path}: empty drill group`);
  for(const item of group.items??[]){
   drills++;
   if(item.video){videoItems++;if(!videoUrls.has(item.video))failures.push(`${path}: unknown video ${item.video}`);}
   if(!item.title)failures.push(`${path}: drill missing title`);
   for(const key of ['audio','pdf']){
    if(!item[key])continue;
    if(key==='audio')audioFiles++;
    if(typeof item[key]!=='string'||item[key].includes('..'))failures.push(`${path}: bad ${key} path`);
    else if(!fs.existsSync(`public/${item[key]}`))failures.push(`${path}: missing ${item[key]}`);
   }
   if(item.audio&&!(item.duration>0))failures.push(`${path}: drill missing duration`);
  }
 }
}
if(process.argv.includes('--online')){
 for(const [id,credit] of videos){
  try{const response=await fetch(`https://www.youtube.com/oembed?url=${encodeURIComponent(`https://www.youtube.com/watch?v=${id}`)}&format=json`);if(!response.ok)failures.push(`Video ${id} (${credit}): HTTP ${response.status}`);else console.log(`OK ${id} — ${credit}`)}catch(e){failures.push(`Video ${id}: ${e.message}`)}
 }
}
if(failures.length){console.error(failures.join('\n'));process.exit(1)}
if(videoItems!==videoMap.length)failures.push(`Expected ${videoMap.length} videos attached, got ${videoItems}`);
const library=JSON.parse(fs.readFileSync('public/media/library.json'));
const libModules=library.sections.flatMap(s=>s.modules);
if(libModules.length!==44)failures.push(`Library must list 44 modules, got ${libModules.length}`);
let libItems=0;
for(const mod of libModules){
 if(!mod.driveName?.startsWith(mod.module))failures.push(`Library ${mod.module}: drive name out of order`);
 if(!mod.lessons?.length||mod.lessons.some(l=>l<1||l>16))failures.push(`Library ${mod.module}: bad lesson link`);
 if(!mod.items?.length)failures.push(`Library ${mod.module}: no items`);
 for(const item of mod.items??[]){
  libItems++;
  if(item.audio&&!fs.existsSync(`public/${item.audio}`))failures.push(`Library ${mod.module}: missing ${item.audio}`);
  if(item.pdf&&!fs.existsSync(`public/${item.pdf}`))failures.push(`Library ${mod.module}: missing ${item.pdf}`);
  if(item.video&&!videoUrls.has(item.video))failures.push(`Library ${mod.module}: unknown video`);
 }
}
const expectedOrder=[...Array(44)].map((_,i)=>String(i+1).padStart(2,'0'));
if(libModules.map(m=>m.module).join(',')!==expectedOrder.join(','))failures.push('Library modules are not in Drive order 01-44');
if(libItems!==drills)failures.push(`Library items ${libItems} do not match lesson drills ${drills}`);
if(failures.length){console.error(failures.join('\n'));process.exit(1)}
console.log(`Content checks passed: ${index.length} lessons, ${ipa.length} IPA targets, ${videos.size} unique YouTube clips, ${drills} drill items (${audioFiles} audio, ${videoItems} course videos), ${libModules.length} library modules.`);
