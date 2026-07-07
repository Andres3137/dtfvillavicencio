import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Send, Clock } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const SERVICES = [
  'Estampado DTF Gran Formato',
  'Personalización de Logos',
  'Diseño Premium',
  'Envío Nacional',
  'Uniformes Corporativos',
  'Otro',
]

export default function CTAForm() {
  const ref = useRef(null)
  const [form, setForm] = useState({ name: '', company: '', whatsapp: '', service: '', message: '' })
  const [sent, setSent] = useState(false)

  const [waError, setWaError] = useState(false)

  const change = e => {
    const { name, value } = e.target
    if (name === 'whatsapp') {
      const clean = value.replace(/[^\d+]/g, '')
      setForm(f => ({ ...f, whatsapp: clean }))
      setWaError(clean.length > 0 && clean.replace(/\+/g, '').length < 7)
    } else {
      setForm(f => ({ ...f, [name]: value }))
    }
  }

  const submit = e => {
    e.preventDefault()

    const msg =
      `Hola, me interesa solicitar asesoramiento para un proyecto de impresión DTF.\n\n` +
      `Nombre: ${form.name}\n` +
      `Empresa: ${form.company || '—'}\n` +
      `Teléfono: ${form.whatsapp}\n` +
      `Servicio de interés: ${form.service}\n\n` +
      `Mensaje:\n${form.message || '—'}\n\n` +
      `Quiero recibir más información.`

    const url = `https://wa.me/573124714116?text=${encodeURIComponent(msg)}`

    gsap.to('.submit-btn', {
      scale: 0.95, duration: 0.1, yoyo: true, repeat: 1,
      onComplete: () => {
        window.open(url, '_blank', 'noopener,noreferrer')
        setSent(true)
      },
    })
  }

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.cta-headline',
        { opacity: 0, y: 60 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: ref.current, start: 'top 85%' } }
      )
      gsap.fromTo('.cta-form',
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', delay: 0.2,
          scrollTrigger: { trigger: ref.current, start: 'top 80%' } }
      )
    }, ref)
    return () => ctx.revert()
  }, [])

  const inputClass = `
    w-full bg-transparent border rounded-2xl px-5 py-4 text-ivory text-sm outline-none
    placeholder-ivory/50 font-sans transition-all duration-300
    border-[rgba(0,0,0,0.12)] hover:border-[rgba(255,202,2,0.45)]
    focus:border-[rgba(255,202,2,0.8)] focus:shadow-[0_0_20px_rgba(255,202,2,0.18)]
  `

  return (
    <section
      id="contacto"
      ref={ref}
      className="relative py-32 px-6 lg:px-12 noise-overlay overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #0D0D12 0%, #14141B 50%, #0D0D12 100%)',
      }}
    >
      <div
        className="absolute top-0 left-0 right-0 h-px pointer-events-none"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(255,202,2,0.35), transparent)' }}
      />
      <div
        className="cta-orb absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full pointer-events-none opacity-40"
        style={{ background: 'radial-gradient(ellipse, rgba(255,202,2,0.18) 0%, transparent 70%)', filter: 'blur(40px)' }}
      />

      <div className="relative max-w-5xl mx-auto">
        {/* Headline */}
        <div className="cta-headline text-center mb-16">
          <p className="section-label mb-6">Comienza tu proyecto</p>
          <h2 className="text-4xl md:text-6xl font-bold font-display text-white leading-[1.05] tracking-tight">
            Hagamos que tu marca<br />se vea
          </h2>
          <h2
            className="font-display text-gradient-champagne mt-1 leading-[1] px-2"
            style={{ fontSize: 'clamp(2.75rem, 12vw, 7rem)', letterSpacing: '-0.04em' }}
          >
            INOLVIDABLE.
          </h2>
          <p className="text-white/55 text-base mt-6 max-w-lg mx-auto">
            Solicita un asesoramiento personalizado para tu marca o negocio.
          </p>
        </div>

        {/* Form card */}
        <div className="cta-form glass-dark rounded-[2rem] p-8 md:p-12 border-champagne-subtle shadow-cinematic max-w-2xl mx-auto">
          {sent ? (
            <div className="text-center py-12 flex flex-col items-center gap-4">
              <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ background: 'rgba(255,202,2,0.15)' }}>
                <Send size={24} className="text-champagne" />
              </div>
              <h3 className="text-xl font-bold text-ivory">¡Solicitud recibida!</h3>
              <p className="text-ivory/70 text-sm max-w-xs">Te contactaremos en menos de 24 horas con tu propuesta personalizada.</p>
            </div>
          ) : (
            <form onSubmit={submit} className="flex flex-col gap-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <label className="font-mono-ui text-[10px] tracking-widest text-ivory/75">NOMBRE</label>
                  <input
                    name="name"
                    value={form.name}
                    onChange={change}
                    placeholder="Tu nombre"
                    required
                    className={inputClass}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="font-mono-ui text-[10px] tracking-widest text-ivory/75">EMPRESA</label>
                  <input
                    name="company"
                    value={form.company}
                    onChange={change}
                    placeholder="Nombre de marca"
                    className={inputClass}
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <label className="font-mono-ui text-[10px] tracking-widest text-ivory/75">WHATSAPP</label>
                  <input
                    type="tel"
                    name="whatsapp"
                    value={form.whatsapp}
                    onChange={change}
                    placeholder="+573124714116"
                    required
                    inputMode="tel"
                    pattern="[\d+]{7,15}"
                    className={inputClass}
                    style={waError ? { borderColor: 'rgba(255,80,80,0.6)' } : {}}
                  />
                  {waError && (
                    <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.7rem', color: 'rgba(255,100,100,0.8)', paddingLeft: '0.25rem' }}>
                      Solo números, mínimo 7 dígitos
                    </span>
                  )}
                </div>
                <div className="flex flex-col gap-2">
                  <label className="font-mono-ui text-[10px] tracking-widest text-ivory/75">SERVICIO</label>
                  <select
                    name="service"
                    value={form.service}
                    onChange={change}
                    required
                    className={inputClass}
                    style={{ cursor: 'pointer' }}
                  >
                    <option value="" style={{ background: '#FFFFFF', color: '#1A1A1A' }}>Selecciona servicio</option>
                    {SERVICES.map(s => (
                      <option key={s} value={s} style={{ background: '#FFFFFF', color: '#1A1A1A' }}>{s}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-mono-ui text-[10px] tracking-widest text-ivory/75">MENSAJE</label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={change}
                  placeholder="Cuéntanos sobre tu proyecto..."
                  rows={4}
                  className={inputClass}
                  style={{ resize: 'none' }}
                />
              </div>

              <button
                type="submit"
                className="submit-btn btn-primary btn-magnetic mt-2 flex items-center justify-center gap-2"
              >
                Solicitar asesoramiento
                <Send size={14} />
              </button>
            </form>
          )}
        </div>

        {/* Mini social proof */}
        <div className="flex items-center justify-center gap-2 mt-8">
          <Clock size={12} className="text-champagne" />
          <span className="font-mono-ui text-xs text-white/45 tracking-wider">
            Respondiendo solicitudes en menos de 24h
          </span>
        </div>
      </div>
    </section>
  )
}
