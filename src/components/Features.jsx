import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Check, Layers, ShieldCheck, Cpu, Flame, Palette } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const SERVICES = [
  {
    icon: Layers,
    title: 'Impresión DTF Textil por Metro',
    desc: 'Personalización premium sobre gran variedad de telas con resultados profesionales.',
    points: [
      'Colores vibrantes y alta definición',
      'Resistencia +60 lavados',
      'Ancho de impresión 58 cm',
      'Retiro del film en caliente o en frío',
    ],
  },
  {
    icon: ShieldCheck,
    title: 'DTF Textil Antimigración',
    desc: 'Ideal para prendas oscuras en poliéster o mezclas con spandex.',
    points: [
      'Reduce la migración del color de la prenda',
      'Colores vibrantes y alta definición',
      'Resistencia +60 lavados',
      'Ancho de impresión 58 cm',
      'Retiro del film en caliente o en frío',
    ],
  },
  {
    icon: Cpu,
    title: 'DTF UV para superficies rígidas',
    desc: 'Vasos, termos, acrílico, vidrio, plástico, metal y más.',
    points: [
      'Acabado con relieve y barniz',
      'Colores vibrantes y alta definición',
      'Resistencia al agua',
      'Ancho de impresión 29 cm',
    ],
  },
  {
    icon: Flame,
    title: 'Servicio de Termofijado',
    desc: 'Trae tus impresiones y hacemos el proceso con acabado profesional.',
    points: [
      'Acabado profesional garantizado',
      'Ideal para emprendedores y marcas',
      'Perfecto para producción por volumen',
      'Ahorra tiempo y enfócate en vender',
    ],
  },
  {
    icon: Palette,
    title: 'Servicio de Diseño',
    desc: 'Apoyo profesional en la preparación y optimización de tus archivos.',
    points: [
      'Eliminación de fondos',
      'Mejora de calidad y vectorización',
      'Redibujo de diseños y semitonos',
      'Diseños originales para estampado',
    ],
  },
]

function ServiceCard({ icon: Icon, title, desc, points }) {
  return (
    <div className="glass-dark rounded-[2rem] p-7 lg:p-8 border-champagne-subtle shadow-cinematic h-full flex flex-col gap-5 transition-transform duration-300 hover:-translate-y-1">
      <div
        className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
        style={{ background: 'rgba(255,202,2,0.12)', border: '1px solid rgba(255,202,2,0.25)' }}
      >
        <Icon size={18} className="text-champagne" />
      </div>

      <div className="flex flex-col gap-2">
        <h3 className="text-lg font-bold text-ivory leading-tight">{title}</h3>
        <p className="text-sm text-ivory/60 leading-relaxed">{desc}</p>
      </div>

      <div
        className="h-px w-full"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.28), transparent)' }}
      />

      <ul className="flex flex-col gap-2.5 flex-1">
        {points.map((p, i) => (
          <li key={i} className="flex items-start gap-2.5">
            <div
              className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
              style={{ background: 'rgba(201,168,76,0.15)' }}
            >
              <Check size={9} className="text-champagne" />
            </div>
            <span className="text-xs text-ivory/75 leading-relaxed">{p}</span>
          </li>
        ))}
      </ul>
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {SERVICES.map((s, i) => (
            <div
              key={i}
              className={`feature-cell ${i === 4 ? 'md:col-span-2 lg:col-span-1' : ''}`}
            >
              <ServiceCard {...s} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
