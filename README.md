# Accent Trainer

[![CI](https://github.com/anh-nguyenn/accent-trainer/actions/workflows/ci.yml/badge.svg)](https://github.com/anh-nguyenn/accent-trainer/actions/workflows/ci.yml)

**A free, private practice space for American English pronunciation.** Work through 16 lessons from individual sounds to everyday speech. Watch a model, repeat, shadow, record yourself, and compare. No account or saved progress.

Natural speech clips feature Asian American creators, including [Wong Fu Productions](https://www.youtube.com/@wongfuproductions) and [The Asian American Foundation](https://www.youtube.com/@TAAForg). Sound demonstrations feature [Rachel's English](https://www.youtube.com/@rachelsenglish). These are examples of real voices; there is no single Asian American accent.

## What you can do

| Feature | Details |
| --- | --- |
| Follow a clear path | Four stages and 16 lessons: sounds, connected speech, rhythm and intonation, then real-life speaking. |
| Practice each lesson | Watch, repeat, shadow a short loop, record, and self-compare with a focused checklist. |
| Explore sounds | Interactive IPA chart with 20 vowel targets and 24 consonants, examples, and mouth-position notes. |
| Check your starting point | Read a short passage, listen back, and choose what to practice. |
| Keep control of your take | Record audio or video in your browser, replay it, and discard it. |

### Privacy by design

The app has no backend, accounts, analytics, or progress storage. Recordings stay in browser memory; they are not uploaded and are discarded when you leave the lesson or close the tab. Microphone and camera access are requested only when you choose to record. YouTube embeds use `youtube-nocookie.com`, although YouTube may process viewer data under its own policies.

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

`npm run build` writes the static site to `dist/`. The online video check catches unavailable IDs, but it does not prove a video will embed or play on every device. The repository includes [Vercel rewrites](./vercel.json) for direct lesson URLs. Before a public release, test video playback and recording permissions on iPhone Safari and Android Chrome.

## Project layout

```text
src/                 React app and styles
public/lessons/      One JSON file per lesson, plus the lesson index
public/ipa.json      Sound chart content
public/stages.json   Four-stage navigation content
scripts/             Content validation
.github/             CI and contribution templates
```

Lesson text and IPA targets are maintained as data, so content edits do not require changing the React components. See [CONTRIBUTING.md](./CONTRIBUTING.md) for the content format and review checklist.

## Credits and scope

The lesson order is inspired by the public outline of TE English's *American Accent Training* course. Practice words, sentences, and self-checks in this project are original; the project is independent of TE English. Videos remain on YouTube and are embedded with creator credit. [PLAN.md](./PLAN.md) describes the product scope, [PRODUCT.md](./PRODUCT.md) records product decisions, and [DESIGN.md](./DESIGN.md) documents the interface.

**Current status:** The static build and content checks pass. Real-device video, microphone, and camera testing is still needed before calling the app launch-ready. Pronunciation content also needs an independent educator review.
