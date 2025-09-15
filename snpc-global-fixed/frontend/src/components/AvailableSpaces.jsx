import React from 'react'
import AvailableBg from '../assets/available-bg.png' // 👈 your own image

const ACCENT = '#E30613'

export default function AvailableSpaces() {
  return (
    <section
      id="available-spaces"
      className="relative mt-16 py-16"
      style={{
        backgroundImage: `url(${AvailableBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      {/* Light overlay to fade background for readability */}
      <div
        className="absolute inset-0 bg-white/50 backdrop-blur-[1px]"
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10">
        <div className="text-center max-w-4xl mx-auto px-4">
          <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
            Available <span style={{ color: ACCENT }}>Spaces</span>
          </h2>
        </div>

        <div className="mt-8 max-w-3xl mx-auto px-4">
          <div
            className="group bg-white rounded-lg p-6 flex flex-col items-center justify-center text-center transition-transform duration-300 transform border cursor-default"
            style={{ borderColor: 'rgba(0,0,0,0.08)' }}
          >
            {/* Project Name */}
            <div
              className="text-lg md:text-xl font-bold mb-2"
              style={{ color: ACCENT }}
            >
              IMT Maruti Kharkhoda (Industrial)
            </div>

            {/* Count */}
            <div
              className="text-3xl md:text-4xl font-extrabold leading-none"
              style={{ color: '#111827' }}
            >
              50+
            </div>

            {/* Unit */}
            <div className="mt-1 text-sm text-gray-500">Acres</div>

            {/* Hover underline accent */}
            <div
              aria-hidden="true"
              className="mt-4 h-0.5 w-12 origin-left transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"
              style={{ backgroundColor: ACCENT }}
            />

            {/* Hover effect */}
            <style>{`
              .group:hover {
                box-shadow: 0 10px 25px rgba(2,6,23,0.08);
                transform: translateY(-6px) scale(1.01);
                background-color: rgba(227,6,19,0.03);
                border-color: ${ACCENT};
              }
            `}</style>
          </div>
        </div>
      </div>
    </section>
  )
}
