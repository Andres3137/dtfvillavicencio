import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const LOGOS = [
  { src: '/logos_clientes/8.webp', alt: 'Marca cliente' },
  { src: '/logos_clientes/9.webp', alt: 'Marca cliente' },
  { src: '/logos_clientes/10.webp', alt: 'Marca cliente' },
  { src: '/logos_clientes/11.webp', alt: 'Marca cliente' },
  { src: '/logos_clientes/12.webp', alt: 'Marca cliente' },
  { src: '/logos_clientes/13.webp', alt: 'Marca cliente' },
  { src: '/logos_clientes/14.webp', alt: 'Marca cliente' },
]

export default function LogoMarquee() {
  const ref = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(ref.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: ref.current, start: 'top 85%' },
        }
      )
    }, ref)
    return () => ctx.revert()
  }, [])

  const doubled = [...LOGOS, ...LOGOS]

  return (
    <section ref={ref} className="py-16 overflow-hidden border-y" style={{ borderColor: 'rgba(255,202,2,0.1)' }}>
      <p className="section-label text-center mb-8 opacity-50">Marcas que confían en nosotros</p>
      <div className="marquee-container">
        <div className="marquee-track">
          {doubled.map((logo, i) => (
            <div
              key={i}
              aria-hidden={i >= LOGOS.length ? 'true' : undefined}
              className="flex items-center px-10 md:px-14 lg:px-16 flex-shrink-0"
            >
              <img
                src={logo.src}
                alt={logo.alt}
                loading="lazy"
                decoding="async"
                draggable="false"
                className="h-16 md:h-20 w-auto object-contain transition-transform duration-300 hover:scale-105"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
