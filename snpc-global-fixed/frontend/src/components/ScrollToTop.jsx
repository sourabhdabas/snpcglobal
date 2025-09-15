// frontend/src/components/ScrollToTop.jsx
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * ScrollToTop
 * - Smoothly scrolls the window to top when the pathname changes.
 * - Uses react-router-dom's useLocation hook (v5.1+/v6).
 */
export default function ScrollToTop() {
  const location = useLocation()

  useEffect(() => {
    try {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch (e) {
      // fallback
      window.scrollTo(0, 0)
    }
  }, [location.pathname])

  return null
}
