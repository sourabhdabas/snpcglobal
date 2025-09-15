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

export default function Terms() {
  return (
    <div className="min-h-screen bg-white text-neutral-900 py-16">
      <div className="max-w-4xl mx-auto px-6">

        {/* Page header */}
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-2 heading-underline animate">
            Terms &amp; Conditions
          </h1>
          <p className="text-sm text-gray-600">
            Last updated: <strong>September 2025</strong>
          </p>
        </header>

        {/* Intro card */}
        <div className="mb-8 bg-gray-50 border border-gray-100 rounded-lg p-6 shadow-sm">
          <p className="text-lg text-gray-800 leading-relaxed">
            Welcome to <strong>SnPC Global</strong>. These Terms &amp; Conditions govern your use of our website and services.
          </p>
        </div>

        {/* Main content */}
        <section className="prose prose-lg max-w-none text-gray-700">
          <h2 className="text-xl font-semibold mt-2">Use of Website</h2>
          <p>
            You agree to use our website lawfully and not to engage in activities that harm the
            site or its users.
          </p>

          <h2 className="text-xl font-semibold mt-6">Intellectual Property</h2>
          <p>
            All content on this website is the property of SnPC Global and protected by copyright.
            You may not reproduce or distribute content without permission.
          </p>

          <h2 className="text-xl font-semibold mt-6">Services Disclaimer</h2>
          <p>
            While we strive for accuracy, we do not guarantee completeness or suitability for
            investment decisions. Consult independent advisors before making land or investment
            choices.
          </p>

          <h2 className="text-xl font-semibold mt-6">Limitation of Liability</h2>
          <p>
            SnPC Global is not liable for direct or indirect damages arising from use of the
            website.
          </p>

          <h2 className="text-xl font-semibold mt-6">Governing Law</h2>
          <p>
            These terms are governed by the laws of India and disputes are subject to courts in
            Haryana, India.
          </p>

          <h2 className="text-xl font-semibold mt-6">Contact</h2>
          <p>
            For questions about these Terms, contact{' '}
            <a
              href="mailto:info@snpcglobal.com"
              className="text-[color:var(--jll-accent)] hover:underline"
            >
              info@snpcglobal.com
            </a>.
          </p>
        </section>

        {/* Footer CTA */}
        <div className="mt-10 border-t pt-6">
          <p className="text-sm text-gray-600">
            See our{' '}
            <RouterLink
              to="/privacy"
              className="text-[color:var(--jll-accent)] hover:underline"
            >
              Privacy Policy
            </RouterLink>{' '}
            for details on how we process data.
          </p>
        </div>
      </div>
    </div>
  )
}
