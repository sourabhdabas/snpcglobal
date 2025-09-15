// frontend/src/App.jsx
import React, { Suspense, useEffect, useRef } from 'react'
import * as RR from 'react-router-dom' // runtime-compatible namespace import

import Navbar from './components/Navbar'
import SpotlightStories from './components/SpotlightStories'
import Services from './components/Services'
import Projects from './components/Projects'
import Insights from './components/Insights'
import Contact from './components/Contact'
import About from './components/About'
import Footer from './components/Footer'
import WhatsAppWidget from './components/WhatsAppWidget'
import ScrollToTop from './components/ScrollToTop' // NEW

// Lazy pages/components (safe fallback if file not present)
const AvailableSpaces = React.lazy(() =>
  import('./components/AvailableSpaces').catch(() => ({ default: () => null }))
)
const Privacy = React.lazy(() =>
  import('./pages/Privacy').catch(() => ({
    default: () => (
      <div className="min-h-screen flex items-center justify-center py-24">
        <p className="text-gray-600">Privacy page not found.</p>
      </div>
    )
  }))
)
const Terms = React.lazy(() =>
  import('./pages/Terms').catch(() => ({
    default: () => (
      <div className="min-h-screen flex items-center justify-center py-24">
        <p className="text-gray-600">Terms page not found.</p>
      </div>
    )
  }))
)
// New: Sitemap lazy load
const Sitemap = React.lazy(() =>
  import('./pages/Sitemap').catch(() => ({
    default: () => (
      <div className="min-h-screen flex items-center justify-center py-24">
        <p className="text-gray-600">Sitemap page not found.</p>
      </div>
    )
  }))
)

/**
 * PageTransition
 * - Adds .page-enter and .page-enter-active classes to trigger CSS transitions.
 * - Removes them after animation completes so future mounts animate again.
 */
function PageTransition({ children }) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // ensure fresh state
    el.classList.remove('page-enter', 'page-enter-active')

    // add initial class, then trigger active class on next frame
    el.classList.add('page-enter')
    const raf = requestAnimationFrame(() => {
      el.classList.add('page-enter-active')
    })

    // cleanup after animation duration (slightly longer than CSS duration)
    const timeout = setTimeout(() => {
      el.classList.remove('page-enter', 'page-enter-active')
    }, 520)

    return () => {
      cancelAnimationFrame(raf)
      clearTimeout(timeout)
      if (el) el.classList.remove('page-enter', 'page-enter-active')
    }
  }, [])

  return (
    <div ref={ref} aria-live="polite">
      {children}
    </div>
  )
}

function MainContent() {
  return (
    <main className="flex-1">
      {/* top anchor for logo links */}
      <div id="home" />

      {/* Hero with interactive spotlight stories */}
      <section aria-label="Hero" className="bg-neutral-50 py-12 overflow-visible">
        <SpotlightStories />
      </section>

      {/* Group of Companies section (Services contains LandBank now) */}
      <section className="bg-neutral-50 py-12">
        <Services />
      </section>

      {/* Available Spaces section (lazy - will render null if file missing) */}
      <section id="available-spaces" className="bg-white py-12">
        <div className="container mx-auto px-4">
          <AvailableSpaces />
        </div>
      </section>

      {/* About section */}
      <section id="about" className="bg-white py-12">
        <About />
      </section>

      {/* Projects section */}
      <section id="projects" className="bg-neutral-50 py-12">
        <div className="container mx-auto px-4">
          <Projects />
        </div>
      </section>

      {/* Insights section */}
      <section id="insights" className="bg-white py-12">
        <div className="container mx-auto px-4">
          <Insights />
        </div>
      </section>

      {/* Contact section */}
      <section id="contact" className="bg-neutral-50 py-12">
        <div className="container mx-auto px-4">
          <Contact />
        </div>
      </section>
    </main>
  )
}

export default function App() {
  // choose a Router implementation available at runtime
  const Router = RR.BrowserRouter || RR.HashRouter || RR.MemoryRouter || RR.Router

  if (!Router) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="text-center">
          <h2 className="text-xl font-semibold">Routing library not found</h2>
          <p className="mt-2 text-sm text-gray-600">
            Please install <code>react-router-dom</code> and reload the dev server.
          </p>
        </div>
      </div>
    )
  }

  const SuspenseWrapper = ({ children }) => (
    <Suspense fallback={<div className="py-20 text-center">Loading…</div>}>{children}</Suspense>
  )

  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-white text-neutral-900">
        <Navbar />

        {/* Smoothly scroll to top on route change */}
        <ScrollToTop />

        <SuspenseWrapper>
          {RR.Routes ? (
            // react-router-dom v6+
            <RR.Routes>
              <RR.Route
                path="/privacy"
                element={
                  <PageTransition>
                    <Privacy />
                  </PageTransition>
                }
              />
              <RR.Route
                path="/terms"
                element={
                  <PageTransition>
                    <Terms />
                  </PageTransition>
                }
              />
              <RR.Route
                path="/sitemap"
                element={
                  <PageTransition>
                    <Sitemap />
                  </PageTransition>
                }
              />
              <RR.Route
                path="/*"
                element={
                  <PageTransition>
                    <MainContent />
                  </PageTransition>
                }
              />
            </RR.Routes>
          ) : (
            // react-router-dom v5 fallback
            <RR.Switch>
              <RR.Route
                path="/privacy"
                render={() => (
                  <PageTransition>
                    <Privacy />
                  </PageTransition>
                )}
              />
              <RR.Route
                path="/terms"
                render={() => (
                  <PageTransition>
                    <Terms />
                  </PageTransition>
                )}
              />
              <RR.Route
                path="/sitemap"
                render={() => (
                  <PageTransition>
                    <Sitemap />
                  </PageTransition>
                )}
              />
              <RR.Route
                path="/"
                render={() => (
                  <PageTransition>
                    <MainContent />
                  </PageTransition>
                )}
              />
            </RR.Switch>
          )}
        </SuspenseWrapper>

        <Footer />

        <WhatsAppWidget
          phone="919354009052"
          message="Hi, I want details about your services."
          showLabel={true}
          size={64}
        />
      </div>
    </Router>
  )
}
