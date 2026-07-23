import { useState, useRef, useEffect, useCallback } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const FAQS = [
  {
    q: '¿Cuánto tarda un pedido?',
    a: 'La impresión tarda aproximadamente entre 1:30 y 2 horas tras confirmar archivo y pago. Te notificamos apenas el pedido esté listo. Para pedidos de alto volumen coordinamos tiempos específicos sin sacrificar calidad.',
  },
  {
    q: '¿Hacen envíos nacionales?',
    a: 'Sí. Despachamos a todo Colombia a través de operadores logísticos confiables. Los tiempos de transporte varían según el destino y el operador seleccionado.',
  },
  {
    q: '¿Qué formatos de archivo aceptan?',
    a: 'Aceptamos PNG, PDF, Illustrator (AI), Photoshop (PSD) y Corel. Recomendamos archivos en resolución alta, modo CMYK, sin fondo. Tamaños máximos: 58 cm de ancho × 2,50 m de largo.',
  },
  {
    q: '¿La impresión resiste lavados?',
    a: 'Sí. Utilizamos tintas certificadas resistentes a más de 60 lavadas sin perder color ni adherencia. Probadas en uniformes y ropa de alto uso.',
  },
  {
    q: '¿Tienen cantidades mínimas?',
    a: 'No exigimos mínimos. Producimos desde 1 unidad hasta miles. El costo por unidad varía según el volumen, y siempre te damos la mejor tarifa para tu pedido.',
  },
  {
    q: '¿Pueden ayudarme con el diseño?',
    a: 'Sí. Contamos con equipo creativo especializado en diseño para DTF Textil. Te acompañamos desde el arte inicial hasta la aprobación final sin costos ocultos.',
  },
  {
    q: '¿Sobre qué tipo de prendas se puede estampar el DTF Textil?',
    a: 'Camisetas, hoodies, gorras, bolsos, overoles, uniformes corporativos, ropa deportiva y cualquier prenda de tela compatible con transferencia DTF.',
  },
  {
    q: '¿Cómo inicio mi pedido?',
    a: 'Escríbenos por WhatsApp o completa el formulario de contacto. Un asesor te responde con cotización y próximos pasos. Sin compromisos.',
  },
  {
    q: '¿Cómo almacenar correctamente las impresiones DTF?',
    a: 'Guárdalas en un lugar limpio y seco. Evita la humedad y el sol directo. Usa sobres de sílica para controlar humedad, coloca hojas separadoras entre cada impresión y empácalas en bolsas para protegerlas del polvo. Preferiblemente no almacenar más de seis meses.',
  },
  {
    q: '¿Cómo cuidar una prenda estampada con DTF para aumentar su durabilidad?',
    a: 'Lava la prenda al revés. No uses secadora. Evita cloro y productos químicos agresivos. No planches directamente sobre el estampado.',
  },
]

const MIN_SIZES = [
  { item: 'Texto', size: '0,8 cm de alto' },
  { item: 'Línea / Trazo', size: '0,5 mm de grosor' },
  { item: 'Detalle fino', size: '1 mm' },
  { item: 'Logo pequeño', size: '2 × 2 cm' },
]

function ChevronIcon({ open }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{
        transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
        transition: 'transform 0.35s cubic-bezier(0.4,0,0.2,1)',
        flexShrink: 0,
        color: '#FFCA02',
      }}
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  )
}

