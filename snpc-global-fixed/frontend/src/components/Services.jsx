// frontend/src/components/Services.jsx
import React from 'react'
import LandBank from './LandBank'

/**
 * Services Component
 * - Companies list removed
 * - Only LandBank section remains
 */

export default function Services() {
  return (
    <div className="container mx-auto px-4 py-0">
      {/* Land bank section only */}
      <LandBank />
    </div>
  )
}
