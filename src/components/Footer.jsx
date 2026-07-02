import { Instagram, MapPin, Mail, Phone, MessageCircle, ArrowUpRight } from 'lucide-react'

function TikTokIcon({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.32 6.32 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.26 8.26 0 0 0 4.84 1.56V6.81a4.85 4.85 0 0 1-1.07-.12z" />
    </svg>
  )
}

const NAV = [
  { label: 'Inicio', href: '#inicio' },
  { label: '¿Qué es DTF?', href: '#que-es-dtf' },
  { label: 'Calidad', href: '#servicios' },
  { label: 'Proceso', href: '#procesos' },
  { label: 'Portafolio', href: '#portafolio' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Cotizar', href: '#contacto' },
]

const WA_HREF =
  'https://api.whatsapp.com/send?phone=573124714116&text=%20%F0%9F%92%AB%C2%A1Hola!%20%0AEstoy%20interesado%2Fa%20en%20conocer%20m%C3%A1s%20detalles.%F0%9F%8E%A8'

export default function Footer() {
  return (
    <footer
      className="relative rounded-t-[4rem] overflow-hidden noise-overlay text-white"
      style={{ background: '#0D0D12' }}
    >
      <div
        className="absolute top-0 left-0 right-0 h-px pointer-events-none"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(255,202,2,0.45), transparent)' }}
      />
      <div
        className="absolute -top-32 left-1/2 -translate-x-1/2 w-[640px] h-[320px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center top, rgba(255,202,2,0.08) 0%, transparent 70%)' }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 pt-20 pb-10">
        <div className="grid md:grid-cols-12 gap-10 lg:gap-12 mb-14">

          {/* Brand */}
          <div className="md:col-span-5 flex flex-col gap-5">
            <a href="#inicio" aria-label="DTF Villavicencio" className="inline-flex items-center self-start">
              <img
                src="/assets/logo-dtf.webp"
                alt="DTF Villavicencio"
                loading="lazy"
                decoding="async"
                className="h-14 md:h-16 w-auto object-contain block"
                style={{ filter: 'drop-shadow(0 2px 12px rgba(255,202,2,0.18))' }}
              />
            </a>
            <p className="text-white/55 text-sm leading-relaxed max-w-sm">
              Atelier premium de impresión textil. Precisión, color y entrega nacional.
            </p>
            <a
              href={WA_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 self-start px-5 py-2.5 rounded-full font-mono-ui text-[11px] tracking-widest transition-all duration-300 hover:scale-[1.02]"
              style={{ background: '#FFCA02', color: '#0D0D12', boxShadow: '0 8px 32px rgba(255,202,2,0.25)' }}
            >
              <MessageCircle size={13} />
              COTIZAR POR WHATSAPP
              <ArrowUpRight size={13} />
            </a>
            <div className="flex gap-2.5">
              <a
                href="https://www.instagram.com/dtfvillavicenciocol?igsh=NnQwMWJlNmxtZ2xl"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded-full flex items-center justify-center text-white/55 hover:text-champagne transition-all duration-300"
                style={{ border: '1px solid rgba(255,255,255,0.12)' }}
              >
                <Instagram size={14} />
              </a>
              <a
                href="https://www.tiktok.com/@dtfvillavicencio?_r=1&_t=ZS-97hHjVTRhIm"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
                className="w-9 h-9 rounded-full flex items-center justify-center text-white/55 hover:text-champagne transition-all duration-300"
                style={{ border: '1px solid rgba(255,255,255,0.12)' }}
              >
                <TikTokIcon size={14} />
              </a>
              <a
                href="mailto:dtfvillavicencio@gmail.com"
                aria-label="Email"
                className="w-9 h-9 rounded-full flex items-center justify-center text-white/55 hover:text-champagne transition-all duration-300"
                style={{ border: '1px solid rgba(255,255,255,0.12)' }}
              >
                <Mail size={14} />
              </a>
            </div>
          </div>

          {/* Navegación */}
          <div className="md:col-span-4 flex flex-col gap-4">
            <h4 className="font-mono-ui text-[10px] tracking-[0.25em] text-champagne uppercase">Navegación</h4>
            <ul className="grid grid-cols-2 gap-x-6 gap-y-3">
              {NAV.map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    className="text-sm text-white/65 hover:text-white transition-colors duration-300"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacto */}
          <div className="md:col-span-3 flex flex-col gap-4">
            <h4 className="font-mono-ui text-[10px] tracking-[0.25em] text-champagne uppercase">Contacto</h4>
            <div className="flex flex-col gap-3.5">
              <div className="flex items-start gap-3">
                <MapPin size={13} className="text-champagne/70 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-white/65 leading-relaxed">Villavicencio, Meta<br />Colombia</span>
              </div>
              <a href="mailto:dtfvillavicencio@gmail.com" className="flex items-center gap-3 hover:text-white transition-colors">
                <Mail size={13} className="text-champagne/70 flex-shrink-0" />
                <span className="text-sm text-white/65 break-all">dtfvillavicencio@gmail.com</span>
              </a>
              <a href="tel:+573124714116" className="flex items-center gap-3 hover:text-white transition-colors">
                <Phone size={13} className="text-champagne/70 flex-shrink-0" />
                <span className="text-sm text-white/65">+57 312 471 4116</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="flex flex-col md:flex-row items-center justify-between gap-5 pt-7"
          style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}
        >
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-mono-ui text-[10px] text-white/45 tracking-widest">
              Sistema operativo activo v1.0
            </span>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="#/privacidad"
              className="font-mono-ui text-[10px] text-white/55 hover:text-champagne tracking-widest transition-colors duration-300"
            >
              Política de Privacidad
            </a>
            <span className="w-px h-3" style={{ background: 'rgba(255,255,255,0.12)' }} />
            <a
              href="#/terminos"
              className="font-mono-ui text-[10px] text-white/55 hover:text-champagne tracking-widest transition-colors duration-300"
            >
              Términos y Condiciones
            </a>
          </div>

          <span className="font-mono-ui text-[10px] text-white/40 tracking-widest">
            © {new Date().getFullYear()} DTF VILLAVICENCIO
          </span>
        </div>
      </div>
    </footer>
  )
}
