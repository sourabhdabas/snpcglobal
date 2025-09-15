// frontend/src/components/About.jsx
import React from 'react'
import aboutImg from '../assets/about.jpg' // save your image as frontend/src/assets/about.jpg

export default function About() {
  return (
    <section
      id="about"
      className="relative bg-gradient-to-r from-gray-50 via-white to-gray-100 py-16"
    >
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-10 text-gray-900 text-center">
          About us
        </h2>

        {/* Card-like wrapper */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center bg-white rounded-2xl shadow-xl p-8 md:p-12">
          {/* Text content */}
          <div className="space-y-6 text-gray-700 leading-relaxed">
            <p>
              We are a leading real estate services company with a global presence,
              specializing in providing comprehensive solutions for land acquisition,
              development, and management. Our mission is to partner with our clients
              to unlock the full potential of their real estate portfolios.
            </p>
            <p>
              With deep market insights and a client-first approach, our team of
              experts offers unparalleled guidance across various sectors, including
              agricultural, residential, commercial, and industrial land. We believe
              that every piece of land has a unique story and potential, and we are
              here to help you discover and leverage it.
            </p>
            <p>
              Our commitment to excellence, integrity, and innovation drives us to
              deliver strategic, data-driven solutions that create lasting value for
              our clients and the communities we serve.
            </p>
          </div>

          {/* Image */}
          <div className="w-full">
            <img
              src={aboutImg}
              alt="About SnPC Global"
              className="rounded-xl shadow-lg object-cover w-full h-80 md:h-[28rem] border border-gray-200"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
