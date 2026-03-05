import ReactMarkdown from 'react-markdown'
import { useState } from 'react'
import ComingSoon from './ComingSoon'

function PanelBlock({ panel }) {
  const { data: d, content } = panel
  const [open, setOpen] = useState(false)

  return (
    <article className="bg-white border border-[#e5e5e5] border-l-4 border-l-[#a78bfa] overflow-hidden">

      {/* Header */}
      <div className="px-7 pt-6 pb-5 border-b border-[#f0f0f0]">
        <div className="flex flex-wrap items-center gap-3 mb-3">
          <span className="bg-[#a78bfa] text-white text-[10px] font-bold tracking-widest uppercase px-2 py-0.5">Panel</span>
          <span className="text-[#bbb] text-sm">{d.time}</span>
          {d.venue && <span className="text-[#ccc] text-sm hidden sm:inline">· {d.venue}</span>}
        </div>
        <h3 className="text-ink font-bold text-xl leading-snug">{d.title}</h3>
        {d.subtitle && <p className="text-[#777] italic text-sm mt-1">{d.subtitle}</p>}
        {d.moderator && (
          <p className="text-[#999] text-sm mt-2">
            Moderated by <span className="text-ink font-bold">{d.moderator}</span>
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
              <ReactMarkdown>{content}</ReactMarkdown>
            </div>
          )}
        </div>
      )}
    </article>
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
