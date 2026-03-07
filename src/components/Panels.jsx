import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import { useState, useEffect, useRef } from 'react'
import ComingSoon from './ComingSoon'

function PresentationSlide({ panel, onClose }) {
  const { data: d } = panel
  const slideRef = useRef(null)

  useEffect(() => {
    const el = slideRef.current
    if (el?.requestFullscreen) el.requestFullscreen().catch(() => {})
    return () => { if (document.fullscreenElement) document.exitFullscreen().catch(() => {}) }
  }, [])

  useEffect(() => {
    const onFsChange = () => { if (!document.fullscreenElement) onClose() }
    document.addEventListener('fullscreenchange', onFsChange)
    return () => document.removeEventListener('fullscreenchange', onFsChange)
  }, [onClose])

  return (
    <div
      ref={slideRef}
      className="fixed inset-0 z-50 flex flex-col"
      style={{ background: '#0b0b0b', fontFamily: "'Space Mono', monospace" }}
    >
      {/* Top bar */}
      <div className="flex items-center justify-between px-14 py-6" style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
        <img src="/oxai_logo_text.png" alt="OXAI" style={{ height: '3.2rem', width: 'auto' }} />
        <span style={{ color: '#1fffb6', fontSize: '0.85rem', letterSpacing: '0.25em' }} className="font-bold uppercase">
          OXAI Conference 2026
        </span>
        <button
          onClick={onClose}
          style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.8rem', letterSpacing: '0.15em' }}
          className="font-bold uppercase hover:text-white transition-colors"
        >
          ✕ Exit
        </button>
      </div>

      {/* Two-column body */}
      <div className="flex-1 flex overflow-hidden">

        {/* Left — title + meta */}
        <div className="flex flex-col justify-center px-14 py-10" style={{ flex: '0 0 55%', borderRight: '1px solid rgba(255,255,255,0.07)' }}>
          <span
            className="font-bold uppercase inline-block mb-8"
            style={{ background: '#a78bfa', color: '#fff', fontSize: '0.75rem', letterSpacing: '0.25em', padding: '0.35rem 0.9rem' }}
          >
            Panel
          </span>

          <h1 className="text-white font-bold leading-snug mb-8"
            style={{ fontSize: 'clamp(1.6rem, 3vw, 2.8rem)' }}>
            {d.title}
          </h1>

          <div className="flex flex-col gap-2 mb-8">
            {d.time && (
              <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '1.05rem' }}>
                <span style={{ color: '#1fffb6' }}>Time</span>&ensp;{d.time}
              </p>
            )}
            {d.venue && (
              <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '1.05rem' }}>
                <span style={{ color: '#1fffb6' }}>Venue</span>&ensp;{d.venue}
              </p>
            )}
          </div>

          {d.moderator && (
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '1rem' }}>
              Moderated by <span className="text-white font-bold">{d.moderator}</span>
            </p>
          )}
          {d.organizers?.length > 0 && (
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '1rem', marginTop: '0.4rem' }}>
              Organised by <span className="text-white font-bold">{d.organizers.join(', ')}</span>
            </p>
          )}
        </div>

        {/* Right — panelists */}
        {d.panelists?.length > 0 && (
          <div className="flex flex-col justify-center px-12 py-10" style={{ flex: '1' }}>
            <div className="flex items-center gap-4 mb-10">
              <span style={{ display: 'block', width: '2.5rem', height: '3px', background: '#1fffb6', flexShrink: 0 }} />
              <span style={{ color: '#1fffb6', fontSize: '1.1rem', letterSpacing: '0.3em' }} className="font-bold uppercase">
                Panelists
              </span>
            </div>
            <div className="flex flex-col gap-6">
              {d.panelists.map((p, i) => (
                <div key={i} style={{ borderLeft: '3px solid #a78bfa', paddingLeft: '1rem' }}>
                  <p className="text-white font-bold" style={{ fontSize: 'clamp(1.6rem, 2.5vw, 2.4rem)' }}>{p.name}</p>
                  <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: 'clamp(0.9rem, 1.2vw, 1.15rem)', marginTop: '0.25rem', lineHeight: 1.5 }}>
                    {p.affiliation}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Bottom mint bar */}
      <div style={{ height: '5px', background: '#1fffb6' }} />
    </div>
  )
}

