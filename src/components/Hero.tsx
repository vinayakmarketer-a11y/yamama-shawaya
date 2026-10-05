import React from 'react';
import { ArrowRight, Flame } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { RESTAURANT_INFO } from '../data/menuData';

export const Hero: React.FC = () => {
  const { openCart } = useCart();

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section id="home" className="relative overflow-hidden bg-[#090a0d] pt-6 pb-16 lg:py-20">
      {/* Background ambient radial glow in vibrant Yamama yellow & ember orange */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[750px] h-[520px] bg-gradient-to-b from-yellow-500/15 via-amber-600/10 to-transparent blur-[140px] pointer-events-none" />
      <div className="absolute -top-32 right-0 w-96 h-96 bg-yellow-500/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
            {/* Brand Kicker with Yamama Emblem Theme */}
            <div className="flex items-center justify-center lg:justify-start gap-2.5 text-xs font-semibold uppercase tracking-[0.18em]">
              <span className="flex items-center gap-1.5 text-yellow-400 font-bold">
                <Flame className="w-4 h-4 text-yellow-400 fill-yellow-400 animate-pulse" />
                {RESTAURANT_INFO.brandName}
              </span>
              <span aria-hidden="true" className="text-stone-600">·</span>
              <span className="px-2.5 py-0.5 rounded-full bg-red-600 text-white font-black text-[10px] tracking-wider shadow-sm">
                {RESTAURANT_INFO.slogan}
              </span>
            </div>

            {/* Main Headline with vibrant yellow gradient */}
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.08] text-balance">
              THE FLAVOUR OF <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-yellow-400 to-amber-500 filter drop-shadow-[0_4px_16px_rgba(250,204,21,0.25)]">
                REAL SHAWAYA.
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-base sm:text-lg text-stone-300 max-w-xl mx-auto lg:mx-0 font-normal leading-relaxed">
              {RESTAURANT_INFO.subheadline}
            </p>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <button
                onClick={() => scrollTo('order')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 text-sm font-black uppercase tracking-wider text-stone-950 bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-500 hover:from-yellow-300 hover:to-amber-300 rounded-xl transition-all shadow-xl shadow-yellow-500/25 active:scale-[0.98] cursor-pointer"
              >
                <span>ORDER NOW</span>
                <ArrowRight className="w-4 h-4 text-stone-950 stroke-[2.5]" />
              </button>

              <button
                onClick={() => scrollTo('menu')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm font-bold uppercase tracking-wider text-stone-200 bg-stone-900/90 hover:bg-stone-850 border border-yellow-500/30 hover:border-yellow-400/60 rounded-xl transition-all active:scale-[0.98] cursor-pointer"
              >
                <span>VIEW MENU</span>
              </button>
            </div>

            {/* Unboxed Metadata Highlights Bar */}
            <div className="pt-4 border-t border-stone-800/80 grid grid-cols-3 gap-4 text-center lg:text-left">
              <div>
                <span className="block font-mono text-xl sm:text-2xl font-bold text-yellow-400 tabular-nums">
                  100%
                </span>
                <span className="text-xs text-stone-400 uppercase tracking-wider">
                  Charcoal Roasted
                </span>
              </div>
              <div>
                <span className="block font-mono text-xl sm:text-2xl font-bold text-yellow-400 tabular-nums">
                  18 Hrs
                </span>
                <span className="text-xs text-stone-400 uppercase tracking-wider">
                  Spice Marination
                </span>
              </div>
              <div>
                <span className="block font-mono text-xl sm:text-2xl font-bold text-yellow-400 tabular-nums">
                  Fresh
                </span>
                <span className="text-xs text-stone-400 uppercase tracking-wider">
                  Clay Oven Kubus
                </span>
              </div>
            </div>
          </div>

          {/* Right Visual Showcase Column */}
          <div className="lg:col-span-6 flex flex-col gap-4">
            {/* The Image: Slow-roasted golden Arabian Shawaya chicken on charcoal with garlic toum and charred lemon */}
            <div className="relative rounded-2xl overflow-hidden border border-yellow-500/30 bg-stone-900/40 shadow-2xl charcoal-glow group">
              <div className="relative aspect-[16/10] sm:aspect-[16/11] overflow-hidden">
                <img
                  src="/src/assets/images/hero_shawaya_chicken_1790867399879.jpg"
                  alt="Slow-roasted golden Arabian Shawaya chicken on charcoal with garlic toum and charred lemon"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transform group-hover:scale-[1.03] transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

                {/* Live Ember Rotisserie Pill */}
                <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-stone-950/85 backdrop-blur-md border border-yellow-400/30 text-[11px] font-mono font-bold text-yellow-300 flex items-center gap-1.5 shadow-lg">
                  <Flame className="w-3.5 h-3.5 text-orange-400 fill-orange-400 animate-pulse" />
                  <span>Fresh Off Hardwood Coals</span>
                </div>
              </div>
            </div>

            {/* Placed Just Below: Signature Charcoal Grill Callout Card */}
            <div className="p-4 sm:p-5 rounded-2xl bg-[#121316] border border-yellow-500/35 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-2xl charcoal-glow">
              <div className="space-y-1">
                <span className="text-[11px] font-mono uppercase tracking-widest text-yellow-400 block font-bold">
                  Signature Charcoal Grill
                </span>
                <h3 className="font-heading text-base sm:text-lg font-bold text-white">
                  Full Shawaya Chicken · ₹660
                </h3>
                <p className="text-xs text-stone-300">
                  With garlic toum, fiery Arabian dip &amp; pickles
                </p>
              </div>

              <div className="flex flex-col items-start sm:items-end gap-1.5 shrink-0">
                <button
                  onClick={() => scrollTo('menu')}
                  className="px-4 py-2 text-xs font-black uppercase tracking-wider text-stone-950 bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-500 hover:from-yellow-300 hover:to-amber-300 rounded-xl transition-all shadow-md shadow-yellow-500/25 active:scale-95 cursor-pointer flex items-center gap-1.5"
                >
                  <span>Select Size</span>
                  <span className="text-[10px] font-bold text-stone-950/80 bg-stone-950/15 px-1.5 py-0.5 rounded uppercase">
                    You're Welcome
                  </span>
                </button>
                <span className="text-[11px] font-mono text-yellow-300 font-medium">
                  ✨ You're welcome to order
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
