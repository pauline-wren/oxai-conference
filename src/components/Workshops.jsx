import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import { useState } from 'react'

function WorkshopCard({ workshop }) {
  const { data: d, content } = workshop
  const [open, setOpen] = useState(false)

  return (
    <article className="bg-white flex flex-col overflow-hidden border border-[#e5e5e5] border-l-4 border-l-[#fb923c]">
      <div className="flex flex-col gap-5 p-7 flex-1">
        {/* Tag + time */}
        <div className="flex items-center justify-between gap-2">
          <span className="bg-[#fb923c] text-white text-[10px] font-bold tracking-widest uppercase px-2 py-0.5">Workshop</span>
          <span className="text-[#ccc] text-sm">{d.time}</span>
        </div>

        {/* Title */}
        <div>
          <h3 className="text-ink font-bold text-xl leading-snug">{d.title}</h3>
          {d.subtitle && <p className="text-[#777] italic text-sm mt-1">{d.subtitle}</p>}
        </div>

        {/* Meta */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm border-t border-[#f0f0f0] pt-4">
          {d.facilitator && <span className="text-ink font-bold">{d.facilitator}</span>}
          {d.duration && <span className="text-[#999]">{d.duration}</span>}
          {d.capacity && <span className="text-[#999]">{d.capacity} seats</span>}
        </div>

        {/* Requirements */}
        {d.requirements && (
          <div className="border-l-2 border-[#fb923c] pl-4 py-1">
            <p className="text-[#fb923c] text-[10px] font-bold tracking-widest uppercase mb-1">Requirements</p>
            <p className="text-[#555] text-sm leading-relaxed">{d.requirements}</p>
          </div>
        )}

        {/* Description toggle */}
        {content && (
          <div className="mt-auto pt-4 border-t border-[#f5f5f5]">
            <button
              onClick={() => setOpen(o => !o)}
              className="flex items-center gap-2 text-[#fb923c] text-xs tracking-widest uppercase hover:opacity-70 transition-opacity font-bold"
            >
              {open ? 'Hide description' : 'Read description'}
              <span className={`inline-block w-1.5 h-1.5 border-r-2 border-b-2 border-current transition-transform duration-200 ${open ? '-rotate-135' : 'rotate-45'}`} />
            </button>
            {open && (
              <div className="text-[#444] text-sm leading-loose space-y-3 mt-4 [&_h2]:text-[#fb923c] [&_h2]:text-[10px] [&_h2]:tracking-[0.2em] [&_h2]:uppercase [&_h2]:mt-4 [&_h2]:mb-1 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1">
                <ReactMarkdown rehypePlugins={[rehypeRaw]}>{content}</ReactMarkdown>
              </div>
            )}
          </div>
        )}
      </div>
    </article>
  )
}

export default function Workshops({ workshops }) {
  if (!workshops.length) return null
  return (
    <section id="workshops" className="bg-[#f4f4f4] py-20 md:py-24 border-b border-[#e5e5e5]">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <div className="mb-12">
          <span className="inline-block bg-mint text-ink text-[11px] font-bold tracking-widest uppercase px-2.5 py-1 mb-4">Hands-On</span>
          <h2 className="text-ink font-bold text-3xl md:text-5xl tracking-tight">Workshops</h2>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {workshops.map(w => <WorkshopCard key={w.data.id} workshop={w} />)}
        </div>
      </div>
    </section>
  )
}
