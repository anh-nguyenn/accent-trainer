---
name: Accent Trainer
description: A warm, private practice room for American English pronunciation
colors:
  oat-paper: "#f7f6f2"
  oat-soft: "#f2f1ec"
  oat-deep: "#eeeae2"
  ink: "#202623"
  ink-muted: "#5d6660"
  hairline: "#e1e3dc"
  eucalyptus-ink: "#202b27"
  eucalyptus-deep: "#3b564a"
  eucalyptus-focus: "#39796a"
  terracotta: "#d9765e"
  terracotta-deep: "#a85a47"
  clay-wash: "#edb9a8"
  blush-wash: "#fae3dc"
  periwinkle-wash: "#e7e9f5"
  sage-wash: "#e4efdc"
  sand-wash: "#f5e9d4"
  sage-paper: "#e8eee5"
  white: "#ffffff"
typography:
  display:
    fontFamily: "DM Serif Display, Georgia, serif"
    fontSize: "clamp(56px, 6vw, 88px)"
    fontWeight: 400
    lineHeight: 0.99
    letterSpacing: "-2px"
  headline:
    fontFamily: "DM Serif Display, Georgia, serif"
    fontSize: "44px"
    fontWeight: 400
    lineHeight: 1.08
    letterSpacing: "-1px"
  title:
    fontFamily: "DM Serif Display, Georgia, serif"
    fontSize: "27px"
    fontWeight: 400
    lineHeight: 1.1
    letterSpacing: "normal"
  body:
    fontFamily: "DM Sans, Helvetica Neue, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.7
    letterSpacing: "normal"
  label:
    fontFamily: "DM Sans, Helvetica Neue, sans-serif"
    fontSize: "11px"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "2px"
rounded:
  xs: "4px"
  sm: "5px"
  md: "6px"
  lg: "7px"
  xl: "8px"
  arch: "120px 120px 8px 8px"
  round: "50%"
spacing:
  xxs: "4px"
  xs: "8px"
  sm: "12px"
  md: "16px"
  lg: "24px"
  xl: "32px"
  2xl: "48px"
  3xl: "80px"
  section: "105px"
components:
  button-primary:
    backgroundColor: "{colors.eucalyptus-ink}"
    textColor: "{colors.white}"
    rounded: "{rounded.md}"
    padding: "14px 19px"
    height: "48px"
  button-primary-hover:
    backgroundColor: "{colors.eucalyptus-deep}"
    textColor: "{colors.white}"
  button-soft:
    backgroundColor: "{colors.oat-soft}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    padding: "14px 19px"
    height: "48px"
  button-light:
    backgroundColor: "{colors.white}"
    textColor: "{colors.eucalyptus-ink}"
    rounded: "{rounded.md}"
    padding: "14px 19px"
    height: "48px"
  nav-cta:
    backgroundColor: "{colors.oat-paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    padding: "12px 16px"
    height: "48px"
  stage-card:
    backgroundColor: "{colors.blush-wash}"
    textColor: "{colors.ink}"
    rounded: "{rounded.lg}"
    padding: "21px"
    height: "385px"
  lesson-row:
    backgroundColor: "{colors.oat-paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.xs}"
    padding: "21px 10px"
    height: "76px"
  step-tab-selected:
    backgroundColor: "{colors.white}"
    textColor: "{colors.eucalyptus-ink}"
    rounded: "{rounded.md}"
    padding: "0 12px"
    height: "59px"
  filter-pill-active:
    backgroundColor: "{colors.eucalyptus-deep}"
    textColor: "{colors.white}"
    rounded: "{rounded.xs}"
    padding: "7px 11px"
    height: "36px"
  sound-tile:
    backgroundColor: "{colors.oat-paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.sm}"
    padding: "10px 14px"
    height: "56px"
  ipa-symbol:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    size: "65px"
  checkbox-checked:
    backgroundColor: "{colors.eucalyptus-deep}"
    textColor: "{colors.white}"
    rounded: "{rounded.xs}"
    size: "21px"
---

# Design System: Accent Trainer

## Overview

**Creative North Star: "The Warm Practice Room"**

Accent Trainer should feel like a quiet room you can practice in without being watched: warm paper underfoot, eucalyptus-green calm, and a single terracotta mark that feels hand-made. The room is editorial rather than clinical. A high-contrast serif carries the emotional, human side of speech; a compact sans runs every control, label, and instruction. Nothing looks scored, gamified, or urgent.

