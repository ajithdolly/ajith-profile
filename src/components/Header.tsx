import { identity } from '../data/content'

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-5 mix-blend-difference pointer-events-none">
      <span className="font-black text-sm tracking-widest uppercase text-white flex items-center gap-2 pointer-events-auto">
        {identity.name.toUpperCase()}
        <span className="w-1.5 h-1.5 rounded-full bg-white inline-block" />
      </span>
      <nav className="hidden md:flex items-center gap-8 text-xs font-mono uppercase tracking-widest text-white pointer-events-auto">
        {(['home', 'about', 'skills', 'projects', 'contact'] as const).map((id) => (
          <a
            key={id}
            href={`#${id}`}
            className="hover:opacity-70 transition-opacity"
          >
            {id}
          </a>
        ))}
      </nav>
    </header>
  )
}
