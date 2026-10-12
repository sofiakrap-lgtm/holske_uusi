# 13 Build prompt (lisämoduuli)

Kopioi alla oleva lohko Claude Codeen, v0:aan tai Lovableen. Liitä mukaan tokens.css. Vaihda [YOUR ...] -kohdat omiin teksteihin ja kuviin. Kaikki arvot on mitattu livesivun CSS:stä 2026-10-12.

```
# BUILD BRIEF: warm, wide, themed-section marketing site (style measured from bahnexpress.fi)

## 0. Goal
Build a production-ready multi-page marketing site with the exact visual system below, using ONLY my content ([YOUR ...] placeholders). Do not copy any third-party text, images, logos or icons. Quality bar: calm, confident, tactile. Motion is functional (state changes), never decorative.

## 1. Stack
Next.js (App Router) + TypeScript + plain CSS custom properties (or Tailwind v4 mapped to the tokens). No animation library is needed: use CSS transitions/keyframes, CSS scroll-driven animations, the View Transitions API, native scroll-snap and <details>. No GSAP, no Lenis, no Swiper/Embla.
Fonts (next/font/google): Archivo (variable, axes wdth 62..125 + wght; always render display/heading text with font-stretch: 125%), Figtree 300/400/600, Geist Mono.

## 2. Design tokens
Use the attached tokens.css verbatim. Key facts:
- Palette: birch #fffef7 (page), asphalt #12110e (ink), warm grey ramp 50 #f1eee6, 100 #e2ded4, 200 sand #ccc6ba, 300 #b7afa0, 400 #a09786, 500 #8a7f6b, 600 #726958, 900 #2a2721; theme colors teal-800 #205058, green-900 #0f3123; signal orange #fd6a31 (only for tiny highlights), teal-300 #85cdd9 (slider fill).
- NO box-shadows, NO backdrop blur, NO gradients on UI. Depth = tone steps, 2px gaps, rings.
- Radii: pill 999 (buttons, tags, segmented, slider), 24 (cards, panels, media, hero strip), 20 (inputs, dropdown sheets, quote cards), 16 (dropdown rows), 12 (small media, digit tiles). Portraits are rounded squares (12/16/20/24 by size), never circles.

## 3. Section themes (core idea)
Every <section> is a full-width color theme set with data-theme: birch | light-grey | teal | green | asphalt. A theme remaps ALL semantic tokens (bg, heading, body, muted, button-primary, input, card, divider, overlay). In dark themes (teal, green, asphalt) headings are birch, body grey-100, the primary button becomes a birch pill with asphalt text, and cards/inputs stay light (birch). Alternate themes, never two identical in a row. Typical page rhythm: hero (birch over media) → light-grey → teal → asphalt → birch → light-grey → green (FAQ) → birch (contact) → asphalt (CTA) → footer (birch).

## 4. Typography
Display (section H2, hero lines): Archivo 125% width, weight 900, UPPERCASE, line-height = font-size, letter-spacing -0.3px, centered, text-wrap: balance, hyphens:auto with hyphenate-limit-chars 10 5 5.
Sizes desktop / tablet / mobile: hero line 1 96/72/48 (extra-wide: add letter-spacing +0.02em), hero line 2 80/56/48, section H2 72/56/40-48.
If the longest word overflows its line, step the size down one step (96→80→72→56→48→40) via a small fit-to-width script.
Headings: Archivo 125%, weight 500, letter-spacing +0.3px, sentence case: 48/56, 40/48, 32/36, 28/32, 24/28, 20/24.
Titles/quotes: Archivo 125% weight 700, -0.3px: quote 40/48, 32/36, 24/28.
Stats: Archivo 125% weight 700, +1.8px, 64/56/48, tabular-nums.
Body: Figtree 300: 24/32, 20/28 (default), 18/24, 16/22, 14/20.
Captions/eyebrows: Figtree 600: 24/32, 20/24, 18/22, 16/20 (NOT uppercase).
Buttons/nav: Figtree 600.
Links: underline max(1px,.05em), underline-offset .14583em, color inherit, hover grey-600.

## 5. Layout
Container max 1440, gutter 24 / 36 / 48 (breakpoints 768 and 1025). Section padding-block 96 / 128 / 144. Header→content gap 48/56/64, sub gap 24/28/32, text measure none/640/888. Everything centered on one axis. Section header = [caption or pill tag] + display H2 + subtitle (max 888) + optional button (s/m/l by breakpoint).

## 6. Components
HEADER: height 64 (+safe-area), transparent at top over the hero, then background turns into a 95% opaque overlay (#f1eee6f2) over the first 96px of scroll using `animation-timeline: scroll(); animation-range: 0 96px` (fallback: .is-scrolled class, 0.24s). Logo 24px tall left; nav = segmented pill with 3 items (labels 48px tall, padding 0 22, Figtree 600 18) and a sliding active pill (::before moves left/width 0.26s cubic-bezier(.2,0,0,1)); right: ghost link + action button (xs 40 mobile / s 48) + menu icon button. Fold: <1190 hide ghost link, <980 hide 3rd nav item, <820 hide nav. Never hides on scroll.
MENU: drops from under the header: sheet translateY(-100%)→0 0.24s cubic-bezier(.2,0,0,1), scrim rgba(18,17,14,.7) fade 0.24s, groups fade in 0.2s delay 80ms; close 0.18s. Groups (label 16 muted + 48px pill links) stack on mobile, sit side by side with 1px vertical dividers ≥768, sheet bottom radius 24. Use document.startViewTransition so the 3 header nav labels morph into the first link of each menu group (0.24s, stagger 0/30/60ms; close 0.18s reversed).
BUTTONS: pill, no border, Figtree 600. Sizes xs 40/20px/16, s 48/22/18, m 56/24/20, l 64/28/22, xl 72/32/24. Primary = asphalt bg + birch text (hover grey-900); in dark themes birch bg + asphalt text (hover grey-100). Secondary = surface color, tertiary = grey-100 (hover sand), ghost = text only. Transition background-color/color 0.15s. Focus outline 4px grey-500, offset 0.
INPUT: input-surface (grey-50 on birch, birch on grey/dark themes), radius 20, min-height 72, padding 12 16, 32px leading icon, floating label: empty+unfocused shows only the label (16/22 muted) centered; on focus the value row grows 0→24px (height 0.2s cubic-bezier(.2,0,0,1), opacity 0.14s). Error: inset 0 0 0 3px red.
QUOTE BAR (hero form): [input] [notch join] [input] [primary button xl 72]. NOTCH JOIN = a 16×32 SVG bridge in the input color whose top and bottom edges have semicircle bites (radius 8), so two pills read as one object. Stacked on <1025 (max 480 wide, vertical 32×16 notch, button l 64).
HERO: section pulled up under the header. Backdrop layers (absolute, inset 0): <img poster> + <video autoplay muted loop playsinline preload=metadata> object-fit cover; grain PNG 256px tiled opacity .3 mix-blend overlay; warm wash rgba(122,109,96,.3) mix-blend lighten; bottom fade linear-gradient(transparent 65%, <next section bg>). H1 = 3 stacked lines with different styles (line 1 one word extra wide 96, line 2 wide 80, line 3 sentence-case heading 40). Below: quote bar (max 960) then HERO STRIP: a dark (asphalt overlay #1e1c17f2) grid panel, radius 24, 3 equal columns separated by 2px light gaps, each item padding 48 (36/24 when narrow): caption-2 muted label, heading 32/36, body 20/28. Stat variant shows rolling numbers. Hide video under prefers-reduced-motion.
CARDS: surface color, radius 24, overflow clip, padding 24/36/48, label row (caption + outline pill tag), title clamp 2 lines, text clamp 3, optional ruled footer. Horizontal card: media 50% at 3/4 ratio ≥768.
USE-CASE RAIL: horizontal row of collapsed cards (352px, 448 ≥1025, gap 24); clicking a card sets data-open, it expands to 100% width with a close button top-right. Wrap the change in startViewTransition: group 0.46s cubic-bezier(.4,0,.2,1), image-pair border-radius 24, old content fades out 0.18s cubic-bezier(.4,0,1,1), new fades in 0.3s delay 0.14s cubic-bezier(0,0,.2,1). Open card content: image top (3/2), copy + feature tiles left, testimonial right (2 columns gap 64 when container >928), proof row under a 1px divider. Mobile: full-screen dialog instead.
CALCULATOR (teal section): two birch panels (radius 24, padding 24/36/48) joined by a 24×48 notch; left: input rows (label Figtree 600 20 + small right-aligned input 140px wide + range slider: 4px pill track, spent part teal-300, 24px round thumb in primary color); right: big result (stat style) + breakdown table (1px dividers, tabular figures). Optional segmented toggle on top (sliding pill 0.26s).
SCREENSHOT: product image inside a thick 8px border in muted color (device bezel), radius 16 (desktop landscape, max 960) or 24 (phone portrait, max 256); caption 36px below.
CAROUSEL: native scroll-snap (x mandatory), hidden scrollbar, full-bleed track (margin-inline calc(50% - 50vw), padding-inline calc(-50% + 50vw), scroll-padding max(48px, 50vw - 672px)), gap 24, items max-width calc(100% - 56px) so the next one peeks. Header row: title + round arrow buttons (64px tertiary) + play/pause. Footer: page indicator dots 8px; active dot widens to 32px (0.26s) and fills left→right over 6s linear (autoplay progress), paused on hover/focus. During autoplay the current card uses surface-subtle, others recede (bg 0.3s).
MAP TESTIMONIALS: map background; portrait pins: 58px rounded square (radius 9) with 3px ring; hover 66 (radius 13); selected 88 (radius 16) with 4px orange ring; 0.15s. Selecting changes the quote in a snap carousel below.
QUOTE BLOCK: optional card (surface-subtle, radius 20, padding 24), small quote-mark glyph muted, quote in Archivo 125% 700 (24/28 → 40/48), footer: rounded-square portrait 72 + name/role + company logo right-aligned in muted color.
TIMELINE (steps): horizontal grid; each step = circular numbered bullet (72/80/96px) + 4px rule to the next; last rule can bleed to the viewport edge. On first view: rule scaleX 0→1 (origin left, 0.62s linear), bullet scale .9→1 + fade, content y 8→0 + fade; each step delayed by n × 0.62s.
ROLLING STATS: each digit in an overflow-hidden inline box with an invisible placeholder and an absolute vertical strip 0..digit; on view translateY to the final digit, 1s cubic-bezier(0,0,.2,1), 90ms stagger per digit left→right; non-digits static; sr-only full value.
ACCORDION (FAQ, green theme): <details>; items separated by 1px divider + 12px; summary padding 12 0, question Figtree 600 24/32 (l), chevron 32 rotates 180° 0.15s; content animates via ::details-content grid-template-rows 0fr→1fr (open 0.32s cubic-bezier(.22,1,.36,1), close 0.32s cubic-bezier(.4,0,.2,1)) with opacity; answer Figtree 300 20/28, padding-right 48. Layout: title + CTA left, list right.
CONTACT CARDS: radius 24, padding 24/36/48, rounded-square portrait 96→128 (radius 20/24), name + role, tertiary pill action buttons (phone, email, LinkedIn icons). Highlighted variant uses surface-subtle.
LOGO WALL: 2-column grid of cells with 2px gaps, outer radius 24, cells surface-subtle, logos as muted single-color masks.
CTA BAND (asphalt): centered display question + primary button s.
FOOTER: birch, padding 144/64 desktop, brand column (logo + slogan heading 24/28) + 4 link columns (column title 18, links Figtree 300 16/22 in heading color), bottom row 144px below: small print 14/20, legal links, cookie settings button, language selector right. box-shadow 0 50vh 0 0 birch so overscroll never flashes white.
ICONS: 24px grid stroke icons, stroke 2px, stroke-linecap square / butt, no rounded caps (use Lucide with CSS override). Icon tiles: rounded squares 56-128 on a subtle surface.

## 7. Motion rules
Durations 0.09-0.46s (counters 1s, autoplay 6s). Easings: standard cubic-bezier(.2,0,0,1); emphasis (.22,1,.36,1); enter (0,0,.2,1); exit (.4,0,1,1); morph (.4,0,.2,1). Exits are ~25% faster than entries. No page-load intro, no generic scroll reveals, no parallax, no custom cursor, no smooth-scroll library. prefers-reduced-motion: all durations 1ms, video hidden (poster stays), counters and timelines show final state, autoplay off.

## 8. Pages
Home: hero+quote bar+hero strip / use-case rail / calculator / product screenshot / map testimonials / stories carousel / FAQ / contacts / CTA.
Audience page: hero with stat strip / logo wall / "a day as X" carousel / app screenshots rail / earnings calculator / step timeline / map testimonials / video + quote / FAQ / contacts / CTA.
About: header + rounded video + prose + logo grid / quote / stories / people.
Careers: hero + stats / job cards grid / feature grid / prose + vertical timeline / stories.
Story: caption + display H1 + rounded video + XL quote / prose sections / more stories.
Legal: section header + prose.

## 9. Content placeholders
[YOUR LOGO], [YOUR HERO WORD], [YOUR HERO LINE 2], [YOUR HERO SENTENCE], [YOUR HERO VIDEO.mp4 + POSTER], [FIELD 1/2 LABEL], [PRIMARY CTA], [STRIP LABEL/CLAIM/TEXT ×3], [USE CASE ×6: image, label, title, text, 3 features, proof stat, quote], [CALC inputs + formula], [SCREENSHOT], [TESTIMONIALS ×5 with portrait + company logo], [STORIES ×3], [FAQ ×6], [CONTACTS ×2], [CTA QUESTION], [FOOTER COLUMNS], [LEGAL INFO].

## 10. Deliverables
Components: Header, Menu, HeroBackdrop, HeroTitle, QuoteBar, NotchJoin, HeroStrip, RollingNumber, SectionHeader, Button, TextInput, Slider, Segmented, Card, UseCaseRail, CalcShell, Screenshot, Carousel, PageIndicator, MapPins, QuoteBlock, Timeline, Accordion, ContactCard, LogoGrid, CtaBand, Footer. All copy in /content/site.ts. Build page by page and check each against this brief.
```
