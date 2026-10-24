# Accent Trainer

[![CI](https://github.com/anh-nguyenn/accent-trainer/actions/workflows/ci.yml/badge.svg)](https://github.com/anh-nguyenn/accent-trainer/actions/workflows/ci.yml)

**A free, private practice space for American English pronunciation.** Work through 16 lessons from individual sounds to everyday speech. Watch a model, repeat, shadow, record yourself, and compare. No account or saved progress.

Natural speech clips feature Asian American creators, including [Wong Fu Productions](https://www.youtube.com/@wongfuproductions) and [The Asian American Foundation](https://www.youtube.com/@TAAForg). Sound demonstrations feature [Rachel's English](https://www.youtube.com/@rachelsenglish). These are examples of real voices; there is no single Asian American accent.

## What you can do

| Feature | Details |
| --- | --- |
| Follow a clear path | Four stages and 16 lessons: sounds, connected speech, rhythm and intonation, then real-life speaking. |
| Practice each lesson | Watch, repeat, shadow a short loop, record, and self-compare with a focused checklist. |
| Drill with course audio | 386 audio drills with printable PDF handouts, grouped by sound and mapped to the 16 lessons. Record your own take in the Drills step and delete it when you are done. |
| Explore sounds | Interactive IPA chart with 20 vowel targets and 24 consonants, examples, and mouth-position notes. |
| Check your starting point | Read a short passage, listen back, and choose what to practice. |
| Keep control of your take | Record audio or video in your browser, replay it, and discard it. |
| Shadow your own video | Paste a YouTube link, add a transcript, and practice line by line with loop, pause, and speed controls. |

### Privacy by design

The app has no backend, accounts, analytics, or progress storage. Recordings stay in browser memory; they are not uploaded and are discarded when you leave the lesson or close the tab. Microphone and camera access are requested only when you choose to record. YouTube embeds use `youtube-nocookie.com`, although YouTube may process viewer data under its own policies. Links and transcripts pasted into the Shadow lab stay in tab memory and are discarded when you leave the page.

### Shadow lab

Open **Shadow lab** from the home page, a lesson’s Shadow step, or the footer. Paste a YouTube link, then optionally add a transcript. Copy it from YouTube’s **Show transcript** panel, or paste an `.srt` or `.vtt` file, to unlock line-by-line play, repeat, and auto-pause. The app cannot read YouTube captions itself; a script without timestamps still displays for continuous shadowing.

## Run locally

**Requirements:** Node.js 20 or newer and npm. Use `localhost` or HTTPS for microphone and camera access.

```bash
npm ci
npm run dev
```

Open <http://localhost:5173>. The site works without a backend; an internet connection is needed for YouTube videos and the web font. Browser speech synthesis uses an available en-US voice and may sound different on each device.

## Checks and production build

```bash
npm run check:content                # lesson structure and IPA inventory
npm run check:content -- --online    # also checks YouTube video IDs via oEmbed
npm run build                        # TypeScript check and static build
```

`npm run build` writes the static site to `dist/`. The online video check catches unavailable IDs, but it does not prove a video will embed or play on every device. Before a public release, test video playback and recording permissions on iPhone Safari and Android Chrome.

## Deploy

Pushes to `main` deploy the site to GitHub Pages at <https://anh-nguyenn.github.io/accent-trainer/>. The workflow builds with `VITE_BASE=/accent-trainer/`, copies `index.html` to `404.html` so lesson and stage links load directly, and publishes `dist/`.

The Pages build depends on the repository subpath. If the repository is renamed or moved to a custom domain, update `VITE_BASE` in [`.github/workflows/pages.yml`](./.github/workflows/pages.yml). Root-hosted builds keep the default `/` base; the repository also includes [Vercel rewrites](./vercel.json) for direct lesson URLs.

## Project layout

```text
src/                 React app and styles
public/lessons/      One JSON file per lesson, plus the lesson index
public/ipa.json      Sound chart content
public/stages.json   Four-stage navigation content
public/media/drills/ Course MP3 drills and PDF handouts, grouped by sound
scripts/             Content validation and media import
.github/             CI and contribution templates
```

Lesson text and IPA targets are maintained as data, so content edits do not require changing the React components. Drill media is generated from the raw Drive download with `npm run import:media`; the raw files stay in `source-media/`, which is gitignored. See [CONTRIBUTING.md](./CONTRIBUTING.md) for the content format and review checklist.

## Credits and scope

The lesson order is inspired by the public outline of TE English's *American Accent Training* course. Practice words, sentences, and self-checks in this project are original; the project is independent of TE English. Videos remain on YouTube and are embedded with creator credit. Course audio drills and handouts are © Rebecca Bower / PROactive Pronunciation and are used with written permission. [PLAN.md](./PLAN.md) describes the product scope, [PRODUCT.md](./PRODUCT.md) records product decisions, and [DESIGN.md](./DESIGN.md) documents the interface.

The deployed site includes about 700 MB of 64 kbps MP3 drills and 166 MB of PDF handouts. That fits under GitHub Pages' 1 GB published-site limit but leaves little headroom for new media.

**Current status:** The static build, content checks, and online video checks pass. The site is deployed to GitHub Pages. Real-device video, microphone, and camera testing is still needed before calling the app launch-ready. Pronunciation content also needs an independent educator review.