The system is spacious at the front door and increasingly focused once practice begins. Marketing and index surfaces breathe on oat paper with generous vertical gaps and oversized headlines; the lesson surface narrows to a 920px column and switches to white so the work itself feels like a sheet placed on the desk. The four pastel stage washes are the only broad color events, and they behave like labeled folders rather than decoration.

Material character is flat paper with printed accents. Separations are hairline rules, not shadows. Depth appears in two deliberate places: the hard offset shadow under the hero's arched speech card, which reads like a print block lifted off the page, and a soft lift under cards on hover. Motion is short and restrained: 150–200ms, a 2–5px rise, never bounce.

**Key Characteristics:**
- Warm oat paper, deep eucalyptus ink, one terracotta accent.
- Serif display at large sizes; sans for every interactive or small element.
- Flat surfaces, hairline borders, and two sanctioned shadows.
- Four pastel stage washes used as identity, never as generic fills.
- Phone-first practice with 44px targets and visible, high-contrast focus.

## Colors

The palette is a warm neutral field interrupted by deep green for action, terracotta for human emphasis, and four low-chroma pastels that name the stages.

### Primary
- **Eucalyptus Ink** (`eucalyptus-ink`): Primary button fill, strong display text, and the darkest interface tone. It reads nearly black-green, so actions feel grounded rather than corporate.
- **Eucalyptus Deep** (`eucalyptus-deep`): The banner surface, primary hover, selected pill, and checked checkbox. This is the "committed" green.
- **Eucalyptus Focus** (`eucalyptus-focus`): The 3px keyboard focus ring, offset 3px. Never used as a fill.

### Secondary
- **Terracotta** (`terracotta`): Brand mark bars, italic display words, the accent period, and lesson numerals. It is the human signature, not an action color.
- **Terracotta Deep** (`terracotta-deep`): Eyebrow text, hover text on links, and small emphasis that needs more contrast than the bright terracotta.
- **Clay Wash** (`clay-wash`): The hero arch field behind the speech card.

### Tertiary
- **Blush Wash** (`blush-wash`): Stage 1 card and stage intro.
- **Periwinkle Wash** (`periwinkle-wash`): Stage 2 card and stage intro.
- **Sage Wash** (`sage-wash`): Stage 3 card and stage intro.
- **Sand Wash** (`sand-wash`): Stage 4 card and stage intro.

### Neutral
- **Oat Paper** (`oat-paper`): Page canvas, header, footer, and resting card fill.
- **Oat Soft** (`oat-soft`): Secondary button fill and quiet control backgrounds.
- **Oat Deep** (`oat-deep`): The hero's offset print shadow and quiet tonal fills.
- **Sage Paper** (`sage-paper`): Reading and reference panels (passage card, IPA detail, about-end banner).
- **Ink** (`ink`): Body text and default icon color.
- **Ink Muted** (`ink-muted`): Supporting copy, captions, and metadata.
- **Hairline** (`hairline`): 1px section dividers, card borders, tab borders, and input outlines.
- **White** (`white`): Only the focused practice surface and content cards that sit on oat paper.

### Named Rules

**The One Warm Accent Rule.** Terracotta is a signature, not a button. Keep it to identity marks, italic display words, eyebrows, numbering, and the selected-tab underline; never fill a primary action with it.

**The Paper First Rule.** The page canvas is warm oat paper. White is reserved for the focused practice surface and cards that need to lift off the paper; do not stack white on white.

**The Four Beds Rule.** The four stage washes identify a stage and its intro. They are never used for status, error, success, or generic section backgrounds.

**The Green Means Act Rule.** Deep eucalyptus marks anything the learner can commit to: primary buttons, selected filters, checked boxes, the start banner. Focus uses the brighter eucalyptus, never terracotta.

## Typography

**Display Font:** DM Serif Display (with Georgia, serif)
**Body Font:** DM Sans (with Helvetica Neue, sans-serif)
**Label Font:** DM Sans, uppercase and tracked

**Character:** The pairing is editorial and warm: a high-contrast serif that gives speech and encouragement a human voice, over a compact geometric sans that keeps instructions, tabs, and controls plain and fast to scan. The serif is never used for utility; the sans never tries to be a headline.

### Hierarchy
- **Display** (400, `clamp(56px, 6vw, 88px)`, 0.99): Home hero and the largest page titles. Italic `<em>` spans in terracotta carry the emotional phrase; keep them to a few words.
- **Headline** (400, 44px, 1.08): Section and banner headings. Tight tracking (-1px) and a short measure.
- **Title** (400, 27px, 1.1): Card titles, panel headings, and subheads in the 22–42px range depending on surface.
- **Body** (400, 16px, 1.7): Explanatory copy; 14px is the norm inside lesson panels, with a 60–70ch measure.
- **Label** (700, 11px, 2px tracking, uppercase): Eyebrows and step kickers in terracotta-deep. Navigation and control labels use 12–14px sans at 600–700 weight.

