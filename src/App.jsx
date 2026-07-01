import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import LogoMarquee from './components/LogoMarquee'
import WhatIsDTF from './components/WhatIsDTF'
import Features from './components/Features'
import Process from './components/Process'
import Showcase from './components/Showcase'
import CTAForm from './components/CTAForm'
import FAQ from './components/FAQ'
import Location from './components/Location'
import Footer from './components/Footer'
import LegalPage from './components/LegalPage'
import { LEGAL } from './data/legal'

function WhatsAppButton() {
  return (
    <a
      href="https://api.whatsapp.com/send?phone=573124714116&text=%20%F0%9F%92%AB%C2%A1Hola!%20%0AEstoy%20interesado%2Fa%20en%20conocer%20m%C3%A1s%20detalles.%F0%9F%8E%A8"
      target="_blank"
      rel="noreferrer"
      aria-label="Contactar por WhatsApp"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-transform duration-300 hover:scale-110"
      style={{ background: '#25D366', boxShadow: '0 4px 24px rgba(37,211,102,0.4)' }}
    >
      <svg viewBox="0 0 24 24" width="26" height="26" fill="white" xmlns="http://www.w3.org/2000/svg">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
      </svg>
    </a>
  )
}

function getRoute() {
  const h = window.location.hash
  if (h === '#/privacidad') return 'privacidad'
  if (h === '#/terminos') return 'terminos'
  return 'home'
}

export default function App() {
  const [route, setRoute] = useState(getRoute())

  useEffect(() => {
    const onHash = () => setRoute(getRoute())
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  useEffect(() => {
    if (route !== 'home') return
    const h = window.location.hash
    if (h && !h.startsWith('#/')) {
      const el = document.getElementById(h.slice(1))
      if (el) {
        const id = setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 60)
        return () => clearTimeout(id)
      }
    }
  }, [route])

  if (route === 'privacidad') return <LegalPage doc={LEGAL.privacidad} />
  if (route === 'terminos') return <LegalPage doc={LEGAL.terminos} />

  return (
    <div className="relative min-h-screen bg-obsidian text-ivory overflow-x-hidden">
      <div
        className="decor-blur fixed inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          opacity: 0.03,
        }}
      />

      <Navbar />
      <main className="relative z-10">
        <Hero />
        <LogoMarquee />
        <WhatIsDTF />
        <Features />
        <Process />
        <Showcase />
        <Location />
        <CTAForm />
        <FAQ />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  )
}
