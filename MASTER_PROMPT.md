# Master Prompt — Ajith Dollichan Portfolio Website

---

## OBJECTIVE

Build a stunning, production-ready personal portfolio website for **Ajith Dollichan**, an AI Software Developer. The design must closely replicate the look, feel, animations, and interactions of the reference site https://sriya-baburaj-portfolio.web.app/ — dark luxury aesthetic, gold accents, GSAP-powered animations, full-screen sections — but with Ajith's own content, identity, and branding.

---

## TECH STACK

| Layer | Choice |
|---|---|
| Framework | React 18 + Vite |
| Styling | Tailwind CSS v4 |
| Animations | GSAP 3 (with `ScrollTrigger` + `Observer` plugins) |
| Fonts | System font-sans + font-mono (no Google Fonts needed) |
| Deploy | Firebase Hosting (or Vercel) |
| Language | TypeScript |

---

## DESIGN SYSTEM

### Colors
Define a custom Tailwind color token `gold` (all shades below):

```js
// tailwind.config.js / CSS vars
gold: {
  400: '#e8cd78',
  500: '#d4af37',
  600: '#D4AF37',
  700: '#b8962e',
  800: '#80651f',
}
```

Background progression across sections (dark to slightly-less-dark):
- Hero & Contact: `#050505`
- About: `#000000` (pure black)
- Skills & Projects: `#0b0b0b`
- Cards: `bg-[#141414]/90` with `backdrop-blur-2xl`

### Typography
- All headings: `font-black tracking-tighter` (ultra-heavy, tight)
- Section labels: `text-xs font-mono uppercase tracking-widest text-gold-500`
- Body: `font-light leading-relaxed text-white/80` or `text-white/60`
- Hero H1: `text-5xl md:text-7xl font-black tracking-tighter leading-[0.95]`
- Watermark text: `text-[18vw]` or `text-[22vw] font-black text-white/[0.04]`
- Mono stats/badges: `text-xs font-mono`

### Buttons
- **Primary (CTA)**: `px-8 py-3.5 bg-white text-black font-bold text-xs uppercase tracking-widest rounded hover:bg-gold-600 hover:text-black transition-all duration-300 shadow-[0_10px_35px_rgba(255,255,255,0.3)] hover:scale-105 active:scale-95`
- **Secondary (outline)**: `px-8 py-3.5 bg-neutral-900/80 text-white border border-white/20 font-bold text-xs uppercase tracking-widest rounded hover:bg-neutral-800 transition-all duration-300 backdrop-blur-md hover:scale-105 active:scale-95`
- **Link/Ghost**: `inline-flex items-center gap-2.5 rounded-full border border-white/20 px-6 py-3 text-xs font-mono uppercase tracking-widest hover:border-gold-500 transition-colors`

### Cards
All cards use this pattern:
```
bg-[#141414]/90 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] shadow-2xl
hover:border-gold-600/60 transition-colors duration-200 overflow-hidden relative group
```
- Big watermark number (01, 02, 03…) in top-right corner: `text-7xl font-black text-white/5 font-mono absolute`
- Mouse-tracking radial gold highlight on hover: `radial-gradient(400px circle at var(--mouse-x) var(--mouse-y), rgba(212,175,55,0.15), transparent 70%)`
- Tag pills: `px-3.5 py-1.5 rounded bg-white/5 border border-white/10 text-xs font-mono text-white/80`

---

## SITE STRUCTURE (5 Sections, single-page)

All sections: `min-h-svh w-full overflow-hidden select-none`

```
1. #home    — Hero
2. #about   — About / Bento Grid
3. #skills  — Skills Carousel (3D)
4. #projects — Project Cards (fan deck)
5. #contact — Contact CTA
```

---

## SECTION 1: HERO (#home)

**Background**: `bg-[#050505]`
**Custom cursor**: A golden glow orb (`w-[300px] h-[300px] rounded-full blur-[45px]` with `radial-gradient(circle, rgba(212,175,55,0.35) 0%, rgba(212,175,55,0.1) 40%, transparent 70%)`). Follows mouse using GSAP `quickTo` with duration `0.05`. Starts `opacity-0`, fades to `opacity-100` on first mouse move. Set `cursor-none` on the section.

**Scrolling marquee background**: Behind all content, a horizontally-scrolling giant text strip:
- Text: `"APPLIED AI ENGINEER . PLATFORM DEVELOPER . BUILDING WHAT'S NEXT //"`
- Style: `text-[14vw] font-black text-gold-600 uppercase tracking-tighter pr-[0.4em]`
- Wrapper opacity: `opacity-10`
- CSS `@keyframes marquee { 0% { transform: translateX(0%) } 100% { transform: translateX(-50%) } }` — `animation: marquee 35s linear infinite`
- Duplicate the text span twice (for seamless loop)