### Named Rules

**The Two-Voice Rule.** Serif is for display, page titles, section headings, and card titles at 22px and above. Anything interactive, numeric in a control, or under 20px is DM Sans.

**The Tight Display Rule.** Display type is set at 0.99–1.12 line-height with -1 to -3px tracking. Never add letter-spacing to the serif; never justify it.

## Layout

The global shell is 1160px wide with 48px total gutters on desktop and a 520px cap with 32px gutters below 650px. Content is left-aligned inside the shell, with a persistent 78px header (66px on mobile) and an 80px footer separated by hairlines.

The home surface uses a two-column hero (`1fr / 0.87fr`, 70px gap) with a 465px arched art block, followed by a four-up stage grid (16px gaps), a three-up feature row with 80px gaps and 105px vertical padding, and a full-width start banner. Stage pages place a tinted intro panel over a single-column lesson list; lesson rows are 76px tall with a 56px numeral column. Lesson pages narrow to 920px: title row, five equal step tabs, a white 42–48px padded content panel, and a navigation bar attached beneath it. IPA pages use a `1.6fr / 1fr` split with a sticky detail panel; the starter check uses a 50/50 split.

Breakpoints are 900px and 650px. At 900px the stage grid becomes two-up and the feature gaps compress. At 650px the hero, stage intro, compare grid, IPA layout, starter grid, and record choice all become single-column; the stage grid stays two-up with 10px gaps; step tabs become a horizontally scrolling strip of 87px tabs; the lesson navigation becomes a sticky bottom bar. Practice surfaces are phone-first: 44px minimum targets, 48px primary buttons, and controls that remain usable one-handed.

Vertical rhythm is generous between sections (80–105px) and tight inside controls (10–21px). Do not compress the space between the display headline and its supporting paragraph; that gap is what makes the room feel calm.

## Elevation & Depth

This is a flat, printed system. Depth is conveyed by tonal paper changes and 1px hairline borders, not by ambient shadow. There are only two sanctioned shadows: the hero arch's hard offset print shadow (`18px 18px 0` in oat-deep) and the soft hover lift on cards and the mobile lesson navigation. Panels, inputs, and lesson content have no shadow at rest.

### Shadow Vocabulary
- **Print Block** (`box-shadow: 18px 18px 0 #eeeae2`): The hero art only. A flat offset with zero blur, reading as a second sheet of paper.
- **Hover Lift** (`box-shadow: 0 12px 28px #374b3d1c`): Stage cards on hover, paired with `translateY(-5px)`.
- **Sticky Bar** (`box-shadow: 0 -6px 25px #283b291c`): The mobile lesson navigation only, so it separates from content while pinned.

### Named Rules

**The Flat-By-Default Rule.** Surfaces are flat at rest. If a shadow is not one of the three above, it does not belong.

**The No Glass Rule.** No blur, no translucency, no gradients, no glow. Depth is paper and rule, never atmosphere.

## Shapes

The form language is softly squared: 4–5px for small marks and pills, 6px for buttons and controls, 7px for cards, 8px for banners and intro panels. The one romantic gesture is the hero arch (`120px 120px 8px 8px`, 95px on mobile), repeated only in spirit by the curved speech oval inside it.

Borders are always 1px in a warm gray hairline; selected tabs add a 3px terracotta underline inside the border. Icon medallions are 50px circles in oat-deep or sage-paper; arrow affordances are 34px outlined circles. Stage illustrations are oversized serif glyphs rotated -11°, the brand mark -14°, and the speech oval -8°; these small hand-placed rotations are the only irregular geometry allowed.

Avoid pills for primary actions, avoid radius above 8px on functional surfaces, and avoid mixing a shadow with a border on the same resting card.

## Components

### Buttons
- **Shape:** 6px radius, 1px transparent border, 48px minimum height, 14px vertical / 19px horizontal padding.
- **Primary:** Eucalyptus Ink fill with white text and a trailing arrow icon. Hover deepens to Eucalyptus Deep and rises 2px.
- **Soft:** Oat Soft fill with a hairline border and ink text. Used beside a primary action, never as the only action.
- **Light:** White fill on dark or photographic surfaces, e.g. the video fallback.
- **Text:** Transparent fill, left-aligned, 7px left padding, used as the quieter second hero action.
- **Focus:** 3px eucalyptus focus ring with a 3px offset. Disabled: 47% opacity, not-allowed cursor.

