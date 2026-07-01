import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { MapPin, Clock, Phone, Navigation } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const INFO = [
  {
    icon: <MapPin size={14} className="text-champagne flex-shrink-0 mt-0.5" />,
    label: 'Dirección',
    value: 'Villavicencio, Meta\nColombia',
  },
  {
    icon: <Phone size={14} className="text-champagne flex-shrink-0 mt-0.5" />,
    label: 'WhatsApp',
    value: '+57 312 471 4116',
  },
]

const SCHEDULE = [
  { day: 'Lunes a Viernes', ranges: ['8:00 AM – 12:00 PM', '2:00 PM – 6:00 PM'] },
  { day: 'Sábado', ranges: ['9:00 AM – 1:00 PM'] },
  { day: 'Domingo', ranges: ['Cerrado'] },
]

function isOpenNow() {
  const now = new Date()
  const day = now.getDay() // 0 Sun .. 6 Sat
  const m = now.getHours() * 60 + now.getMinutes()
  if (day === 0) return false
  if (day === 6) return m >= 540 && m < 780 // 9:00–13:00
  return (m >= 480 && m < 720) || (m >= 840 && m < 1080) // 8–12, 14–18
}

function ScheduleCard() {
  const open = isOpenNow()
  return (
    <div className="glass-dark rounded-2xl p-5 border-champagne-subtle">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Clock size={14} className="text-champagne" />
          <span className="font-mono-ui text-[9px] text-champagne/60 tracking-widest">HORARIO COMERCIAL</span>
        </div>
        <span
          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono-ui tracking-wider"
          style={{
            background: open ? 'rgba(16,185,129,0.12)' : 'rgba(120,120,120,0.1)',
            border: `1px solid ${open ? 'rgba(16,185,129,0.3)' : 'rgba(120,120,120,0.25)'}`,
            color: open ? '#10B981' : 'rgba(26,26,26,0.55)',
          }}
        >
          <span
            className={open ? 'animate-pulse' : ''}
            style={{
              width: 6, height: 6, borderRadius: 999,
              background: open ? '#10B981' : '#9CA3AF',
            }}
          />
          {open ? 'Abierto ahora' : 'Cerrado'}
        </span>
      </div>
      <ul className="flex flex-col gap-2">
        {SCHEDULE.map(({ day, ranges }) => (
          <li key={day} className="flex items-start justify-between gap-3 text-xs">
            <span className="text-ivory/70 font-semibold">{day}</span>
            <span className="text-ivory/55 text-right whitespace-pre-line">{ranges.join('\n')}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function Location() {
  const ref = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.loc-title',
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: ref.current, start: 'top 85%', once: true } }
      )
      gsap.fromTo('.loc-card',
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.9, stagger: 0.12, ease: 'power3.out',
          scrollTrigger: { trigger: ref.current, start: 'top 80%', once: true } }
      )
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section
      id="ubicacion"
      ref={ref}
      className="py-28 px-6 lg:px-12 noise-overlay"
      style={{ background: '#F8F8F8' }}
    >
      {/* Premium hairline divider */}
      <div
        className="absolute top-0 left-0 right-0 h-px pointer-events-none"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(0,0,0,0.08), transparent)' }}
      />
      <div className="relative max-w-7xl mx-auto">

        <div className="loc-title text-center mb-16">
          <p className="section-label mb-4">Dónde estamos</p>
          <h2 className="text-4xl md:text-5xl font-bold font-display text-ivory">
            En el corazón de<br />
            <span className="font-display text-gradient-champagne">los Llanos.</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-[1fr_420px] gap-6 items-stretch">

          {/* Map embed */}
          <div className="loc-card glass-dark rounded-[2rem] overflow-hidden border-champagne-subtle shadow-cinematic" style={{ minHeight: '420px' }}>
            <iframe
              title="DTF Villavicencio ubicación"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d248.71025641677514!2d-73.63774419610144!3d4.148601443375784!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e3e2d3638b4b1a3%3A0x21c310588bce9cfc!2sDTF%20VILLAVICENCIO!5e0!3m2!1ses!2sco!4v1778594581736!5m2!1ses!2sco"
              width="100%"
              height="100%"
              style={{ border: 'none', minHeight: '420px' }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          {/* Info panel */}
          <div className="loc-card flex flex-col gap-4">

            {/* Info cards */}
            {INFO.map(({ icon, label, value }, i) => (
              <div
                key={i}
                className="glass-dark rounded-2xl p-5 border-champagne-subtle flex items-start gap-4"
              >
                <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(255,202,2,0.1)' }}>
                  {icon}
                </div>
                <div>
                  <div className="font-mono-ui text-[9px] text-champagne/60 tracking-widest mb-1">{label.toUpperCase()}</div>
                  <p className="text-sm text-ivory/70 leading-relaxed whitespace-pre-line">{value}</p>
                </div>
              </div>
            ))}

            <ScheduleCard />

            {/* CTA */}
            <a
              href="https://maps.google.com/?q=DTF+VILLAVICENCIO&ll=4.148601,-73.637744"
              target="_blank"
              rel="noreferrer"
              className="btn-primary btn-magnetic flex items-center justify-center gap-2 mt-2"
            >
              <Navigation size={13} />
              Cómo llegar
            </a>

            {/* Ambient badge */}
            <div
              className="glass-dark rounded-2xl p-5 border-champagne-subtle mt-auto"
              style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(255,202,2,0.07) 0%, transparent 70%)' }}
            >
              <div className="font-mono-ui text-[9px] text-champagne/50 tracking-widest mb-2">COBERTURA</div>
              <p className="text-sm text-ivory/60 leading-relaxed">
                Envíos a todo Colombia — Bogotá, Medellín, Cali, Barranquilla, Cartagena y más ciudades.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
