import { useRef, useLayoutEffect } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { projects } from '../../data/content'

gsap.registerPlugin(ScrollTrigger)

const CATEGORY_COLORS: Record<string, string> = {
  'Applied AI': 'text-gold-500 border-gold-500/40 bg-gold-500/10',
  'Digital Banking': 'text-sky-400 border-sky-400/40 bg-sky-400/10',
  'Machine Learning': 'text-purple-400 border-purple-400/40 bg-purple-400/10',
}

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const stage = stageRef.current
      const cards = cardsRef.current.filter(Boolean) as HTMLDivElement[]
      if (!stage || cards.length === 0) return

      const getCenterX = (_: number, el: HTMLDivElement) =>
        stage.clientWidth / 2 - el.offsetLeft - el.offsetWidth / 2
      const getCenterY = (_: number, el: HTMLDivElement) =>
        stage.clientHeight / 2 - el.offsetTop - el.offsetHeight / 2

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 55%',
          end: 'bottom top',
          toggleActions: 'restart reset restart reset',
          invalidateOnRefresh: true,
        },
      })

      // All cards start stacked at center, tiny + rotated
      tl.fromTo(
        cards,
        {
          x: getCenterX,
          y: getCenterY,
          scale: 0.35,
          rotation: (i: number) => (i % 2 === 0 ? -5 : 5),
          opacity: 0,
        },
        { opacity: 1, duration: 0.2 },
      )
        // Fan up
        .to(cards, {
          y: (i: number, el: HTMLDivElement) => getCenterY(i, el) - 160,
          scale: 0.55,
          duration: 0.6,
          stagger: 0.08,
          ease: 'back.out(1.2)',
        }, 0.3)
        // Settle into grid
        .to(cards, {
          x: 0,
          y: 0,
          scale: 1,
          rotation: 0,
          duration: 0.7,
          stagger: 0.1,
          ease: 'power3.out',
        }, 1.0)
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="projects"
      ref={sectionRef}
      aria-label="Projects"
      className="relative w-full min-h-svh flex items-center justify-center overflow-hidden bg-[#0b0b0b] px-6 py-16 md:px-12 text-white"
    >
      {/* Watermark */}
      <div
        aria-hidden="true"
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
      >
        <span className="text-[18vw] font-black text-white/[0.03] tracking-tighter select-none">
          PROJECTS
        </span>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto space-y-12">
        {/* Section header */}
        <div className="space-y-2">
          <p className="text-xs font-mono uppercase tracking-[0.25em] text-gold-500">Selected Work</p>
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-white">
            What I've Built.
          </h2>
        </div>

        {/* Cards grid */}
        <div
          ref={stageRef}
          data-project-stage
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {projects.map((project, i) => (
            <div
              key={project.title}
              ref={(el) => { cardsRef.current[i] = el }}
              data-project-card
              className="group relative bg-[#141414]/90 backdrop-blur-2xl border border-white/10 rounded-[2rem] p-8 flex flex-col justify-between min-h-[360px] hover:border-gold-600/40 transition-colors duration-300 will-change-transform overflow-hidden"
            >
              {/* Hover glow */}
              <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: 'radial-gradient(300px circle at 50% 0%, rgba(212,175,55,0.08), transparent 70%)' }} />

              {/* Category chip */}
              <div className="flex items-start justify-between mb-4">
                <span
                  className={`px-2.5 py-1 text-[10px] font-mono uppercase tracking-widest rounded-full border ${CATEGORY_COLORS[project.category] ?? 'text-white/50 border-white/20 bg-white/5'}`}
                >
                  {project.category}
                </span>
                <span className="text-2xl font-black text-white/[0.07] font-mono">
                  {String(i + 1).padStart(2, '0')}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-xl md:text-2xl font-black tracking-tight text-white leading-snug mb-3 group-hover:text-gold-400 transition-colors duration-200">
                {project.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-white/60 font-light leading-relaxed flex-1 mb-6">
                {project.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 text-[10px] font-mono rounded bg-white/5 border border-white/10 text-white/60 hover:text-white/80 transition-colors"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Corner gold dot */}
              <div
                className="absolute bottom-5 right-5 w-2 h-2 rounded-full bg-gold-600 transition-all duration-300 group-hover:shadow-[0_0_15px_#D4AF37]"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
