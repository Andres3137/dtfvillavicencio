import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Palette, Sparkles, Layers, Droplet, Image as ImageIcon, Shirt } from 'lucide-react'
import { useTilt } from '../hooks/useTilt'

gsap.registerPlugin(ScrollTrigger)

const BENEFITS = [
  { icon: Shirt, label: 'Multi-textil', desc: 'Algodón, lona, mezclas' },
  { icon: Layers, label: 'Sin bordes blancos', desc: 'Recorte por capa' },
  { icon: Palette, label: 'Colores vibrantes', desc: 'CMYK + tinta blanca' },
  { icon: Sparkles, label: 'Diseño libre', desc: 'Cualquier forma y detalle' },
  { icon: Droplet, label: 'Tacto suave', desc: 'Acabado flexible' },
  { icon: ImageIcon, label: 'Tiradas variables', desc: 'Pieza única o serie' },
]

export default function WhatIsDTF() {
  const ref = useRef(null)
  const tilt = useTilt(6)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.dtf-header',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: ref.current, start: 'top 85%' } }
      )
      gsap.fromTo('.dtf-cell',
        { opacity: 0, y: 40, scale: 0.97 },
        { opacity: 1, y: 0, scale: 1, duration: 0.7, stagger: 0.08, ease: 'power3.out',
          scrollTrigger: { trigger: ref.current, start: 'top 75%' } }
      )
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section
      id="que-es-dtf"
      ref={ref}
      className="relative py-28 px-6 lg:px-12 noise-overlay overflow-hidden"
      style={{ background: '#F8F8F8' }}
    >
      <div
        className="absolute top-0 left-0 right-0 h-px pointer-events-none"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(0,0,0,0.08), transparent)' }}
      />
      <div
        className="absolute top-1/4 right-0 w-[460px] h-[460px] pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(255,202,2,0.07) 0%, transparent 65%)', filter: 'blur(8px)' }}
      />

      <div className="relative max-w-7xl mx-auto">
        <div className="dtf-header text-center mb-12 max-w-2xl mx-auto">
          <p className="section-label mb-4">Tecnología de impresión</p>
          <h2 className="text-4xl md:text-5xl font-bold font-display text-ivory leading-tight">
            ¿Qué es<br />
            <span className="font-display text-gradient-champagne">el DTF Textil?</span>
          </h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-6 gap-4 lg:gap-5 auto-rows-auto">
          {/* Text card */}
          <div className="dtf-cell col-span-2 lg:col-span-3 lg:row-span-2 glass-dark rounded-[2rem] p-8 lg:p-10 border-champagne-subtle shadow-cinematic flex flex-col gap-5 transition-transform duration-300 hover:-translate-y-1">
            <p className="text-ivory/70 text-base leading-relaxed">
              La tecnología DTF revolucionó la personalización: estampados con colores vibrantes,
              alta resistencia y acabados profesionales sobre múltiples textiles.
            </p>
            <p className="text-ivory/70 text-base leading-relaxed">
              Solución ideal para emprendedores, marcas y negocios que buscan
              <span className="text-champagne"> calidad, rapidez y libertad creativa</span> en cada diseño.
            </p>

            <div className="grid grid-cols-3 gap-3 mt-auto pt-4 border-t" style={{ borderColor: 'rgba(255,202,2,0.15)' }}>
              <div className="flex flex-col">
                <span className="font-display text-2xl text-gradient-champagne leading-none">600</span>
                <span className="font-mono-ui text-[10px] text-ivory/40 tracking-widest mt-1">DPI</span>
              </div>
              <div className="flex flex-col">
                <span className="font-display text-2xl text-gradient-champagne leading-none">5</span>
                <span className="font-mono-ui text-[10px] text-ivory/40 tracking-widest mt-1">CAPAS</span>
              </div>
              <div className="flex flex-col">
                <span className="font-display text-2xl text-gradient-champagne leading-none">∞</span>
                <span className="font-mono-ui text-[10px] text-ivory/40 tracking-widest mt-1">FORMAS</span>
              </div>
            </div>
          </div>

          {/* Image card */}
          <div
            className="dtf-cell col-span-2 lg:col-span-3 lg:row-span-2 img-shimmer relative overflow-hidden rounded-[2rem] border-champagne-subtle shadow-cinematic"
            style={{ minHeight: '320px', transition: 'transform 0.25s cubic-bezier(0.4,0,0.2,1), box-shadow 0.25s ease' }}
            onMouseMove={tilt.onMouseMove}
            onMouseLeave={tilt.onMouseLeave}
          >
            <img
              src="/assets/dtf_impresion_industrial.webp"
              alt="DTF Textil profesional"
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover block"
              style={{ minHeight: 'inherit' }}
            />
            <div className="absolute bottom-6 left-6 glass-dark px-5 py-3 rounded-2xl border-champagne-subtle">
              <div className="font-display text-2xl text-gradient-champagne leading-none">DTF</div>
              <div className="font-mono-ui text-[10px] text-ivory/45 tracking-widest mt-1">DIRECT TO FILM</div>
            </div>
          </div>

          {/* Benefit tiles */}
          {BENEFITS.map(({ icon: Icon, label, desc }, i) => (
            <div
              key={i}
              className="dtf-cell group col-span-1 glass-dark rounded-2xl p-5 border-champagne-subtle shadow-cinematic flex flex-col gap-3 transition-all duration-300 hover:-translate-y-1 hover:border-champagne/40"
            >
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                style={{ background: 'rgba(255,202,2,0.1)', border: '1px solid rgba(255,202,2,0.2)' }}
              >
                <Icon size={16} className="text-champagne" />
              </div>
              <div>
                <div className="text-sm font-semibold text-ivory leading-tight">{label}</div>
                <div className="font-mono-ui text-[10px] text-ivory/40 tracking-wider mt-1">{desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
