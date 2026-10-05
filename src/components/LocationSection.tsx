import React, { useState } from 'react';
import {
  MapPin,
  Navigation,
  Clock,
  Car,
  UtensilsCrossed,
  MessageSquare,
  Copy,
  Check,
  ExternalLink,
  ShieldCheck,
  Compass,
  Sparkles,
  Flame,
  Radio,
  Layers,
  Route,
} from 'lucide-react';
import { RESTAURANT_INFO } from '../data/menuData';

type MapTheme = 'dark-gold' | 'obsidian' | 'satellite';

export const LocationSection: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [activeZone, setActiveZone] = useState<'zone1' | 'zone2' | 'zone3'>('zone1');
  const [mapTheme, setMapTheme] = useState<MapTheme>('dark-gold');
  const [showRoutes, setShowRoutes] = useState(true);
  const [showRadar, setShowRadar] = useState(true);

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(RESTAURANT_INFO.address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const deliveryZones = [
    {
      id: 'zone1',
      title: 'Zone 1: Core Area (0 – 3 km)',
      time: '15 – 25 mins',
      fee: 'FREE Delivery',
      desc: 'Stadium Junction, Bypass Road, Markaz, Govindapuram',
      highlight: 'Express Hot-Bag Delivery',
    },
    {
      id: 'zone2',
      title: 'Zone 2: City Belt (3 – 6 km)',
      time: '25 – 40 mins',
      fee: 'FREE above ₹400',
      desc: 'Mavoor Road, Thondayad, Cyberpark, Palayam, Calicut Beach',
      highlight: 'Charcoal Insulated Packaging',
    },
    {
      id: 'zone3',
      title: 'Zone 3: Outer Ring (6 – 12 km)',
      time: '40 – 55 mins',
      fee: 'Nominal ₹30',
      desc: 'Feroke, Ramanattukara, Pantheerankavu, Elathur (Party orders welcome)',
      highlight: 'Pre-order Recommended',
    },
  ];

  const hotspots = [
    { name: 'Stadium Jcn', dist: '0.3 km', time: '2 min', x: '58%', y: '45%' },
    { name: 'Mavoor Road', dist: '2.4 km', time: '6 min', x: '35%', y: '30%' },
    { name: 'Cyberpark', dist: '4.1 km', time: '9 min', x: '75%', y: '68%' },
    { name: 'Calicut Beach', dist: '6.2 km', time: '14 min', x: '22%', y: '65%' },
  ];

  const themeClass = {
    'dark-gold': 'map-theme-dark-gold',
    obsidian: 'map-theme-obsidian',
    satellite: 'map-theme-satellite',
  }[mapTheme];

  return (
    <section id="location" className="py-16 sm:py-24 bg-[#0a0b0e] border-t border-yellow-500/15 relative overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-yellow-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-400/10 border border-yellow-400/30 text-yellow-300 text-xs font-mono font-bold uppercase tracking-wider mb-3">
            <Compass className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '10s' }} />
            <span>Interactive Arabian Grill Locator</span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            LOCATION &amp; DIRECTIONS
          </h2>

          <p className="mt-3 text-sm sm:text-base text-stone-300 leading-relaxed">
            Experience authentic live charcoal rotisserie shawaya dining at our Calicut Bypass outlet, or navigate for fast takeaway pickup.
          </p>
        </div>

        {/* Main Grid: Interactive Map + Location Information Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
          {/* Left Column (7 cols): Premium Animated Map Container */}
          <div className="lg:col-span-7 bg-[#121316] rounded-2xl border border-yellow-500/30 overflow-hidden shadow-2xl flex flex-col group charcoal-glow">
            {/* Map Top Bar with Theme Switcher & HUD Ticker */}
            <div className="p-3.5 sm:p-4 bg-stone-900/95 border-b border-stone-800 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-yellow-400 text-stone-950 flex items-center justify-center font-bold shadow-md shadow-yellow-500/25">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-xs sm:text-sm font-bold text-white flex items-center gap-2">
                    <span>Yamama Shawaya Outlet</span>
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
                    <span className="text-[10px] font-mono text-emerald-400 font-semibold uppercase">Open Now</span>
                  </h3>
                  <p className="text-[11px] text-stone-400 font-mono">Calicut Bypass, Kerala 673016</p>
                </div>
              </div>

              {/* Theme Toggle Pills */}
              <div className="flex items-center gap-1 bg-stone-950 p-1 rounded-xl border border-stone-800 text-[11px]">
                <button
                  type="button"
                  onClick={() => setMapTheme('dark-gold')}
                  className={`px-2.5 py-1 rounded-lg font-mono font-bold transition-all cursor-pointer flex items-center gap-1 ${
                    mapTheme === 'dark-gold'
                      ? 'bg-yellow-400 text-stone-950 shadow-sm'
                      : 'text-stone-400 hover:text-white'
                  }`}
                  title="Luxury Midnight Gold Theme"
                >
                  <Sparkles className="w-3 h-3" />
                  <span>Gold</span>
                </button>
                <button
                  type="button"
                  onClick={() => setMapTheme('obsidian')}
                  className={`px-2.5 py-1 rounded-lg font-mono font-bold transition-all cursor-pointer flex items-center gap-1 ${
                    mapTheme === 'obsidian'
                      ? 'bg-yellow-400 text-stone-950 shadow-sm'
                      : 'text-stone-400 hover:text-white'
                  }`}
                  title="Obsidian Dark Theme"
                >
                  <Layers className="w-3 h-3" />
                  <span>Obsidian</span>
                </button>
                <button
                  type="button"
                  onClick={() => setMapTheme('satellite')}
                  className={`px-2.5 py-1 rounded-lg font-mono font-bold transition-all cursor-pointer flex items-center gap-1 ${
                    mapTheme === 'satellite'
                      ? 'bg-yellow-400 text-stone-950 shadow-sm'
                      : 'text-stone-400 hover:text-white'
                  }`}
                  title="Satellite View Theme"
                >
                  <Radio className="w-3 h-3" />
                  <span>Satellite</span>
                </button>
              </div>
            </div>

            {/* Embedded Google Map Frame with Luxury Dark Theme & Live HUD Animations */}
            <div className="relative aspect-[16/11] sm:aspect-[16/10] w-full bg-stone-950 overflow-hidden select-none">
              {/* Map Iframe with Color Grading Filter */}
              <iframe
                title="Yamama Shawaya Calicut Restaurant Location"
                src="https://maps.google.com/maps?q=Stadium+Junction+Calicut+Bypass+Kerala+India&t=&z=15&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className={`w-full h-full transition-all duration-700 ${themeClass}`}
              />

              {/* Animated Sonar Radar Sweep Layer (Semi-transparent golden scanner) */}
              {showRadar && (
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                  {/* Rotating Radar Sweep Cone */}
                  <div
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full animate-radar-sweep pointer-events-none"
                    style={{
                      background: 'conic-gradient(from 0deg at 50% 50%, rgba(250, 204, 21, 0.22) 0deg, rgba(250, 204, 21, 0.05) 45deg, transparent 70deg)',
                    }}
                  />

                  {/* Concentric Radar Grid Circles */}
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[160px] h-[160px] rounded-full border border-yellow-400/25 pointer-events-none" />
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] h-[320px] rounded-full border border-yellow-400/15 pointer-events-none" />
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] h-[480px] rounded-full border border-yellow-400/10 border-dashed pointer-events-none" />
                </div>
              )}

              {/* Pulsing Beacon Waves radiating from the Restaurant pin */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-10">
                <div className="w-16 h-16 rounded-full border-2 border-yellow-400 bg-yellow-400/20 animate-pulse-ring-1" />
                <div className="w-16 h-16 rounded-full border border-amber-400 bg-amber-400/15 animate-pulse-ring-2" />
                <div className="w-16 h-16 rounded-full border border-orange-400 bg-orange-400/10 animate-pulse-ring-3" />
              </div>

              {/* Animated Floating 3D Restaurant Marker Pin at Center */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-auto">
                <div className="relative animate-pin-bob flex flex-col items-center">
                  {/* Floating Tooltip Card */}
                  <div className="mb-2 px-3 py-1.5 rounded-xl bg-stone-950/95 backdrop-blur-md border border-yellow-400/60 shadow-2xl text-center whitespace-nowrap">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-white">
                      <Flame className="w-3.5 h-3.5 text-orange-400 fill-orange-400 animate-pulse" />
                      <span>Yamama Shawaya Outlet</span>
                    </div>
                    <div className="flex items-center justify-center gap-2 mt-0.5 text-[10px] font-mono text-yellow-300">
                      <span>Live Rotisserie</span>
                      <span>·</span>
                      <span className="text-emerald-400 font-bold">12 PM – 11:30 PM</span>
                    </div>
                  </div>

                  {/* Golden Glowing Badge Pin with Mascot Emblem */}
                  <div className="relative">
                    <div className="w-11 h-11 rounded-full bg-yellow-400 p-0.5 shadow-xl shadow-yellow-500/60 flex items-center justify-center ring-4 ring-black/80">
                      <div className="w-full h-full rounded-full overflow-hidden bg-stone-950">
                        <img
                          src={RESTAURANT_INFO.logo}
                          alt="Yamama Shawaya Mascot"
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                    {/* Pin pointer tip */}
                    <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-yellow-400 mx-auto -mt-0.5" />
                  </div>
                </div>
              </div>

              {/* Animated Connected Routes to City Hotspots */}
              {showRoutes && (
                <div className="absolute inset-0 pointer-events-none z-10">
                  <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                    {/* Animated Route lines from center (50%, 50%) to hotspots */}
                    <line
                      x1="50%"
                      y1="50%"
                      x2="58%"
                      y2="45%"
                      stroke="#facc15"
                      strokeWidth="2"
                      className="animate-route-flow"
                      opacity="0.85"
                    />
                    <line
                      x1="50%"
                      y1="50%"
                      x2="35%"
                      y2="30%"
                      stroke="#fb923c"
                      strokeWidth="2"
                      className="animate-route-flow"
                      opacity="0.7"
                    />
                    <line
                      x1="50%"
                      y1="50%"
                      x2="75%"
                      y2="68%"
                      stroke="#38bdf8"
                      strokeWidth="2"
                      className="animate-route-flow"
                      opacity="0.75"
                    />
                    <line
                      x1="50%"
                      y1="50%"
                      x2="22%"
                      y2="65%"
                      stroke="#34d399"
                      strokeWidth="2"
                      className="animate-route-flow"
                      opacity="0.7"
                    />
                  </svg>

                  {/* Hotspots Labels */}
                  {hotspots.map((spot, idx) => (
                    <div
                      key={idx}
                      className="absolute px-2 py-0.5 rounded-md bg-stone-950/85 backdrop-blur-sm border border-white/15 text-[9.5px] font-mono text-stone-200 pointer-events-none shadow-md flex items-center gap-1"
                      style={{ left: spot.x, top: spot.y, transform: 'translate(-50%, -50%)' }}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-ping inline-block" />
                      <span className="font-bold text-white">{spot.name}</span>
                      <span className="text-yellow-300">({spot.time})</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Top Right Map HUD Controls */}
              <div className="absolute top-3 right-3 z-30 flex flex-col gap-1.5">
                <button
                  type="button"
                  onClick={() => setShowRoutes(!showRoutes)}
                  className={`px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold backdrop-blur-md border transition-all cursor-pointer shadow-lg flex items-center gap-1.5 ${
                    showRoutes
                      ? 'bg-yellow-400 text-stone-950 border-yellow-300'
                      : 'bg-stone-950/80 text-stone-300 border-white/10 hover:text-white'
                  }`}
                >
                  <Route className="w-3 h-3" />
                  <span>{showRoutes ? 'Routes ON' : 'Routes OFF'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setShowRadar(!showRadar)}
                  className={`px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold backdrop-blur-md border transition-all cursor-pointer shadow-lg flex items-center gap-1.5 ${
                    showRadar
                      ? 'bg-cyan-500 text-stone-950 border-cyan-400'
                      : 'bg-stone-950/80 text-stone-300 border-white/10 hover:text-white'
                  }`}
                >
                  <Radio className="w-3 h-3" />
                  <span>{showRadar ? 'Radar ON' : 'Radar OFF'}</span>
                </button>
              </div>

              {/* Bottom Left Animated HUD Ticker */}
              <div className="absolute bottom-3 left-3 z-30 px-3 py-1.5 rounded-xl bg-stone-950/90 backdrop-blur-md border border-yellow-500/30 text-[10.5px] font-mono text-stone-200 flex items-center gap-2 shadow-2xl">
                <span className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse inline-block" />
                <span className="text-yellow-300 font-bold">RADAR LIVE</span>
                <span className="text-stone-500">|</span>
                <span className="hidden sm:inline text-stone-300">GPS: 11.2588° N, 75.7804° E</span>
                <span className="sm:hidden text-stone-300">Calicut Bypass</span>
              </div>
            </div>

            {/* Bottom Quick Action Strip */}
            <div className="p-4 bg-[#141519] border-t border-stone-850 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-3 text-stone-300">
                <span className="flex items-center gap-1.5">
                  <Car className="w-4 h-4 text-yellow-400" />
                  <span>Valet &amp; Ample Parking</span>
                </span>
                <span className="text-stone-600">|</span>
                <span className="flex items-center gap-1.5">
                  <UtensilsCrossed className="w-4 h-4 text-yellow-400" />
                  <span>Family AC &amp; Open Terrace</span>
                </span>
              </div>

              <div className="flex items-center gap-3">
                <a
                  href={RESTAURANT_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-yellow-400 hover:bg-yellow-300 text-stone-950 text-xs font-black transition-all shadow-md cursor-pointer"
                >
                  <Navigation className="w-3.5 h-3.5 stroke-[2.5]" />
                  <span>Open Turn-by-Turn</span>
                  <ExternalLink className="w-3 h-3 ml-0.5" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column (5 cols): Store Address, Hours & Navigation Helper */}
          <div className="lg:col-span-5 space-y-4">
            {/* Physical Address Card with Copy Button */}
            <div className="p-5 sm:p-6 rounded-2xl bg-[#121316] border border-stone-800 hover:border-yellow-500/30 transition-all space-y-3.5 shadow-xl">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase tracking-wider text-yellow-400 font-bold">
                  Official Restaurant Address
                </span>
                <button
                  type="button"
                  onClick={handleCopyAddress}
                  className="inline-flex items-center gap-1 text-[11px] font-mono text-stone-300 hover:text-white px-2 py-1 rounded bg-stone-800 hover:bg-stone-700 transition-colors cursor-pointer"
                  title="Copy full address"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400 font-bold">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Address</span>
                    </>
                  )}
                </button>
              </div>

              <div className="space-y-1 text-left">
                <h4 className="font-heading text-lg font-bold text-white">
                  Yamama Shawaya Restaurant
                </h4>
                <p className="text-xs sm:text-sm text-stone-300 leading-relaxed font-sans">
                  {RESTAURANT_INFO.address}
                </p>
                <p className="text-xs text-stone-400 font-mono pt-1">
                  Landmark: Opposite Stadium Complex, Calicut Bypass Junction
                </p>
              </div>

              <div className="pt-2 flex flex-wrap gap-2.5">
                <a
                  href={RESTAURANT_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-yellow-400 hover:bg-yellow-300 text-stone-950 text-xs font-bold transition-all shadow-md shadow-yellow-500/20 cursor-pointer"
                >
                  <Navigation className="w-3.5 h-3.5 stroke-[2.5]" />
                  <span>Start Navigation</span>
                </a>
                <a
                  href={`https://wa.me/${RESTAURANT_INFO.whatsappNumber}?text=Hi%20Yamama%20Shawaya,%20please%20send%20your%20current%20location%20pin`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-colors cursor-pointer"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Pin on WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Operating Hours & Live Status Card */}
            <div className="p-5 rounded-2xl bg-[#121316] border border-stone-800 space-y-3 shadow-xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-yellow-400 font-bold">
                  <Clock className="w-4 h-4 text-yellow-400" />
                  <span>Kitchen &amp; Dining Hours</span>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-[10px] font-mono font-bold animate-pulse">
                  7 Days A Week
                </span>
              </div>

              <div className="space-y-1.5 text-xs text-stone-300">
                <div className="flex items-center justify-between py-1 border-b border-stone-850">
                  <span className="font-semibold text-white">Daily Rotisserie &amp; Dine-in:</span>
                  <span className="font-mono text-yellow-300 font-bold">{RESTAURANT_INFO.openingHours}</span>
                </div>
                <div className="flex items-center justify-between py-1 border-b border-stone-850">
                  <span className="text-stone-400">Peak Charcoal Batches:</span>
                  <span className="font-mono text-stone-300">1:00 PM &amp; 7:30 PM (Hot off skewers)</span>
                </div>
                <div className="flex items-center justify-between py-1">
                  <span className="text-stone-400">Express Delivery Hotline:</span>
                  <a
                    href={`tel:${RESTAURANT_INFO.phoneClean}`}
                    className="font-mono text-yellow-400 font-bold hover:underline"
                  >
                    {RESTAURANT_INFO.phone}
                  </a>
                </div>
              </div>
            </div>

            {/* Dine-In Amenities Badges */}
            <div className="p-4 rounded-xl bg-stone-900/60 border border-stone-850 grid grid-cols-2 gap-2 text-[11px] text-stone-300 shadow-md">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>100% Halal Certified</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>AC Family Dining Hall</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Live Skewer Viewing</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Express Takeaway Desk</span>
              </div>
            </div>
          </div>
        </div>

        {/* Delivery Coverage Radius Calculator */}
        <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-[#14161a] to-[#0e0f13] border border-yellow-500/25 shadow-xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <span className="text-xs uppercase tracking-widest text-yellow-400 font-mono font-bold block">
                Doorstep Delivery Radius
              </span>
              <h3 className="font-display text-xl sm:text-2xl font-bold text-white mt-1">
                How fast can Yamama Shawaya reach you?
              </h3>
            </div>
            <div className="inline-flex p-1 rounded-xl bg-stone-900 border border-stone-800">
              {deliveryZones.map((zone) => (
                <button
                  key={zone.id}
                  type="button"
                  onClick={() => setActiveZone(zone.id as any)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    activeZone === zone.id
                      ? 'bg-yellow-400 text-stone-950 shadow-md'
                      : 'text-stone-400 hover:text-white'
                  }`}
                >
                  {zone.id === 'zone1' ? '0–3 km' : zone.id === 'zone2' ? '3–6 km' : '6–12 km'}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {deliveryZones.map((zone) => {
              const isSelected = activeZone === zone.id;

              return (
                <div
                  key={zone.id}
                  onClick={() => setActiveZone(zone.id as any)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-yellow-400/10 border-yellow-400/50 shadow-lg shadow-yellow-500/10'
                      : 'bg-stone-900/60 border-stone-800 hover:border-yellow-500/30'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-white">{zone.title}</span>
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold ${
                      zone.fee.includes('FREE')
                        ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/30'
                        : 'bg-stone-800 text-stone-300'
                    }`}>
                      {zone.fee}
                    </span>
                  </div>

                  <p className="text-xs text-stone-300 mb-2 leading-relaxed">
                    {zone.desc}
                  </p>

                  <div className="pt-2 border-t border-stone-850 flex items-center justify-between text-[11px] font-mono">
                    <span className="text-stone-400">ETA: {zone.time}</span>
                    <span className="text-yellow-400 font-semibold">{zone.highlight}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