function PanelBlock({ panel }) {
  const { data: d, content } = panel
  const [open, setOpen] = useState(false)
  const [presenting, setPresenting] = useState(false)
  const [desktopOnly, setDesktopOnly] = useState(false)

  function handlePresent() {
    if (!document.fullscreenEnabled || window.innerWidth < 768) {
      setDesktopOnly(true)
      setTimeout(() => setDesktopOnly(false), 3000)
      return
    }
    setPresenting(true)
  }

  return (
    <>
      {presenting && <PresentationSlide panel={panel} onClose={() => setPresenting(false)} />}

      <article className="bg-white border border-[#e5e5e5] border-l-4 border-l-[#a78bfa] overflow-hidden">

        {/* Header */}
        <div className="px-7 pt-6 pb-5 border-b border-[#f0f0f0]">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
            <div className="flex flex-wrap items-center gap-3">
              <span className="bg-[#a78bfa] text-white text-[10px] font-bold tracking-widest uppercase px-2 py-0.5">Panel</span>
              <span className="text-[#666] text-sm">{d.time}</span>
              {d.venue && <span className="text-[#666] text-sm">· {d.venue}</span>}
            </div>
            <div className="flex flex-col items-end gap-1">
              <button
                onClick={handlePresent}
                className="flex items-center gap-1.5 text-[10px] font-bold tracking-widest uppercase px-3 py-1.5 border border-[#a78bfa] text-[#a78bfa] hover:bg-[#a78bfa] hover:text-white transition-colors"
              >
                <span>▶</span> Present
              </button>
              {desktopOnly && (
                <p className="text-[10px] text-[#999] tracking-wide">Desktop only — use on a computer</p>
              )}
            </div>
          </div>
          <h3 className="text-ink font-bold text-xl leading-snug">{d.title}</h3>
          {d.subtitle && <p className="text-[#555] italic text-sm mt-1">{d.subtitle}</p>}
          {d.moderator && (
            <p className="text-[#666] text-sm mt-2">
              Moderated by <span className="text-ink font-bold">{d.moderator}</span>
            </p>
          )}
          {d.organizers?.length > 0 && (
            <p className="text-[#666] text-sm mt-1">
              Organised by <span className="text-ink font-bold">{d.organizers.join(', ')}</span>
            </p>
          )}
        </div>

        {/* Panelists */}
        {d.panelists?.length > 0 && (
          <div className="px-7 py-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-4 border-b border-[#f0f0f0]">
            {d.panelists.map((p, i) => (
              <div key={i} className="flex gap-3 items-start">
                <div className="w-1.5 h-1.5 bg-[#a78bfa] mt-1.5 flex-shrink-0" />
                <div>
                  <p className="text-ink text-sm font-bold leading-snug">{p.name}</p>
                  <p className="text-[#999] text-xs mt-0.5 leading-snug">{p.affiliation}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Description toggle */}
        {content && (
          <div className="px-7 py-5">
            <button
              onClick={() => setOpen(o => !o)}
              className="flex items-center gap-2 text-[#a78bfa] text-xs tracking-widest uppercase hover:opacity-70 transition-opacity font-bold"
            >
              {open ? 'Hide description' : 'Read description'}
              <span className={`inline-block w-1.5 h-1.5 border-r-2 border-b-2 border-current transition-transform duration-200 ${open ? '-rotate-135' : 'rotate-45'}`} />
            </button>
            {open && (
              <div className="text-[#444] text-sm leading-loose space-y-3 mt-4 max-w-3xl [&_h2]:text-[#a78bfa] [&_h2]:text-[10px] [&_h2]:tracking-[0.2em] [&_h2]:uppercase [&_h2]:mt-4 [&_h2]:mb-1 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1">
                <ReactMarkdown rehypePlugins={[rehypeRaw]}>{content}</ReactMarkdown>
              </div>
            )}
          </div>
        )}
      </article>
    </>
  )
}

export default function Panels({ panels }) {
  return (
    <section id="panels" className="bg-[#f4f4f4] py-20 md:py-24 border-b border-[#e5e5e5]">
      <div className="max-w-5xl mx-auto px-5 md:px-8">
        <div className="mb-12">
          <span className="inline-block bg-mint text-ink text-[11px] font-bold tracking-widest uppercase px-2.5 py-1 mb-4">Discussion</span>
          <h2 className="text-ink font-bold text-3xl md:text-5xl tracking-tight">Panels</h2>
        </div>
        {panels.length ? (
          <div className="flex flex-col gap-5">
            {panels.map(p => <PanelBlock key={p.data.id} panel={p} />)}
          </div>
        ) : (
          <ComingSoon />
        )}
      </div>
    </section>
  )
}