### Chips
- **Style:** Compact 36px-high controls with 4px radius, Oat Soft fill, hairline border, and muted text.
- **State:** Selected flips to Eucalyptus Deep fill with white text. No checkmark; the fill is the state, paired with `aria-pressed`.
- **Usage:** Speed (Normal / Slow) and IPA filters (All / Vowels / Consonants).

### Cards / Containers
- **Corner Style:** 7px for stage cards and reference panels; 8px for banners.
- **Background:** One stage wash per stage card; white for content cards; Sage Paper for reference panels.
- **Shadow Strategy:** Flat at rest; Hover Lift only for linked stage cards.
- **Border:** 1px hairline for white cards and inputs; tinted stage cards use a 1px low-opacity green divider above the lesson count.
- **Internal Padding:** 21px for stage cards, 26–32px for content and reference cards, 42–48px for the lesson panel.

### Inputs / Fields
- **Style:** Checkboxes are visually replaced by a 21px box with 4px radius, 1px muted border, and a white check on Eucalyptus Deep.
- **Focus:** The hidden native input keeps a 3px focus ring on the custom box.
- **Labels:** Entire row is clickable, 12px vertical padding, 14px text, with icon-free labels.
- **Error / Disabled:** Errors use the warm notice fill with dark terracotta text; disabled controls drop to 47% opacity.

### Navigation
- **Header:** Oat Paper with a hairline bottom border. Wordmark in DM Sans 700 at 22px with -1.2px tracking; nav links 14px/600 with 36px gaps; the starter-check CTA is an outlined 6px-radius control that inverts to Eucalyptus Ink on hover.
- **Footer:** Hairline top border, muted 13px text, privacy reassurance on the right.
- **Lesson steps:** A five-column tab strip on a tinted base. The selected tab is white with a 3px terracotta inset underline; step numbers are 10px muted labels.
- **Mobile:** Nav collapses to IPA chart plus the icon-only CTA; the second link is hidden; lesson navigation pins to the bottom.

### Signature Components

**Sound Tile.** A 56px-high, 5px-radius Oat Paper tile that holds a practice word and a volume icon on the right. Hover shifts to a pale sage fill; the whole tile is the button. Used in a four-up grid (two-up on mobile).

**Record Choice.** Two large 156px cards, each with a mic or camera icon, a 24px serif title, and a small permission line. Hover shifts the border to eucalyptus. The pattern is the first decision in the recording step, so it stays large and explicit.

**Compare Grid.** Two equal columns labeled `01 THE MODEL` and `02 YOUR TAKE` in 10px tracked caps, each holding a 16:9 media well. Empty takes show a centered mic icon and a route back to Record. Below the grid: a primary "Play both" action and a soft discard.

**IPA Chart.** A grid of white 65px symbol buttons (five columns desktop, four mobile) with 6px radius. Selection and hover share a pale sage fill with a eucalyptus border. The detail panel is sticky Sage Paper with a 75px serif symbol, a type/group line, mouth-position note, example buttons, and a lesson link separated by a rule.

## Do's and Don'ts

### Do:
- **Do** keep the page on Oat Paper and reserve white for focused practice and content cards.
- **Do** use DM Serif Display for display, page titles, section headings, and card titles at 22px or larger; use DM Sans everywhere else.
- **Do** keep terracotta to identity and emphasis, and use Eucalyptus for any action the learner commits to.
- **Do** use 1px hairline borders for separation; add shadow only for the hero print block, card hover, and mobile sticky bar.
- **Do** maintain 44px minimum targets, 48px primary buttons, and the visible 3px focus ring.
- **Do** keep card radii at 7–8px and control radii at 4–6px.
- **Do** let the display headline and its paragraph keep their wide breathing gap on every surface.
- **Do** show state with text, icon, or fill as well as color; the selected tab has both an underline and a fill change.

### Don't:
- **Don't** fill primary buttons, banners, or selected states with terracotta.
- **Don't** use the four stage washes outside stage identity or as success/error/status colors.
- **Don't** set body copy, buttons, tabs, labels, or numerals in the serif face.
- **Don't** add gradients, blur, glassmorphism, glow, or colored ambient shadows.
- **Don't** round functional surfaces beyond 8px or turn primary buttons into pills.
- **Don't** stack more than one shadow or pair a resting shadow with a border.
- **Don't** use pure black, pure gray, or cool blue-grays for text and borders.
- **Don't** let a display line wrap past the shell gutters at 390px; break the italic phrase deliberately rather than allowing horizontal scroll.
- **Don't** introduce motion longer than 200ms or any bounce/spring easing.
