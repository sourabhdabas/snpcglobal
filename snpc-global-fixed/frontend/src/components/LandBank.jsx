// frontend/src/components/LandBank.jsx
import React from 'react'

/**
 * LandBank (refined with JLL colors)
 * - "spaces" in red + bold
 * - Category labels always red, bigger in size
 * - Counts remain bold and dark
 */

const TILE = [
  { id: 'commercial', label: 'Commercial', count: '30+' },
  { id: 'agricultural', label: 'Agricultural', count: '50+' },
  { id: 'residential', label: 'Residential', count: '100+' }
]

// JLL brand red
const ACCENT = '#E30613'

export default function LandBank() {
  return (
    <section id="landbank" className="mt-12">
      <div className="text-center max-w-4xl mx-auto px-4">
        <p className="text-xl md:text-2xl text-gray-800">
          We provide <span style={{ color: ACCENT }} className="font-bold">spaces</span>
        </p>
      </div>

      <div className="mt-8 max-w-5xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {TILE.map((t) => (
            <div
              key={t.id}
              role="figure"
              aria-label={`${t.label} ${t.count}`}
              className="group cursor-default bg-white rounded-lg p-6 flex flex-col items-center justify-center text-center transition-transform duration-300 transform"
              style={{
                border: '1px solid rgba(0,0,0,0.04)'
              }}
            >
              {/* Category label — always red */}
              <div
                className="text-lg md:text-xl font-bold mb-2"
                style={{ color: ACCENT }}
              >
                {t.label}
              </div>

              {/* Count */}
              <div
                className="text-3xl md:text-4xl font-extrabold leading-none"
                style={{ color: '#111827' }}
              >
                {t.count}
              </div>

              {/* Unit */}
              <div className="mt-1 text-sm text-gray-500">Acres</div>

              {/* Hover underline accent */}
              <div
                aria-hidden="true"
                className="mt-4 h-0.5 w-12 origin-left transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"
                style={{ backgroundColor: ACCENT }}
              />

              {/* Hover style definitions */}
              <style>{`
                .group:hover {
                  box-shadow: 0 10px 25px rgba(2,6,23,0.08);
                  transform: translateY(-6px) scale(1.01);
                  background-color: rgba(227,6,19,0.03);
                }
                .group:focus-within, .group:focus {
                  outline: 3px solid rgba(227,6,19,0.12);
                  outline-offset: 2px;
                }
              `}</style>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
