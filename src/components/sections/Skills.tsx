import { useRef, useLayoutEffect, useState } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { skills } from '../../data/content'

gsap.registerPlugin(ScrollTrigger)

// Deck keyframes: [deckPos, [xVw, rotation, scale, opacity, zIndex]]
const DECK_FRAMES: [number, [number, number, number, number, number]][] = [
  [-2.0, [-55, -19, 0.42, 0.0,  0]],  // fully gone
  [-1.0, [-30, -14, 0.62, 0.65, 5]],  // clearly visible left card — 65% opacity
  [ 0.0, [  0,   0, 1.00, 1.0, 10]],  // active — perfectly centred
  [ 1.0, [ 24,  14, 0.62, 1.0,  8]],  // next card
  [ 2.0, [ 38,  22, 0.48, 0.65, 6]],  // wider gap, slight fade
  [ 3.0, [ 50,  28, 0.38, 0.20, 4]],  // further out, mostly gone
  [ 4.0, [ 60,  33, 0.30, 0.0,  2]],  // off-screen
]

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t
}

function getDeckProps(deckPos: number) {
  if (deckPos <= DECK_FRAMES[0][0]) {
    const v = DECK_FRAMES[0][1]
    return { xVw: v[0], rotation: v[1], scale: v[2], opacity: v[3], zIndex: v[4] }
  }
  const last = DECK_FRAMES[DECK_FRAMES.length - 1]
  if (deckPos >= last[0]) {
    const v = last[1]
    return { xVw: v[0], rotation: v[1], scale: v[2], opacity: v[3], zIndex: v[4] }
  }

  let i = 0
  while (i < DECK_FRAMES.length - 2 && DECK_FRAMES[i + 1][0] <= deckPos) i++

  const [p0, v0] = DECK_FRAMES[i]
  const [p1, v1] = DECK_FRAMES[i + 1]
  const t = (deckPos - p0) / (p1 - p0)

  return {
    xVw:     lerp(v0[0], v1[0], t),
    rotation: lerp(v0[1], v1[1], t),
    scale:    lerp(v0[2], v1[2], t),
    opacity:  lerp(v0[3], v1[3], t),
    zIndex:   Math.round(lerp(v0[4], v1[4], t)),
  }
}

