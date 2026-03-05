import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'

export default function About({ conf, body }) {
  return (
    <section id="about" className="bg-white py-20 md:py-24 border-b border-[#e5e5e5]">
      <div className="max-w-5xl mx-auto px-5 md:px-8">
        <div className="mb-12">
          <span className="inline-block bg-mint text-ink text-[11px] font-bold tracking-widest uppercase px-2.5 py-1 mb-4">About</span>
          <h2 className="text-ink font-bold text-3xl md:text-5xl tracking-tight">{conf.title}</h2>
        </div>

        <div className="text-[#333] text-base leading-loose space-y-4 max-w-3xl">
          <ReactMarkdown rehypePlugins={[rehypeRaw]}>{body}</ReactMarkdown>
        </div>
      </div>
    </section>
  )
}
