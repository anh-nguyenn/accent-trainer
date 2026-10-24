# Accent Trainer

A free, mobile-first American English pronunciation practice app built from [PLAN.md](./PLAN.md). It has 16 lessons, an interactive 44-target IPA chart, a starter check, YouTube-based watch and shadow steps, browser speech synthesis, and in-memory audio/video recording.

## Run locally

```sh
npm install
npm run dev
```

Open `http://localhost:5173`. Recording requires localhost or HTTPS. For a production build, run `npm run build`; the static output is in `dist/`. The included `vercel.json` makes direct lesson URLs work on Vercel.

## Content and privacy

Lesson files live in `public/lessons/lesson-N.json`, with summaries in `public/lessons/index.json`. IPA targets live in `public/ipa.json`. The app does not use a backend, analytics, cookies, browser storage, or a service worker. Recordings are kept only in tab memory and discarded on navigation, reload, or discard. The YouTube embed is requested from `youtube-nocookie.com`; YouTube may still process viewer data under its own policies.

Explanations use credited public pronunciation videos. Later shadow steps prioritize natural speech by Asian American creators from Wong Fu Productions and The Asian American Foundation. If a video cannot play in the embed, the app offers its YouTube link. Browser-generated en-US speech is only a convenience model and varies by device.

## Checks

```sh
npm run check:content
npm run check:content -- --online
npm run build
```

The online check uses YouTube oEmbed to catch removed or inaccessible IDs. It cannot prove that each video will embed on every browser, so test the watch and shadow steps on a phone before launch. Also test microphone and camera permissions on iPhone Safari and Android Chrome.
