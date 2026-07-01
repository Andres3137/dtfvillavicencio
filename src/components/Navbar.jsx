import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

const LINKS = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Servicios', href: '#servicios' },
  { label: 'Procesos', href: '#procesos' },
  { label: 'Portafolio', href: '#portafolio' },
  { label: 'Contacto', href: '#contacto' },
]

function NavLink({ href, label, onClick }) {
  return (
    <a
      href={href}
      onClick={onClick}
      className="font-mono-ui text-xs tracking-widest text-white/75 hover:text-champagne transition-colors duration-200"
    >
      {label}
    </a>
  )
}

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const navRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(navRef.current,
        { y: -80, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.3 }
      )
    }, navRef)
    return () => ctx.revert()
  }, [])

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 flex flex-col overflow-hidden"
      style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.25)' }}
    >
      {/* SVG glass-distortion filter */}
      <svg style={{ display: 'none' }}>
        <filter id="glass-distortion" x="0%" y="0%" width="100%" height="100%" filterUnits="objectBoundingBox">
          <feTurbulence type="fractalNoise" baseFrequency="0.001 0.005" numOctaves="1" seed="17" result="turbulence" />
          <feComponentTransfer in="turbulence" result="mapped">
            <feFuncR type="gamma" amplitude="1" exponent="10" offset="0.5" />
            <feFuncG type="gamma" amplitude="0" exponent="1" offset="0" />
            <feFuncB type="gamma" amplitude="0" exponent="1" offset="0.5" />
          </feComponentTransfer>
          <feGaussianBlur in="turbulence" stdDeviation="3" result="softMap" />
          <feSpecularLighting in="softMap" surfaceScale="5" specularConstant="1" specularExponent="100" lightingColor="white" result="specLight">
            <fePointLight x="-200" y="-200" z="300" />
          </feSpecularLighting>
          <feComposite in="specLight" operator="arithmetic" k1="0" k2="1" k3="1" k4="0" result="litImage" />
          <feDisplacementMap in="SourceGraphic" in2="softMap" scale="200" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </svg>

      {/* Layer 1 — blur + distortion */}
      <div
        className="nav-glass-filter absolute inset-0 z-0 overflow-hidden"
        style={{
          backdropFilter: 'blur(11px)',
          filter: 'url(#glass-distortion)',
          isolation: 'isolate',
        }}
      />
      {/* Layer 2 — tint (cinematic dark glass) */}
      <div
        className="absolute inset-0 z-10"
        style={{ background: 'rgba(18,18,24,0.5)' }}
      />
      {/* Layer 3 — bottom hairline */}
      <div
        className="absolute bottom-0 left-0 right-0 z-20 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(255,202,2,0.35), transparent)' }}
      />

      {/* Content row */}
      <div className="relative z-30 w-full max-w-7xl mx-auto px-6 lg:px-10 py-4 flex items-center justify-between gap-5">

        {/* Logo */}
        <a href="#inicio" className="flex-shrink-0">
          <img src="/assets/logo-dtf.webp" alt="DTF Villavicencio" fetchpriority="high" decoding="async" className="h-8 w-auto object-contain" />
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-7">
          {LINKS.map(({ label, href }) => (
            <NavLink key={label} href={href} label={label} />
          ))}
        </div>

        {/* Right group */}
        <div className="flex items-center gap-4">
          {/* CTA with glow */}
          <div className="relative group hidden md:block flex-shrink-0">
            <div
              className="absolute inset-0 -m-2 rounded-full pointer-events-none opacity-25 blur-lg transition-all duration-300 group-hover:opacity-50 group-hover:blur-xl group-hover:-m-3"
              style={{ background: '#FFCA02' }}
            />
            <a href="#contacto" className="relative z-10 btn-primary btn-magnetic whitespace-nowrap">
              Solicitar asesoramiento
            </a>
          </div>

          {/* Hamburger */}
          <button
            className="md:hidden text-white/75 hover:text-champagne transition-colors"
            onClick={() => setOpen(o => !o)}
            aria-label="Menu"
          >
            <div className="flex flex-col gap-1.5 w-5">
              <span className={`block h-px bg-current transition-all duration-300 ${open ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`block h-px bg-current transition-all duration-300 ${open ? 'opacity-0' : ''}`} />
              <span className={`block h-px bg-current transition-all duration-300 ${open ? '-rotate-45 -translate-y-2' : ''}`} />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`relative z-30 md:hidden flex flex-col items-center w-full overflow-hidden transition-all duration-300 ease-in-out
          ${open ? 'max-h-[400px] opacity-100 pb-6' : 'max-h-0 opacity-0 pointer-events-none pb-0'}`}
      >
        <div className="flex flex-col items-center gap-4 w-full px-6">
          {LINKS.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              onClick={() => setOpen(false)}
              className="font-mono-ui text-xs tracking-widest text-white/75 hover:text-champagne transition-colors w-full text-center"
            >
              {label}
            </a>
          ))}
          <div className="relative group w-full mt-1">
            <div
              className="absolute inset-0 -m-1 rounded-full pointer-events-none opacity-25 blur-lg transition-all duration-300 group-hover:opacity-45 group-hover:blur-xl"
              style={{ background: '#FFCA02' }}
            />
            <a
              href="#contacto"
              onClick={() => setOpen(false)}
              className="relative z-10 btn-primary btn-magnetic text-center block w-full"
            >
              Solicitar asesoramiento
            </a>
          </div>
        </div>
      </div>
    </nav>
  )
}
