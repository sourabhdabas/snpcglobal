import React, { useState, useEffect } from "react";
import Logo from "../assets/logo.jpg";
import IndiaFlag from "../assets/india-flag.png";

export default function Navbar() {
  const [activeId, setActiveId] = useState("home");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);

  // Track window width for desktop/mobile detection
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Track section for active nav link
  useEffect(() => {
    const sections = document.querySelectorAll("section[id], div[id]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { threshold: 0.6 }
    );
    sections.forEach((sec) => observer.observe(sec));
    return () => sections.forEach((sec) => observer.unobserve(sec));
  }, []);

  // Show navbar on desktop when mouse is near top
  useEffect(() => {
    if (!isDesktop) return;
    const handleMouseMove = (e) => {
      if (e.clientY <= 50) setShowNavbar(true);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isDesktop]);

  // Show/hide navbar on scroll
  useEffect(() => {
    let lastScroll = window.scrollY;
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      if (currentScroll < lastScroll || currentScroll === 0) {
        setShowNavbar(true);
      } else {
        setShowNavbar(false);
      }
      lastScroll = currentScroll;
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "projects", label: "Projects" },
    { id: "insights", label: "Insights" },
  ];

  const scrollToId = (id) => (e) => {
    if (e?.preventDefault) e.preventDefault();
    if (!id) return window.scrollTo({ top: 0, behavior: "smooth" });
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    else window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNavClick = (id) => (e) => {
    scrollToId(id)(e);
    if (mobileOpen) setMobileOpen(false);
  };

  return (
    <header
      className={`bg-white shadow-sm site-navbar fixed w-full z-50 transform transition-all duration-700 ease-in-out ${
        showNavbar ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
      }`}
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between animate-fade-in">
        {/* Left: Logo + Brand */}
        <div className="flex items-center">
          <a
            href="#home"
            onClick={handleNavClick("home")}
            className="flex-shrink-0 outline-none focus:outline-none"
            aria-label="Go to Home"
          >
            <img
              src={Logo}
              alt="SnPC Global"
              className="w-32 h-32 object-contain transition-transform duration-500 hover:scale-105"
            />
          </a>
          <div className="ml-5 flex flex-col justify-center">
            <a
              href="#home"
              onClick={handleNavClick("home")}
              className="outline-none focus:outline-none"
            >
              <span className="text-3xl md:text-4xl font-bold text-gray-900 leading-none transition-colors duration-300 hover:text-[color:var(--accent-red)]">
                SnPC Global
              </span>
            </a>

            {/* Desktop nav */}
            <nav className="mt-1 md:mt-3 hidden md:flex gap-6 text-base text-gray-600 animate-slide-in">
              {navLinks.map((link) => (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={handleNavClick(link.id)}
                  className={`hover:text-gray-900 transition-colors outline-none focus:outline-none ${
                    activeId === link.id
                      ? "text-[color:var(--accent-red)] font-medium"
                      : ""
                  }`}
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>
        </div>

        {/* Mobile toggle (moved to right, same row) */}
        <div className="md:hidden flex items-center">
          <button
            className="ml-4 text-gray-700 px-2 py-1 rounded-md bg-white border border-gray-200 transition-transform duration-300 hover:scale-110 outline-none focus:outline-none"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label="Toggle menu"
          >
            ☰
          </button>
        </div>

        {/* Right (desktop only): Flag + Contact */}
        <div className="hidden sm:flex items-center gap-5 text-base animate-fade-in">
          <div className="flex items-center gap-2 text-gray-700">
            <img
              src={IndiaFlag}
              alt="India"
              className="w-6 h-4 object-contain rounded-sm shadow-sm"
            />
            <span>India</span>
          </div>
          <a
            href="#contact"
            onClick={handleNavClick("contact")}
            className="px-5 py-2 rounded-md text-sm font-medium text-white bg-[color:var(--accent-red)] hover:opacity-90 outline-none focus:outline-none transition-all duration-300 hover:scale-105"
          >
            Contact us
          </a>
        </div>
      </div>

      {/* Mobile nav dropdown with animation */}
      <div
        className={`md:hidden bg-white shadow-md overflow-hidden transform transition-all duration-500 ease-in-out origin-top ${
          mobileOpen
            ? "max-h-96 opacity-100 scale-y-100"
            : "max-h-0 opacity-0 scale-y-0"
        }`}
      >
        <nav className="flex flex-col gap-2 text-base text-gray-600 p-3 animate-fade-in">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={handleNavClick(link.id)}
              className={`hover:text-gray-900 transition-colors outline-none focus:outline-none ${
                activeId === link.id
                  ? "text-[color:var(--accent-red)] font-medium"
                  : ""
              }`}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={handleNavClick("contact")}
            className="mt-2 px-5 py-2 rounded-md text-sm font-medium text-white bg-[color:var(--accent-red)] hover:opacity-90 outline-none focus:outline-none transition-transform duration-300 hover:scale-105"
          >
            Contact us
          </a>
        </nav>
      </div>
    </header>
  );
}