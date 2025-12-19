import { useEffect, useRef, useState } from "react"
import "./index.css"
import { Github, Linkedin, Twitter, Mail, ArrowRight } from "lucide-react"

export default function App() {
  const canvasRef = useRef(null)
  const appRef = useRef(null)
  const [dismissGate, setDismissGate] = useState(false)

  const randomColors = (count) =>
    new Array(count).fill(0).map(
      () =>
        "#" +
        Math.floor(Math.random() * 16777215)
          .toString(16)
          .padStart(6, "0")
    )

  useEffect(() => {
    const timer = setTimeout(() => {
      import(
        "https://cdn.jsdelivr.net/npm/threejs-components@0.0.19/build/cursors/tubes1.min.js"
      ).then((module) => {
        const Tubes = module.default
        if (canvasRef.current) {
          appRef.current = Tubes(canvasRef.current, {
            tubes: {
              colors: ["#5e72e4", "#8965e0", "#f5365c"],
              lights: {
                intensity: 200,
                colors: ["#21d4fd", "#b721ff", "#f4d03f", "#11cdef"],
              },
            },
          })
        }
      })
    }, 100)

    return () => {
      clearTimeout(timer)
      appRef.current?.dispose?.()
    }
  }, [])

  const handleClick = () => {
    if (!appRef.current) return
    appRef.current.tubes.setColors(randomColors(3))
    appRef.current.tubes.setLightsColors(randomColors(4))
  }

  return (
    <div className="app" onClick={handleClick}>
      <canvas ref={canvasRef} className="tubes-canvas" />

      {/* MAIN UI */}
      <div className="ui">
        <nav className="nav">
          <span className="logo">ABHIJIT</span>
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
            I’m Abhijit
          </h1>

          <p>
            I love turning messy ideas into clean, simple experiences that just
            make sense. Inspired by how people interact with everyday things,
            I look for small clues that solve bigger usability problems.
            <br />
            <br />
            Open to freelance projects and internships.
          </p>

          <div className="socials">
            <a href="https://github.com/abhijitsingh003"><Github size={18} /></a>
            <a href="https://www.linkedin.com/in/abhijitsingh003"><Linkedin size={18} /></a>
            <a href="https://twitter.com/"><Twitter size={18} /></a>
            <a href="mailto:abhijit.singh.2k21@gmail.com"><Mail size={18} /></a>
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
      {!dismissGate && (
        <div className="mobile-gate">
          <div className="mobile-gate-box">
            <p>
              This experience isn’t fully optimized for mobile yet.
              <br />
              For the best visuals and interactions,
              try viewing it on a laptop or larger screen.
            </p>

            <button
              className="continue-btn"
              onClick={(e) => {
                e.stopPropagation()
                setDismissGate(true)
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
