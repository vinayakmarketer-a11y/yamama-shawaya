import React from 'react';
import { Phone, MapPin, Instagram, MessageSquare, ArrowUp } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/menuData';
import { BrandHeading } from './BrandHeading';

export const Footer: React.FC = () => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#08090b] border-t border-stone-850/80 text-stone-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 items-start">
          {/* Brand Column */}
          <div className="lg:col-span-4 space-y-4">
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                scrollTo('home');
              }}
              className="inline-block group"
              aria-label="Yamama Shawaya Home"
            >
              <BrandHeading size="md" showSubtitle={true} />
            </a>

            {/* Requested tagline */}
            <p className="text-stone-300 text-sm font-medium">
              "Authentic taste. Freshly prepared."
            </p>

            <p className="text-xs text-stone-400 leading-relaxed max-w-sm">
              Traditional Arabian rotisserie charcoal cooking, fluffy oven-fresh Kubus, fragrant Bishawari basmati rice and signature Bene Tibi chilled fruit mojitos.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href={RESTAURANT_INFO.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded-lg bg-stone-900 border border-stone-800 flex items-center justify-center text-stone-300 hover:text-amber-400 hover:border-amber-500/40 transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>

              <a
                href={`https://wa.me/${RESTAURANT_INFO.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="w-9 h-9 rounded-lg bg-stone-900 border border-stone-800 flex items-center justify-center text-stone-300 hover:text-emerald-400 hover:border-emerald-500/40 transition-colors"
              >
                <MessageSquare className="w-4 h-4" />
              </a>

              <a
                href={`tel:${RESTAURANT_INFO.phoneClean}`}
                aria-label="Call phone"
                className="w-9 h-9 rounded-lg bg-stone-900 border border-stone-800 flex items-center justify-center text-stone-300 hover:text-amber-400 hover:border-amber-500/40 transition-colors"
              >
                <Phone className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-white">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-xs text-stone-400">
              <li>
                <button
                  onClick={() => scrollTo('home')}
                  className="hover:text-amber-400 transition-colors cursor-pointer"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('menu')}
                  className="hover:text-amber-400 transition-colors cursor-pointer"
                >
                  Menu
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('offers')}
                  className="hover:text-amber-400 transition-colors cursor-pointer"
                >
                  Combos & Platters
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('why-shawaya')}
                  className="hover:text-amber-400 transition-colors cursor-pointer"
                >
                  Why Shawaya
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('about')}
                  className="hover:text-amber-400 transition-colors cursor-pointer"
                >
                  About
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('location')}
                  className="hover:text-yellow-400 text-yellow-300/90 font-medium transition-colors cursor-pointer"
                >
                  Location &amp; Directions
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('contact')}
                  className="hover:text-amber-400 transition-colors cursor-pointer"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Location & Details Column */}
          <div className="lg:col-span-5 space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-white">
              Restaurant & Timing
            </h4>

            <div className="space-y-3 text-xs">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span className="text-stone-300">{RESTAURANT_INFO.address}</span>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <a
                  href={`tel:${RESTAURANT_INFO.phoneClean}`}
                  className="text-stone-300 hover:text-white font-mono"
                >
                  {RESTAURANT_INFO.phone}
                </a>
              </div>

              <div className="p-3.5 rounded-xl bg-stone-900/60 border border-stone-850">
                <span className="text-[11px] uppercase tracking-wider text-amber-400 block font-semibold mb-1">
                  Service Hours
                </span>
                <span className="text-stone-300 font-mono text-xs block">
                  {RESTAURANT_INFO.openingHours}
                </span>
                <span className="text-[11px] text-stone-500 mt-1 block">
                  Hot rotisserie batches ready every 45 minutes
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Back to Top */}
        <div className="mt-12 pt-6 border-t border-stone-850/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-400">
          <p>© {new Date().getFullYear()} {RESTAURANT_INFO.brandName}. All rights reserved.</p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-stone-400 hover:text-amber-400 transition-colors cursor-pointer py-1"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
