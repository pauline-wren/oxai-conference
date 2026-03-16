import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import { useState } from 'react'
import LinkedInIcon from './LinkedInIcon'
import ComingSoon from './ComingSoon'

function SpeakerCard({ speaker }) {
  const { data: d, content } = speaker
  const [open, setOpen] = useState(false)
  const initials = d.name?.split(' ').map(w => w[0]).join('').slice(0, 2)

  return (
    <article className="flex flex-col md:flex-row">

      {/* Left — portrait + identity */}
      <div className="md:w-56 flex-shrink-0 bg-g900 flex flex-col items-center gap-4 px-8 py-8 border-b md:border-b-0 md:border-r border-g800">
        {d.photo ? (
          <img src={d.photo} alt={d.name} className="w-28 h-28 rounded-full object-cover object-top" />
        ) : (
          <div className="w-28 h-28 rounded-full bg-g800 text-mint font-bold text-2xl flex items-center justify-center tracking-widest">
            {initials}
          </div>
        )}
        <div className="flex flex-col gap-4 text-center w-full">
          <div>
            <h3 className="text-white font-bold text-sm leading-snug">{d.name}</h3>
            <p className="text-mint text-xs mt-1.5 leading-snug">{d.role}</p>
            <p className="text-g500 text-xs mt-0.5 leading-snug">{d.organisation}</p>
          </div>
          {d.linkedin && (
            <a href={d.linkedin} target="_blank" rel="noreferrer"
              className="text-g500 hover:text-mint transition-colors mx-auto" aria-label="LinkedIn">
              <LinkedInIcon className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>

      {/* Right — talk + bio */}
      <div className="flex-1 bg-g900 flex flex-col gap-6 px-8 py-8">
        <div className="flex flex-col gap-3">
          <span className="inline-block bg-mint text-ink text-[10px] font-bold tracking-widest uppercase px-2 py-0.5 w-fit">
            {d.type === 'keynote' ? 'Keynote' : 'Featured Talk'}
          </span>
          <p className="text-white font-bold text-2xl md:text-3xl leading-snug">{d.talk}</p>
          <p className="text-g300 text-sm font-bold">{d.time}{d.venue ? <span className="text-g500 font-normal"> · {d.venue}</span> : ''}</p>
        </div>

        {content && (
          <>
            <div className="w-12 h-px bg-g800" />
            <button
              onClick={() => setOpen(o => !o)}
              className="flex items-center gap-2 text-mint text-xs tracking-widest uppercase hover:opacity-70 transition-opacity w-fit font-bold"
            >
              {open ? 'Hide bio & abstract' : 'Read bio & abstract'}
              <span className={`inline-block w-1.5 h-1.5 border-r-2 border-b-2 border-current transition-transform duration-200 ${open ? '-rotate-135' : 'rotate-45'}`} />
            </button>
            {open && (
              <div className="text-g300 text-sm leading-loose space-y-3 max-w-2xl [&_h2]:text-mint [&_h2]:text-[10px] [&_h2]:tracking-[0.2em] [&_h2]:uppercase [&_h2]:mt-4 [&_h2]:mb-1">
                <ReactMarkdown rehypePlugins={[rehypeRaw]}>{content}</ReactMarkdown>
              </div>
            )}
          </>
        )}
      </div>
    </article>
  )
}

export default function Speakers({ speakers }) {
  return (
    <section id="speakers" className="bg-ink py-20 md:py-24 border-b border-g800">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <div className="mb-12">
          <span className="inline-block bg-mint text-ink text-[11px] font-bold tracking-widest uppercase px-2.5 py-1 mb-4">Keynotes and Featured Talks</span>
          <h2 className="text-white font-bold text-3xl md:text-5xl tracking-tight">Speakers</h2>
        </div>
        {speakers.length ? (
          <div className="flex flex-col gap-px border border-g800 bg-g800">
            {speakers.map(s => <SpeakerCard key={s.data.id} speaker={s} />)}
          </div>
        ) : (
          <ComingSoon dark />
        )}
      </div>
    </section>
  )
}
