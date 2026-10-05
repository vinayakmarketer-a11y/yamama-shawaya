import React, { useState } from 'react';
import { ShoppingBag, Phone, Menu as MenuIcon, X } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { RESTAURANT_INFO } from '../data/menuData';
import { BrandHeading } from './BrandHeading';

export const Navbar: React.FC = () => {
  const { totalItemsCount, subtotal, openCart } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
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
    <header className="sticky top-0 z-40 bg-[#090a0d]/95 backdrop-blur-md border-b border-yellow-500/15 transition-all">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-20 sm:h-22 flex items-center justify-between gap-2">
        {/* Zone 1: Main Brand Heading (Top Left) properly displayed */}
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            scrollTo('home');
          }}
          className="group block shrink-0"
          aria-label="Yamama Shawaya Home"
        >
          <BrandHeading size="md" showSubtitle={true} />
        </a>

        {/* Zone 2: 4-6 Nav links with clean single-line text and hover underline */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-stone-300">
          <button
            onClick={() => scrollTo('home')}
            className="hover:text-amber-400 transition-colors cursor-pointer py-1"
          >
            Home
          </button>
          <button
            onClick={() => scrollTo('menu')}
            className="hover:text-amber-400 transition-colors cursor-pointer py-1"
          >
            Menu
          </button>
          <button
            onClick={() => scrollTo('offers')}
            className="hover:text-amber-400 transition-colors cursor-pointer py-1"
          >
            Combos
          </button>
          <button
            onClick={() => scrollTo('why-shawaya')}
            className="hover:text-amber-400 transition-colors cursor-pointer py-1"
          >
            Why Us
          </button>
          <button
            onClick={() => scrollTo('about')}
            className="hover:text-amber-400 transition-colors cursor-pointer py-1"
          >
            Story
          </button>
          <button
            onClick={() => scrollTo('order')}
            className="hover:text-amber-400 transition-colors cursor-pointer py-1"
          >
            Order
          </button>
          <button
            onClick={() => scrollTo('location')}
            className="hover:text-yellow-400 transition-colors cursor-pointer py-1 text-yellow-400/90 font-semibold"
          >
            Location
          </button>
          <button
            onClick={() => scrollTo('contact')}
            className="hover:text-amber-400 transition-colors cursor-pointer py-1"
          >
            Contact
          </button>
        </nav>

        {/* Zone 3: 1-2 Primary actions */}
        <div className="flex items-center gap-3">
          <a
            href={`tel:${RESTAURANT_INFO.phoneClean}`}
            className="hidden sm:inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-stone-200 bg-stone-900/80 hover:bg-stone-800 border border-white/10 rounded-lg transition-colors whitespace-nowrap"
          >
            <Phone className="w-3.5 h-3.5 text-amber-400" />
            <span>Call Now</span>
          </a>

          <button
            onClick={openCart}
            aria-label="View shopping cart"
            className="relative flex items-center gap-2.5 px-4 py-2 text-xs font-black uppercase tracking-wider text-stone-950 bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-500 hover:from-yellow-300 hover:to-amber-300 rounded-xl transition-all shadow-md shadow-yellow-500/20 active:scale-[0.98] cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4 text-stone-950 stroke-[2.5]" />
            <span className="hidden sm:inline">Cart</span>
            {totalItemsCount > 0 && (
              <span className="flex items-center justify-center min-w-5 h-5 px-1.5 text-[11px] font-bold text-white bg-stone-950 rounded-full tabular-nums">
                {totalItemsCount}
              </span>
            )}
            {totalItemsCount > 0 && (
              <span className="hidden lg:inline text-[11px] font-mono font-black text-stone-950 border-l border-stone-950/20 pl-1.5 tabular-nums">
                ₹{subtotal}
              </span>
            )}
          </button>

          {/* Mobile hamburger toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="md:hidden p-2 text-stone-300 hover:text-white hover:bg-stone-900 rounded-lg border border-white/10"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#121316] border-b border-stone-800 px-6 py-5 space-y-4">
          <div className="flex flex-col space-y-3 text-base font-medium text-stone-300">
            <button
              onClick={() => scrollTo('home')}
              className="text-left py-2 hover:text-amber-400 transition-colors"
            >
              Home
            </button>
            <button
              onClick={() => scrollTo('menu')}
              className="text-left py-2 hover:text-amber-400 transition-colors"
            >
              Menu & Pricing
            </button>
            <button
              onClick={() => scrollTo('offers')}
              className="text-left py-2 hover:text-amber-400 transition-colors"
            >
              Combos & Special Offers
            </button>
            <button
              onClick={() => scrollTo('why-shawaya')}
              className="text-left py-2 hover:text-amber-400 transition-colors"
            >
              Why Shawaya
            </button>
            <button
              onClick={() => scrollTo('about')}
              className="text-left py-2 hover:text-amber-400 transition-colors"
            >
              Our Story
            </button>
            <button
              onClick={() => scrollTo('order')}
              className="text-left py-2 hover:text-amber-400 transition-colors"
            >
              Place Order Online
            </button>
            <button
              onClick={() => scrollTo('location')}
              className="text-left py-2 hover:text-yellow-400 transition-colors text-yellow-300 font-semibold"
            >
              Location &amp; Directions
            </button>
            <button
              onClick={() => scrollTo('contact')}
              className="text-left py-2 hover:text-amber-400 transition-colors"
            >
              Contact &amp; Reservations
            </button>
          </div>
          <div className="pt-3 border-t border-stone-800/80 flex items-center justify-between">
            <a
              href={`tel:${RESTAURANT_INFO.phoneClean}`}
              className="flex items-center gap-2 text-xs text-stone-300 hover:text-white"
            >
              <Phone className="w-4 h-4 text-amber-400" />
              <span>{RESTAURANT_INFO.phone}</span>
            </a>
            <span className="text-xs text-amber-400 font-mono">12 PM - 11:30 PM</span>
          </div>
        </div>
      )}
    </header>
  );
};
