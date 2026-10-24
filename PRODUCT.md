# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Vietnamese-speaking adult learners of American English who want clearer, more natural speech and are practicing on their own, usually on a phone. They may be preparing for work, study, or everyday life in the United States and want to work on the specific sounds and rhythms that Vietnamese speakers often find difficult. They practice in short, self-directed sessions and expect to begin without an account, a placement test, or a schedule.

## Product Purpose

Accent Trainer is a free, private place to practice American English pronunciation. It follows the four-stage arc of TE English's *American Accent Training* course (IPA and individual sounds, connected speech, rhythm and intonation, final integration) across 16 lessons. Each lesson asks the learner to watch, repeat, shadow, record, and compare their own take against a model. Success means a learner can open a lesson on a phone, work through the loop, and compare their recording in under two minutes without reading instructions, and leave knowing what to notice next time.

## Positioning

Learners hear and shadow real Asian American creators, not one generic textbook voice. The app treats model voices as a range of real examples rather than a single correct accent, and pairs that with private self-comparison: nothing is scored automatically and nothing is saved.

## Operating Context

- Phone-first practice, typically one learner alone, often with headphones to keep the model voice out of recordings.
- The five-step loop per lesson: Watch (credited YouTube explainer), Repeat (words and sentences with browser speech), Shadow (looped clip at reduced speed), Record, Compare.
- An interactive 44-target IPA chart and an optional Stage 0 starter check support the lessons.
- English-only interface. No sign-in, no teacher, no fixed class time.
- The 16-lesson order is fixed; adding a lesson must not require a code change.

## Capabilities and Constraints

- Static web app: no backend, database, accounts, analytics, cookies from the app, or saved progress.
- Recordings are captured with `MediaRecorder` and held only in tab memory; discarded on leaving the lesson or tab. Media tracks are stopped after use. Length caps: 2 minutes video, 5 minutes audio.
- Model voice for words and sentences uses browser `speechSynthesis` with an en-US voice; it varies by device and is a convenience, not the reference. Hide the control and explain when no en-US voice exists.
- Videos are embedded only, via the YouTube IFrame Player API and `youtube-nocookie.com`; never downloaded or re-hosted. Fallback link when embedding is unavailable. Each lesson keeps a backup video candidate.
- Speech-recognition scoring is out of scope for v1. Self-comparison and written checklists replace human correction.
- Free, with no payments, ads, or sign-up.
- Delivery is a Vite + React + TypeScript static site; lesson content lives in `public/lessons/lesson-N.json` with summaries in `public/lessons/index.json`, and IPA targets in `public/ipa.json`.
- Undecided: production domain and hosting account (a free host subdomain is acceptable for launch).

## Brand Commitments

- Name: Accent Trainer. Brand mark and wordmark in the current UI are the confirmed identity.
- Voice: warm, plain, and encouraging. It acknowledges that any accent can carry a clear, confident voice and invites the learner to choose the sounds that serve their goals; no hype, no shame, no "fix your accent" framing.
- There is no single Asian American accent; model clips are examples of real voices, not a standard to imitate exactly.
- Creators are credited in the UI and in lesson data. The app does not copy TE English's videos, slides, text, or worksheets; the topic order is the only debt.
- Interface copy stays in English.

## Evidence on Hand

- 16 complete lesson files in `public/lessons/`, with watch clips, practice words and sentences, shadow clips, self-check items, and backup videos.
- `public/ipa.json`: 44 teaching targets (20 vowel targets, 24 consonants) with examples, mouth-position notes, and linked lessons.
- `public/stages.json` and the four-stage, 16-lesson structure.
- Real credited public videos from Rachel's English, Wong Fu Productions, and The Asian American Foundation.
- Phonetic lesson text and practice items have been reviewed for accuracy by a teacher or fluent speaker.
- No testimonials, customer counts, benchmarks, or usage analytics exist; future work must not fabricate them.

## Product Principles

1. Practice, not judgment: the learner is the listener. Give them a model, a recording, and specific things to notice, never a score that claims authority over their accent.
2. Privacy is the product: if a feature would save something about the learner, it belongs outside v1.
3. Remove every gate: free, no account, no schedule, no waiting for a turn, unlimited repetitions.
4. Structure that carries: keep the proven course arc, but write all practice material originally and credit every public voice.
5. Respect variation: present voices and sound targets as a range of real American English, not one correct accent.

## Accessibility & Inclusion

- Large tap targets (at least 44 px), readable text, high contrast, and keyboard-operable controls with visible focus and labelled buttons.
- Every audio or video step has its text version on screen.
- Never rely on color alone to convey correct or incorrect state.
- Explain why the microphone or camera is needed before the browser permission prompt.
- Target browsers: Chrome on desktop and Android, Safari on macOS and iOS 15+, Firefox on desktop, Edge.
