import React from 'react'
import HeroImg from '../assets/hero.png' // ensure this exists

export default function Hero(){
  return (
    <section className="relative">
      {/* Background image */}
      <div className="w-full h-[520px] md:h-[600px] lg:h-[720px] overflow-hidden relative">
        <img
          src={HeroImg}
          alt="Hero banner"
          className="w-full h-full object-cover object-center"
        />

        {/* subtle left-to-right white gradient overlay like JLL */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/60 to-transparent"></div>

        {/* Content aligned left-middle */}
        <div className="absolute left-12 md:left-20 top-1/2 -translate-y-1/2 max-w-2xl text-left">
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-neutral-900 leading-tight">
            Your Next-Gen Land Bank Partner in India
          </h1>
        </div>
      </div>
    </section>
  )
}
