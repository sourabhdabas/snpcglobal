// frontend/src/components/Insights.jsx
import React from 'react';

const ICON_COLOR = '#0b61a4'; // deep JLL-style blue
const ICON_SIZE = 52;

function AgriIcon() {
  return (
    <svg width={ICON_SIZE} height={ICON_SIZE} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M12 2C12 2 16 3.5 18 7s1 7 1 7-3-1-5.5-1S9 13 9 13 8 9 10 6s2-4 2-4z" fill={ICON_COLOR} opacity="0.98"/>
      <path d="M5 20c0-3.5 3-6 7-6s7 2.5 7 6" stroke={ICON_COLOR} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" opacity="0.95"/>
    </svg>
  );
}

function CommercialIcon() {
  return (
    <svg width={ICON_SIZE} height={ICON_SIZE} viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="3" y="6" width="18" height="12" rx="2" stroke={ICON_COLOR} strokeWidth="1.5" fill="none" />
      <path d="M7 10h3M7 14h3M14 10h3M14 14h3" stroke={ICON_COLOR} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M12 3v3" stroke={ICON_COLOR} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function HomeIcon() {
  return (
    <svg width={ICON_SIZE} height={ICON_SIZE} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M3 11.5L12 4l9 7.5" stroke={ICON_COLOR} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      <path d="M7 11.5v7a1 1 0 0 0 1 1h2v-5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v5h2a1 1 0 0 0 1-1v-7" stroke={ICON_COLOR} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    </svg>
  );
}

const CARDS = [
  {
    id: 'agri',
    Icon: AgriIcon,
    title: "Cultivate Your Future.\nInvest in India's Green Gold.",
    desc: "The agricultural sector is ripe for innovation. We provide a hand-picked portfolio of fertile, high-yield agricultural lands across India — ideal for organic farming, agri-tech projects, or long-term capital appreciation.",
    cta: 'Learn More'
  },
  {
    id: 'commercial',
    Icon: CommercialIcon,
    title: "Build an Empire.\nSecure Your Commercial Land Legacy.",
    desc: "Location is everything. We offer curated commercial lands in India’s fastest-growing corridors — perfect for logistics, IT parks and mixed-use development.",
    cta: 'Learn More'
  },
  {
    id: 'residential',
    Icon: HomeIcon,
    title: "Your Dream Home Starts\nwith the Perfect Plot.",
    desc: "Every great home begins with the right foundation. We source premium residential plots in secure, planned communities and emerging neighborhoods.",
    cta: 'Learn More'
  }
];

export default function Insights() {
  return (
    <section id="insights" className="relative w-full overflow-hidden">
      {/* Darker grey gradient */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background: 'linear-gradient(90deg, #e5e5e5 0%, #ffffff 100%)'
        }}
      />

      <div className="mx-auto px-6 md:px-8" style={{ maxWidth: '1400px' }}>
        <div className="pt-16 md:pt-20 pb-20 md:pb-28">
          <h2 className="text-center text-[#0b3550] text-3xl sm:text-4xl md:text-5xl font-extrabold mb-10">
            Our Insights
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 items-start">
            {CARDS.map((card) => (
              <article
                key={card.id}
                className="bg-white rounded-2xl p-8 md:p-10 shadow-[0_20px_40px_rgba(6,26,38,0.08)] flex flex-col items-center text-center"
                style={{ minHeight: 520 }}
              >
                <div className="w-20 h-20 flex items-center justify-center mb-6">
                  <card.Icon />
                </div>

                <h3 className="text-[#0b3550] text-lg md:text-xl font-bold leading-snug whitespace-pre-line mb-4">
                  {card.title}
                </h3>

                <p className="text-gray-700 text-sm md:text-base leading-relaxed max-w-[36ch]">
                  {card.desc}
                </p>

                <div className="mt-auto pt-6">
                  <a
                    href="#insights"
                    className="text-[#0b61a4] inline-flex items-center gap-2 text-sm md:text-base font-semibold hover:underline"
                  >
                    {card.cta} <span aria-hidden>→</span>
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
