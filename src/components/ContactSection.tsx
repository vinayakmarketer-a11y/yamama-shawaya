import React from 'react';
import { MapPin, Phone, MessageSquare, Instagram, Clock, ExternalLink } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/menuData';

export const ContactSection: React.FC = () => {
  return (
    <section id="contact" className="py-16 sm:py-24 bg-[#0e0f13] border-t border-stone-850 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-amber-400 mb-2">
            <span>Find & Connect</span>
            <span aria-hidden="true">·</span>
            <span>Visit Us</span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            LOCATION & CONTACT
          </h2>

          <p className="mt-3 text-sm text-stone-400 leading-relaxed">
            Dine-in at our ambient Arabian outdoor grill or order quick delivery straight to your doorstep.
          </p>
        </div>

        {/* Contact Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {/* Card 1: Location & Google Maps */}
          <div className="bg-[#121316] p-6 rounded-2xl border border-stone-800 flex flex-col justify-between space-y-4 card-hover-effect">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center border border-amber-500/20">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-heading text-base font-bold text-white">Restaurant Location</h3>
                <p className="text-xs text-stone-400 mt-1 leading-relaxed">
                  {RESTAURANT_INFO.address}
                </p>
              </div>
            </div>

            <a
              href={RESTAURANT_INFO.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 py-2 px-3 text-xs font-semibold text-stone-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors"
            >
              <span>Open in Google Maps</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Card 2: Phone & Hotline */}
          <div className="bg-[#121316] p-6 rounded-2xl border border-stone-800 flex flex-col justify-between space-y-4 card-hover-effect">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center border border-amber-500/20">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-heading text-base font-bold text-white">Phone Reservations</h3>
                <p className="text-xs text-stone-400 mt-1 leading-relaxed">
                  Call our live desk directly for orders, table bookings and large bulk takeaway requests.
                </p>
              </div>
            </div>

            <a
              href={`tel:${RESTAURANT_INFO.phoneClean}`}
              className="inline-flex items-center justify-center gap-2 py-2 px-3 text-xs font-semibold text-stone-200 bg-stone-900 hover:bg-stone-850 border border-stone-700 rounded-lg transition-colors font-mono"
            >
              <Phone className="w-3.5 h-3.5 text-amber-400" />
              <span>{RESTAURANT_INFO.phone}</span>
            </a>
          </div>

          {/* Card 3: WhatsApp Ordering */}
          <div className="bg-[#121316] p-6 rounded-2xl border border-stone-800 flex flex-col justify-between space-y-4 card-hover-effect">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/20">
                <MessageSquare className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-heading text-base font-bold text-white">WhatsApp Orders</h3>
                <p className="text-xs text-stone-400 mt-1 leading-relaxed">
                  Fast WhatsApp responses with live kitchen status, location pin sharing, and digital billing.
                </p>
              </div>
            </div>

            <a
              href={`https://wa.me/${RESTAURANT_INFO.whatsappNumber}?text=Hi%20Al-Shawaya,%20I%20would%20like%20to%20order`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 py-2 px-3 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-500 rounded-lg transition-colors"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>

          {/* Card 4: Hours & Instagram */}
          <div className="bg-[#121316] p-6 rounded-2xl border border-stone-800 flex flex-col justify-between space-y-4 card-hover-effect">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center border border-amber-500/20">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-heading text-base font-bold text-white">Opening Hours</h3>
                <p className="text-xs text-amber-400 font-mono mt-1 font-semibold">
                  {RESTAURANT_INFO.openingHours}
                </p>
                <p className="text-[11px] text-stone-400 mt-1">
                  Open every day · Dine-in, Takeaway & Delivery
                </p>
              </div>
            </div>

            <a
              href={RESTAURANT_INFO.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 py-2 px-3 text-xs font-semibold text-stone-200 bg-stone-900 hover:bg-stone-850 border border-stone-700 rounded-lg transition-colors"
            >
              <Instagram className="w-3.5 h-3.5 text-pink-400" />
              <span>{RESTAURANT_INFO.instagramHandle}</span>
            </a>
          </div>
        </div>

        {/* Ambient Map & Delivery Banner */}
        <div className="p-6 rounded-2xl bg-[#121316] border border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-emerald-500 animate-ping" />
            <div>
              <h4 className="text-sm font-bold text-white">Charcoal Kitchen Active & Delivering</h4>
              <p className="text-xs text-stone-400">{RESTAURANT_INFO.deliveryZones}</p>
            </div>
          </div>
          <a
            href={`tel:${RESTAURANT_INFO.phoneClean}`}
            className="px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-stone-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-colors whitespace-nowrap"
          >
            Direct Call to Order
          </a>
        </div>
      </div>
    </section>
  );
};
