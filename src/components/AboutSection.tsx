import React from 'react';
import { Sparkles, Utensils, HeartHandshake, Flame } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/menuData';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-16 sm:py-24 bg-[#0e0f13] border-t border-stone-850 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Visual Composition with Simple Fluid Animations */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl overflow-hidden border border-yellow-500/25 shadow-2xl bg-stone-900/60 aspect-[4/3] group charcoal-glow">
              {/* Ken Burns Breathing Ambient Image */}
              <img
                src="/src/assets/images/shawaya_with_kubus_1790867413534.jpg"
                alt="Freshly baked kubus with sliced roasted shawaya chicken and garlic toum"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover animate-mojito-zoom group-hover:scale-108 transition-transform duration-700 ease-out"
              />

              {/* Clay oven warm specular light shimmer sweep */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 bottom-0 w-1/2 bg-gradient-to-r from-transparent via-amber-300/15 to-transparent animate-shimmer-sweep pointer-events-none" />
              </div>

              {/* Gentle clay oven heat & steam particles */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
                <div className="absolute bottom-16 left-[25%] w-2 h-2 rounded-full bg-amber-200/50 blur-[1px] animate-ember-1" />
                <div className="absolute bottom-20 left-[48%] w-2.5 h-2.5 rounded-full bg-yellow-200/40 blur-[1px] animate-ember-3" />
                <div className="absolute bottom-14 left-[68%] w-1.5 h-1.5 rounded-full bg-orange-300/50 blur-[0.5px] animate-ember-4" />
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent z-10" />

              {/* Animated Floating Card for The Arabian Table & Fresh Kubus */}
              <div className="absolute bottom-5 left-5 right-5 z-20 p-4 rounded-xl bg-stone-950/85 backdrop-blur-md border border-yellow-500/30 shadow-xl transition-all group-hover:border-yellow-400/60">
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <div className="flex items-center gap-2">
                    <Flame className="w-4 h-4 text-orange-400 fill-orange-400 animate-pulse shrink-0" />
                    <span className="font-mono text-xs text-yellow-300 uppercase tracking-widest font-bold animate-text-shimmer">
                      The Arabian Table
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/80 border border-emerald-500/30 px-2 py-0.5 rounded-full flex items-center gap-1 font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping inline-block" />
                    <span>Baked Fresh Every 15 Min</span>
                  </span>
                </div>
                <p className="text-stone-200 text-xs sm:text-sm font-medium leading-relaxed">
                  Fresh Kubus flatbreads baked continuously in fiery clay ovens throughout the day.
                </p>
              </div>
            </div>

            {/* Accent Floating Badge with Subtle Bobbing Animation */}
            <div className="hidden sm:block absolute -bottom-5 -right-5 p-4 rounded-xl bg-[#121316]/95 backdrop-blur-md border border-yellow-400/30 shadow-2xl max-w-xs animate-pin-bob z-30">
              <span className="font-display text-lg font-bold text-yellow-400 block">
                {RESTAURANT_INFO.arabicTitle}
              </span>
              <span className="text-xs text-stone-300">
                Calicut's premier destination for authentic charcoal Shawaya.
              </span>
            </div>
          </div>

          {/* Right Prose Content */}
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-amber-400">
              <span>Our Philosophy</span>
              <span aria-hidden="true">·</span>
              <span>Pure Craft</span>
            </div>

            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight">
              ROOTED IN SIMPLICITY & FIRE.
            </h2>

            {/* Exactly as requested in prompt */}
            <blockquote className="border-l-2 border-amber-500 pl-4 py-1 italic text-stone-200 text-base sm:text-lg leading-relaxed font-sans">
              "Good food doesn't need to be complicated. We bring together perfectly roasted Shawaya Chicken, fresh Kubus, flavourful rice and refreshing mojitos — prepared fresh and served with unforgettable taste."
            </blockquote>

            <p className="text-sm text-stone-400 leading-relaxed">
              Every afternoon, our pitmasters light the hardwood charcoal pit. As the flames settle into a radiant bed of glowing coals, the skewers of marinated whole chickens begin their slow rotation. The drippings sizzle, smoke perfumes the air, and what emerges is tender, juicy poultry with an unmistakable golden char.
            </p>

            <div className="pt-2 grid grid-cols-2 gap-4">
              <div className="p-3.5 rounded-xl bg-[#121316] border border-stone-800">
                <span className="block text-amber-400 font-mono text-sm font-bold">12:00 PM Daily</span>
                <span className="text-xs text-stone-400">First Rotisserie Batch Ready</span>
              </div>
              <div className="p-3.5 rounded-xl bg-[#121316] border border-stone-800">
                <span className="block text-amber-400 font-mono text-sm font-bold">No Frozen Meat</span>
                <span className="text-xs text-stone-400">Fresh Daily Farm Procurement</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
