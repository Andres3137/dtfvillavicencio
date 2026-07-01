import { useEffect } from 'react'
import { ArrowLeft } from 'lucide-react'
import Navbar from './Navbar'
import Footer from './Footer'

export default function LegalPage({ doc }) {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [doc])

  return (
    <div className="relative min-h-screen bg-obsidian text-ivory overflow-x-hidden">
      {/* Grain */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          opacity: 0.03,
        }}
      />

      <Navbar />

      <main className="relative z-10 max-w-3xl mx-auto px-6 lg:px-12 pt-36 pb-28">
        <a
          href="#inicio"
          className="inline-flex items-center gap-2 font-mono-ui text-[11px] tracking-widest text-ivory/40 hover:text-champagne transition-colors mb-12"
        >
          <ArrowLeft size={13} />
          VOLVER AL INICIO
        </a>

        <p className="section-label mb-4">Documento legal</p>
        <h1
          className="font-display text-ivory leading-[1.05] mb-6"
          style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)' }}
        >
          {doc.title}
        </h1>
        <p className="text-ivory/55 leading-relaxed mb-16 max-w-2xl">{doc.intro}</p>

        <div className="flex flex-col gap-11">
          {doc.sections.map((s, i) => (
            <section key={i} className="flex flex-col gap-3">
              <div className="flex items-baseline gap-3">
                <span className="font-mono-ui text-sm" style={{ color: 'rgba(255,202,2,0.4)' }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h2 className="font-display text-2xl md:text-3xl text-gradient-champagne">
                  {s.heading}
                </h2>
              </div>
              {s.body && <p className="text-ivory/55 leading-relaxed">{s.body}</p>}
              {s.list && (
                <ul className="flex flex-col gap-2.5 mt-1">
                  {s.list.map((item, j) => (
                    <li key={j} className="flex items-start gap-3 text-ivory/55">
                      <span
                        className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-2"
                        style={{ background: 'rgba(255,202,2,0.6)' }}
                      />
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>

        <div className="mt-16 pt-8" style={{ borderTop: '1px solid rgba(255,202,2,0.08)' }}>
          <p className="font-mono-ui text-[10px] text-ivory/25 tracking-widest">
            Última actualización · {new Date().getFullYear()} · DTF VILLAVICENCIO
          </p>
        </div>
      </main>

      <Footer />
    </div>
  )
}
