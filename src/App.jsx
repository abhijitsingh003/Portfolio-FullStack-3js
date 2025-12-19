import { useEffect, useRef, useState } from "react"
import "./index.css"
import { Github, Linkedin, Twitter, Mail, ArrowRight } from "lucide-react"

export default function App() {
  const canvasRef = useRef(null)
  const tubesRef = useRef(null)

  const [showGate, setShowGate] = useState(false)

  // Detect mobile ONCE on load
  useEffect(() => {
    if (window.innerWidth < 768) {
      setShowGate(true)
    }
  }, [])

  // Random color generator
  const randomColors = (count) =>
    Array.from({ length: count }, () =>
      "#" +
      Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, "0")
    )

  // Load Three.js Tubes
  useEffect(() => {
    let mounted = true

    import(
      "https://cdn.jsdelivr.net/npm/threejs-components@0.0.19/build/cursors/tubes1.min.js"
    ).then((module) => {
      if (!mounted || !canvasRef.current) return

      const Tubes = module.default
      tubesRef.current = Tubes(canvasRef.current, {
        tubes: {
          colors: ["#5e72e4", "#8965e0", "#f5365c"],
          lights: {
            intensity: 200,
            colors: ["#21d4fd", "#b721ff", "#f4d03f", "#11cdef"],
          },
        },
      })
    })

    return () => {
      mounted = false
      tubesRef.current?.dispose?.()
    }
  }, [])

  // Change colors on click
  const handleClick = () => {
    if (!tubesRef.current) return
    tubesRef.current.tubes.setColors(randomColors(3))
    tubesRef.current.tubes.setLightsColors(randomColors(4))
  }

  return (
    <div className="app" onClick={handleClick}>
      <canvas ref={canvasRef} className="tubes-canvas" />

      {/* UI */}
      <div className="ui">
        <nav className="nav">
          <span className="logo">ABHIJIT SINGH</span>
          <div className="nav-links">
            <a>About</a>
            <a>Work</a>
            <a>Contact</a>
          </div>
        </nav>

        <main className="hero">
          <span className="role">UI/UX DESIGNER | DEVELOPER</span>

          <h1>
            Hi :) <br />
            I'm Abhijit
          </h1>

          <p>
            I love turning messy ideas into clean, simple experiences
            that just make sense. <br />
            I draw inspiration from how people interact with everyday
            objects to solve usability problems. <br />
            Open to freelance projects and internships.
          </p>

          <div className="socials">
            <a href="https://github.com/abhijitsingh003" target="_blank">
              <Github size={18} />
            </a>
            <a href="https://www.linkedin.com/in/abhijitsingh003" target="_blank">
              <Linkedin size={18} />
            </a>
            <a href="https://twitter.com/" target="_blank">
              <Twitter size={18} />
            </a>
            <a href="mailto:abhijit.singh.2k21@gmail.com">
              <Mail size={18} />
            </a>
          </div>
        </main>

        <div className="scroll">
          <span>SCROLL</span>
          <span className="arrow">↓</span>
        </div>

        <div className="color-hint">
          Click to explore visual variations
        </div>
      </div>

      {/* MOBILE EXPERIENCE GATE */}
      {showGate && (
        <div className="mobile-gate">
          <div className="mobile-gate-box">
            <p>
              Best experienced on a laptop
              <br />
              for richer visuals and interactions.
            </p>

            <button
              className="continue-btn"
              onClick={(e) => {
                e.stopPropagation()
                setShowGate(false)
              }}
            >
              Continue anyway <ArrowRight size={14} />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
