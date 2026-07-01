import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const STEPS = [
  {
    num: '01',
    label: 'Asesoría',
    desc: 'Definimos juntos diseños, cantidades, tamaños y tiempos. Te acompañamos con recomendaciones técnicas para que tu proyecto quede perfecto desde el primer contacto.',
  },
  {
    num: '02',
    label: 'Recepción',
    desc: 'Recibimos y validamos tus archivos antes de imprimir. Revisamos resolución, colores y formato para evitar sorpresas en producción.',
  },
  {
    num: '03',
    label: 'Producción',
    desc: 'La impresión tarda aproximadamente entre 1:30 y 2 horas tras confirmar archivo y pago. Te avisamos apenas el pedido esté listo.',
  },
  {
    num: '04',
    label: 'Entrega',
    desc: 'Despachamos a todo Colombia con tiempos ágiles y seguimiento. Coordinamos con operadores logísticos confiables para que tu pedido llegue seguro.',
  },
]

export default function Process() {
  const wrapperRef = useRef(null)
  const cardRefs = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.process-title',
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: wrapperRef.current, start: 'top 85%', once: true } }
      )

      cardRefs.current.forEach((card, i) => {
        if (!card) return
        gsap.set(card, { opacity: 0, y: 50, scale: 0.97 })
        ScrollTrigger.create({
          trigger: card,
          start: 'top 82%',
          once: true,
          onEnter: () => {
            gsap.to(card, { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: 'power3.out', delay: i * 0.09 })
          },
        })
      })
    }, wrapperRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      id="procesos"
      ref={wrapperRef}
      className="relative py-28 px-6 lg:px-12 noise-overlay overflow-hidden"
      style={{ background: '#F5F5F5' }}
    >
      <div
        className="absolute top-0 left-0 right-0 h-px pointer-events-none"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(0,0,0,0.08), transparent)' }}
      />

      {/* Fine grid mesh */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0,0,0,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.045) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
          maskImage:
            'radial-gradient(ellipse at center, rgba(0,0,0,1) 0%, rgba(0,0,0,0.4) 60%, rgba(0,0,0,0) 100%)',
          WebkitMaskImage:
            'radial-gradient(ellipse at center, rgba(0,0,0,1) 0%, rgba(0,0,0,0.4) 60%, rgba(0,0,0,0) 100%)',
        }}
      />

      {/* Champagne soft glow top */}
      <div
        className="decor-blur absolute top-0 left-1/2 -translate-x-1/2 w-[720px] h-[380px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center top, rgba(245,180,0,0.09) 0%, transparent 70%)' }}
      />

      {/* Champagne soft glow bottom-left */}
      <div
        className="decor-blur absolute -bottom-20 -left-10 w-[520px] h-[520px] pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(245,180,0,0.07) 0%, transparent 65%)', filter: 'blur(30px)' }}
      />

      {/* Soft light gray gradient right */}
      <div
        className="decor-blur absolute top-1/4 -right-20 w-[420px] h-[420px] pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.6) 0%, transparent 70%)', filter: 'blur(20px)' }}
      />

      {/* Technical layer — dots, connecting lines, registration marks, corner brackets */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        preserveAspectRatio="xMidYMid slice"
        viewBox="0 0 1440 900"
        aria-hidden="true"
      >
        {/* Connecting network */}
        <g stroke="rgba(245,180,0,0.18)" strokeWidth="0.6" fill="none">
          <line x1="120" y1="180" x2="360" y2="120" />
          <line x1="360" y1="120" x2="620" y2="260" />
          <line x1="1080" y1="200" x2="1280" y2="140" />
          <line x1="880" y1="720" x2="1120" y2="640" />
          <line x1="200" y1="760" x2="440" y2="820" />
        </g>

        {/* Champagne dots */}
        <g fill="rgba(245,180,0,0.55)">
          <circle cx="120" cy="180" r="2.5" />
          <circle cx="360" cy="120" r="2.5" />
          <circle cx="620" cy="260" r="2.5" />
          <circle cx="1080" cy="200" r="2.5" />
          <circle cx="1280" cy="140" r="2.5" />
          <circle cx="880" cy="720" r="2.5" />
          <circle cx="1120" cy="640" r="2.5" />
          <circle cx="200" cy="760" r="2.5" />
          <circle cx="440" cy="820" r="2.5" />
        </g>

        {/* Faint black dots */}
        <g fill="rgba(0,0,0,0.18)">
          <circle cx="720" cy="80" r="1.8" />
          <circle cx="960" cy="480" r="1.8" />
          <circle cx="260" cy="440" r="1.8" />
          <circle cx="1360" cy="520" r="1.8" />
        </g>

        {/* Registration marks — circle + crosshair */}
        <g stroke="rgba(0,0,0,0.22)" strokeWidth="0.8" fill="none">
          <g transform="translate(80,80)">
            <circle cx="0" cy="0" r="10" />
            <line x1="-14" y1="0" x2="14" y2="0" />
            <line x1="0" y1="-14" x2="0" y2="14" />
          </g>
          <g transform="translate(1360,820)">
            <circle cx="0" cy="0" r="10" />
            <line x1="-14" y1="0" x2="14" y2="0" />
            <line x1="0" y1="-14" x2="0" y2="14" />
          </g>
        </g>

        {/* Champagne registration mark */}
        <g stroke="rgba(245,180,0,0.5)" strokeWidth="0.9" fill="none">
          <g transform="translate(1360,80)">
            <circle cx="0" cy="0" r="9" />
            <line x1="-12" y1="0" x2="12" y2="0" />
            <line x1="0" y1="-12" x2="0" y2="12" />
          </g>
          <g transform="translate(80,820)">
            <circle cx="0" cy="0" r="9" />
            <line x1="-12" y1="0" x2="12" y2="0" />
            <line x1="0" y1="-12" x2="0" y2="12" />
          </g>
        </g>

        {/* Corner measurement brackets (L-shape) */}
        <g stroke="rgba(0,0,0,0.2)" strokeWidth="1" fill="none" strokeLinecap="square">
          <polyline points="30,50 30,30 60,30" />
          <polyline points="1380,30 1410,30 1410,50" />
          <polyline points="30,850 30,870 60,870" />
          <polyline points="1380,870 1410,870 1410,850" />
        </g>

        {/* Alignment crosses (tiny plus symbols) */}
        <g stroke="rgba(245,180,0,0.35)" strokeWidth="0.7">
          <g transform="translate(500,540)">
            <line x1="-5" y1="0" x2="5" y2="0" />
            <line x1="0" y1="-5" x2="0" y2="5" />
          </g>
          <g transform="translate(1180,340)">
            <line x1="-5" y1="0" x2="5" y2="0" />
            <line x1="0" y1="-5" x2="0" y2="5" />
          </g>
          <g transform="translate(760,860)">
            <line x1="-5" y1="0" x2="5" y2="0" />
            <line x1="0" y1="-5" x2="0" y2="5" />
          </g>
          <g transform="translate(340,220)">
            <line x1="-5" y1="0" x2="5" y2="0" />
            <line x1="0" y1="-5" x2="0" y2="5" />
          </g>
        </g>

        {/* Faint measurement tick marks along axis */}
        <g stroke="rgba(0,0,0,0.14)" strokeWidth="0.6">
          <line x1="0" y1="450" x2="24" y2="450" />
          <line x1="1416" y1="450" x2="1440" y2="450" />
          <line x1="720" y1="0" x2="720" y2="18" />
          <line x1="720" y1="882" x2="720" y2="900" />
        </g>
      </svg>

      {/* Edge vignette softens content boundaries */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at center, transparent 55%, rgba(245,245,245,0.55) 100%)',
        }}
      />

      <div className="relative max-w-7xl mx-auto">
        <div className="process-title text-center mb-16">
          <p className="section-label mb-4">Estándares premium · Nuestro proceso</p>
          <h2 className="text-4xl md:text-5xl font-bold font-display text-ivory">
            Asesoría, calidad<br />
            <span className="font-display text-gradient-champagne">y entrega garantizada.</span>
          </h2>
          <p className="text-ivory/55 text-base mt-5 max-w-xl mx-auto leading-relaxed">
            Cada detalle de nuestro proceso está diseñado para garantizar impresiones DTF
            consistentes, colores vibrantes, máxima durabilidad y entregas rápidas —
            manteniendo siempre resultados profesionales en cada pedido.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
          {STEPS.map(({ num, label, desc }, i) => (
            <div
              key={i}
              ref={el => cardRefs.current[i] = el}
              className="relative glass-dark rounded-[2rem] p-8 lg:p-9 border-champagne-subtle shadow-cinematic overflow-hidden flex flex-col h-full transition-transform duration-300 hover:-translate-y-1"
            >
              <div
                className="absolute top-0 left-0 right-0 h-px"
                style={{ background: 'linear-gradient(90deg, transparent, rgba(255,202,2,0.5), transparent)' }}
              />

              <div className="mb-6">
                <span
                  className="font-mono-ui text-[10px] tracking-[0.25em] uppercase"
                  style={{ color: '#B8860B' }}
                >
                  Paso {num}
                </span>
              </div>

              <h3 className="font-display text-3xl text-gradient-champagne leading-none mb-4">
                {label}
              </h3>

              <div
                className="h-px w-10 mb-5"
                style={{ background: 'rgba(255,202,2,0.4)' }}
              />

              <p className="text-ivory/65 text-sm leading-relaxed flex-1">
                {desc}
              </p>

              <span
                className="pointer-events-none select-none absolute right-4 bottom-2 font-display leading-none"
                style={{
                  fontSize: '8rem',
                  color: 'rgba(255,202,2,0.18)',
                  letterSpacing: '-0.05em',
                }}
              >
                {num}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
