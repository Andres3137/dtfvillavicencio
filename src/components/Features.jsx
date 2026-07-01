import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Check, Shield, ScanLine, Sparkles, Layers, Droplet, Activity } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const BENEFITS = [
  'Adherencia profesional a la tela',
  'Colores vibrantes',
  'Calidad en las imágenes',
  'Impresiones sin bordes blancos',
  'Consistencia en las impresiones',
  'Tacto suave y flexible',
]

const TILES = [
  { icon: ScanLine, title: 'Precisión 600 DPI', desc: 'Detalle fino real' },
  { icon: Droplet, title: 'Adherencia premium', desc: 'Sin desprendimiento' },
  { icon: Sparkles, title: 'Acabado uniforme', desc: 'Mate suave consistente' },
  { icon: Layers, title: 'Consistencia', desc: 'Lote a lote idéntico' },
]

function MeritsCard() {
  const ref = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.benefit-item',
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.5, stagger: 0.08, ease: 'power3.out',
          scrollTrigger: { trigger: ref.current, start: 'top 80%' } }
      )
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={ref} className="relative glass-dark rounded-[2rem] p-10 lg:px-12 border-champagne-subtle shadow-cinematic h-full flex flex-col gap-6">
      <img
        src="/assets/camisetadiseño.webp"
        alt=""
        aria-hidden="true"
        loading="lazy"
        decoding="async"
        className="hidden lg:block absolute -right-4 xl:-right-5 top-1/2 -translate-y-1/2 w-[520px] xl:w-[420px] max-w-[55%] pointer-events-none select-none"
      />

      <div className="relative section-label mb-1">¿Por qué elegirnos?</div>
      <h3 className="relative text-xl font-bold text-ivory">Resultados profesionales<br />en cada impresión</h3>

      <div className="relative flex flex-col gap-3 flex-1 lg:max-w-[50%]">
        {BENEFITS.map((b, i) => (
          <div key={i} className="benefit-item flex items-start gap-3">
            <div
              className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
              style={{ background: 'rgba(201,168,76,0.15)' }}
            >
              <Check size={11} className="text-champagne" />
            </div>
            <span className="text-xs text-ivory/70 leading-relaxed">{b}</span>
          </div>
        ))}
      </div>

      <div
        className="relative rounded-2xl px-4 py-3 mt-auto"
        style={{ background: 'rgba(201,168,76,0.08)', border: '1px solid rgba(201,168,76,0.2)' }}
      >
        <span className="font-mono-ui text-[10px] text-champagne tracking-widest">Es la calidad que nos representa.</span>
      </div>
    </div>
  )
}

function MetricHero() {
  return (
    <div className="relative glass-dark rounded-[2rem] p-8 lg:p-10 border-champagne-subtle shadow-cinematic h-full flex flex-col justify-between gap-6 overflow-hidden transition-transform duration-300 hover:-translate-y-1">
      <div
        className="decor-blur absolute -top-20 -right-20 w-64 h-64 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(255,202,2,0.18) 0%, transparent 65%)', filter: 'blur(10px)' }}
      />

      <div className="relative flex items-center justify-between">
        <div className="section-label">Durabilidad garantizada</div>
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{ background: 'rgba(255,202,2,0.12)', border: '1px solid rgba(255,202,2,0.25)' }}
        >
          <Shield size={16} className="text-champagne" />
        </div>
      </div>

      <div className="relative flex items-end gap-4">
        <span className="font-display text-7xl lg:text-8xl text-gradient-champagne leading-none">+60</span>
        <div className="flex flex-col pb-2">
          <span className="text-ivory font-semibold leading-tight">lavados</span>
          <span className="font-mono-ui text-[10px] text-ivory/45 tracking-widest">SIN PERDER COLOR</span>
        </div>
      </div>

      <div className="relative flex items-center gap-3 pt-3 border-t" style={{ borderColor: 'rgba(255,202,2,0.15)' }}>
        <Activity size={13} className="text-champagne" />
        <span className="text-xs text-ivory/60">Probado en producción real</span>
      </div>
    </div>
  )
}

function Tile({ icon: Icon, title, desc }) {
  return (
    <div className="group glass-dark rounded-2xl p-5 border-champagne-subtle shadow-cinematic flex flex-col gap-3 h-full transition-all duration-300 hover:-translate-y-1 hover:border-champagne/40">
      <div
        className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
        style={{ background: 'rgba(255,202,2,0.1)', border: '1px solid rgba(255,202,2,0.2)' }}
      >
        <Icon size={16} className="text-champagne" />
      </div>
      <div>
        <div className="text-sm font-semibold text-ivory leading-tight">{title}</div>
        <div className="font-mono-ui text-[10px] text-ivory/45 tracking-wider mt-1">{desc}</div>
      </div>
    </div>
  )
}

export default function Features() {
  const ref = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.features-title',
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: ref.current, start: 'top 85%', once: true } }
      )
      gsap.fromTo('.feature-cell',
        { opacity: 0, y: 50, scale: 0.97 },
        { opacity: 1, y: 0, scale: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: ref.current, start: 'top 80%', once: true } }
      )
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section
      id="servicios"
      ref={ref}
      className="relative py-28 px-6 lg:px-12 overflow-hidden noise-overlay"
      style={{ background: '#0D0D12' }}
    >
      <div
        className="absolute top-0 left-0 right-0 h-px pointer-events-none"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(255,202,2,0.3), transparent)' }}
      />
      <div
        className="decor-blur absolute top-1/3 right-0 w-[520px] h-[520px] pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(255,202,2,0.08) 0%, transparent 65%)', filter: 'blur(20px)' }}
      />
      <div className="relative max-w-7xl mx-auto">
        <div className="features-title text-center mb-16">
          <p className="section-label mb-4">Tecnología DTF · Colombia</p>
          <h2 className="text-4xl md:text-5xl font-bold font-display text-white">
            Calidad que se ve,<br />
            <span className="font-display text-gradient-champagne">se siente y dura.</span>
          </h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5 auto-rows-auto">
          <div className="feature-cell col-span-2 lg:col-span-2 lg:row-span-3">
            <MeritsCard />
          </div>

          <div className="feature-cell col-span-2 lg:col-span-2">
            <MetricHero />
          </div>

          {TILES.map((t, i) => (
            <div key={i} className="feature-cell col-span-1 lg:col-span-1">
              <Tile {...t} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
