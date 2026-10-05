/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { CartProvider } from './context/CartContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { MenuSection } from './components/MenuSection';
import { OffersSection } from './components/OffersSection';
import { WhyShawayaSection } from './components/WhyShawayaSection';
import { AboutSection } from './components/AboutSection';
import { OrderSection } from './components/OrderSection';
import { LocationSection } from './components/LocationSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { StickyMobileBar } from './components/StickyMobileBar';
import { Toast } from './components/Toast';

export default function App() {
  return (
    <CartProvider>
      <div className="min-h-screen bg-[#0b0c0e] text-[#f5f5f0] flex flex-col selection:bg-amber-500 selection:text-black">
        {/* Top Navigation */}
        <Navbar />

        {/* Main Content Sections */}
        <main className="flex-1 pb-16 md:pb-0">
          <Hero />
          <MenuSection />
          <OffersSection />
          <WhyShawayaSection />
          <AboutSection />
          <OrderSection />
          <LocationSection />
          <ContactSection />
        </main>

        {/* Footer */}
        <Footer />

        {/* Global Cart Drawer */}
        <CartDrawer />

        {/* Sticky Mobile "ORDER NOW" & Cart Bar (<= 15% mobile viewport) */}
        <StickyMobileBar />

        {/* Added-to-cart Toast */}
        <Toast />
      </div>
    </CartProvider>
  );
}
