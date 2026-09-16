import { useRef, useLayoutEffect } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { awards } from '../../data/content'

gsap.registerPlugin(ScrollTrigger)

interface BentoCardProps {
  num: string
  children: React.ReactNode
  className?: string
}

function BentoCard({ num, children, className = '' }: BentoCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    card.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`)
    card.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`)
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={onMouseMove}
      className={`relative group bg-[#141414]/90 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] shadow-2xl overflow-hidden transition-colors duration-200 hover:border-gold-600/60 ${className}`}
    >
      {/* Mouse-tracking gold glow */}
      <div
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: 'radial-gradient(400px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(212,175,55,0.15), transparent 70%)',
        }}
      />
      {/* Watermark number */}
      <div className="absolute top-0 right-0 p-8 text-white/[0.05] font-mono text-7xl font-black pointer-events-none select-none leading-none">
        {num}
      </div>
      {children}
    </div>
  )
}

export default function About() {
  const sectionRef    = useRef<HTMLElement>(null)
  const cardsRef      = useRef<(HTMLDivElement | null)[]>([])
  const wordRefs      = useRef<(HTMLSpanElement | null)[]>([])
  const labelRef      = useRef<HTMLSpanElement>(null)
  const headingRef    = useRef<HTMLDivElement>(null)
  const statValueRefs = useRef<(HTMLParagraphElement | null)[]>([])

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {

      // Label slides in from left
      gsap.fromTo(labelRef.current,
        { x: -30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.6, ease: 'power2.out',
          scrollTrigger: { trigger: headingRef.current, start: 'top bottom', end: 'top 10%', toggleActions: 'play reverse play reverse', invalidateOnRefresh: true } }
      )

      // Heading: ORIGIN ← from left, & pops from center, → VISION. from right — converge
      const hST = { trigger: headingRef.current, start: 'top bottom', end: 'top 10%', toggleActions: 'play reverse play reverse', invalidateOnRefresh: true }
      gsap.fromTo(wordRefs.current[0],
        { x: -140, opacity: 0 },
        { x: 0, opacity: 1, duration: 1.0, ease: 'power3.out', scrollTrigger: hST }
      )
      gsap.fromTo(wordRefs.current[1],
        { scale: 0.1, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.75, ease: 'back.out(3)', delay: 0.2, scrollTrigger: hST }
      )
      gsap.fromTo(wordRefs.current[2],
        { x: 140, opacity: 0 },
        { x: 0, opacity: 1, duration: 1.0, ease: 'power3.out', delay: 0.1, scrollTrigger: hST }
      )

      // Bento cards: left/right/left/right alternating + full-width from bottom
      const directions = [-130, 130, -110, 110]
      directions.forEach((x, i) => {
        const el = cardsRef.current[i]
        if (!el) return
        gsap.fromTo(el,
          { x, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.9, ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top bottom', end: 'top 5%', toggleActions: 'play reverse play reverse', invalidateOnRefresh: true } }
        )
      })
      const last = cardsRef.current[4]
      if (last) {
        gsap.fromTo(last,
          { y: 80, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.85, ease: 'power3.out',
            scrollTrigger: { trigger: last, start: 'top bottom', end: 'top 5%', toggleActions: 'play reverse play reverse', invalidateOnRefresh: true } }
        )
      }

      // Stats counter — triggers once on enter, reverses on leave
      const stats = [
        { target: 3,    suffix: '+',  decimals: 0, index: 0 },
        { target: 100,  suffix: 'K+', decimals: 0, index: 1 },
        { target: 2,    suffix: '',   decimals: 0, index: 2 },
        { target: 99.9, suffix: '%',  decimals: 1, index: 3 },
      ]
      stats.forEach(({ target, suffix, decimals, index }) => {
        const el = statValueRefs.current[index]
        if (!el) return
        const obj = { val: 0 }
        gsap.to(obj, {
          val: target,
          duration: 1.8,
          ease: 'power2.out',
          onUpdate() {
            el.textContent = (decimals === 0 ? Math.round(obj.val) : obj.val.toFixed(1)) + suffix
          },
          scrollTrigger: {
            trigger: cardsRef.current[2],
            start: 'top bottom',
            once: true,
            invalidateOnRefresh: true,
          },
        })
      })

    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const setCardRef = (i: number) => (el: HTMLDivElement | null) => {
    cardsRef.current[i] = el
  }

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative w-full min-h-screen bg-black text-white py-32 px-6 md:px-12 flex flex-col justify-center select-none overflow-hidden"
    >
      {/* Bottom blend into Skills (#0b0b0b) */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-48 pointer-events-none z-20"
        style={{ background: 'linear-gradient(to bottom, transparent, #0b0b0b)' }}
      />
      {/* Subtle top-left radial gold hint */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-32 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at top left, rgba(212,175,55,0.035), transparent 65%)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto w-full space-y-12">
        {/* Section header */}
        <div ref={headingRef} className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-gold-600 animate-ping" />
            <span ref={labelRef} className="text-xs font-mono uppercase tracking-widest text-white/50">About Me</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter flex flex-wrap gap-x-5">
            {['ORIGIN', '&', 'VISION.'].map((word, i) => (
              <span
                key={word}
                ref={el => { wordRefs.current[i] = el }}
                className="inline-block text-transparent bg-clip-text"
                style={{
                  backgroundImage: 'linear-gradient(to right, var(--color-gold-500), var(--color-gold-400), var(--color-gold-700))',
                  filter: 'drop-shadow(0 0 30px rgba(212,175,55,0.4))',
                }}
              >
                {word}
              </span>
            ))}
          </h2>
        </div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">

          {/* Card 01 — Bio (7 cols) */}
          <div ref={setCardRef(0)} className="md:col-span-7">
            <BentoCard num="01" className="p-8 md:p-12 flex flex-col justify-between h-full min-h-[320px]">
              <div className="space-y-5 relative z-10">
                <h3 className="text-xs font-mono uppercase tracking-widest text-gold-500 font-bold">About</h3>
                <p className="text-lg md:text-xl font-medium text-white/90 leading-relaxed">
                  I am <span className="text-white font-bold">Ajith Dollichan</span>, an AI Software Developer
                  with 3+ years of experience building enterprise AI solutions and full-stack platforms at{' '}
                  <span className="text-white font-bold">SAP SE</span> and{' '}
                  <span className="text-white font-bold">Acabes International (Arab Bank)</span>.
                </p>
                <p className="text-sm md:text-base text-white/60 font-light leading-relaxed">
                  Currently building LLM workflows, agentic RAG pipelines, and Joule integrations at SAP —
                  grounded in strong full-stack engineering and enterprise-scale systems.
                </p>
              </div>
              <div className="pt-8 flex flex-wrap gap-2 relative z-10">
                {['LLM Workflows', 'Agentic RAG', 'Full-Stack Dev', 'SAP AI Core'].map((tag) => (
                  <span
                    key={tag}
                    className="px-3.5 py-1.5 rounded bg-white/5 border border-white/10 text-xs font-mono text-white/80"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </BentoCard>
          </div>

          {/* Card 02 — Learning Curve (5 cols) */}
          <div ref={setCardRef(1)} className="md:col-span-5">
            <BentoCard num="02" className="p-8 md:p-12 flex flex-col justify-between h-full min-h-[320px]">
              <div className="space-y-5 relative z-10">
                <h3 className="text-xs font-mono uppercase tracking-widest text-gold-500 font-bold">
                  The Learning Curve
                </h3>
                <ul className="space-y-3.5 text-sm text-white/80 font-light">
                  {/* TOP 0.35% — gold highlight row */}
                  <li
                    className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl"
                    style={{ background: 'rgba(212,175,55,0.08)', border: '1px solid rgba(212,175,55,0.22)' }}
                  >
                    <span
                      className="shrink-0 px-2 py-0.5 rounded text-[9px] font-black tracking-[0.12em] font-mono"
                      style={{ background: 'rgba(212,175,55,0.9)', color: '#000' }}
                    >
                      TOP 0.35%
                    </span>
                    <span className="text-white font-semibold text-[13px] leading-snug">
                      University rank holder — Calicut University · Score 1.4
                    </span>
                  </li>
                  {[
                    'Masters in Global Software Dev — Hochschule Fulda (2025–present)',
                    'RAG With HANA Vector Engine ',
                    'Fine tuning LLMs for enterprise workflows',
                    'SAP AI CORE — LLM Orchestration & RAG pipelines',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <span className="text-gold-500 font-bold mt-0.5">›</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </BentoCard>
          </div>

          {/* Card 03 — Stats (4 cols) */}
          <div ref={setCardRef(2)} className="md:col-span-4">
            <BentoCard num="03" className="p-8 flex flex-col justify-center h-full min-h-[200px]">
              <div className="relative z-10 grid grid-cols-2 gap-6">
                {[
                  { value: '3+',    label: 'Years Experience' },
                  { value: '100K+', label: 'Txns/day supported' },
                  { value: '2',     label: 'Production AI Systems' },
                  { value: '99.9%', label: 'Uptime SLA' },
                ].map(({ value, label }, i) => (
                  <div key={label} className="space-y-1">
                    <p ref={el => { statValueRefs.current[i] = el }} className="text-3xl font-black text-white">{value}</p>
                    <p className="text-[10px] font-mono text-white/40 uppercase tracking-widest leading-tight">{label}</p>
                  </div>
                ))}
              </div>
            </BentoCard>
          </div>

          {/* Card 04 — Currently At (8 cols) */}
          <div ref={setCardRef(3)} className="md:col-span-8">
            <BentoCard num="04" className="p-8 md:p-12 flex flex-col justify-between h-full min-h-[200px]">
              <div className="space-y-4 relative z-10">
                <div className="flex items-center justify-between flex-wrap gap-3">
                  <h3 className="text-xs font-mono uppercase tracking-widest text-gold-500 font-bold">
                    Currently At
                  </h3>
                  <span className="px-3 py-1 text-[10px] font-mono bg-gold-600/10 border border-gold-600/30 rounded-full text-gold-500 tracking-widest">
                    Dec 2025 – Present
                  </span>
                </div>
                <p className="text-xl font-black text-white tracking-tight">SAP SE — Walldorf</p>
                <p className="text-sm font-mono text-white/50 uppercase tracking-widest">
                  Working Student · AI Integration &amp; FBE Coordination
                </p>
                <ul className="space-y-2 text-sm text-white/70 font-light pt-1">
                  {[
                    'Designed Business AI solutions integrating backend APIs with LLM services via SAP AI Core',
                    'Built multi-step agentic RAG pipeline for automated SAP Note generation — reducing hallucination through intelligent chunking and vector search',
                    'Delivered Jira EPIC quality scoring automation powered by AI services',
                    'Applied prompt engineering and context handling to iteratively improve LLM output quality',
                  ].map((b) => (
                    <li key={b} className="flex items-start gap-2">
                      <span className="text-gold-500 font-bold">›</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </BentoCard>
          </div>

          {/* Card 05 — Awards (12 cols, full width) */}
          <div ref={setCardRef(4)} className="md:col-span-12">
            <BentoCard num="05" className="p-8 md:p-10">
              <div className="relative z-10 space-y-4">
                <h3 className="text-xs font-mono uppercase tracking-widest text-gold-500 font-bold">
                  Awards &amp; Recognition
                </h3>
                <div className="flex flex-wrap gap-2">
                  {awards.map((a) => (
                    <span
                      key={a}
                      className="px-3.5 py-1.5 rounded bg-white/5 border border-white/10 text-xs font-mono text-white/70"
                    >
                      {a}
                    </span>
                  ))}
                </div>
              </div>
            </BentoCard>
          </div>
        </div>
      </div>
    </section>
  )
}
