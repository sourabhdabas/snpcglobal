import React, { useState } from 'react'
import logo from '../assets/logo.jpg'

// Try to import Link from react-router-dom, but fallback to a no-op component that renders an <a>
let LinkComponent = null
try {
  // eslint-disable-next-line no-eval
  LinkComponent = require('react-router-dom').Link
} catch (e) {
  LinkComponent = null
}

function RouterLink({ to, children, className, ...rest }) {
  if (LinkComponent) {
    return (
      <LinkComponent to={to} className={className} {...rest}>
        {children}
      </LinkComponent>
    )
  }
  return (
    <a href={to} className={className} {...rest}>
      {children}
    </a>
  )
}

export default function Footer() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e) => {
    e.preventDefault()
    if (!email) return
    console.log('Subscribe:', email)
    setSubscribed(true)
    setEmail('')
  }

  return (
    <footer className="bg-neutral-900 text-gray-200 mt-20">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand & short pitch */}
          <div className="md:col-span-1">
            <RouterLink to="/" className="flex items-center gap-3 mb-4">
              <img
                src={logo}
                alt="SnPC Global"
                className="h-10 w-auto"
              />
              <span className="text-xl font-semibold text-white hover:text-[color:var(--accent-red)] transition-colors duration-200">
                SnPC Global
              </span>
            </RouterLink>
            <p className="text-sm text-gray-400 leading-relaxed">
              We identify, acquire, and manage high-potential land assets — from agricultural
              farms to commercial and residential plots. Trusted processes, clear paperwork,
              and long-term value.
            </p>

            {/* Social icons (LinkedIn, YouTube, Facebook, Instagram) */}
            <div className="mt-6 flex items-center gap-3">
              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/in/vilas-chhikara/"
                aria-label="LinkedIn"
                title="LinkedIn"
                className="p-2 rounded-full bg-gray-800 hover:bg-gray-700"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M4.98 3.5A2.5 2.5 0 1 0 5 8.5 2.5 2.5 0 0 0 4.98 3.5zM3 9h4v12H3zM9 9h3.6v1.7h.1c.5-.9 1.7-1.8 3.4-1.8 3.6 0 4.3 2.4 4.3 5.5V21h-4v-5.3c0-1.3 0-3-1.8-3-1.8 0-2.1 1.4-2.1 2.9V21H9z"/>
                </svg>
              </a>

              {/* YouTube */}
              <a
                href="https://www.youtube.com/@Snpcclaybrickmachine"
                aria-label="YouTube"
                title="YouTube"
                className="p-2 rounded-full bg-gray-800 hover:bg-gray-700"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.8 3.5 12 3.5 12 3.5s-7.8 0-9.4.6A3 3 0 0 0 .5 6.2 31.2 31.2 0 0 0 0 12a31.2 31.2 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.6.6 9.4.6 9.4.6s7.8 0 9.4-.6a3 3 0 0 0 2.1-2.1A31.2 31.2 0 0 0 24 12a31.2 31.2 0 0 0-.5-5.8zM9.8 15.6V8.4L15.8 12l-6 3.6z"/>
                </svg>
              </a>

              {/* Facebook */}
              <a
                href="https://www.facebook.com/snpcmachines/"
                aria-label="Facebook"
                title="Facebook"
                className="p-2 rounded-full bg-gray-800 hover:bg-gray-700"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M22 12a10 10 0 1 0-11.5 9.9V14.9h-2.1v-2.9h2.1V9.8c0-2.1 1.2-3.3 3-3.3.9 0 1.8.1 1.8.1v2h-1c-1 0-1.3.6-1.3 1.2v1.5h2.3l-.4 2.9h-1.9v7A10 10 0 0 0 22 12z"/>
                </svg>
              </a>

              {/* Instagram */}
              <a
                href="https://www.instagram.com/snpc_machines?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                aria-label="Instagram"
                title="Instagram"
                className="p-2 rounded-full bg-gray-800 hover:bg-gray-700"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm5 6.2A4.8 4.8 0 1 0 16.8 13 4.8 4.8 0 0 0 12 8.2zM19.5 6.1a1.1 1.1 0 1 0 1.1 1.1 1.1 1.1 0 0 0-1.1-1.1z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick links</h4>
            <ul className="space-y-3 text-sm text-gray-300">
              <li><a href="#projects" className="hover:underline">Projects</a></li>
              <li><a href="#insights" className="hover:underline">Insights</a></li>
              <li><a href="#about" className="hover:underline">About us</a></li>
              <li><a href="#contact" className="hover:underline">Contact</a></li>
              <li><a href="#" className="hover:underline">Careers</a></li>
            </ul>
          </div>

          {/* Services / sectors */}
          <div>
            <h4 className="text-white font-semibold mb-4">Sectors</h4>
            <ul className="space-y-3 text-sm text-gray-300">
              <li><a href="#" className="hover:underline">Agricultural Land</a></li>
              <li><a href="#" className="hover:underline">Commercial Land</a></li>
              <li><a href="#" className="hover:underline">Residential Land</a></li>
              <li><a href="#" className="hover:underline">Land Advisory</a></li>
              <li><a href="#" className="hover:underline">Investment Services</a></li>
            </ul>
          </div>

          {/* Contact & newsletter */}
          <div>
            <h4 className="text-white font-semibold mb-4">Contact</h4>

            <address className="not-italic text-sm text-gray-300 leading-relaxed">
              SnPC Global<br />
              Vill. Barona, Kharkhoda<br />
              Sonipat, Haryana - 131402<br />
              <a href="tel:+919354009052" className="block mt-2 text-[color:var(--accent-red)] hover:underline">+91-9354009052</a>
              <a href="mailto:info@snpcglobal.com" className="block text-gray-300 hover:underline">info@snpcglobal.com</a>
            </address>

            <form onSubmit={handleSubscribe} className="mt-6">
              <label htmlFor="footer-email" className="sr-only">Email for updates</label>
              <div className="flex gap-2">
                <input
                  id="footer-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email"
                  className="w-full px-3 py-2 rounded-md bg-gray-800 border border-gray-700 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-[color:var(--accent-red)]"
                />
                <button
                  type="submit"
                  className="inline-flex items-center px-4 py-2 rounded-md bg-[color:var(--accent-red)] text-white text-sm font-medium hover:opacity-95"
                >
                  {subscribed ? 'Subscribed' : 'Subscribe'}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 mt-10 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 pr-20">
            <p className="text-sm text-gray-400">
              © {new Date().getFullYear()} SnPC Global. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <RouterLink to="/privacy" className="text-sm text-gray-400 hover:underline">Privacy</RouterLink>
              <RouterLink to="/terms" className="text-sm text-gray-400 hover:underline">Terms</RouterLink>
              <RouterLink to="/sitemap" className="text-sm text-gray-400 hover:underline">Sitemap</RouterLink>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
