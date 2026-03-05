import { useState, useEffect } from 'react'

const links = [
  { label: 'Schedule',  href: '#schedule' },
  { label: 'Speakers',  href: '#speakers' },
  { label: 'Panels',    href: '#panels' },
  { label: 'Sessions',  href: '#sessions' },
  { label: 'Workshops', href: '#workshops' },
  { label: 'Committee', href: '#committee' },
]

export default function Nav({ conf }) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 h-14 flex items-center justify-between px-5 md:px-8 transition-colors duration-200 border-b ${scrolled ? 'bg-ink border-g800' : 'border-transparent'}`}>

      <a href="#top" className="flex items-center">
        <img src="/oxai_logo_text.png" alt="OxAI" className="h-9 w-auto brightness-110" />
      </a>

      <nav className="hidden md:flex items-center gap-7">
        {links.map(l => (
          <a key={l.href} href={l.href} className="text-g300 hover:text-mint text-xs tracking-widest uppercase transition-colors">
            {l.label}
          </a>
        ))}
        <a
          href={conf.registrationUrl ?? '#'}
          target="_blank" rel="noreferrer"
          className="bg-mint text-ink font-bold text-xs tracking-widest uppercase px-4 py-2 hover:bg-transparent hover:text-mint border border-mint transition-colors"
        >
          Register
        </a>
      </nav>

      <button className="md:hidden flex flex-col gap-1.5 p-1" onClick={() => setOpen(o => !o)} aria-label="Toggle menu">
        <span className={`block w-5 h-0.5 bg-white transition-transform duration-200 ${open ? 'translate-y-2 rotate-45' : ''}`} />
        <span className={`block w-5 h-0.5 bg-white transition-opacity duration-200 ${open ? 'opacity-0' : ''}`} />
        <span className={`block w-5 h-0.5 bg-white transition-transform duration-200 ${open ? '-translate-y-2 -rotate-45' : ''}`} />
      </button>

      {open && (
        <div className="md:hidden fixed inset-0 top-14 bg-ink z-40 flex flex-col items-center justify-center gap-8 border-t border-g800">
          {links.map(l => (
            <a key={l.href} href={l.href} className="text-white text-lg tracking-widest uppercase" onClick={() => setOpen(false)}>
              {l.label}
            </a>
          ))}
          <a
            href={conf.registrationUrl ?? '#'}
            target="_blank" rel="noreferrer"
            className="bg-mint text-ink font-bold text-sm tracking-widest uppercase px-8 py-3 mt-2"
            onClick={() => setOpen(false)}
          >
            Register
          </a>
        </div>
      )}
    </header>
  )
}
