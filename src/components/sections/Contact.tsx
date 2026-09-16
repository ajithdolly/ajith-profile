import { useRef, useLayoutEffect } from 'react'
import { identity } from '../../data/content'

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)

  useLayoutEffect(() => {
    const heading = headingRef.current
    if (!heading) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        heading.classList.toggle('contact-reveal', entry.isIntersecting)
      },
      { threshold: 0, rootMargin: '0px 0px -24px 0px' },
    )

    observer.observe(heading)
    return () => {
      observer.disconnect()
      heading.classList.remove('contact-reveal')
    }
  }, [])

  const links = [
    {
      label: 'LinkedIn',
      href: identity.linkedin,
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
    },
    {
      label: 'GitHub',
      href: identity.github,
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
        </svg>
      ),
    },
    {
      label: 'Email',
      href: `mailto:${identity.email}`,
      icon: (
        <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
          <polyline points="22,6 12,13 2,6" />
        </svg>
      ),
    },
  ]

  return (
    <section
      ref={sectionRef}
      id="contact"
      aria-labelledby="contact-heading"
      className="relative flex min-h-svh w-full flex-col overflow-hidden bg-[#050505] px-6 text-white md:px-12"
    >
      {/* Watermark */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden"
      >
        <span className="text-[22vw] font-black uppercase tracking-tighter text-gold-600/[0.04] select-none">
          Contact
        </span>
      </div>

      {/* Gold glow blob */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/3 h-80 w-80 -translate-x-1/2 rounded-full"
        style={{ background: 'rgba(212,175,55,0.10)', filter: 'blur(120px)' }}
      />

      {/* Content */}
      <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-1 flex-col items-center justify-center py-16 text-center gap-6">
        <p className="text-xs font-mono uppercase tracking-[0.25em] text-gold-500">
          Get in touch
        </p>

        {/* Clip-reveal heading */}
        <h2
          id="contact-heading"
          ref={headingRef}
          className="text-5xl font-black leading-tight tracking-tighter sm:text-6xl lg:text-7xl"
        >
          <span className="block overflow-hidden">
            <span className="contact-heading-line block">
              Let's build
            </span>
          </span>
          <span className="block overflow-hidden">
            <span className="contact-heading-line block text-gold-500" style={{ transitionDelay: '0.1s' }}>
              what's next.
            </span>
          </span>
        </h2>

        <p className="mt-1 max-w-md text-sm leading-relaxed text-white/60 md:text-base">
          Have an idea, an opportunity, or a question? Let's start a conversation.
        </p>

        {/* CTA links */}
        <div className="mt-3 flex flex-wrap justify-center gap-4">
          {links.map(({ label, href, icon }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith('mailto') ? undefined : '_blank'}
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 rounded-full border border-white/20 px-6 py-3 text-xs font-mono uppercase tracking-widest text-white/80 transition-all duration-200 hover:border-gold-500 hover:text-gold-400 hover:scale-105"
            >
              {icon}
              {label}
            </a>
          ))}
        </div>

        {/* Large email link */}
        <a
          href={`mailto:${identity.email}`}
          className="mt-6 text-sm md:text-base font-mono text-white/30 hover:text-gold-500 transition-colors duration-200 tracking-widest"
        >
          {identity.email}
        </a>
      </div>

      {/* Footer strip */}
      <div className="relative z-10 flex items-center justify-between py-8 border-t border-white/5 text-[10px] font-mono text-white/25 uppercase tracking-widest flex-wrap gap-2">
        <span>© 2026 Ajith Dollichan</span>
        <span>Built with React + GSAP + Tailwind</span>
        <span>Mannheim, Germany</span>
      </div>
    </section>
  )
}
