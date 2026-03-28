import { useState } from 'react'
import Cursor         from './components/Cursor.jsx'
import Nav            from './components/Nav.jsx'
import Hero           from './components/Hero.jsx'
import About          from './components/About.jsx'
import TechStack      from './components/TechStack.jsx'
import Skills         from './components/Skills.jsx'
import Projects       from './components/Projects.jsx'
import Certifications from './components/Certifications.jsx'
import Experience     from './components/Experience.jsx'
import Contact        from './components/Contact.jsx'
import Footer         from './components/Footer.jsx'
import BootLoader     from './components/BootLoader.jsx'

export default function App() {
  const [booted, setBooted] = useState(false)

  return (
    <div className="min-h-screen bg-void text-sm-white overflow-x-hidden relative">
      {/* Arch Linux boot loader */}
      {!booted && <BootLoader onComplete={() => setBooted(true)} />}

      {/* film grain overlay */}
      <div className="grain-overlay" />

      {/* custom cursor */}
      <Cursor />

      {/* nav */}
      <Nav />

      {/* sections */}
      <main>
        <Hero />
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
