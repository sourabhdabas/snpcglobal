// frontend/src/components/SpotlightStories.jsx
import React, { useState, useEffect, useRef } from "react";

// Imported images using relative path (.. -> frontend/src/components -> ../assets)
import heroImg from "../assets/hero.jpg";
import heroJind from "../assets/hero-jind.png";
import heroRohtak from "../assets/hero-rohtak.jpg";
import heroPipli from "../assets/hero-pipli.jpg";
import heroSector6 from "../assets/hero-sector6.jpg";
import heroKharkhoda from "../assets/hero-kharkhoda.jpg";

const DEFAULT_HERO = {
  id: "default",
  title: "Your Next-Gen Land Bank Partner in India",
  meta: "",
  image: heroImg,
  caption:
    "Comprehensive land acquisition, portfolio advisory and strategic development services to help investors and developers unlock value across India.",
  ctaPrimary: { text: "Read more", href: "#projects" },
  ctaSecondary: { text: "Contact us", href: "#contact" },
};

const ITEMS = [
  {
    id: "jind",
    title: "Jind",
    meta: "50+ Acres",
    image: heroJind,
    caption:
      "Large land parcels across Jind suitable for industrial & logistics development.",
  },
  {
    id: "rohtak",
    title: "Rohtak",
    meta: "50+ Acres",
    image: heroRohtak,
    caption:
      "Strategic plots in Rohtak with quick highway access and approvals.",
  },
  {
    id: "pipli",
    title: "Pipli",
    meta: "26+ Acres",
    image: heroPipli,
    caption:
      "Pipli land bank with strong growth potential for residential and mixed-use projects.",
  },
  {
    id: "sector6",
    title: "Sector 6",
    meta: "100+ Acres",
    image: heroSector6,
    caption: "Sector 6 — high-density plots for large-scale development.",
  },
  {
    id: "kharkhoda",
    title: "Kharkhoda",
    meta: "16+ Acres",
    image: heroKharkhoda,
    caption:
      "Kharkhoda (Sector 10A) — targeted land available for industrial corridors.",
  },
];

const ACCENT = "#E30613";
const ACTIVE_BG = "#0b0b0b";

