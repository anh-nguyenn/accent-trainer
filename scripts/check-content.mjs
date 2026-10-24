import fs from 'node:fs';
const index=JSON.parse(fs.readFileSync('public/lessons/index.json'));
const ipa=JSON.parse(fs.readFileSync('public/ipa.json'));
const failures=[];
if(index.length!==16)failures.push(`Expected 16 lessons, got ${index.length}`);
if(ipa.filter(x=>x.type==='vowel').length!==20||ipa.filter(x=>x.type==='consonant').length!==24)failures.push('IPA inventory must be 20 vowels and 24 consonants');
const videos=new Map();
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
}
if(process.argv.includes('--online')){
 for(const [id,credit] of videos){
  try{const response=await fetch(`https://www.youtube.com/oembed?url=${encodeURIComponent(`https://www.youtube.com/watch?v=${id}`)}&format=json`);if(!response.ok)failures.push(`Video ${id} (${credit}): HTTP ${response.status}`);else console.log(`OK ${id} — ${credit}`)}catch(e){failures.push(`Video ${id}: ${e.message}`)}
 }
}
if(failures.length){console.error(failures.join('\n'));process.exit(1)}
console.log(`Content checks passed: ${index.length} lessons, ${ipa.length} IPA targets, ${videos.size} unique videos.`);
