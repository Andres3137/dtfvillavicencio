import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { X, Layers, Sparkles, Shield, Truck, Palette } from 'lucide-react'
import { useTilt } from '../hooks/useTilt'

gsap.registerPlugin(ScrollTrigger)

const WA_HREF = (label) =>
  `https://api.whatsapp.com/send?phone=573124714116&text=${encodeURIComponent(
    `💫 ¡Hola! Quiero cotizar el diseño: ${label}. ¿Me das más información?`
  )}`

const ITEMS = [
  {
    src: '/assets/portafolio_dtf_camiseta.webp',
    label: 'Estampados DTF para camisetas',
    tag: 'DTF Textil por Metro',
    desc: 'Personalizamos gran variedad de telas con colores vibrantes, alta definición y excelente durabilidad. Ancho de impresión de 58 cm.',
    specs: {
      tipo: 'DTF Textil por Metro',
      material: 'Algodón / Mezcla',
      acabado: 'Retiro caliente o frío',
      durabilidad: '+60 lavados',
      entrega: 'Producción ágil',
      personalizacion: 'Total',
    },
  },
  {
    src: '/assets/portafolio_dtf_polo.webp',
    label: 'Uniformes corporativos',
    tag: 'DTF Textil Antimigración',
    desc: 'Ideal para prendas oscuras 100% poliéster o con alto contenido de spandex. Reduce la migración del color de la prenda hacia el estampado.',
    specs: {
      tipo: 'DTF Antimigración',
      material: 'Poliéster / Spandex',
      acabado: 'Retiro caliente o frío',
      durabilidad: '+60 lavados',
      entrega: 'Producción ágil',
      personalizacion: 'Marca + Tallas',
    },
  },
  {
    src: '/assets/portafolio_gorra.webp',
    label: 'Gorras personalizadas',
    tag: 'Servicio de Termofijado',
    desc: 'Realizamos el termofijado profesional de tus estampados. Ahorra tiempo y enfócate en vender. Ideal para emprendedores, marcas y producción por volumen.',
    specs: {
      tipo: 'Termofijado DTF',
      material: 'Prendas terminadas',
      acabado: 'Acabado profesional',
      durabilidad: 'Alta adherencia',
      entrega: 'Producción ágil',
      personalizacion: 'Desde 1 hasta +500 prendas',
    },
  },
  {
    src: '/assets/portafolio_dtf_tote_bag.webp',
    label: 'Tote Bags personalizadas',
    tag: 'DTF Textil por Metro',
    desc: 'Bolsas personalizadas ideales para branding, promociones y marcas. Colores vibrantes, adherencia profesional y ancho de impresión de 58 cm.',
    specs: {
      tipo: 'DTF Textil por Metro',
      material: 'Lona premium',
      acabado: 'Retiro caliente o frío',
      durabilidad: '+60 lavados',
      entrega: 'Producción ágil',
      personalizacion: 'Total',
    },
  },
  {
    src: '/assets/portafolio_dtf_stickers.webp',
    label: 'Stickers premium',
    tag: 'Servicio de Diseño para DTF',
    desc: 'Apoyo en la preparación y optimización de tus diseños antes de imprimir: eliminación de fondos, vectorización, redibujo, semitonos y diseños originales para estampado.',
    specs: {
      tipo: 'Servicio de Diseño',
      material: 'Archivo digital',
      acabado: 'Vectorización / Semitonos',
      durabilidad: 'Optimizado para DTF',
      entrega: 'Producción ágil',
      personalizacion: 'Diseño original o retoque',
    },
  },
  {
    src: '/assets/portafolio_dtf_termo.webp',
    label: 'Termos de aluminio personalizados',
    tag: 'DTF UV para superficies rígidas',
    desc: 'Personalización sobre superficies rígidas claras y oscuras: vasos, termos, acrílico, vidrio, plástico o metal. Acabado con relieve y barniz. Ancho de impresión de 29 cm.',
    specs: {
      tipo: 'DTF UV',
      material: 'Aluminio / Rígido',
      acabado: 'Relieve + Barniz',
      durabilidad: 'Resistente al agua',
      entrega: 'Producción ágil',
      personalizacion: 'Logo / Marca',
    },
  },
]

const SPEC_ROWS = [
  { key: 'tipo', label: 'Tipo de impresión', Icon: Layers },
  { key: 'material', label: 'Material', Icon: Palette },
  { key: 'acabado', label: 'Acabado', Icon: Sparkles },
  { key: 'durabilidad', label: 'Durabilidad', Icon: Shield },
  { key: 'entrega', label: 'Entrega', Icon: Truck },
  { key: 'personalizacion', label: 'Personalización', Icon: Sparkles },
]

