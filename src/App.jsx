import { useState } from 'react'
import Cursor         from './components/Cursor.jsx'
import DockNavbar     from './components/DockNavbar.jsx'
import PremiumHero    from './components/PremiumHero.jsx'
import About          from './components/About.jsx'
import TechStack      from './components/TechStack.jsx'
import Skills         from './components/Skills.jsx'
import Projects       from './components/Projects.jsx'
import Certifications from './components/Certifications.jsx'
import Experience     from './components/Experience.jsx'
import Contact        from './components/Contact.jsx'
import Footer         from './components/Footer.jsx'
import BootLoader     from './components/BootLoader.jsx'
import SmoothScroll   from './components/SmoothScroll.jsx'

export default function App() {
  const [booted, setBooted] = useState(false)

  return (
    <div className="min-h-screen bg-void text-sm-white overflow-x-hidden relative">
      {/* smooth scroll physics */}
      <SmoothScroll />

      {/* Arch Linux boot loader */}
      {!booted && <BootLoader onComplete={() => setBooted(true)} />}

      {/* film grain overlay */}
      <div className="grain-overlay" />

      {/* custom cursor */}
      <Cursor />

      {/* macOS dock navbar */}
      <DockNavbar />

      {/* sections */}
      <main>
        <PremiumHero />
        <About />
        <TechStack />
        <Skills />
        <Projects />
        <Certifications />
        <Experience />
        <Contact />
      </main>

      <Footer />
    </div>
  )
}
