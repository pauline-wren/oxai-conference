import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import { useState, useEffect } from 'react'

function Carousel({ photos }) {
  const [idx, setIdx] = useState(0)
  const [touchX, setTouchX] = useState(null)

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

  const onTouchStart = e => setTouchX(e.touches[0].clientX)
  const onTouchEnd = e => {
    if (touchX === null) return
    const dx = e.changedTouches[0].clientX - touchX
    if (Math.abs(dx) > 40) dx < 0 ? next() : prev()
    setTouchX(null)
  }

  const photo = photos[idx]

  return (
    <div
      className="relative overflow-hidden"
      style={{ aspectRatio: '16/9' }}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <img
        key={idx}
        src={photo.src}
        alt={photo.alt}
        className="carousel-img w-full h-full object-cover"
      />

      {/* Gradient overlays for controls */}
      <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-ink/60 to-transparent pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-ink/60 to-transparent pointer-events-none" />

      {/* Prev */}
      <button
        onClick={prev}
        aria-label="Previous"
        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center border border-white/20 bg-ink/40 hover:bg-ink/70 hover:border-mint transition-colors"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <polyline points="10,2 4,8 10,14" stroke="#1fffb6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      {/* Next */}
      <button
        onClick={next}
        aria-label="Next"
        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center border border-white/20 bg-ink/40 hover:bg-ink/70 hover:border-mint transition-colors"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <polyline points="6,2 12,8 6,14" stroke="#1fffb6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      {/* Caption + dots */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-ink/90 via-ink/40 to-transparent pt-16 pb-5 px-6 flex items-end justify-between">
        {photo.alt && (
          <p className="text-white/80 text-[10px] tracking-[0.2em] uppercase font-bold">{photo.alt}</p>
        )}
        <div className="flex items-center gap-1.5 ml-auto">
          {photos.map((_, i) => (
            <button
              key={i}
              onClick={() => setIdx(i)}
              aria-label={`Photo ${i + 1}`}
              className={`transition-all duration-200 ${i === idx ? 'w-5 h-1.5 bg-mint' : 'w-1.5 h-1.5 bg-white/30 hover:bg-white/60'}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default function About({ conf, body, photos }) {
  return (
    <section id="about" className="bg-ink py-20 md:py-28 border-b border-g800">
      <div className="max-w-7xl mx-auto px-5 md:px-8">

        {/* Header */}
        <div className="mb-10 md:mb-14">
          <span className="inline-block bg-g800 text-mint text-[11px] font-bold tracking-widest uppercase px-2.5 py-1 mb-6">About</span>
          <h2 className="text-white font-bold text-4xl md:text-6xl xl:text-7xl tracking-tight leading-[1.05]">
            {conf.title}
          </h2>
          {body && (
            <div className="mt-8 border-l-2 border-mint pl-6 max-w-2xl text-g300 text-lg leading-relaxed space-y-3 [&_strong]:text-white [&_a]:text-mint [&_a]:underline">
              <ReactMarkdown rehypePlugins={[rehypeRaw]}>{body}</ReactMarkdown>
            </div>
          )}
        </div>

        {/* Cinematic full-width carousel */}
        {photos?.length > 0 && <Carousel photos={photos} />}

      </div>
    </section>
  )
}
