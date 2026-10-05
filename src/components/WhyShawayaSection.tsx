import React from 'react';
import { WHY_SHAWAYA_FEATURES } from '../data/menuData';

export const WhyShawayaSection: React.FC = () => {
  return (
    <section id="why-shawaya" className="py-16 sm:py-24 bg-[#0b0c0e] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-amber-400 mb-2">
            <span>The Charcoal Difference</span>
            <span aria-hidden="true">·</span>
            <span>Tradition & Taste</span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            WHY SHAWAYA?
          </h2>

          <p className="mt-3 text-sm text-stone-400 leading-relaxed">
            Real Shawaya is an ancient Arabian rotisserie art. We respect the embers, the time-honoured marinades, and the fire.
          </p>
        </div>

        {/* 4 Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {WHY_SHAWAYA_FEATURES.map((feat, index) => (
            <div
              key={feat.title}
              className="bg-[#121316] p-6 rounded-2xl border border-stone-800/80 hover:border-amber-500/30 transition-all card-hover-effect flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-stone-900 border border-stone-800 flex items-center justify-center text-2xl mb-5 shadow-inner">
                  {feat.icon}
                </div>

                <div className="text-[11px] font-mono uppercase tracking-wider text-amber-400 mb-1">
                  0{index + 1}. {feat.subtitle}
                </div>

                <h3 className="font-heading text-lg font-bold text-white mb-2">
                  {feat.title}
                </h3>

                <p className="text-xs text-stone-400 leading-relaxed">
                  {feat.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-stone-850 flex items-center justify-between text-[11px] text-stone-500">
                <span>Standard</span>
                <span className="text-stone-300 font-mono">100% Guaranteed</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
