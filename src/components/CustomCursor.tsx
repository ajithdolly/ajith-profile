import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function CustomCursor() {
  const orbRef = useRef<HTMLDivElement>(null)
  const dotRef = useRef<HTMLDivElement>(null)
  const hasMovedRef = useRef(false)

  useEffect(() => {
    const orb = orbRef.current
    const dot = dotRef.current
    if (!orb || !dot) return

    const xOrb = gsap.quickTo(orb, 'x', { duration: 0.06, ease: 'power2.out' })
    const yOrb = gsap.quickTo(orb, 'y', { duration: 0.06, ease: 'power2.out' })
    const xDot = gsap.quickTo(dot, 'x', { duration: 0.02, ease: 'none' })
    const yDot = gsap.quickTo(dot, 'y', { duration: 0.02, ease: 'none' })

    const onMove = (e: MouseEvent) => {
      xOrb(e.clientX)
      yOrb(e.clientY)
      xDot(e.clientX)
      yDot(e.clientY)

      if (!hasMovedRef.current) {
        hasMovedRef.current = true
        gsap.to(orb, { opacity: 1, duration: 0.4 })
        gsap.to(dot, { opacity: 1, duration: 0.2 })
      }
    }

    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  return (
    <>
      {/* Glow orb */}
      <div
        ref={orbRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] opacity-0"
        style={{
          width: 300,
          height: 300,
          borderRadius: '50%',
          transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(circle, rgba(212,175,55,0.35) 0%, rgba(212,175,55,0.1) 40%, transparent 70%)',
          filter: 'blur(45px)',
          willChange: 'transform',
        }}
      />
      {/* Small dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] opacity-0"
        style={{
          width: 6,
          height: 6,
          borderRadius: '50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: 'rgba(212,175,55,0.9)',
          willChange: 'transform',
        }}
      />
    </>
  )
}
