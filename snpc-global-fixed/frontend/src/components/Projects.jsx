import React, { useState, useRef, useEffect } from "react";

// ✅ Project images (main hero images)
import imgKharkhoda from "../assets/projects/proj-nvcity-sector10a-kharkhoda.jpg";
import imgPipli from "../assets/projects/proj-nvcity-sector6-pipli.jpg";
import imgKmp from "../assets/projects/proj-nvcity-sector6-kmp.jpg";
import imgBahadurgarh from "../assets/projects/proj-nvcity-bahadurgarh.jpg";
import imgJind from "../assets/projects/proj-nvcity-jind.jpg";
import imgRohtak21E from "../assets/projects/proj-nvcity-sector21e-rohtak.jpg";
import imgRohtak from "../assets/projects/proj-nvcity-rohtak.jpg";
import imgSonipat from "../assets/projects/proj-nvcity-sonipat.jpg";
import imgChandigarh from "../assets/projects/proj-nv-heights-chandigarh.jpeg";

// ✅ Payment plan images (only first project has real plan here)
import planNv10aKharkhoda from "../assets/projects/plan-nv-10a-kharkhoda.jpg";

const projects = [
  {
    id: "nv-10a-kharkhoda",
    title: "NV City — Sector 10A, Kharkhoda",
    location: "Sector 10A, Kharkhoda",
    image: imgKharkhoda,
    summary:
      "NV City Kharkhoda offers more than just plots — it offers a future full of growth, security, and modern living. Located just 100 meters from NH334B, this gated community provides excellent connectivity to Delhi NCR and key projects like the Maruti Plant and Global City. Our DTCP approved plots come with registry-ready paperwork and clear title, making your investment safe and profitable. At NV City, we focus on delivering quality development, green spaces, and top amenities so you and your family can build a happy future.",
    year: "2024",
    type: "Residential",
    brochure: "/brochures/brochure-nv-10a-kharkhoda.pdf",
    paymentPlanImage: planNv10aKharkhoda,
  },
  {
    id: "nv-sector6-pipli-thana",
    title: "NV City — Sector 6, Pipli Thana Road (Coming Soon)",
    location: "Sector 6, Pipli Thana Road, Kharkhoda",
    image: imgPipli,
    summary:
      "NV City Sector 6 Thana Road is designed for easy living and great connectivity. We offer plots close to IMT, KMP and major industrial players — making commutes short and opportunities abundant. Ideal if you're seeking industrial plots near Sonipat or residential plots near Haryana Global City.",
    year: "2024",
    type: "Residential / Industrial",
  },
  {
    id: "nv-sector6-kmp",
    title: "NV City — Sector 6 {near KMP Expressway} (Coming Soon)",
    location: "Sector 6, near KMP Expressway",
    image: imgKmp,
    summary:
      "NV City Sector 6 plots give you strategic proximity to IMT and KMP Expressway — perfect for residential or industrial opportunities. With large companies establishing nearby and excellent transport links, this Kharkhoda project is an attractive option for investors and developers.",
    year: "2024",
    type: "Residential / Industrial",
  },
  {
    id: "nv-bahadurgarh",
    title: "NV City — Bahadurgarh (Coming Soon)",
    location: "Bahadurgarh, Haryana",
    image: imgBahadurgarh,
    summary:
      "NV City Bahadurgarh offers premium residential plots located beside the highway with great connectivity. A secure gated community with modern amenities, it's an ideal choice for residential investment. Visit us at: 1st Floor, Avenue 37, HL City, Sector 37, Bahadurgarh, Haryana.",
    year: "Coming soon",
    type: "Residential",
  },
  {
    id: "nv-jind",
    title: "NV City — Jind (Coming Soon)",
    location: "Jind, Haryana",
    image: imgJind,
    summary:
      "NV City Jind offers premium residential plots in a secure gated community located near the highway, providing great connectivity and convenience — an attractive choice to build your dream home.",
    year: "Coming soon",
    type: "Residential",
  },
  {
    id: "nv-sector21e-rohtak",
    title: "NV City — Sector 21E, Rohtak",
    location: "Sector 21E, Rohtak",
    image: imgRohtak21E,
    summary:
      "A thoughtfully planned residential development under the Deen Dayal Jan Awas Yojna, spread across 26.36 acres in Rohtak. NV City offers 479 residential plots and 3 commercial blocks, balancing affordability with modern living.",
    year: "2024",
    type: "Residential",
  },
  {
    id: "nv-rohtak",
    title: "NV City — Rohtak (Coming Soon)",
    location: "Rohtak, Haryana",
    image: imgRohtak,
    summary:
      "NV City Rohtak is an upcoming RERA-approved residential project offering secure, reliable plots — a solid opportunity for future homeowners and investors.",
    year: "Coming soon",
    type: "Residential",
  },
  {
    id: "nv-sonipat",
    title: "NV City — Sonipat (Coming Soon)",
    location: "Sonipat, Haryana",
    image: imgSonipat,
    summary:
      "NV City Sonipat is a new plotted living project under the Deen Dayal Jan Awas Yojna, blending affordability, planning and long-term value in Sonipat’s emerging residential zone.",
    year: "Coming soon",
    type: "Residential",
  },
  {
    id: "nv-heights-chandigarh",
    title: "NV Heights — Chandigarh (Coming Soon)",
    location: "New Chandigarh",
    image: imgChandigarh,
    summary:
      "NV HEIGHTS is a 3BHK luxury apartment project by SnPC Global in New Chandigarh. Land allotment is in process with a Letter of Intent issued by GMADA. Located with views of the Shivalik Hills and proximity to Chandigarh, NV Heights is positioned as a premium residential offering.",
    year: "Coming soon",
    type: "Residential (Luxury)",
  },
];

