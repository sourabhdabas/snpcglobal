// frontend/src/components/WhatsAppWidget.jsx
import React, { useEffect, useRef } from 'react';

export default function WhatsAppWidget({
  phone = '919354009052', // default: 91 + 8826423668
  message = '',
  showLabel = true,
  size = 96,
  imageUrl = 'https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg'
}) {
  const bubbleRef = useRef(null);

  // ensure phone contains only digits (wa.me requires digits only)
  const normalizedPhone = String(phone).replace(/\D/g, '');
  const encoded = message ? `?text=${encodeURIComponent(message)}` : '';
  const url = `https://wa.me/${normalizedPhone}${encoded}`;

  useEffect(() => {
    const el = bubbleRef.current;
    if (!el) return;

    // entrance animation class (CSS expected to handle this)
    el.classList.add('whatsapp-entrance');
    const t = setTimeout(() => {
      if (el && el.classList) el.classList.remove('whatsapp-entrance');
    }, 900);

    return () => clearTimeout(t);
  }, []);

  // style object: set CSS variable after creating the object to avoid parser edge-cases
  const styleVars = {
    backgroundImage: `url(${imageUrl})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  };
  styleVars['--whatsapp-size'] = `${size}px`;

  return (
    <div className="whatsapp-widget-wrapper">
      {showLabel && (
        <a
          className="whatsapp-widget-label"
          href={url}
          target="_blank"
          rel="noopener noreferrer"
        >
          <span>Chat on WhatsApp</span>
        </a>
      )}

      {/* bubble uses backgroundImage (no inner SVG so the image shows) */}
      <a
        ref={bubbleRef}
        className="whatsapp-widget-bubble whatsapp-beacon"
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        style={styleVars}
        tabIndex={0}
      ></a>
    </div>
  );
}