function FAQItem({ q, a, index }) {
  const [open, setOpen] = useState(false)
  const toggle = useCallback(() => setOpen(v => !v), [])

  return (
    <div
      className="faq-item"
      style={{
        borderBottom: '1px solid rgba(0,0,0,0.07)',
      }}
    >
      <button
        onClick={toggle}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
          padding: '1.4rem 0',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          textAlign: 'left',
        }}
        aria-expanded={open}
      >
        <span
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 'clamp(0.875rem, 2vw, 1rem)',
            fontWeight: 600,
            color: open ? '#D99A00' : '#1A1A1A',
            lineHeight: 1.4,
            transition: 'color 0.22s ease',
          }}
        >
          {q}
        </span>
        <ChevronIcon open={open} />
      </button>

      <div
        style={{
          display: 'grid',
          gridTemplateRows: open ? '1fr' : '0fr',
          transition: 'grid-template-rows 0.32s cubic-bezier(0.4,0,0.2,1)',
        }}
      >
        <div style={{ overflow: 'hidden', minHeight: 0 }}>
          <div
            style={{
              paddingBottom: '1.4rem',
              opacity: open ? 1 : 0,
              transform: open ? 'translateY(0)' : 'translateY(-4px)',
              transition: 'opacity 0.28s ease, transform 0.28s cubic-bezier(0.4,0,0.2,1)',
              transitionDelay: open ? '0.08s' : '0s',
              willChange: 'opacity, transform',
            }}
          >
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '0.9rem',
                color: 'rgba(26,26,26,0.62)',
                lineHeight: 1.75,
                margin: 0,
                paddingRight: '2rem',
              }}
            >
              {a}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function FAQ() {
  const ref = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.faq-header', {
        opacity: 0, y: 40, duration: 0.9, ease: 'power3.out',
        immediateRender: false,
        scrollTrigger: { trigger: ref.current, start: 'top 88%', once: true },
      })
      gsap.from('.faq-item', {
        opacity: 0, y: 24,
        duration: 0.6,
        stagger: 0.07,
        ease: 'power3.out',
        immediateRender: false,
        scrollTrigger: { trigger: '.faq-list', start: 'top 88%', once: true },
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section
      id="faq"
      ref={ref}
      style={{
        background: 'linear-gradient(180deg, #FFFFFF 0%, #F8F8F7 60%, #FFFFFF 100%)',
        padding: 'clamp(4rem, 8vw, 7rem) 1.5rem',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Glow background */}
      <div
        style={{
          position: 'absolute',
          top: '30%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '600px',
          height: '300px',
          background: 'radial-gradient(ellipse at center, rgba(255,202,2,0.06) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div style={{ maxWidth: '860px', margin: '0 auto', position: 'relative' }}>

        {/* Header */}
        <div className="faq-header text-center mb-16">
          <p className="section-label mb-4">Preguntas frecuentes</p>
          <h2 className="text-4xl md:text-5xl font-bold font-display text-ivory">
            Todo lo que<br />
            <span className="font-display text-gradient-champagne">necesitas saber.</span>
          </h2>
          <p className="text-ivory/70 text-base mt-5 max-w-xl mx-auto leading-relaxed">
            Resolvemos tus dudas antes de que contactes. Sin letra pequeña.
          </p>
        </div>

        {/* Accordion */}
        <div
          className="faq-list"
          style={{
            background: 'rgba(255,255,255,0.72)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(0,0,0,0.06)',
            borderRadius: '1.5rem',
            padding: 'clamp(1.5rem, 4vw, 2.5rem) clamp(1.25rem, 4vw, 2.5rem)',
            boxShadow: '0 32px 74px rgba(17,17,17,0.13), 0 10px 26px rgba(17,17,17,0.07)',
          }}
        >
          {/* Top border accent */}
          <div
            style={{
              height: '1px',
              background: 'linear-gradient(90deg, transparent, rgba(255,202,2,0.5), transparent)',
              marginBottom: 'clamp(1.5rem, 4vw, 2.5rem)',
              borderRadius: '1px',
            }}
          />

          {FAQS.map((item, i) => (
            <FAQItem key={i} index={i} q={item.q} a={item.a} />
          ))}
        </div>

        {/* Medidas mínimas */}
        <div className="faq-item" style={{ marginTop: '2.5rem' }}>
          <p
            style={{
              fontFamily: "'Satoshi', sans-serif",
              fontWeight: 700,
              fontSize: '0.62rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: '#D99A00',
              textAlign: 'center',
              marginBottom: '0.5rem',
            }}
          >
            Medidas mínimas de impresión
          </p>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.85rem', color: 'rgba(26,26,26,0.55)', textAlign: 'center', marginBottom: '1.5rem' }}>
            Recomendado para conservar nitidez y adherencia.
          </p>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
              gap: '0.75rem',
            }}
          >
            {MIN_SIZES.map(({ item, size }, i) => (
              <div
                key={i}
                style={{
                  background: 'rgba(255,255,255,0.78)',
                  border: '1px solid rgba(0,0,0,0.06)',
                  borderRadius: '1rem',
                  padding: '1rem 1.1rem',
                  boxShadow: '0 8px 22px rgba(17,17,17,0.06)',
                }}
              >
                <div
                  style={{
                    fontFamily: "'Satoshi', sans-serif",
                    fontWeight: 700,
                    fontSize: '0.62rem',
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color: '#D99A00',
                    marginBottom: '0.4rem',
                  }}
                >
                  {item}
                </div>
                <div
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '0.9rem',
                    fontWeight: 600,
                    color: '#1A1A1A',
                  }}
                >
                  {size}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA bottom */}
        <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.875rem', color: 'rgba(26,26,26,0.45)', marginBottom: '1rem' }}>
            ¿No encontraste tu respuesta?
          </p>
          <a
            href="https://api.whatsapp.com/send?phone=573124714116&text=%20%F0%9F%92%AB%C2%A1Hola!%20%0ATengo%20una%20pregunta%20sobre%20sus%20servicios."
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost btn-magnetic inline-flex items-center gap-2"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
            </svg>
            Hablar con un asesor
          </a>
        </div>

        {/* Decorative sticker — anchored to content column */}
        <img
          src="/assets/sticker_final_output_3x.png"
          alt=""
          aria-hidden="true"
          loading="lazy"
          decoding="async"
          style={{
            position: 'absolute',
            right: '-1rem',
            bottom: '-2.5rem',
            width: 'clamp(90px, 12vw, 150px)',
            transform: 'rotate(-8deg)',
            filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.22)) drop-shadow(0 3px 6px rgba(0,0,0,0.14))',
            transition: 'transform 0.5s cubic-bezier(0,0,0.2,1)',
            willChange: 'transform',
            userSelect: 'none',
            pointerEvents: 'auto',
            zIndex: 2,
          }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'rotate(-3deg) translateY(-6px) scale(1.05)' }}
          onMouseLeave={e => { e.currentTarget.style.transform = 'rotate(-8deg)' }}
        />

      </div>
    </section>
  )
}