export default function Projects() {
  const [active, setActive] = useState(null); // active -> project object or null
  const [showPlan, setShowPlan] = useState(false); // show payment plan inside full modal
  const [showOnlyPlanImage, setShowOnlyPlanImage] = useState(false); // minimal plan-only modal
  const [modalKey, setModalKey] = useState(0); // force remount for modal to avoid stuck state

  const containerRef = useRef(null);
  const modalContentRef = useRef(null);
  const paymentPlanRef = useRef(null);
  const actionsRowRef = useRef(null);

  // helper to trigger file download (brochure)
  const downloadFile = (url) => {
    if (!url) return;
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Utility: smooth scroll with header offset support
  const scrollToId = (id) => {
    const el = document.getElementById(id);
    let headerOffset = 84;
    try {
      const raw = getComputedStyle(document.documentElement).getPropertyValue(
        "--header-offset"
      );
      if (raw) {
        const parsed = parseInt(raw.replace("px", "").trim(), 10);
        if (!Number.isNaN(parsed)) headerOffset = parsed;
      }
    } catch (err) {
      // ignore, use fallback
    }

    if (el) {
      const rect = el.getBoundingClientRect();
      const targetY = window.pageYOffset + rect.top - headerOffset;
      window.scrollTo({ top: targetY, behavior: "smooth" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Defensive body-lock handling: always restore overflow on unmount/close
  useEffect(() => {
    const prevOverflow = document.body.style.overflow || "";
    if (active) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = prevOverflow;
    }
    return () => {
      // ensure we always restore overflow when component unmounts
      document.body.style.overflow = prevOverflow;
    };
  }, [active]);

  // Close modal on Escape: handles plan-only modal too
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") {
        if (showPlan) {
          hidePaymentPlan();
        } else if (showOnlyPlanImage) {
          setShowOnlyPlanImage(false);
          setActive(null);
        } else {
          setActive(null);
        }
      }
    };
    if (active) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, showPlan, showOnlyPlanImage]);

  // ensures scroll positions get reset whenever modalKey changes (i.e. modal remount)
  useEffect(() => {
    if (modalContentRef.current) {
      modalContentRef.current.scrollTop = 0;
    }
    if (paymentPlanRef.current) {
      paymentPlanRef.current.scrollTop = 0;
    }
  }, [modalKey]);

  // Open a project modal (forces a new modalKey so modal remounts)
  const openProjectModal = (p) => {
    setModalKey((k) => k + 1);
    setActive(p);
    setShowOnlyPlanImage(false);
    setShowPlan(false);
  };

  // Minimal modal: open only plan image
  const openOnlyPlanImage = (p) => {
    setModalKey((k) => k + 1);
    setActive(p);
    setShowOnlyPlanImage(true);
    setShowPlan(false);
  };

  // Full-modal payment plan open
  const openPaymentPlan = () => {
    // ensure modal is mounted fresh and scroll resets
    setModalKey((k) => k + 1);
    setShowPlan(true);
    setShowOnlyPlanImage(false);
    // slight delay so ref exists on remount, then scroll the plan into view
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (paymentPlanRef.current) {
          paymentPlanRef.current.scrollTop = 0;
          if (modalContentRef.current) modalContentRef.current.scrollTop = 0;
          paymentPlanRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      });
    });
  };

  const hidePaymentPlan = () => {
    setShowPlan(false);
    // ensure actions row visible after hiding plan
    requestAnimationFrame(() => {
      if (actionsRowRef.current && modalContentRef.current) {
        actionsRowRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    });
  };

  const handleListBrochureClick = (p, idx) => {
    if (idx === 0 && p.brochure) {
      downloadFile(p.brochure);
    }
  };

  const handleListPlanClick = (p, idx) => {
    if (idx === 0 && p.paymentPlanImage) {
      openOnlyPlanImage(p);
    }
  };

  const handleListContactClick = (p) => {
    // ensure modal is closed and jump to contact without showing the modal
    setActive(null);
    setShowOnlyPlanImage(false);
    setShowPlan(false);
    scrollToId("contact");
  };

  // Defensive close that resets everything
  const closeAllModals = () => {
    setActive(null);
    setShowPlan(false);
    setShowOnlyPlanImage(false);
  };

  // helper used by the contact button inside modal
  const handleContactFromModal = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    setActive(null);
    setShowOnlyPlanImage(false);
    setShowPlan(false);
    scrollToId("contact");
  };

  return (
    <section id="projects" className="mt-16 relative w-full overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background: "linear-gradient(90deg, #f6f7f8 0%, #ffffff 100%)",
        }}
      />

      <div className="container mx-auto px-4 relative" ref={containerRef}>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-4xl font-bold capitalize text-[#0b3550]">
            Our Delivered Projects
          </h2>
        </div>

        <div className="relative space-y-28">
          {projects.map((p, idx) => {
            const isImageLeft = idx % 2 === 0;
            return (
              <div key={p.id} className="relative">
                <div
                  className={`flex flex-col md:flex-row items-center md:items-stretch gap-6 ${
                    isImageLeft ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  <div className="md:w-1/2 w-full">
                    <div
                      className="rounded-lg overflow-hidden shadow-lg cursor-pointer"
                      onClick={() => openProjectModal(p)}
                      onKeyDown={(e) =>
                        e.key === "Enter" ? openProjectModal(p) : null
                      }
                      role="button"
                      tabIndex={0}
                      aria-label={`Open project ${p.title}`}
                      aria-describedby={`${p.id}-summary`}
                    >
                      <img
                        src={p.image}
                        alt={p.title}
                        className="w-full h-72 md:h-96 object-cover md:rounded-lg"
                        loading="lazy"
                      />
                    </div>
                  </div>

                  <div className="md:w-1/2 w-full flex items-start">
                    <div
                      className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition w-full"
                      onClick={() => openProjectModal(p)}
                      onKeyDown={(e) =>
                        e.key === "Enter" ? openProjectModal(p) : null
                      }
                      role="button"
                      tabIndex={0}
                      aria-label={`Open project ${p.title}`}
                      aria-describedby={`${p.id}-summary`}
                    >
                      <h3 className="text-2xl font-bold text-[#0b3550]">
                        {p.title}
                      </h3>
                      <div className="mt-2 text-sm text-gray-600">
                        {p.location} • {p.year} • {p.type}
                      </div>
                      <p
                        id={`${p.id}-summary`}
                        className="mt-4 text-gray-700 leading-relaxed"
                      >
                        {p.summary}
                      </p>

                      {/* Action row */}
                      <div className="mt-6 flex items-center gap-3">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleListBrochureClick(p, idx);
                          }}
                          className={`inline-flex items-center px-4 py-2 rounded-full shadow text-sm font-semibold transition ${
                            idx === 0
                              ? "bg-[#0b61a4] text-white hover:scale-105"
                              : "bg-white text-gray-400 opacity-60 cursor-not-allowed"
                          }`}
                          aria-disabled={idx === 0 ? "false" : "true"}
                        >
                          Brochure
                        </button>

                        {idx === 0 ? (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleListPlanClick(p, idx);
                            }}
                            className="inline-flex items-center px-4 py-2 rounded-full shadow text-sm font-semibold transition bg-[#0b61a4] text-white hover:scale-105"
                          >
                            Payment Plan
                          </button>
                        ) : (
                          <button
                            type="button"
                            className="inline-flex items-center px-4 py-2 rounded-full shadow text-sm font-semibold bg-white text-gray-400 opacity-60 cursor-not-allowed"
                            aria-disabled="true"
                          >
                            Payment Plan
                          </button>
                        )}

                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleListContactClick(p);
                          }}
                          className="ml-auto inline-flex items-center px-4 py-2 rounded-full shadow bg-[#0b61a4] text-white text-sm font-semibold hover:scale-105"
                        >
                          Contact
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Minimal modal: only payment plan image, download, close */}
        {active && showOnlyPlanImage && active.paymentPlanImage && (
          <div
            key={`plan-only-${modalKey}`}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
            role="dialog"
            aria-modal="true"
            aria-label={`${active.title} payment plan`}
            onClick={() => {
              closeAllModals();
            }}
          >
            <div
              className="relative max-w-[90vw] w-full max-h-[90vh] bg-transparent"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button (prominent) */}
              <button
                onClick={() => {
                  closeAllModals();
                }}
                className="absolute top-2 right-2 z-[100] bg-white rounded-full p-2 shadow-lg hover:scale-105 transition-transform"
                aria-label="Close payment plan"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-neutral-900"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Download button */}
              <a
                href={active.paymentPlanImage}
                download
                className="absolute top-2 left-2 z-[100] inline-flex items-center px-3 py-1 rounded-full bg-white shadow text-sm font-semibold"
              >
                Download
              </a>

              {/* Image container - smaller max height, independently scrollable */}
              <div className="w-full h-full flex items-center justify-center">
                <div className="max-h-[80vh] md:max-h-[70vh] overflow-auto flex items-center justify-center p-2 bg-white rounded-md shadow">
                  <img
                    src={active.paymentPlanImage}
                    alt={`${active.title} payment plan`}
                    className="block object-contain max-w-full max-h-[60vh] sm:max-h-[40vh] md:max-h-[48vh] rounded-md border bg-white"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Full modal (original project details) */}
        {active && !showOnlyPlanImage && (
          <div
            key={`full-modal-${modalKey}`}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
            role="dialog"
            aria-modal="true"
            aria-label={active.title}
            onClick={() => closeAllModals()}
          >
            <div
              className="bg-white rounded-lg shadow-xl max-w-5xl w-full overflow-hidden relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Global Close Button at top-right */}
              <button
                onClick={() => closeAllModals()}
                className="absolute top-4 right-4 z-40 bg-white rounded-full p-3 shadow-lg hover:scale-105 transition-transform"
                aria-label="Close project modal"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-neutral-900"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <div
                ref={modalContentRef}
                className="max-h-[85vh] overflow-y-auto scroll-smooth"
                style={{ WebkitOverflowScrolling: "touch" }}
              >
                <div className="relative">
                  <img
                    src={active.image}
                    alt={active.title}
                    className="w-full h-72 md:h-96 object-cover"
                  />
                </div>

                <div className="p-6">
                  <h3 className="text-2xl font-bold text-[#0b3550]">{active.title}</h3>
                  <div className="mt-2 text-sm text-gray-600">
                    {active.location} • {active.year} • {active.type}
                  </div>

                  <p className="mt-4 text-gray-700 whitespace-pre-line">{active.summary}</p>

                  {/* Modal action row: pills side-by-side */}
                  <div ref={actionsRowRef} className="mt-6 flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => downloadFile(active.brochure)}
                      className="inline-flex items-center px-5 py-2 rounded-full shadow-lg bg-[#0b61a4] text-white text-sm font-semibold hover:scale-105 transition-transform"
                    >
                      Download Brochure
                    </button>

                    {active.paymentPlanImage ? (
                      <button
                        type="button"
                        onClick={() => (showPlan ? hidePaymentPlan() : openPaymentPlan())}
                        className="inline-flex items-center px-5 py-2 rounded-full shadow-lg bg-[#0b61a4] text-white text-sm font-semibold hover:scale-105 transition-transform"
                      >
                        {showPlan ? "Hide Payment Plan" : "Payment Plan"}
                      </button>
                    ) : (
                      <span className="text-sm text-gray-500">Payment plan coming soon</span>
                    )}

                    <button
                      type="button"
                      onClick={handleContactFromModal}
                      className="ml-auto inline-flex items-center px-5 py-2 rounded-full shadow-lg bg-[#0b61a4] text-white text-sm font-semibold hover:scale-105 transition-transform"
                    >
                      Contact
                    </button>
                  </div>

                  {/* Payment plan — full-width section (only shown for first project's plan) */}
                  {showPlan && active.paymentPlanImage && (
                    <div
                      ref={paymentPlanRef}
                      className="mt-6 border rounded-lg shadow-md bg-white max-h-[70vh] md:max-h-[60vh] overflow-y-auto"
                    >
                      {/* Sticky header so Download + Close remain visible while user scrolls */}
                      <div className="sticky top-0 z-10 bg-white p-4 border-b">
                        <div className="flex items-start md:items-center justify-between">
                          <div>
                            <h4 className="text-xl font-semibold text-[#0b3550]">Payment Plan</h4>
                            <p className="text-sm text-gray-600 mt-1">
                              View the detailed payment schedule below. Click the close icon to collapse this section.
                            </p>
                          </div>

                          {/* Close sign specifically for the payment-plan section */}
                          <div className="flex items-center gap-3">
                            <a href={active.paymentPlanImage || "#"} download className="text-sm text-[#0b61a4] font-semibold hover:underline">
                              Download
                            </a>
                            <button
                              onClick={() => hidePaymentPlan()}
                              aria-label="Close payment plan section"
                              className="ml-2 bg-white rounded-full p-2 shadow hover:opacity-90"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-neutral-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="p-4 md:p-6 grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
                        {/* Image column: limit image height so header controls are visible */}
                        <div className="md:col-span-7">
                          <div className="max-h-[52vh] md:max-h-[48vh] overflow-auto flex items-center justify-center">
                            <img
                              src={active.paymentPlanImage}
                              alt={`${active.title} payment plan`}
                              className="w-full object-contain max-h-[40vh] sm:max-h-[48vh] md:max-h-[80vh] border rounded-md"
                            />
                          </div>
                        </div>

                        <div className="md:col-span-5">
                          <div className="sticky top-4">
                            <h5 className="text-lg font-semibold text-[#0b3550]">Payment Schedule</h5>
                            <ul className="mt-3 text-sm text-gray-700 space-y-2">
                              <li>- Booking: 10% at the time of booking</li>
                              <li>- Within 30 days: 40%</li>
                              <li>- On possession: 50%</li>
                            </ul>
                            <div className="mt-4">
                              <a
                                href={active.brochure || "#"}
                                onClick={() => downloadFile(active.brochure)}
                                className="inline-flex items-center px-4 py-2 rounded-full bg-[#0b61a4] text-white text-sm font-semibold"
                              >
                                Request Callback
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
