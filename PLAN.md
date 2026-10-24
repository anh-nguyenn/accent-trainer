# American Accent Training App: Build Plan

Last updated: 2026-10-24

A free, English-language web app that teaches an Asian American accent in the same order as TE English's *American Accent Training* course (IPA basics, then connected speech, then rhythm and intonation, then real-life speaking). It uses YouTube videos, shadowing practice and in-browser voice/video recording. **Nothing is stored**: not on the user's device, not on a server.

## Contents

1. [Decisions](#1-decisions)
2. [What the source course teaches](#2-what-the-source-course-teaches)
3. [Product scope](#3-product-scope)
4. [Curriculum map (16 lessons)](#4-curriculum-map-16-lessons)
5. [Lesson design](#5-lesson-design)
6. [Screens and navigation](#6-screens-and-navigation)
7. [Technical design](#7-technical-design)
8. [Content plan](#8-content-plan)
9. [Build phases with acceptance criteria](#9-build-phases-with-acceptance-criteria)
10. [Testing plan](#10-testing-plan)
11. [Risks and mitigations](#11-risks-and-mitigations)
12. [Open items](#12-open-items)
13. [Later ideas](#13-later-ideas)
14. [Kickoff prompt for your coding tool](#14-kickoff-prompt-for-your-coding-tool)

---

## 1. Decisions

| Topic | Decision | Consequence |
|---|---|---|
| Audience | Free app for everyone | No payments, no accounts. Content must be legally usable. |
| Recordings | Not kept | Recorded in browser memory, played back, then discarded. Nothing uploaded. |
| Feedback | Self-compare first | Model clip next to your own take, plus a short self-check. No automatic scoring in v1. |
| Platform | Web app that works well on phones | One codebase, no app store, free static hosting. |
| Video source | Public videos from creators on YouTube | Follow the course structure and make it better. Embed only; credit creators. |
| Progress tracking | None for now | No saved state of any kind in v1. |
| Interface language | English only | One set of interface text, no translation layer. |
| Build tool | **Not decided** | Claude Code, Replit or another. Does not change the plan. |

**Principle:** if a feature needs to save something about the user, it is out of v1.

---

## 2. What the source course teaches

Source: TE English, *American Accent Training* (live Zoom course, 16 sessions of 90 minutes, one teacher plus two assistants).

| Stage | Sessions | Topics listed on the site |
|---|---|---|
| 1. IPA & Individual Sounds | 6 | 20 vowels and 24 consonants; mouth shape, tongue position, airflow; sound pairs Vietnamese speakers often confuse; reading and self-checking IPA |
| 2. Connected Speech | 6 | Word stress and sentence stress; reduction, schwa and linking; final sounds, consonant clusters and American T; assimilation and sound changes |
| 3. Rhythm & Intonation | 3 | English rhythm; thought groups; key-word stress and pitch; rising and falling intonation by purpose |
| 4. Final Integration | 1 | Apply all techniques to real speaking; output test; Before and After recording comparison |

**Course method (5 steps per session):** teacher explains and models, learners practice, small-group practice, live correction, then 2 to 3 recorded homework tasks with feedback.

**Course assessment (6 skills):** sound accuracy, mouth shape and final sounds, stress, connected speech, rhythm and chunking, intonation and naturalness.

**Gaps in what the site shows:**
- It does not list what each of the 16 sessions covers. The lesson split in section 4 is our own.
- It uses live human correction, which the app replaces with self-comparison and checklists.
- Its Before and After comparison needs saved recordings, which we have chosen not to keep.

---

## 3. Product scope

### In scope for v1

- 4 stages, 16 lessons, plus an optional Stage 0 starter check
- Per lesson: explainer video, practice words and sentences, shadowing clip, recorder, self-check
- Interactive IPA chart with example words and model audio
- Mic recording (audio) and camera recording (video) in the browser
- Side-by-side playback: model clip and your take
- Works on phone and desktop browsers, English interface

### Out of scope for v1

- Accounts, login, progress tracking, streaks, reminders
- Saving or sharing recordings
- Automatic pronunciation scoring
- Payments, ads, analytics that identify people
- Vietnamese or other interface languages
- A native mobile app

### Success criteria

- A learner can open the link on a phone, pick any lesson, watch, shadow, record and compare in under 2 minutes without reading instructions.
- Closing the tab leaves no trace: no recordings, no local data.
- All 16 lessons have at least one working video and one set of practice items.

---

## 4. Curriculum map (16 lessons)

The split below is a proposal built from the site's stage topics. Counts match the site: 6 + 6 + 3 + 1 = 16.

**Inventory check:** the site says 20 vowels and 24 consonants. Standard General American has 24 consonants (listed below). The vowel count depends on the chart used, so choose one reference chart before building lessons 2 to 4 and list its 20 vowels in the IPA data file.


### Stage 1: IPA & Individual Sounds (lessons 1 to 6)

| # | Lesson | Target items | Typical challenge for Vietnamese speakers |
|---|---|---|---|
| 1 | Mouth, tongue, airflow + IPA chart tour | Articulators (lips, tongue tip, tongue body, jaw), voiced vs voiceless (hand on throat), how to read the chart | Not yet hearing the difference between close sounds |
| 2 | Vowels A: front vowels | /i/ beat, /ɪ/ bit, /ɛ/ bet, /æ/ bat | ship / sheep, bed / bad |
| 3 | Vowels B: back and central vowels | /ɑ/ pot, /ʌ/ cup, /ə/ about, /ɔ/ thought, /ʊ/ book, /u/ boot | Over-using one vowel for several; schwa |
| 4 | Diphthongs and r-colored vowels | /eɪ/ /aɪ/ /ɔɪ/ /aʊ/ /oʊ/, /ɝ/ /ɚ/ | Cutting diphthongs short; American r |
| 5 | Consonants A: stops and fricatives | /p b t d k g/, /f v/, /θ ð/, /s z/, /ʃ ʒ/, /h/ (15 sounds) | th replaced by t/d or s/z; v vs b; sh vs s |
| 6 | Consonants B + common pairs + reading IPA | /tʃ dʒ/, /m n ŋ/, /l r/, /w j/ (9 sounds, total 24), plus confusable pairs; reading IPA | r vs l; ch vs j; -ng |

### Stage 2: Connected Speech (lessons 7 to 12)

| # | Lesson | Target items |
|---|---|---|
| 7 | Word stress | Stressed syllable in 2 to 4 syllable words; noun/verb pairs (REcord / reCORD); suffix patterns (-tion, -ic, -ity); compound nouns |
| 8 | Sentence stress | Content words (nouns, main verbs, adjectives, adverbs) vs function words; why English sounds uneven |
| 9 | Reduction and schwa | Weak forms of to, of, and, for, can, the, a; can vs can't |
| 10 | Linking | Consonant to vowel (pick it up), vowel to vowel with a glide (go out, I am), same sound repeated |
| 11 | Final sounds and consonant clusters | Final stops; -ed endings (/t/ /d/ /ɪd/); -s endings (/s/ /z/ /ɪz/); clusters (texts, asked, months) |
| 12 | American T and sound changes | Flap T (water, city), held/glottal T (button), nt reduction (center); did you, don't you, want to, got to |

### Stage 3: Rhythm & Intonation (lessons 13 to 15)

| # | Lesson | Target items |
|---|---|---|
| 13 | Rhythm and thought groups | Stress-timed rhythm; splitting sentences into meaningful chunks; pausing between groups |
| 14 | Key words and pitch | Choosing the key word; pitch peak on it; contrastive stress ("I said *blue*, not green") |
| 15 | Intonation patterns | Falling for statements and wh-questions; rising for yes/no questions; lists; showing emotion and attitude |

### Stage 4: Final Integration (lesson 16)

| # | Lesson | Target items |
|---|---|---|
| 16 | Real-life speaking | 60-second self-introduction, a phone-call roleplay, a mini presentation; use a combined checklist covering all 6 skills |

---

## 5. Lesson design

### 5.1 The five-step loop

Every lesson follows the same loop, which mirrors the course's teach, practice, correct, homework flow:

1. **Watch.** A short YouTube explainer (3 to 8 minutes).
2. **Repeat.** 5 to 10 practice words and 5 sentences, each with a replayable model voice.
3. **Shadow.** A short clip (10 to 30 seconds) loops at 0.75x or 1x while you speak along.
4. **Record.** One tap records voice (or voice and video).
5. **Compare.** Play the model and your take side by side, tick the self-check, then discard.

### 5.2 Self-check checklists

Each lesson has a 3-item checklist, written as observable things, for example:

- Lesson 5 (th): "My tongue tip touched my teeth for *think* and *this*." / "I heard a difference between *think* and *sink*." / "I held the sound long enough."
- Lesson 8 (sentence stress): "The nouns and main verbs were louder and longer than the little words."
- Lesson 15 (intonation): "My yes/no question went up at the end; my statement went down."

The Stage 4 checklist uses the course's 6 skills: sound accuracy, mouth shape and final sounds, stress, connected speech, rhythm and chunking, intonation.

### 5.3 Making it better than the source

| Source course limit | Our improvement |
|---|---|
| Live class at fixed times | Anytime, any phone |
| Correction only by a human | Self-compare plus targeted checklists and slow-motion replay |
| Group of 15 to 20 | Unlimited practice reps, no waiting for a turn |
| Materials behind sign-up | Free and public |
| One teacher's voice | Multiple creators' voices so learners hear variety |

---

## 6. Screens and navigation

URL routes are plain paths so any lesson can be shared as a link. No data is stored between visits.

| Screen | Route | Purpose |
|---|---|---|
| Home | `/` | 4 stages as cards, link to Starter check and IPA chart |
| Stage | `/stage/:n` | Lessons in that stage with one-line descriptions |
| Lesson | `/lesson/:n` | The five-step loop, one step visible at a time on phones |
| IPA chart | `/ipa` | Tap a symbol: example words, model audio, mouth-position note, linked clip |
| Starter check | `/start` | Passage, recorder, issue checklist |
| About and credits | `/about` | Course inspiration, creator credits, privacy note ("recordings never leave your device") |

### Lesson screen layout (phone, portrait)

1. Header: lesson number, title, back
2. Step bar: Watch, Repeat, Shadow, Record, Compare (tap to jump)
3. Main area for the current step
4. Sticky bottom bar: Previous / Next

### Interface rules

- Large tap targets (at least 44 px), readable text size, high contrast
- A short "Use headphones when shadowing" note on the Shadow and Record steps (see section 7.3)
- Clear permission prompts: explain why the mic/camera is needed before asking the browser
- A visible "Discard" button after every recording, and automatic discard on leaving the lesson

---

## 7. Technical design

### 7.1 Architecture

A static website. No backend, no database, no accounts.

| Piece | Where it lives | Notes |
|---|---|---|
| Web app (HTML/JS/CSS) | Free static host with Vercel| Must be served over HTTPS (browsers require it for mic and camera) |
| Lesson content | JSON files in the code repository (GitHub) | One file per lesson; adding a lesson needs no code change |
| Videos | YouTube, embedded via the IFrame Player API | Not hosted by us |
| Model voice for words/sentences | Browser speech synthesis (en-US voice) | Free; quality varies by device; use video clips for key sounds |
| Recordings | Browser memory only | Never uploaded; revoked and freed on discard |

**Suggested stack** (change freely): Vite + React + TypeScript + Tailwind CSS. Keep dependencies few.

### 7.2 Lesson data format

One JSON file per lesson. Example:

```json
{
  "id": 5,
  "stage": 1,
  "title": "Consonants A: stops and fricatives",
  "summary": "th, s/z, sh, v and the other stops and fricatives.",
  "watch": {
    "videoId": "YOUTUBE_VIDEO_ID",
    "creator": "Creator name",
    "creatorUrl": "https://www.youtube.com/@example",
    "start": 0,
    "end": null
  },
  "repeat": {
    "words": ["think", "sink", "this", "these"],
    "sentences": ["I think this is the third thing."]
  },
  "shadow": {
    "videoId": "YOUTUBE_VIDEO_ID",
    "start": 45,
    "end": 62,
    "defaultSpeed": 0.75
  },
  "selfCheck": [
    "My tongue tip touched my teeth for think and this.",
    "I could hear a difference between think and sink.",
    "I finished each word without dropping the last sound."
  ]
}
```

Replace the placeholder video IDs and creator details with real ones when content is added.

A separate `ipa.json` holds the chart: symbol, type (vowel/consonant), 3 example words, a short mouth-position note, and an optional video clip with start and end seconds.

### 7.3 Video player and shadowing

- Use the YouTube IFrame Player API. It lets the app set playback speed, jump to a time, read the current time and respond to play/pause.
- **Loop a clip:** poll the current time and seek back to `start` when it passes `end` (more reliable than the player's own start/end parameters across devices).
- **Speed buttons:** 0.5x, 0.75x, 1x (only offer speeds the player reports as available for that video).
- **Echo problem:** when the speakers play the model and the mic is on, your recording picks up the model voice. Tell learners to **use headphones** while shadowing and recording. The app cannot capture the YouTube audio directly, so recordings will contain only the mic.
- **Embedding can fail:** some creators disable embedding or remove videos. Show a clear message and a "Watch on YouTube" link instead of a blank player.

### 7.4 Recorder

- Use `navigator.mediaDevices.getUserMedia` for mic (audio) or mic + camera (video), and `MediaRecorder` to capture.
- Pick a supported format with `MediaRecorder.isTypeSupported(...)` (Chrome/Firefox typically WebM; Safari typically MP4). Do not hard-code one format.
- Keep the recording as a `Blob` in memory and play it back through an object URL. On discard or on leaving the lesson, call `URL.revokeObjectURL` and drop the reference.
- Cap length (suggest 2 minutes for video, 5 minutes for audio) to avoid memory problems on phones.
- Stop and release the mic/camera tracks when finished so the browser's recording indicator turns off.
- Handle: permission denied, no mic found, device in use, tab hidden during recording.
- **Compare view:** two players stacked (model clip on top, your take below) with a single "Play both" button and synced replay of the same short segment.
- No download or upload button in v1.

### 7.5 Model voice for practice items

- Use `speechSynthesis` with an `en-US` voice. Offer a normal and a slow rate.
- Voices differ by device and some are poor on connected-speech examples; for the sounds that matter most (th, r, American T), prefer clips from the videos.
- If no en-US voice exists, hide the speaker button for that item and show a note.

### 7.6 Privacy and storage rules

- No cookies, no `localStorage`, no `sessionStorage`, no IndexedDB, no service-worker caching of user data.
- No analytics in v1. If you add any later, use a privacy-friendly one with no personal data and say so on the About page.
- The YouTube player may set its own cookies; use the privacy-enhanced embed domain (`youtube-nocookie.com`) where possible.
- About page states plainly: recordings stay on your device and are deleted when you leave.

### 7.7 Browser support

| Browser | Target |
|---|---|
| Chrome (desktop and Android) | Full support |
| Safari (macOS and iOS 15+) | Full support, test recorder formats carefully |
| Firefox (desktop) | Full support except speech recognition (not used in v1) |
| Edge | Same as Chrome |

### 7.8 Accessibility

- Every audio/video step has a text version of the practice items on screen.
- Keyboard-operable controls, visible focus, labelled buttons, sufficient contrast.
- Do not rely on color alone for correct/incorrect states.

---

## 8. Content plan

### 8.1 Sourcing videos

Follow the course structure; fill each slot with public creator videos. For each lesson:

1. Find 2 to 3 candidate explainers on the lesson topic from reputable English-pronunciation teachers.
2. Check each is **embeddable** (the player loads inside another site) and clear, accurate and not too long.
3. Pick one for **Watch** and, where possible, a different short clip with natural speech for **Shadow**.
4. Record creator name and channel link in the lesson JSON so the app can credit them.

Rules:
- Embed with the official player only. Do not download, re-upload or re-host any video.
- Do not copy TE English's videos, slides, texts or worksheets. We follow their topic order only.
- Write the practice words, sentences and self-checks yourself.
- If a creator asks for removal, remove it promptly.
- This is not legal advice; if the app grows large, review embedding terms and attribution norms again.

### 8.2 Link-rot control

Videos disappear or get embedding disabled. Add a small script (run by you, before releases) that checks each video ID in the lesson files and lists any that fail to load. Keep one backup candidate per lesson in a `backups` field.

### 8.3 Content checklist per lesson

- [ ] Explainer video chosen, embeddable, credited
- [ ] Shadow clip with start/end seconds tested at 0.75x and 1x
- [ ] 5 to 10 practice words, including at least 2 minimal pairs where relevant
- [ ] 5 sentences that contain the target sound or pattern several times
- [ ] 3-item self-check
- [ ] Read aloud by someone else once to catch awkward items

### 8.4 Starter check passage

Use a short passage (about 60 to 80 words) that you write yourself, containing a spread of problem sounds (th, r/l, final consonants, -ed, -s, clusters, stress-shifting words). Do not use a published passage unless its licence allows it.

---

## 9. Build phases with acceptance criteria

Each phase ends with something you can open and test on your phone.

| Phase | Name | Deliverable | Done when |
|---|---|---|---|
| 1 | App shell | Home, stage, lesson template, routing, lesson JSON loader, About page | Can open `/lesson/1` with placeholder content on phone and desktop; layout fits narrow screens |
| 2 | Video player | YouTube embed, speed buttons, clip loop with start/end, fallback when embedding fails | A clip loops cleanly at 0.75x and 1x; a bad video shows the fallback, not a blank box |
| 3 | Recorder | Audio and video recording, playback, discard, compare view | Record 30 seconds on iPhone Safari and Android Chrome; play back; discard; no data remains after reload |
| 4 | Stage 1 content + IPA chart | Lessons 1 to 6, interactive IPA chart | Full five-step loop works on all six lessons; tapping any chart symbol plays examples |
| 5 | Stages 2 and 3 content | Lessons 7 to 15 | Same loop works; checklists reviewed |
| 6 | Stage 4 and starter check | Lesson 16, Stage 0 | Learner can complete the starter check and the final speaking tasks |
| 7 | Polish and launch | Accessibility pass, performance pass, About page text, public link | Passes the testing plan in section 10; link works from a clean browser |
| 8 | Later, optional | Speech-recognition check (section 13) | Only start once phases 1 to 7 are stable |

Tip: finish the whole loop for lesson 5 (a clear, concrete sound) in phases 1 to 4 before filling in other lessons. A working single lesson exposes most problems early.

---

## 10. Testing plan

### 10.1 Functional

- Each lesson loads with no console errors
- Video loops at the right times; speed buttons work; fallback shows when a video is unavailable
- Practice item audio plays; behaves sensibly when no voice is available
- Recorder: start, stop, play, discard, retry; permission denied; no camera
- Compare view plays the model and the take together
- Navigating away or closing the tab stops the mic/camera indicator

### 10.2 No-storage check (must pass before launch)

- In browser dev tools, confirm empty cookies (other than YouTube's embed), `localStorage`, `sessionStorage`, IndexedDB and cache after a full session
- Reload after recording; nothing remains
- Network tab shows no upload of audio or video

### 10.3 Device matrix

| Device | Browser |
|---|---|
| iPhone (iOS 15 or later) | Safari |
| Android phone | Chrome |
| Windows or Mac laptop | Chrome, Firefox, Edge, Safari |

### 10.4 Learner test

Ask 3 to 5 Vietnamese-speaking learners to do one lesson without help. Record where they hesitate (not their voice, your notes). Fix the top 3 confusions.

---

## 11. Risks and mitigations

| Risk | Impact | Mitigation |
|---|---|---|
| Creator disables embedding or deletes a video | Lesson has no explainer | Fallback message + backup candidate per lesson + pre-release link check |
| Recorder differences across browsers (formats, iOS quirks) | Recording fails on some phones | Feature-detect formats; test on real iOS and Android early (phase 3) |
| Echo from speakers during shadowing | Recording is hard to compare | Headphone reminder; keep compare view for model vs take, not mixed audio |
| Browser speech synthesis sounds unnatural | Poor model for connected speech | Use real clips for key sounds; make synthesized voice a convenience, not the reference |
| Memory use from long recordings on phones | Crashes | Recording length caps; free the Blob on discard |
| Without saved progress, learners lose their place | Lower retention | Deep links to each lesson; clear lesson numbers; revisit if users ask (section 13) |
| Content quality varies between creators | Confusing instruction | Pick 1 primary creator per stage where possible; review each video before adding |
| Self-compare gives no correction | Learners may not notice errors | Specific checklists, slow replay and listening prompts; consider speech check later |
| Accuracy of phonetic content | Teaching wrong sounds | Pick one reference chart; have a teacher or fluent speaker review lesson text before launch |

---

## 12. Open items

| Item | Status | Notes |
|---|---|---|
| Which vibe-coding tool you will use | Open | Does not change the plan |
| Final list of the 20 vowels to teach | Open | Choose a General American reference chart before lessons 2 to 4 |
| Who reviews phonetic accuracy | Open | A teacher or fluent speaker should read the lesson text and practice items once |
| Domain name and hosting account | Open | Free host subdomain is fine for launch |
| App name | Open | Avoid "TE English" or their course name |

Answered: video source (creator public videos), progress tracking (none for now), interface language (English only), audience (free for everyone), recordings (not kept), feedback (self-compare first), platform (web app on phone).

---

## 13. Later ideas

Only after v1 is stable. Each respects or consciously changes a decision above.

| Idea | Changes a decision? | Notes |
|---|---|---|
| Speech-recognition check: show what the browser heard when you say a practice sentence | No (nothing stored) | Works best in Chrome; some browsers send audio to a speech service, so say so in the About page |
| "Copy my results" button for self-checks | No (user-initiated, nothing stored by app) | Lets people paste their checklist into their own notes |
| Optional progress checkmarks kept on the device | **Yes** (reverses "no tracking" and "nothing local") | Only if users ask |
| Pronunciation scoring API | **Yes** (audio leaves the device) | Needs privacy notice and cost plan |
| Vietnamese interface | **Yes** | Add a translation layer |
| Coach sharing links | **Yes** (needs storage) | Only if you drop the no-storage rule |

---

## 14. Kickoff prompt for your coding tool

Paste this into your vibe-coding tool to start phase 1. Then work phase by phase; do not ask for everything at once.

```text
Build a static web app (Vite + React + TypeScript + Tailwind) called "Accent Trainer".

Rules:
- English interface only.
- No backend, no accounts, no analytics.
- Do NOT use cookies, localStorage, sessionStorage or IndexedDB. Nothing is saved.
- Mobile-first layout; must also work on desktop.

Phase 1 only:
- Routes: / (home with 4 stage cards), /stage/:n, /lesson/:n, /ipa, /start, /about.
- Load lesson content from /public/lessons/lesson-N.json.
- Lesson page shows 5 steps (Watch, Repeat, Shadow, Record, Compare) with a step bar and Previous/Next. Steps can show placeholders for now.
- About page explains that recordings never leave the device and are deleted when you leave.
- Include a sample lesson-1.json matching the schema in PLAN.md section 7.2.

Do not build the player or recorder yet. Keep the code simple and well commented.
```

Next prompts, one per phase: "Add the YouTube IFrame player with speed buttons and a looping clip between start and end seconds, with a fallback if the video can't be embedded", then "Add an in-browser recorder with playback and discard, no saving", and so on, using the acceptance criteria in section 9.
