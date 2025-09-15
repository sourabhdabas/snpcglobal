import React from 'react'

// safe Link helper: uses react-router-dom Link when available, otherwise uses anchor <a>
let LinkComponent = null
try {
  // eslint-disable-next-line global-require
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

export default function Privacy() {
  return (
    <div className="min-h-screen bg-white text-neutral-900 py-16">
      <div className="max-w-4xl mx-auto px-6">

        {/* Page header */}
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-2 heading-underline animate">
            Privacy Policy
          </h1>
          <p className="text-sm text-gray-600">
            Last updated: <strong>September 2025</strong>
          </p>
        </header>

        {/* Intro / summary card */}
        <div className="mb-8 bg-gray-50 border border-gray-100 rounded-lg p-6 shadow-sm">
          <p className="text-lg text-gray-800 leading-relaxed">
            At <strong>SnPC Global</strong>, your privacy matters. This page explains what information we collect,
            how we use it, and the controls you have over your data.
          </p>
        </div>

        {/* Content */}
        <section className="prose prose-lg max-w-none text-gray-700">
          <h2 className="text-xl font-semibold mt-2">Information We Collect</h2>
          <ul>
            <li><strong>Personal information:</strong> name, email, phone, company details when you contact or subscribe.</li>
            <li><strong>Usage data:</strong> IP address, browser type, pages visited and interaction data for analytics.</li>
            <li><strong>Cookies:</strong> small files used to remember preferences and improve your experience.</li>
          </ul>

          <h2 className="text-xl font-semibold mt-6">How We Use Your Information</h2>
          <p>
            We use data to respond to inquiries, deliver services, send relevant updates (with consent),
            and improve our site.
          </p>

          <h2 className="text-xl font-semibold mt-6">Data Sharing & Security</h2>
          <p>
            We do not sell your personal data. We share information only with trusted service providers or
            when required by law. We use industry-standard safeguards to protect your data.
          </p>

          <h2 className="text-xl font-semibold mt-6">Your Rights</h2>
          <p>
            You may be able to access, update, or delete your personal data. To exercise your rights, email{' '}
            <a
              href="mailto:info@snpcglobal.com"
              className="text-[color:var(--jll-accent)] hover:underline"
            >
              info@snpcglobal.com
            </a>.
          </p>

          <h2 className="text-xl font-semibold mt-6">Cookies</h2>
          <p>
            We use cookies for analytics and functionality. You can control cookies via your browser settings.
          </p>

          <h2 className="text-xl font-semibold mt-6">Contact</h2>
          <p>
            Questions about privacy? Contact us at{' '}
            <a
              href="mailto:info@snpcglobal.com"
              className="text-[color:var(--jll-accent)] hover:underline"
            >
              info@snpcglobal.com
            </a>{' '}
            or call{' '}
            <a
              href="tel:+918826423668"
              className="text-[color:var(--jll-accent)] hover:underline"
            >
              +91-8826423668
            </a>.
          </p>
        </section>

        {/* Footer CTA */}
        <div className="mt-10 border-t pt-6">
          <p className="text-sm text-gray-600">
            For other legal information see{' '}
            <RouterLink
              to="/terms"
              className="text-[color:var(--jll-accent)] hover:underline"
            >
              Terms &amp; Conditions
            </RouterLink>.
          </p>
        </div>
      </div>
    </div>
  )
}