**Layout**: 12-column grid with `items-center gap-8 my-auto`
- Left col (5 cols on lg): Text content
- Right col (4 cols on lg, then 3 cols for stats row): Profile card

**Left side content** (all items have class `hero-anim-item` for entry animation):
1. Badge row: Gold `"TOP 0.35%"` badge (pulse glow) + monospace tagline `"AI Software Developer & Full-Stack Engineer"`
2. H1: `"AJITH DOLLICHAN"` + `<br/>` + `"DEV.ENGINE"` (gradient gold text: `from-gold-500 via-gold-400 to-gold-700`)
3. Stat bar (mono): `99.9% Uptime • React • Spring Boot • Python • Docker & Cloud`
4. Tagline: `"From enterprise AI workflows to cloud-native platforms. Built for what's next."`
5. CTAs: "View Projects" (primary) + "Contact Me" (secondary)

**Right side** (profile card): A card that 3D-tilts on hover using GSAP rotationX/rotationY
- Behind the card: `absolute -inset-3 bg-gradient-to-r from-gold-600/70 via-gold-400/40 to-gold-800/20 rounded-3xl blur-3xl opacity-90 animate-pulse`
- Card content: profile photo, name, role, animated availability status (blinking green dot)
- Small floating badges around the card (SAP, React, GSAP, etc.)

**Bottom strip** (below the grid): Full-width monospace status line:
`"AVAILABLE FOR OPPORTUNITIES • MANNHEIM, GERMANY • MSc GLOBAL SOFTWARE DEV"`
Style: `text-xs font-mono text-white/50 tracking-widest uppercase`

**Entry animation** (GSAP timeline, runs on mount):
```js
const tl = gsap.timeline()
tl.fromTo('header', { y: -60, opacity: 0 }, { y: 0, opacity: 1, duration: 1 })
  .fromTo('.hero-anim-item',
    { y: 50, opacity: 0, filter: 'blur(10px)' },
    { y: 0, opacity: 1, filter: 'blur(0px)', duration: 1.1, stagger: 0.12 },
    '-=0.7'
  )
  .fromTo(profileCardRef.current,
    { scale: 0.75, opacity: 0, rotationY: 35, rotationX: -15 },
    { scale: 1, opacity: 1, rotationY: 0, rotationX: 0, duration: 1.4, ease: 'back.out(1.2)' },
    '-=0.9'
  )
```

---

## SECTION 2: ABOUT (#about)

**Background**: `bg-black`
**Section padding**: `py-32 px-6 md:px-12`
**Subtle radial gradient**: top-left gold hint: `bg-[radial-gradient(ellipse_at_top_left,rgba(212,175,55,0.035),transparent_65%)]`

**Section header**:
- Mono label row: ping dot (`w-2 h-2 rounded-full bg-gold-600 animate-ping`) + `"ABOUT THE ENGINEER"`
- H2: `"ORIGIN & VISION."` with gradient gold text + `drop-shadow-[0_0_30px_rgba(212,175,55,0.4)]`

**Bento grid layout** (`grid grid-cols-1 md:grid-cols-12 gap-6`):

**Card 01 — Bio** (`md:col-span-7`):
- Watermark: `"01"`
- Label: `"About"` (gold mono)
- Text: `"I am Ajith Dollichan, an AI Software Developer with 3+ years of experience building enterprise AI solutions and full-stack platforms at SAP and Acabes International (Arab Bank)."`
- Text 2: `"I design and implement production LLM workflows, RAG pipelines, and cloud-native microservices — turning complex requirements into scalable, intelligent systems."`
- Tag pills: `AI/LLM`, `Full-Stack Development`, `Enterprise Architecture`

**Card 02 — The Learning Curve** (`md:col-span-5`):
- Watermark: `"02"`
- Label: `"The Learning Curve"` (gold mono)
- List items with `"›"` gold bullets:
  - `"Studied Computer Science at CAS Thamarassery – Calicut University (BCA, Score: 1.4 — Top 0.35%)"`
  - `"Currently pursuing Masters in Global Software Development at Hochschule Fulda"`
  - `"University rank holder — top 0.35% of entire cohort"`
  - `"RAG With HANA Vector Engine certification"`
  - `"Best Developer Award — DBPM team, Acabes International"`
  - `"Performance Cash Award — January 2025"`

