// frontend/src/pages/Sitemap.jsx
import React from 'react'
import { Link } from 'react-router-dom'

export default function Sitemap() {
  const year = new Date().getFullYear()

  return (
    <main className="min-h-screen bg-white text-gray-900">
      <div className="max-w-5xl mx-auto px-6 py-16">
        <header className="mb-10">
          <h1 className="text-4xl font-bold mb-2">Sitemap</h1>
          <p className="text-gray-600">A guide to the pages and sections on SnPC Global.</p>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl font-semibold mb-3">Top-level pages</h2>
            <ul className="space-y-2 text-base">
              <li>
                <Link to="/" className="text-[color:var(--accent-red)] hover:underline">Home</Link>
              </li>
              <li>
                <Link to="/about" className="hover:underline text-gray-700">About (full page)</Link>
              </li>
              <li>
                <Link to="/projects" className="hover:underline text-gray-700">Projects</Link>
              </li>
              <li>
                <Link to="/insights" className="hover:underline text-gray-700">Insights</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:underline text-gray-700">Contact</Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:underline text-gray-700">Privacy</Link>
              </li>
              <li>
                <Link to="/terms" className="hover:underline text-gray-700">Terms</Link>
              </li>
              <li>
                <Link to="/sitemap" className="hover:underline text-gray-700">Sitemap (this page)</Link>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3">On-page sections & anchors</h2>
            <p className="mb-2 text-gray-600">Helpful anchors that appear on the home page and other pages.</p>
            <ul className="space-y-2 text-base">
              <li><a href="/#about" className="hover:underline text-gray-700">Home → About</a></li>
              <li><a href="/#projects" className="hover:underline text-gray-700">Home → Projects</a></li>
              <li><a href="/#insights" className="hover:underline text-gray-700">Home → Insights</a></li>
              <li><a href="/#contact" className="hover:underline text-gray-700">Home → Contact</a></li>
              <li><a href="/#landbank" className="hover:underline text-gray-700">Home → LandBank</a></li>
              <li><a href="/#available-spaces" className="hover:underline text-gray-700">Home → Available Spaces</a></li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3">Services</h2>
            <ul className="space-y-2 text-base">
              <li><a href="#" className="hover:underline text-gray-700">Agricultural Land</a></li>
              <li><a href="#" className="hover:underline text-gray-700">Commercial Land</a></li>
              <li><a href="#" className="hover:underline text-gray-700">Residential Land</a></li>
              <li><a href="#" className="hover:underline text-gray-700">Land Advisory</a></li>
              <li><a href="#" className="hover:underline text-gray-700">Investment Services</a></li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3">Contact & legal</h2>
            <ul className="space-y-2 text-base">
              <li><Link to="/privacy" className="hover:underline text-gray-700">Privacy policy</Link></li>
              <li><Link to="/terms" className="hover:underline text-gray-700">Terms & conditions</Link></li>
              <li><a href="mailto:info@snpcglobal.com" className="hover:underline text-gray-700">Email: info@snpcglobal.com</a></li>
              <li><a href="tel:+919717069491" className="hover:underline text-gray-700">Phone: +91-9717069491</a></li>
            </ul>
          </div>
        </section>

        <hr className="my-10 border-gray-200" />

        <section>
          <h3 className="text-lg font-semibold mb-3">Notes</h3>
          <p className="text-sm text-gray-600">
            This sitemap is intended as a human-friendly index of the primary pages and
            in-page anchors for the SnPC Global site. If you add new top-level pages or
            major sections, add them here so visitors (and search engines) can find them quickly.
          </p>
        </section>

        <footer className="mt-12 text-sm text-gray-500">
          <p>© {year} SnPC Global — All rights reserved.</p>
        </footer>
      </div>
    </main>
  )
}
