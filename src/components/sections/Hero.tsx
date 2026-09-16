import { useRef } from 'react'
import { identity } from '../../data/content'
import profilePhoto from '../photos/Ajith.jpeg'

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const profileCardRef = useRef<HTMLDivElement>(null)

  // ─── Hero entry animation stub ────────────────────────────────────────────
  // TODO: Add GSAP entry animation here (stagger + blur on .hero-anim-item)
  // The profile card ref is profileCardRef.current
  // Example:
  //   gsap.fromTo('.hero-anim-item', { y: 50, opacity: 0, filter: 'blur(10px)' },
  //     { y: 0, opacity: 1, filter: 'blur(0px)', duration: 1.1, stagger: 0.12 })
  // ──────────────────────────────────────────────────────────────────────────

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative w-full min-h-svh bg-[#050505] overflow-hidden flex flex-col justify-between select-none cursor-none"
    >
      {/* ── Scrolling marquee background ── */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-black/90 to-[#050505] z-0">
        <div className="absolute inset-0 flex items-center justify-start pointer-events-none select-none overflow-hidden opacity-10">
          <div
            aria-hidden="true"
            className="flex shrink-0 whitespace-nowrap animate-marquee"
          >
            {[0, 1].map((i) => (
              <span
                key={i}
                className="shrink-0 text-[14vw] font-black text-gold-600 pr-[0.4em] uppercase tracking-tighter"
              >
                APPLIED AI ENGINEER&nbsp;.&nbsp;PLATFORM DEVELOPER&nbsp;.&nbsp;BUILDING WHAT'S NEXT //
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── Main grid ── */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 md:px-12 min-h-svh flex flex-1 flex-col justify-between gap-10 pt-24 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-8 my-auto">

          {/* ── Left: text content ── */}
          <div className="min-w-0 lg:col-span-7 flex flex-col items-start space-y-5 text-left">

            {/* Badge + tagline */}
            <div className="hero-anim-item flex items-center gap-3 flex-wrap">
              <span
                className="px-2.5 py-0.5 bg-gold-600 text-black font-black text-xs rounded tracking-widest animate-pulse"
                style={{ boxShadow: '0 0 20px rgba(212,175,55,0.8)' }}
              >
                {identity.badge}
              </span>
              <span className="text-white/80 text-xs font-mono tracking-widest uppercase">
                {identity.title}
              </span>
            </div>

            {/* H1 */}
            <h1
              className="hero-anim-item text-5xl md:text-7xl font-black tracking-tighter text-white leading-[0.95]"
              style={{ textShadow: '0 15px 30px rgba(0,0,0,0.9)' }}
            >
              {identity.name.toUpperCase()}
              <br />
              <span
                className="text-transparent bg-clip-text"
                style={{
                  backgroundImage: 'linear-gradient(to right, var(--color-gold-500), var(--color-gold-400), var(--color-gold-700))',
                  filter: 'drop-shadow(0 0 35px rgba(212,175,55,0.5))',
                }}
              >
                AI.NATIVE
              </span>
            </h1>

            {/* Stat bar */}
            <div className="hero-anim-item flex flex-nowrap items-center gap-1.5 whitespace-nowrap text-[10px] font-mono text-gold-400 font-bold flex-wrap">
              <span className="px-2 py-0.5 bg-gold-500/10 border border-gold-500/30 rounded text-gold-500">
                99.9% Uptime
              </span>
              <span className="text-white/40">•</span>
              <span>React • Spring Boot • Python</span>
              <span className="text-white/40">•</span>
              <span className="text-white/70">Docker & Cloud</span>
              <span className="text-white/40">•</span>
              <span className="text-white/70">SAP AI Core</span>
            </div>

            {/* Tagline */}
            <p className="hero-anim-item text-sm md:text-base text-white/80 font-light leading-relaxed max-w-md">
              {identity.tagline}
            </p>

            {/* CTAs */}
            <div className="hero-anim-item flex items-center gap-4 pt-2 flex-wrap">
              <a
                href="#projects"
                className="px-8 py-3.5 bg-white text-black font-bold text-xs uppercase tracking-widest rounded flex items-center gap-2 transition-all duration-300 hover:scale-105 active:scale-95"
                style={{ boxShadow: '0 10px 35px rgba(255,255,255,0.3)' }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLAnchorElement
                  el.style.backgroundColor = 'var(--color-gold-600)'
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLAnchorElement
                  el.style.backgroundColor = '#ffffff'
                }}
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
                View Projects
              </a>
              <a
                href="#contact"
                className="px-8 py-3.5 bg-neutral-900/80 text-white border border-white/20 font-bold text-xs uppercase tracking-widest rounded flex items-center gap-2 transition-all duration-300 hover:bg-neutral-800 hover:scale-105 active:scale-95 backdrop-blur-md"
                style={{ boxShadow: '0 10px 35px rgba(0,0,0,0.5)' }}
              >
                <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                Contact Me
              </a>
            </div>
          </div>

          {/* ── Right: profile card — exact reference structure ── */}
          <div className="lg:col-span-5 flex justify-center" style={{ perspective: '1200px' }}>
            <div
              ref={profileCardRef}
              className="relative w-full max-w-[280px] md:max-w-[320px] group transform-gpu will-change-transform text-left rounded-2xl"
              onMouseMove={(e) => {
                const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect()
                const x = (e.clientX - rect.left) / rect.width - 0.5
                const y = (e.clientY - rect.top) / rect.height - 0.5
                ;(e.currentTarget as HTMLDivElement).style.transform =
                  `rotateY(${x * 12}deg) rotateX(${-y * 8}deg)`
              }}
              onMouseLeave={(e) => {
                ;(e.currentTarget as HTMLDivElement).style.transform = 'rotateY(0deg) rotateX(0deg)'
                ;(e.currentTarget as HTMLDivElement).style.transition = 'transform 0.6s ease'
              }}
              onMouseEnter={(e) => {
                ;(e.currentTarget as HTMLDivElement).style.transition = 'none'
              }}
            >
              {/* Gold glow — matches reference exactly */}
              <div className="absolute -inset-3 bg-gradient-to-r from-gold-600/70 via-gold-400/40 to-gold-800/20 rounded-3xl blur-3xl opacity-90 group-hover:opacity-100 animate-pulse duration-1000 pointer-events-none" />

              {/* Card body — p-3.5 thin frame, gold border, deep shadow */}
              <div className="relative w-full p-3.5 bg-[#141414]/90 backdrop-blur-2xl rounded-2xl border border-gold-600/40 shadow-[0_40px_80px_rgba(0,0,0,0.95)] overflow-hidden">
                {/* "FEATURED DEV" badge — top-left absolute, matches reference */}
                <div className="absolute top-6 left-6 z-30 px-3 py-1 bg-gold-600 text-black font-mono text-[10px] font-bold tracking-widest rounded shadow-xl">
                  FEATURED DEV
                </div>

                {/* Photo — fills card like the reference video */}
                <div className="relative">
                  <img
                    src={profilePhoto}
                    alt="Ajith Dollichan"
                    className="pointer-events-none block w-full object-cover rounded-xl"
                    style={{
                      height: 'clamp(330px, 48vh, 390px)',
                      objectPosition: 'center 5%',
                    }}
                  />
                  <div
                    className="absolute inset-x-0 bottom-0 h-32 rounded-b-xl pointer-events-none"
                    style={{ background: 'linear-gradient(to bottom, transparent, #141414)' }}
                  />
                </div>

                {/* Info panel below photo */}
                <div className="pt-4 pb-3 px-2 space-y-2.5">
                  {/* Name & role */}
                  <div>
                    <p className="font-black text-white text-base tracking-tight leading-tight">Ajith Dollichan</p>
                    <p className="text-[10px] font-mono text-white/50 mt-0.5 tracking-wide">
                      AI Software Developer · SAP
                    </p>
                  </div>

                  {/* Status */}
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse flex-shrink-0" />
                    <span className="text-[9px] font-mono text-white/40 tracking-widest uppercase">
                      Open to opportunities
                    </span>
                  </div>

                  {/* Tech badges */}
                  <div className="flex flex-wrap gap-1.5 pt-0.5">
                    {['SAP AI Core', 'React', 'Spring Boot', 'RAG', 'Python'].map((t) => (
                      <span
                        key={t}
                        className="px-2 py-0.5 rounded text-[9px] font-mono"
                        style={{
                          backgroundColor: 'rgba(212,175,55,0.07)',
                          border: '1px solid rgba(212,175,55,0.18)',
                          color: 'rgba(212,175,55,0.75)',
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Bottom status strip ── */}
        <div className="hero-anim-item flex items-center justify-between text-[9px] sm:text-[10px] font-mono text-white/40 tracking-widest uppercase border-t border-white/5 pt-4 flex-wrap gap-2">
          <span>{identity.statusLine}</span>
          <span className="text-gold-500/60">2026</span>
        </div>
      </div>
    </section>
  )
}