**Card 03 — Stats** (`md:col-span-4` or similar):
- Watermark: `"03"`
- Key stats in large mono:
  - `"3+"` → `"Years Experience"`
  - `"100K+"` → `"Transactions/day supported"`
  - `"2"` → `"Production AI Systems"`

**Card 04 — Currently At** (`md:col-span-8` or remaining`):
- Watermark: `"04"`
- Label: `"Currently At"` (gold mono)
- SAP SE Walldorf — Working Student, AI Integration
- Key bullet points about current role
- Date chip: `"Dec 2025 – Present"`

All cards animate in with GSAP ScrollTrigger: staggered `y: 40 → 0, opacity: 0 → 1` as they enter the viewport.

---

## SECTION 3: SKILLS (#skills)

**Background**: `bg-[#0b0b0b]`
**Section**: `h-svh min-h-[520px] flex items-center justify-center [perspective:1000px]`

Full-screen skill card carousel. Only one skill card visible at a time. Navigation via scroll (GSAP Observer) or arrow buttons.

**6 Skill Cards** (full-screen card flip/slide):
Each card:
- Title (large, white, bold)
- Tag (mono uppercase, gold)
- Description text
- Skill chips row

| # | Title | Tag | Skills |
|---|---|---|---|
| 1 | Frontend Engineering | UI / INTERACTION | React, TypeScript, HTML5, CSS, JavaScript, MUI, Bootstrap |
| 2 | Backend & Databases | ARCHITECTURE | Java, Python, Spring Boot, PostgreSQL, MongoDB, SAP S/4 HANA, MySQL |
| 3 | Applied AI / LLM | INTELLIGENCE | RAG Pipelines, Agentic Workflows, LLM Orchestration, SAP AI Core, SAP AI Launchpad, Prompt Engineering, Vector Search |
| 4 | Cloud & DevOps | INFRASTRUCTURE | Docker, GitHub Actions, CI/CD, Firebase, SAP BTP |
| 5 | Algorithmic Problem Solving | PROBLEM SOLVING | Data Structures, Algorithms, Mathematics |
| 6 | Tools & Ecosystem | PRODUCTIVITY | Git, IntelliJ, VS Code, Postman, ABAP, SAP Joule, GitHub Copilot |

Animation: Each card has a background gradient (`bg-gradient-to-tr from-black via-[#141005] to-black`, opacity transitions between cards). When scrolling through cards, the active card animates in from below while the previous fades up-out. GSAP `scrub` scrollTrigger.

Corner gold dot glow on active card: `w-2 h-2 rounded-full bg-gold-600 group-hover:shadow-[0_0_15px_#D4AF37]`

---

## SECTION 4: PROJECTS (#projects)

**Background**: `bg-[#0b0b0b]`
**Watermark text**: `"PROJECTS"` — `text-[18vw] font-black text-white/[0.04] tracking-tighter` centered absolutely

**Card fan/deck animation** (GSAP ScrollTrigger):
```
trigger: section, start: 'top 55%', end: 'bottom top'
toggleActions: 'restart reset restart reset'

Timeline:
1. Cards start stacked at viewport center: { x: centerX, y: centerY, scale: 0.35, rotation: -5 or 5, opacity: 0 }
2. Fade in: { opacity: 1, duration: 0.15 }
3. Archive flap opens: { rotationX: -130, duration: 0.8, ease: 'power3.inOut' }
4. Fan spread up: { y: centerY - 140, scale: 0.5, duration: 0.6, stagger: 0.08, ease: 'back.out(1.2)' }
5. Settle to final grid position: { x: 0, y: 0, scale: 1, rotation: 0 }
```

**3 Projects** (cards layout, 3 cols on desktop):

**Project 1 — Agentic RAG Pipeline (SAP)**
- Category: `Applied AI`
- Description: `"Multi-step agentic RAG pipeline for automated SAP Note generation. Orchestrates multiple LLM calls to decide chunking strategy, optimize vector database search, and validate outputs — reducing hallucination in enterprise AI workflows."`
- Tags: `Agentic AI`, `RAG`, `SAP AI Core`, `LLM Orchestration`, `Vector Search`

**Project 2 — IBM BPM Migration (Acabes / Arab Bank)**
- Category: `Digital Banking`
- Description: `"Migrated legacy IBM BPM workflows to modern React micro-frontends and Spring Boot microservices, supporting 100,000+ daily transactions with 99.9% uptime for a major Arab bank's digital banking platform."`
- Tags: `React`, `Spring Boot`, `Microservices`, `FinTech`, `Payments`

**Project 3 — EyeX — Accessible Mouse Control**
- Category: `Machine Learning`
- Description: `"Webcam-controlled virtual mouse for users with physical disabilities. Built using Python, OpenCV, and MediaPipe — a hardware-free accessibility solution supporting full mouse functionality."`
- Tags: `Python`, `OpenCV`, `MediaPipe`, `Accessibility`, `ML`

Each project card:
- `[data-project-card]` attribute for GSAP targeting
- Category chip (gold outline)
- Title (bold white)
- Description (white/60)
- Tag chips row
- Gold dot glow in bottom-right corner on hover

---

## SECTION 5: CONTACT (#contact)

**Background**: `bg-[#050505]`
**Watermark**: `"CONTACT"` — `text-[22vw] font-black uppercase text-gold-600/[0.04]` centered absolutely
**Glow blob**: `absolute left-1/2 top-1/3 h-80 w-80 -translate-x-1/2 rounded-full bg-gold-600/10 blur-[120px]`

**Content** (centered, `text-center`):
- Label: `"Get in touch"` — `text-xs font-mono uppercase tracking-[0.25em] text-gold-500`
- H2 — two lines with clip-reveal animation on scroll:
  - Line 1: `"Let's build"` (white)
  - Line 2: `"what's next."` (gold — `text-gold-500`)
  - Animation: Each line is `overflow-hidden` wrapper + inner span that translates from `y:100%` to `y:0` when IntersectionObserver fires (CSS transition or GSAP)
- Subtext: `"Have an idea, an opportunity, or a question? Let's start a conversation."`

**CTA Buttons** (flex-wrap, centered, gap-4):
1. LinkedIn: `https://www.linkedin.com/in/ajith-dollichan-developer/` — rounded-full border
2. Email: `ajithdollichan@gmail.com` (mailto link) — rounded-full border
3. GitHub: `https://github.com/ajithdolly/` — rounded-full border

Button style: `inline-flex items-center gap-2.5 rounded-full border border-white/20 px-6 py-3 text-xs font-mono uppercase tracking-widest hover:border-gold-500 hover:text-gold-500 transition-colors`

**Footer strip** (bottom of contact):
`© 2026 Ajith Dollichan • Built with React + GSAP • Mannheim, Germany`
Style: `text-xs font-mono text-white/30`

---

## NAVIGATION (Fixed Header)

```jsx
<header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-5 mix-blend-difference">
  <span className="font-black text-sm tracking-widest uppercase text-white">
    AJITH DOLLICHAN <span className="w-1.5 h-1.5 rounded-full bg-white inline-block" />
  </span>
  <nav className="hidden md:flex items-center gap-8 text-xs font-mono uppercase tracking-widest text-white/80">
    <a href="#home" className="hover:text-gold-500 transition-colors">Home</a>
    <a href="#about" className="hover:text-gold-500 transition-colors">About</a>
    <a href="#skills" className="hover:text-gold-500 transition-colors">Skills</a>
    <a href="#projects" className="hover:text-gold-500 transition-colors">Projects</a>
    <a href="#contact" className="hover:text-gold-500 transition-colors">Contact</a>
  </nav>
</header>
```

Entry animation: `gsap.fromTo('header', { y: -60, opacity: 0 }, { y: 0, opacity: 1, duration: 1 })`

---

## ANIMATION MASTER LIST

Register at app root:
```js
gsap.registerPlugin(ScrollTrigger, Observer)
```

| Element | Animation | Trigger |
|---|---|---|
| Header | Slide down from y:-60, fade in | Page load |
| Hero items | y:50 + blur(10px) → clear, stagger 0.12s | Page load |
| Profile card | scale:0.75, rotationY:35, rotationX:-15 → normal, `back.out(1.2)` | Page load, -=0.9s |
| Custom cursor | GSAP quickTo x/y, duration 0.05 | mousemove |
| About bento cards | y:40, opacity:0 → settled, stagger 0.1 | ScrollTrigger enter |
| Skills cards | Full-screen swap with scrub | ScrollTrigger scroll |
| Project cards | Fan deck animation (see SECTION 4) | ScrollTrigger scroll |
| Contact heading | Clip overflow translate reveal | IntersectionObserver |
| Card hover glow | Mouse position radial-gradient via CSS vars | mousemove on card |

---

## PERSONAL DATA (Ajith's Content)

### Identity
- **Name**: Ajith Dollichan
- **Title/Tagline 1**: `"AI Software Developer & Full-Stack Engineer"`
- **Tagline 2**: `"From enterprise AI workflows to cloud-native platforms. Built for what's next."`
- **Location**: Mannheim, Germany
- **Status**: Available for opportunities
- **Badge**: `"TOP 0.35%"` (university rank holder)

### Social Links
- LinkedIn: https://www.linkedin.com/in/ajith-dollichan-developer/
- GitHub: https://github.com/ajithdolly/
- Profile: https://ajithdolly.github.io/ajith-profile/
- Email: ajithdollichan@gmail.com
- Phone: +49 15510229943

### Work Experience
1. **SAP SE – Walldorf** | Working Student, SAP AI Integration & FBE Coordination | Dec 2025 – Present
   - Multi-step agentic RAG pipeline for SAP Note generation
   - Jira EPIC quality scoring automation
   - SAP AI Core + SAP AI Launchpad LLM workflows
   - Prompt engineering, context handling
   - Tools: SAP Joule, GPT-4, GitHub Copilot, Claude

2. **Acabes International (Arab Bank)** | Fullstack Developer | Jul 2023 – Mar 2025
   - Java + Spring Boot microservices: 100K+ txns/day, 99.9% uptime
   - React JS, MUI, Bootstrap frontends
   - RESTful APIs, CI/CD (Git, GitHub Actions, Docker)
   - IBM BPM Migration, Account Opening & KYC system

3. **CAS Thamarassery – EyeX** | Bachelors Project | Sep 2022 – Mar 2023
   - Webcam-controlled mouse for physical disabilities
   - Python, OpenCV, MediaPipe, PyAutoGUI

### Education
- Masters in Global Software Development, Hochschule Fulda (Apr 2025 – Present)
- BCA, CAS Thamarassery – Calicut University (Apr 2020 – Apr 2023), Score: 1.4

### Awards
- University rank holder – top 0.35% of cohort
- RAG With HANA Vector Engine certification
- Best Developer, DBPM team – Acabes International
- Performance Cash Award, January 2025
- Udemy: Complete Web Development Bootcamp
- LinkedIn: Frontend Developer Certification

---

## KEY IMPLEMENTATION NOTES

1. **No external font imports needed** — use Tailwind's default system font stack for sans, and `font-mono` for monospace.
2. **Custom cursor** must be implemented as a standalone component that registers `mousemove` on `window` and uses GSAP `quickTo` for smooth tracking.
3. **All GSAP contexts** must be cleaned up in `useLayoutEffect` return to avoid memory leaks.
4. **`mix-blend-difference`** on the header gives it an automatic inversion effect so it stays readable over any background color — no need to detect scroll position.
5. **Sections must be `select-none`** to prevent text selection during scroll animations.
6. **3D card animations** need `transform-gpu will-change-transform` and `[perspective:1200px]` on the container.
7. **Profile photo**: Use a placeholder initially, leave an easy swap point.
8. **ScrollTrigger `invalidateOnRefresh: true`** on all scroll animations to handle window resize correctly.
9. **Mobile**: On `max-width: 767px`, disable 3D animations (use `gsap.matchMedia` with desktop/mobile conditions), stack the grid columns, and show a hamburger menu for nav.
10. **Performance**: Use `will-change-transform` on animated elements. Avoid animating `width`/`height` — use `transform: scale()` and `opacity` only.

---

## FOLDER STRUCTURE

```
src/
  components/
    Header.tsx
    CustomCursor.tsx
    sections/
      Hero.tsx
      About.tsx
      Skills.tsx
      Projects.tsx
      Contact.tsx
  data/
    content.ts      ← all text content, skills, projects as typed data
  styles/
    globals.css     ← Tailwind + custom @keyframes (marquee, etc.)
  App.tsx
  main.tsx
```

---

## DELIVERABLE CHECKLIST

- [ ] Custom gold cursor with GSAP tracking
- [ ] Scrolling marquee in hero background
- [ ] Hero entry animation (stagger + blur)
- [ ] 3D profile card tilt
- [ ] About bento grid with mouse-tracking card glow
- [ ] Skills full-screen carousel (scroll-driven)
- [ ] Project fan-deck card animation
- [ ] Contact headline clip-reveal animation
- [ ] Fixed header with mix-blend-difference
- [ ] Responsive (mobile-first, stacked on small screens)
- [ ] All 5 sections scroll-snapping naturally
- [ ] Gold color system as Tailwind custom tokens
- [ ] TypeScript types for all data (skills, projects, experience)
