import { useEffect, useRef, useState } from "react"
import "./App.css"
import { Github, Linkedin, Twitter, Mail, ArrowRight } from "lucide-react"

export default function App() {
  const canvasRef = useRef(null)
  const appRef = useRef(null)
  const [showMobileGate, setShowMobileGate] = useState(false)

  const randomColors = (count) =>
    new Array(count).fill(0).map(
      () =>
        "#" +
        Math.floor(Math.random() * 16777215)
          .toString(16)
          .padStart(6, "0")
    )

  useEffect(() => {
    const isTouchDevice =
      "ontouchstart" in window || navigator.maxTouchPoints > 0

    const isMobileUA = /Android|iPhone|iPad|iPod/i.test(
      navigator.userAgent
    )

    const isMobile = isTouchDevice && isMobileUA

    if (isMobile) {
      setShowMobileGate(true)
      return
    }

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
          <span className="logo">ABHIJIT SINGH</span>
          <div className="nav-links">
            <a>About</a>
            <a>Work</a>
            <a>Contact</a>
          </div>
        </nav>

        <main className="hero">
          <span className="role">FULL-STACK DEVELOPER</span>

          <h1>
            I craft digital <br />
            experiences that blend <br />
            design with code.
          </h1>

          <p>
            Building polished software and web experiences. Experimenting with
            magical details in user interfaces. Currently available for freelance
            projects.
          </p>

          <div className="socials">
            <a><Github size={18} /></a>
            <a><Linkedin size={18} /></a>
            <a><Twitter size={18} /></a>
            <a><Mail size={18} /></a>
          </div>
        </main>

        <div className="scroll">
          <span>SCROLL</span>
          <span className="arrow">↓</span>
        </div>

        <div className="color-hint">
          Click anywhere to change colors
        </div>
      </div>

      {/* MOBILE POPUP */}
      {showMobileGate && (
        <div className="mobile-gate">
          <div className="mobile-gate-box">
            <p>
              Best experienced on a laptop<br />
              for richer visuals and interactions.
            </p>

            <button
              className="continue-btn"
              onClick={(e) => {
                e.stopPropagation()
                setShowMobileGate(false)
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