export default function Skills() {
  const sectionRef  = useRef<HTMLElement>(null)
  const cardsRef    = useRef<(HTMLDivElement | null)[]>([])
  const bgLayersRef = useRef<(HTMLDivElement | null)[]>([])
  const [activeIndex, setActiveIndex] = useState(0)
  const [hintDir, setHintDir] = useState<'down' | 'up' | null>(null)
  const [hintExiting, setHintExiting] = useState(false)
  const hintTimerRef   = useRef<ReturnType<typeof setTimeout> | null>(null)
  const touchStartRef  = useRef<{ x: number; y: number } | null>(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const cards = cardsRef.current
      const bgs   = bgLayersRef.current
      const n     = skills.length

      // Apply initial positions
      cards.forEach((card, i) => {
        if (!card) return
        const p = getDeckProps(i)
        gsap.set(card, {
          xPercent: 0,
          x: `${p.xVw}vw`,
          rotation: p.rotation,
          scale: p.scale,
          opacity: p.opacity,
          zIndex: p.zIndex,
          transformOrigin: '50% 110%',  // pivot below card centre → arc feel
        })
      })

      gsap.set(bgs[0], { opacity: 1 })
      bgs.slice(1).forEach(bg => bg && gsap.set(bg, { opacity: 0 }))

      // Smooth scroll position tracker (the scrub lag)
      let rawProgress = { value: 0 }
      const smoothProgress = { value: 0 }

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: `+=${(n - 1) * window.innerHeight}`,
        pin: true,
        scrub: false,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          rawProgress.value = self.progress * (n - 1)
        },
      })

      // Ticker for smooth lerp-following
      gsap.ticker.add(() => {
        smoothProgress.value = lerp(smoothProgress.value, rawProgress.value, 0.1)
        const pos = smoothProgress.value

        // Active index for UI
        const newIdx = Math.min(n - 1, Math.round(pos))
        setActiveIndex(newIdx)

        // Position every card
        cards.forEach((card, i) => {
          if (!card) return
          const deckPos = i - pos
          const p = getDeckProps(deckPos)
          gsap.set(card, {
            x: `${p.xVw}vw`,
            rotation: p.rotation,
            scale: p.scale,
            opacity: p.opacity,
            zIndex: p.zIndex,
          })
        })

        // Crossfade background glow layers
        bgs.forEach((bg, i) => {
          if (!bg) return
          const dist = Math.abs(i - pos)
          gsap.set(bg, { opacity: Math.max(0, 1 - dist) })
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const showHint = (dir: 'down' | 'up') => {
    setHintExiting(false)
    setHintDir(dir)
    if (hintTimerRef.current) clearTimeout(hintTimerRef.current)
    hintTimerRef.current = setTimeout(() => {
      setHintExiting(true)
      hintTimerRef.current = setTimeout(() => setHintDir(null), 400)
    }, 1600)
  }

  const handleWheel = (e: React.WheelEvent) => {
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY) + 10) {
      showHint(e.deltaX > 0 ? 'down' : 'up')
    }
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!touchStartRef.current) return
    const dx = e.touches[0].clientX - touchStartRef.current.x
    const dy = e.touches[0].clientY - touchStartRef.current.y
    if (Math.abs(dx) > Math.abs(dy) + 10 && Math.abs(dx) > 25) {
      showHint(dx < 0 ? 'down' : 'up')
      touchStartRef.current = null
    }
  }

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative w-full h-svh min-h-[600px] bg-[#0b0b0b] text-white overflow-hidden select-none"
      style={{ perspective: '1200px' }}
      onWheel={handleWheel}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
    >
      {/* ── Per-card background glow (upper-right amber source) ── */}
      {skills.map((_, i) => (
        <div
          key={`bg-${i}`}
          ref={el => { bgLayersRef.current[i] = el }}
          className="absolute inset-0 pointer-events-none"
          style={{
            opacity: 0,
            background:
              'radial-gradient(ellipse 55% 55% at 78% 28%, rgba(212,175,55,0.18) 0%, rgba(212,175,55,0.05) 45%, transparent 70%)',
          }}
        />
      ))}

      {/* ── SKILLS giant watermark ── */}
      <div
        aria-hidden="true"
        className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden"
      >
        <span
          className="font-black uppercase tracking-tighter select-none"
          style={{
            fontSize: 'clamp(8rem, 24vw, 26rem)',
            color: 'transparent',
            WebkitTextStroke: '1px rgba(212,175,55,0.50)',
            lineHeight: 1,
            letterSpacing: '-0.02em',
          }}
        >
          SKILLS
        </span>
      </div>

      {/* ── Card deck ── */}
      <div className="absolute inset-0 flex items-center justify-center" style={{ transformStyle: 'preserve-3d' }}>
        {skills.map((skill, i) => (
          <div
            key={skill.title}
            ref={el => { cardsRef.current[i] = el }}
            className="absolute will-change-transform"
            style={{
              width: 'clamp(280px, 25vw, 430px)',
              transformStyle: 'preserve-3d',
            }}
          >
            {/* Card */}
            <div
              className="rounded-[1.4rem] overflow-hidden"
              style={{
                background: 'rgba(10,10,8,0.92)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255,255,255,0.09)',
                boxShadow: '0 24px 64px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.05)',
              }}
            >
              {/* Top shimmer */}
              <div
                className="absolute top-0 left-0 right-0 h-px pointer-events-none"
                style={{
                  background: 'linear-gradient(to right, transparent 5%, rgba(212,175,55,0.25) 50%, transparent 95%)',
                }}
              />

              <div className="p-5 md:p-7" style={{ minHeight: 'clamp(380px, 60vh, 540px)', display: 'flex', flexDirection: 'column' }}>
                {/* Tag + counter */}
                <div className="flex items-center justify-between mb-6">
                  <span
                    className="text-[9px] font-mono uppercase tracking-[0.18em] px-2.5 py-1 rounded"
                    style={{
                      color: 'rgba(255,255,255,0.70)',
                      backgroundColor: 'rgba(255,255,255,0.06)',
                      border: '1px solid rgba(255,255,255,0.12)',
                    }}
                  >
                    {skill.tag}
                  </span>
                  <span className="text-[9px] font-mono text-white/25 tracking-widest">
                    [ {String(i + 1).padStart(2, '0')} / {String(skills.length).padStart(2, '0')} ]
                  </span>
                </div>

                {/* Title */}
                <h3
                  className="font-black tracking-tight text-white leading-[1.1] mb-4 relative z-10"
                  style={{ fontSize: 'clamp(1.4rem, 2.5vw, 2.45rem)' }}
                >
                  {skill.title}
                </h3>

                {/* Description */}
                <p className="text-[0.80rem] text-white/50 font-normal leading-relaxed relative z-10">
                  {skill.desc}
                </p>

                {/* Spacer pushes chips to bottom */}
                <div className="flex-1" />

                {/* Skill chips */}
                <div className="flex flex-wrap gap-1.5 relative z-10">
                  {skill.skills.map(s => (
                    <span
                      key={s}
                      className="px-2.5 py-1 rounded text-[10px] font-mono"
                      style={{
                        backgroundColor: 'rgba(255,255,255,0.05)',
                        border: '1px solid rgba(255,255,255,0.12)',
                        color: 'rgba(255,255,255,0.75)',
                      }}
                    >
                      {s}
                    </span>
                  ))}
                </div>

                {/* Corner dot */}
                <div
                  className="absolute bottom-5 right-5 w-1.5 h-1.5 rounded-full"
                  style={{
                    backgroundColor: 'var(--color-gold-600)',
                    boxShadow: i === activeIndex ? '0 0 10px rgba(212,175,55,0.7)' : 'none',
                  }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ── Scroll hint ── */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-30 transition-opacity duration-500 pointer-events-none"
        style={{ opacity: activeIndex === 0 ? 1 : 0 }}
      >
        <span className="text-[9px] font-mono text-white/25 uppercase tracking-[0.2em]">
          Scroll to explore
        </span>
        <div className="w-px h-8 bg-gradient-to-b from-white/15 to-transparent" />
      </div>

      {/* ── Horizontal-scroll redirect hint ── */}
      {hintDir && (
        <div
          className={`absolute bottom-8 left-1/2 -translate-x-1/2 z-40 pointer-events-none ${hintExiting ? 'scroll-hint-exit' : 'scroll-hint-enter'}`}
        >
          <div
            className="flex flex-col items-center gap-3 px-8 py-5 rounded-2xl"
            style={{
              background: 'rgba(0,0,0,0.72)',
              border: '1px solid rgba(0,194,255,0.22)',
              backdropFilter: 'blur(14px)',
            }}
          >
            <span
              className="text-2xl"
              style={{
                color: 'rgba(0,194,255,0.85)',
                animation: hintDir === 'down' ? 'bounceDown 0.55s ease infinite' : 'bounceUp 0.55s ease infinite',
              }}
            >
              {hintDir === 'down' ? '↓' : '↑'}
            </span>
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/55">
              Scroll your mouse / trackpad {hintDir === 'down' ? '↓ down' : '↑ up'}
            </span>
          </div>
        </div>
      )}
    </section>
  )
}
