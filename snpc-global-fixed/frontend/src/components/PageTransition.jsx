// src/components/PageTransition.jsx
import React, { useEffect, useRef } from 'react';

export default function PageTransition({ children }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // add enter class, then trigger active on next frame for transition
    el.classList.add('page-enter');
    requestAnimationFrame(() => {
      el.classList.add('page-enter-active');
      // remove classes after animation so re-mount works later
      const t = setTimeout(() => {
        el.classList.remove('page-enter', 'page-enter-active');
      }, 460);
      return () => clearTimeout(t);
    });
  }, []);

  return (
    <div ref={ref}>
      {children}
    </div>
  );
}
