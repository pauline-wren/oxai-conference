import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import { useState, useEffect } from 'react'

function Carousel({ photos }) {
  const [idx, setIdx] = useState(0)
  const prev = () => setIdx(i => (i - 1 + photos.length) % photos.length)
  const next = () => setIdx(i => (i + 1) % photos.length)

  useEffect(() => {
    const handler = e => {
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  const photo = photos[idx]

  return (
    <div className="bg-ink flex flex-col">

      {/* Top bar */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-g800">
        <span className="text-mint text-[9px] tracking-[0.3em] uppercase font-bold">Recap</span>
        <span className="text-g500 text-[9px] tracking-widest font-bold">
          {String(idx + 1).padStart(2, '0')}&nbsp;/&nbsp;{String(photos.length).padStart(2, '0')}
        </span>
      </div>

      {/* Main image */}
      <div className="relative overflow-hidden" style={{ aspectRatio: '4/3' }}>
        <img
          key={idx}
          src={photo.src}
          alt={photo.alt}
          className="carousel-img w-full h-full object-cover"
        />

        {/* Prev button */}
        <button
          onClick={prev}
          aria-label="Previous"
          className="absolute left-0 top-0 h-full w-16 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-200"
        >
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none" className="drop-shadow-[0_0_6px_rgba(31,255,182,0.6)]">
            <polyline points="18,4 8,14 18,24" stroke="#1fffb6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        {/* Next button */}
        <button
          onClick={next}
          aria-label="Next"
          className="absolute right-0 top-0 h-full w-16 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-200"
        >
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none" className="drop-shadow-[0_0_6px_rgba(31,255,182,0.6)]">
            <polyline points="10,4 20,14 10,24" stroke="#1fffb6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        {/* Caption */}
        {photo.alt && (
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-ink/90 to-transparent pt-8 pb-3 px-4">
            <p className="text-white text-[10px] tracking-[0.2em] uppercase font-bold">{photo.alt}</p>
          </div>
        )}
      </div>

      {/* Thumbnail strip */}
      <div className="flex gap-1 p-2 bg-g900 border-t border-g800 overflow-x-auto">
        {photos.map((p, i) => (
          <button
            key={i}
            onClick={() => setIdx(i)}
            className="flex-shrink-0 relative overflow-hidden transition-all"
            style={{ width: 52, height: 36 }}
            aria-label={`Photo ${i + 1}`}
          >
            <img src={p.src} alt={p.alt} className="w-full h-full object-cover" />
            {/* Active indicator */}
            {i === idx
              ? <div className="absolute inset-0 ring-1 ring-mint ring-inset" />
              : <div className="absolute inset-0 bg-ink/50 hover:bg-ink/20 transition-colors" />
            }
          </button>
        ))}
      </div>
    </div>
  )
}

export default function About({ conf, body, photos }) {
  return (
    <section id="about" className="bg-white py-20 md:py-24 border-b border-[#e5e5e5]">
      <div className="max-w-5xl mx-auto px-5 md:px-8">
        <div className="mb-12">
          <span className="inline-block bg-mint text-ink text-[11px] font-bold tracking-widest uppercase px-2.5 py-1 mb-4">About</span>
          <h2 className="text-ink font-bold text-3xl md:text-5xl tracking-tight">{conf.title}</h2>
        </div>

        <div className="flex flex-col md:flex-row gap-10 md:gap-14 items-start">
          {/* Text — 40% */}
          <div className="md:w-2/5 text-[#333] text-base leading-loose space-y-4">
            <ReactMarkdown rehypePlugins={[rehypeRaw]}>{body}</ReactMarkdown>
          </div>

          {/* Carousel — 60% */}
          {photos?.length > 0 && (
            <div className="md:w-3/5">
              <Carousel photos={photos} />
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
