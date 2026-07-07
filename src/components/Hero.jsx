import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ArrowRight, Truck } from 'lucide-react'

const WORDS = ['Precisión', 'Colores', 'Calidad', 'Impacto', 'Durabilidad', 'Branding']

export default function Hero() {
  const sectionRef = useRef(null)
  const [wordIndex, setWordIndex] = useState(0)
  const [visible, setVisible] = useState(true)

  // Word cycle — starts after GSAP entrance finishes (~2.4s)
  useEffect(() => {
    let interval
    const FADE_MS = 700
    const HOLD_MS = 3600

    const startDelay = setTimeout(() => {
      interval = setInterval(() => {
        setVisible(false)
        setTimeout(() => {
          setWordIndex(i => (i + 1) % WORDS.length)
          setVisible(true)
        }, FADE_MS)
      }, HOLD_MS)
    }, 2400)

    return () => {
      clearTimeout(startDelay)
      clearInterval(interval)
    }
  }, [])

  // GSAP entrance
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.timeline({ delay: 0.3 })
        .fromTo('.hero-badge',
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }
        )
        .fromTo('.hero-headline-1',
          { opacity: 0, y: 36 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
          '-=0.3'
        )
        .fromTo('.hero-precision-wrap',
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 1.1, ease: 'power3.out' },
          '-=0.5'
        )
        .fromTo('.hero-sub',
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' },
          '-=0.5'
        )
        .fromTo('.hero-ctas',
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
          '-=0.4'
        )
        .fromTo('.hero-stats',
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
          '-=0.3'
        )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="inicio"
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background video */}
      <video
        className="hero-video absolute inset-0 w-full h-full object-cover"
        style={{ zIndex: 0, filter: 'blur(2.5px) saturate(1.1)', transform: 'scale(1.08)' }}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster="/assets/hero-poster.jpg"
        aria-hidden="true"
      >
        <source src="/assets/hero.mp4" type="video/mp4" />
      </video>

      {/* Cinematic overlay — dark depth veil */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `linear-gradient(180deg,
            rgba(13,13,18,0.64) 0%,
            rgba(13,13,18,0.46) 40%,
            rgba(13,13,18,0.56) 75%,
            rgba(13,13,18,0.82) 100%
          )`,
          zIndex: 1,
        }}
      />

      {/* Vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 75% 65% at 50% 45%, transparent 50%, rgba(13,13,18,0.55) 100%)',
          zIndex: 1,
        }}
      />

      {/* Grain */}
      <div className="absolute inset-0 noise-overlay pointer-events-none" style={{ zIndex: 2, opacity: 0.5 }} />

      {/* Top center glow */}
      <div
        className="hero-glow absolute top-0 left-1/2 -translate-x-1/2 w-[680px] h-[340px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center top, rgba(255,202,2,0.16) 0%, transparent 70%)',
          zIndex: 2,
        }}
      />

      {/* Center ambient glow */}
      <div
        className="hero-glow absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(255,202,2,0.1) 0%, transparent 65%)',
          filter: 'blur(20px)',
          zIndex: 2,
        }}
      />

      {/* Main content */}
      <div
        className="relative flex flex-col items-center text-center gap-8 w-full max-w-2xl mx-auto px-6 pt-36 pb-28"
        style={{ zIndex: 3 }}
      >
        <div
          className="hero-badge flex items-center gap-2.5 px-4 py-2 rounded-full"
          style={{
            background: 'rgba(255,255,255,0.09)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.14)',
            boxShadow: '0 4px 18px rgba(0,0,0,0.18)',
          }}
        >
          <Truck size={13} className="text-champagne" />
          <span
            className="font-mono-ui uppercase"
            style={{
              fontSize: '0.65rem',
              letterSpacing: '0.2em',
              color: '#FFFFFF',
            }}
          >
            Envíos a todo Colombia
          </span>
        </div>

        <div className="flex flex-col gap-0.5">
          <h1
            className="hero-headline-1 font-display text-white leading-[1.1] tracking-tight"
            style={{ fontSize: 'clamp(1.75rem, 4vw, 3rem)', textShadow: '0 2px 24px rgba(0,0,0,0.4)' }}
          >
            DTF Textil profesional
          </h1>

          {/* Wrapper gets GSAP entrance; inner word gets CSS transition cross-fade */}
          <div className="hero-precision-wrap" style={{ minHeight: 'clamp(4.5rem, 10vw, 8rem)' }}>
            <h1
              className="font-display text-gradient-champagne leading-[1.1] pb-2"
              style={{
                fontSize: 'clamp(3.8rem, 9vw, 7rem)',
                filter: 'drop-shadow(0 0 20px rgba(255,202,2,0.22))',
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(-5px)',
                transition: 'opacity 0.7s cubic-bezier(0.4,0,0.2,1), transform 0.7s cubic-bezier(0.4,0,0.2,1)',
                willChange: 'transform, opacity',
              }}
            >
              {WORDS[wordIndex]}.
            </h1>
          </div>
        </div>

        <p
          className="hero-sub text-white/65 leading-relaxed font-light max-w-sm"
          style={{ fontSize: 'clamp(0.85rem, 2vw, 1rem)', textShadow: '0 1px 12px rgba(0,0,0,0.4)' }}
        >
          Impulsamos emprendedores y marcas — producción ágil y entregas confiables a nivel nacional.
        </p>

        <div className="hero-ctas flex flex-wrap gap-3 items-center justify-center">
          <a
            href="https://api.whatsapp.com/send?phone=573124714116&text=%20%F0%9F%92%AB%C2%A1Hola!%20%0AEstoy%20interesado%2Fa%20en%20conocer%20m%C3%A1s%20detalles.%F0%9F%8E%A8"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary btn-magnetic flex items-center gap-2"
          >
            Solicitar presupuesto
            <ArrowRight size={13} />
          </a>
          <a
            href="#procesos"
            className="btn-ghost btn-magnetic"
            style={{ color: '#FAF8F5', borderColor: 'rgba(255,255,255,0.32)' }}
          >
            Conocer el proceso
          </a>
        </div>

        <div className="hero-stats flex items-center gap-6 justify-center flex-wrap">
          <div className="flex flex-col items-center gap-0.5">
            <span className="font-mono-ui text-xs text-champagne tracking-wider">+10.000 impresiones</span>
            <span className="font-mono-ui text-[10px] text-white/45 tracking-wider">entregadas</span>
          </div>
          <div className="h-6 w-px" style={{ background: 'rgba(255,202,2,0.18)' }} />
          <div className="flex flex-col items-center gap-0.5">
            <span className="font-mono-ui text-xs text-champagne tracking-wider">Producción rápida</span>
            <span className="font-mono-ui text-[10px] text-white/45 tracking-wider">arte → producto</span>
          </div>
          <div className="h-6 w-px" style={{ background: 'rgba(255,202,2,0.18)' }} />
          <div className="flex flex-col items-center gap-0.5">
            <span className="font-mono-ui text-xs text-champagne tracking-wider">Cobertura</span>
            <span className="font-mono-ui text-[10px] text-white/45 tracking-wider">nacional</span>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, transparent, #FFFFFF)', zIndex: 3 }}
      />
    </section>
  )
}