function ProductModal({ item, onClose }) {
  const overlayRef = useRef(null)
  const cardRef = useRef(null)
  const imgWrapRef = useRef(null)

  useEffect(() => {
    if (!item) return
    document.body.style.overflow = 'hidden'
    gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: 'power2.out' })
    gsap.fromTo(
      cardRef.current,
      { opacity: 0, y: 30, scale: 0.96 },
      { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: 'power3.out' }
    )
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [item, onClose])

  const onMove = (e) => {
    if (!window.matchMedia('(hover: hover)').matches) return
    const el = imgWrapRef.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const x = ((e.clientX - r.left) / r.width) * 100
    const y = ((e.clientY - r.top) / r.height) * 100
    el.style.setProperty('--zx', `${x}%`)
    el.style.setProperty('--zy', `${y}%`)
  }

  if (!item) return null

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 pt-24 md:pt-28"
      style={{ background: 'rgba(8,8,12,0.7)', backdropFilter: 'blur(14px)' }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        ref={cardRef}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-5xl max-h-[92vh] overflow-hidden rounded-[2rem] glass-dark border-champagne-subtle shadow-cinematic flex flex-col md:flex-row"
      >
        <button
          onClick={onClose}
          aria-label="Cerrar"
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full flex items-center justify-center glass-dark border-champagne-subtle text-ivory/80 hover:text-champagne transition-colors"
        >
          <X size={18} />
        </button>

        <div
          ref={imgWrapRef}
          onMouseMove={onMove}
          className="relative md:w-1/2 w-full aspect-[4/3] md:aspect-auto overflow-hidden group flex-shrink-0"
        >
          <img
            src={item.src}
            alt={item.label}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-contain md:object-cover transition-transform duration-700 ease-out md:group-hover:scale-150"
            style={{ transformOrigin: 'var(--zx,50%) var(--zy,50%)' }}
          />
        </div>

        <div className="md:w-1/2 w-full p-7 md:p-10 flex flex-col gap-6 overflow-y-auto">
          <div>
            <span className="font-mono-ui text-[10px] tracking-widest text-champagne">{item.tag}</span>
            <h3 className="text-2xl md:text-3xl font-bold font-display text-ivory mt-2 leading-tight">
              {item.label}
            </h3>
            {item.desc && (
              <p className="text-sm text-ivory/70 leading-relaxed mt-3">{item.desc}</p>
            )}
          </div>

          <div
            className="h-px w-full"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.3), transparent)' }}
          />

          <div className="flex flex-col gap-3">
            {SPEC_ROWS.map(({ key, label, Icon }) => (
              <div key={key} className="flex items-start gap-3">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.18)' }}
                >
                  <Icon size={14} className="text-champagne" />
                </div>
                <div className="flex flex-col flex-1 min-w-0">
                  <span className="font-mono-ui text-[10px] tracking-widest text-ivory/60 uppercase">{label}</span>
                  <span className="text-sm text-ivory/90 leading-snug">{item.specs[key]}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-auto pt-2">
            <div className="relative group">
              <div
                className="absolute inset-0 -m-2 rounded-full pointer-events-none opacity-25 blur-lg transition-all duration-300 group-hover:opacity-50 group-hover:blur-xl"
                style={{ background: '#FFCA02' }}
              />
              <a
                href={WA_HREF(item.label)}
                target="_blank"
                rel="noopener noreferrer"
                className="relative z-10 btn-primary btn-magnetic w-full text-center block"
              >
                Cotizar este diseño
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Showcase() {
  const ref = useRef(null)
  const tilt = useTilt(6)
  const [active, setActive] = useState(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.showcase-title',
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: ref.current, start: 'top 85%' } }
      )
      gsap.fromTo('.showcase-item',
        { opacity: 0, y: 50, scale: 0.95 },
        {
          opacity: 1, y: 0, scale: 1,
          duration: 0.8,
          stagger: { amount: 0.6, from: 'start' },
          ease: 'power3.out',
          scrollTrigger: { trigger: ref.current, start: 'top 75%' },
        }
      )
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section
      id="portafolio"
      ref={ref}
      className="relative py-28 px-6 lg:px-12 overflow-hidden noise-overlay"
      style={{ background: '#0D0D12' }}
    >
      <div
        className="absolute top-0 left-0 right-0 h-px pointer-events-none"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(255,202,2,0.3), transparent)' }}
      />
      <div
        className="decor-blur absolute bottom-0 left-1/4 w-[560px] h-[560px] pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(255,202,2,0.06) 0%, transparent 65%)', filter: 'blur(24px)' }}
      />
      <div className="relative max-w-7xl mx-auto">
      <div className="showcase-title text-center mb-16">
        <p className="section-label mb-4">Portfolio · Trabajos</p>
        <h2 className="text-4xl md:text-5xl font-bold font-display text-white">
          Cada pieza,<br />
          <span className="font-display text-gradient-champagne">una obra.</span>
        </h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
        {ITEMS.map((it, i) => {
          const { src, label, tag } = it
          return (
            <button
              key={i}
              type="button"
              onClick={() => setActive(it)}
              aria-label={`Ver ${label}`}
              className="showcase-item img-shimmer group relative overflow-hidden rounded-[1.5rem] shadow-cinematic cursor-pointer text-left aspect-[4/5]"
              style={{ transition: 'transform 0.25s cubic-bezier(0.4,0,0.2,1), box-shadow 0.25s ease' }}
              onMouseMove={tilt.onMouseMove}
              onMouseLeave={tilt.onMouseLeave}
            >
              <img
                src={src}
                alt={label}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 w-full h-full object-cover block transition-transform duration-700 group-hover:scale-110"
              />

              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
                style={{ background: 'linear-gradient(to top, rgba(13,13,18,0.9) 0%, rgba(13,13,18,0.2) 50%, transparent 100%)' }}
              />

              <div className="absolute inset-0 flex flex-col justify-end p-5 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-400">
                <span className="font-mono-ui text-[10px] tracking-widest text-champagne mb-1">{tag}</span>
                <span className="text-sm font-semibold text-white leading-snug">{label}</span>
              </div>

              <div
                className="absolute inset-0 rounded-[1.5rem] border border-transparent group-hover:border-champagne/30 transition-colors duration-400 pointer-events-none"
              />
            </button>
          )
        })}
      </div>

      <ProductModal item={active} onClose={() => setActive(null)} />
      </div>
    </section>
  )
}