export default function SpotlightStories() {
  const [active, setActive] = useState(DEFAULT_HERO);
  const [prevImage, setPrevImage] = useState(null);
  const [activeImage, setActiveImage] = useState(DEFAULT_HERO.image);
  const fadeTimeoutRef = useRef(null);
  const scrollerRef = useRef(null);

  useEffect(() => {
    if (!active || !active.image) return;
    setPrevImage(activeImage);
    setActiveImage(active.image);
    if (fadeTimeoutRef.current) clearTimeout(fadeTimeoutRef.current);
    fadeTimeoutRef.current = setTimeout(() => setPrevImage(null), 700);
    return () => fadeTimeoutRef.current && clearTimeout(fadeTimeoutRef.current);
  }, [active]);

  const handleSelect = (item) => {
    setActive({
      ...item,
      ctaPrimary: { text: "Read more", href: "#projects" },
      ctaSecondary: { text: "Contact us", href: "#contact" },
    });

    // Horizontal-only scroll for mobile
    if (scrollerRef.current) {
      const el = scrollerRef.current.querySelector(`[data-id="${item.id}"]`);
      if (el) {
        scrollerRef.current.scrollLeft =
          el.offsetLeft -
          scrollerRef.current.offsetLeft -
          scrollerRef.current.clientWidth / 2 +
          el.clientWidth / 2;
      }
    }
  };

  const restoreDefault = () => setActive(DEFAULT_HERO);

  // Mobile-only auto-slide horizontal
  useEffect(() => {
    if (window.innerWidth >= 768) return;

    const interval = setInterval(() => {
      if (!scrollerRef.current) return;
      const children = Array.from(scrollerRef.current.children);
      const currentIndex = children.findIndex(
        (el) => el.getAttribute("data-id") === active.id
      );
      const nextIndex = (currentIndex + 1) % children.length;
      handleSelect(ITEMS[nextIndex]);
    }, 4000);

    return () => clearInterval(interval);
  }, [active]);

  return (
    <section className="relative overflow-hidden">
      {/* HERO */}
      <div className="w-full h-[320px] sm:h-[420px] md:h-[560px] lg:h-[680px] relative overflow-hidden">
        {prevImage && (
          <div
            className="absolute inset-0 bg-cover bg-center transition-opacity duration-700 ease-in-out"
            style={{
              backgroundImage: `url(${prevImage})`,
              filter: "brightness(0.86)",
            }}
            aria-hidden
          />
        )}
        <div
          className="absolute inset-0 bg-cover bg-center transition-opacity duration-700 ease-in-out"
          style={{
            backgroundImage: `url(${activeImage})`,
            filter: "brightness(0.86)",
          }}
          aria-hidden
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white/95 sm:from-white/90 md:from-white/90 via-white/60 to-transparent pointer-events-none" />
        <div className="absolute left-4 sm:left-6 md:left-12 lg:left-16 top-1/2 -translate-y-1/2 max-w-full md:max-w-2xl z-40 px-2">
          <h2 className="font-serif text-xl sm:text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-semibold text-neutral-900 leading-tight">
            {active.title}
          </h2>
          {active.meta && (
            <div className="mt-1 text-xs sm:text-sm text-gray-600">
              {active.meta}
            </div>
          )}
          {active.caption && (
            <p className="mt-3 text-sm sm:text-base md:text-lg text-gray-700 max-w-xl">
              {active.caption}
            </p>
          )}
          <div className="mt-4 flex items-center gap-2 sm:gap-3">
            {active.ctaPrimary && (
              <a
                href={active.ctaPrimary.href}
                className="inline-flex items-center px-4 sm:px-5 py-2 sm:py-3 rounded-md bg-[color:var(--accent-red)] text-white font-medium shadow-sm hover:opacity-95 text-sm sm:text-base"
              >
                {active.ctaPrimary.text}
              </a>
            )}
            {active.ctaSecondary && (
              <a
                href={active.ctaSecondary.href}
                className="spotlight-cta inline-flex items-center px-3 sm:px-4 py-2 sm:py-3 rounded-md border border-gray-200 text-gray-700 font-medium hover:bg-gray-50 text-sm sm:text-base"
              >
                {active.ctaSecondary.text}
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Spotlight card */}
      <div className="w-full px-0 sm:px-4">
        <div className="relative -mt-10 sm:-mt-12 md:-mt-14 lg:-mt-18">
          <div
            className="bg-white rounded-lg shadow-lg flex items-center gap-3 p-2 sm:p-3 md:p-4 border-2 box-border"
            style={{ borderColor: "var(--accent-red)" }}
          >
            <div className="flex-shrink-0 pl-1 pr-2">
              {active.id !== DEFAULT_HERO.id ? (
                <button
                  onClick={restoreDefault}
                  className="flex items-center gap-1 text-sm font-semibold text-[color:var(--accent-red)] hover:underline"
                >
                  Back
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              ) : (
                <div className="text-sm font-semibold text-[color:var(--accent-red)]">
                  SnPC Global spotlight
                </div>
              )}
            </div>

            {/* Items */}
            <div className="flex-1 min-w-0">
              {/* Mobile scroll */}
              <div
                ref={scrollerRef}
                role="tablist"
                aria-label="Spotlight stories"
                className="md:hidden flex flex-row gap-3 overflow-x-auto snap-x snap-mandatory touch-pan-x pb-2 -mx-4 px-4 pr-6 scroll-smooth"
                style={{ WebkitOverflowScrolling: "touch" }}
              >
                {ITEMS.map((it) => {
                  const isActive = it.id === active.id;
                  return (
                    <button
                      key={it.id}
                      data-id={it.id}
                      role="tab"
                      aria-selected={isActive}
                      onClick={() => handleSelect(it)}
                      className={`snap-start flex-none min-w-[140px] sm:min-w-[160px] box-border flex flex-col justify-center items-start rounded-lg p-3 border transition-all duration-300 ease-in-out focus:outline-none spotlight-item ${
                        isActive
                          ? "spotlight-active text-white"
                          : "bg-white text-neutral-900"
                      }`}
                      style={{
                        borderColor: isActive ? ACCENT : "rgba(0,0,0,0.08)",
                      }}
                    >
                      <div className="spotlight-title text-sm sm:text-base font-bold leading-tight whitespace-nowrap overflow-hidden text-ellipsis">
                        {it.title}
                      </div>
                      <div
                        className={`meta mt-1 text-xs sm:text-sm ${
                          isActive ? "text-white/80" : "text-gray-500"
                        }`}
                      >
                        {it.meta}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Desktop grid (unchanged) */}
              <div className="hidden md:grid grid-cols-5 gap-3">
                {ITEMS.map((it) => {
                  const isActive = it.id === active.id;
                  return (
                    <button
                      key={it.id}
                      role="tab"
                      aria-selected={isActive}
                      onClick={() => handleSelect(it)}
                      className={`flex flex-col justify-center items-center h-20 md:h-24 lg:h-28 text-center rounded-lg border transition-all duration-300 ease-in-out focus:outline-none spotlight-item ${
                        isActive
                          ? "spotlight-active text-white"
                          : "bg-white text-neutral-900"
                      }`}
                      style={{
                        borderColor: isActive ? ACCENT : "rgba(0,0,0,0.08)",
                      }}
                    >
                      <div className="spotlight-title text-sm md:text-base font-bold leading-tight whitespace-nowrap overflow-hidden text-ellipsis">
                        {it.title}
                      </div>
                      <div
                        className={`meta mt-1 text-xs md:text-sm ${
                          isActive ? "text-white/80" : "text-gray-500"
                        }`}
                      >
                        {it.meta}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Inline CSS */}
      <style>{`
        :root { --jll-accent: ${ACCENT}; --accent-red: ${ACCENT}; --spot-active-bg: ${ACTIVE_BG}; }
        .spotlight-item { border-width: 1px; border-style: solid; border-color: rgba(0,0,0,0.08); background-clip: padding-box; transition: transform .28s cubic-bezier(.2,.9,.2,1), box-shadow .28s ease, background-color .28s ease, color .2s ease, border-color .28s ease; }
        .spotlight-item:hover, .spotlight-item:focus { transform: translateY(-6px); box-shadow: 0 14px 30px rgba(2,6,23,0.08); border-color: var(--jll-accent); background-color: rgba(227,6,19,0.03); }
        .spotlight-item:focus-visible { outline: none; box-shadow: 0 6px 18px rgba(2,6,23,0.08), 0 0 0 4px rgba(227,6,19,0.08); border-color: var(--jll-accent); }
        .spotlight-title { letter-spacing: 0.2px; font-variant: all-small-caps; }
        .meta { transition: color .25s ease, background-color .25s ease; }
        .spotlight-active { background: linear-gradient(180deg, var(--spot-active-bg), #060606 90%); color: #fff !important; box-shadow: 0 20px 40px rgba(2,6,23,0.16), inset 0 -6px 18px rgba(255,255,255,0.02); border-color: var(--accent-red) !important; position: relative; transform: translateY(-4px); }
        .spotlight-active::after { content: ''; position: absolute; inset: -6px; border-radius: 0.6rem; background: linear-gradient(90deg, rgba(227,6,19,0.04), rgba(227,6,19,0.02)); pointer-events: none; }
        .spotlight-active .meta, .spotlight-active .text-white\\/80 { color: rgba(255,255,255,0.85) !important; }
        .spotlight-active:hover { background: linear-gradient(180deg, var(--spot-active-bg), #060606 85%); }
        @media (max-width: 480px) { .spotlight-item { padding: 0.6rem; min-width: 130px; border-radius: 0.6rem; } .spotlight-title { font-size: 0.95rem; } }
        @media (min-width: 768px) { .meta { font-weight: 500; } }
      `}</style>
    </section>
  );
}