import React, { useState } from 'react';
import { Tag, Plus, CheckCircle2, Sparkles, ArrowRight, Flame, Percent, Copy, Check } from 'lucide-react';
import { PROMOTIONAL_OFFERS } from '../data/menuData';
import { useCart } from '../context/CartContext';
import { ComboOffer } from '../types/menu';

export const OffersSection: React.FC = () => {
  const { addCustomItem, openCart, applyCoupon, availableCoupons } = useCart();
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleCopyAndApply = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    applyCoupon(code);
    openCart();
    setTimeout(() => setCopiedCode(null), 2500);
  };

  const handleAddCombo = (combo: ComboOffer) => {
    addCustomItem({
      menuItemId: combo.id,
      name: combo.title,
      unitPrice: combo.price,
      quantity: 1,
      image: combo.image,
    });
  };

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="offers" className="py-16 sm:py-24 bg-[#0e0f13] border-t border-stone-850 relative overflow-hidden">
      {/* Subtle glow */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-orange-600/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-amber-400">
              <span>Feast & Save</span>
              <span aria-hidden="true">·</span>
              <span>Chef's Pairings</span>
            </div>
            <h2 className="mt-2 font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
              SPECIAL SHAWAYA COMBOS
            </h2>
          </div>
          <p className="text-sm text-stone-400 max-w-md">
            Carefully curated Arabian dining bundles pairing our charcoal rotisserie chicken with steaming hot Kubus, Bishawari rice and chilled artisan mojitos.
          </p>
        </div>

        {/* Featured Large Combo Banner with Text & Image Animations */}
        <div className="mb-10 rounded-2xl overflow-hidden bg-gradient-to-r from-[#181a1f] to-[#121316] border border-yellow-500/30 hover:border-yellow-400/60 grid grid-cols-1 lg:grid-cols-12 items-stretch group shadow-2xl charcoal-glow transition-all">
          {/* Left Text Column with Animated Shimmer & Inclusions */}
          <div className="lg:col-span-6 p-6 sm:p-10 space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center gap-1.5 text-xs uppercase tracking-widest text-yellow-400 font-mono font-bold">
                <Flame className="w-4 h-4 text-orange-400 fill-orange-400 animate-pulse shrink-0" />
                <span>The Grand Gathering Platter · Serves 4-5</span>
              </div>

              <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
                The Sultan Shawaya Feast
              </h3>

              {/* Animated Text: Complete Arabian Banquet with Shimmer Header & Visual Pills */}
              <div className="space-y-2.5 pt-1">
                <div className="font-heading text-sm sm:text-base font-bold animate-text-shimmer leading-snug">
                  Complete Arabian banquet:
                </div>
                <p className="text-xs sm:text-sm text-stone-200 leading-relaxed font-medium">
                  1 Full Charcoal Shawaya Chicken + 1 Full Bishawari Spiced Rice + 4 Fresh Kubus + Double Garlic Toum &amp; Pickles + 2 Bene Tibi Mojitos of your choice.
                </p>

                {/* Animated Inclusions Ribbon Strip */}
                <div className="pt-2 flex flex-wrap gap-2 text-[11px] font-mono">
                  <span className="px-2.5 py-1 rounded-lg bg-stone-900/90 border border-yellow-500/30 text-yellow-300 font-semibold shadow-sm hover:border-yellow-400 transition-colors">
                    🍗 1 Full Shawaya Chicken
                  </span>
                  <span className="px-2.5 py-1 rounded-lg bg-stone-900/90 border border-yellow-500/30 text-yellow-300 font-semibold shadow-sm hover:border-yellow-400 transition-colors">
                    🍚 1 Full Bishawari Rice
                  </span>
                  <span className="px-2.5 py-1 rounded-lg bg-stone-900/90 border border-yellow-500/30 text-yellow-300 font-semibold shadow-sm hover:border-yellow-400 transition-colors">
                    🫓 4 Fresh Kubus
                  </span>
                  <span className="px-2.5 py-1 rounded-lg bg-stone-900/90 border border-yellow-500/30 text-yellow-300 font-semibold shadow-sm hover:border-yellow-400 transition-colors">
                    🧄 2x Toum &amp; Pickles
                  </span>
                  <span className="px-2.5 py-1 rounded-lg bg-cyan-950/70 border border-cyan-400/40 text-cyan-200 font-semibold shadow-sm hover:border-cyan-300 transition-colors animate-pulse">
                    🍹 2 Bene Tibi Mojitos
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-stone-800/80">
              <div className="flex items-baseline gap-3 mb-4">
                <span className="font-mono text-3xl font-black text-yellow-400 tabular-nums">
                  ₹1,150
                </span>
                <span className="font-mono text-base text-stone-500 line-through tabular-nums">
                  ₹1,300
                </span>
                <span className="text-xs text-emerald-400 font-bold font-mono px-2 py-0.5 rounded bg-emerald-950/60 border border-emerald-500/30">
                  Save ₹150 Instantly
                </span>
              </div>

              <div className="flex flex-wrap gap-4">
                <button
                  type="button"
                  onClick={() => handleAddCombo(PROMOTIONAL_OFFERS[0])}
                  className="inline-flex items-center gap-2 px-6 py-3.5 text-xs font-black uppercase tracking-wider text-stone-950 bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-500 hover:from-yellow-300 hover:to-amber-300 rounded-xl transition-all shadow-xl shadow-yellow-500/25 active:scale-[0.98] cursor-pointer"
                >
                  <Plus className="w-4 h-4 stroke-[2.5]" />
                  <span>Add Sultan Feast to Cart</span>
                </button>
                <button
                  type="button"
                  onClick={() => scrollTo('order')}
                  className="inline-flex items-center gap-2 px-5 py-3.5 text-xs font-bold text-stone-200 hover:text-white bg-stone-900 hover:bg-stone-850 border border-stone-700 hover:border-yellow-500/40 rounded-xl transition-colors cursor-pointer"
                >
                  <span>Quick Checkout</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Right Image Column with Live Animated Ken Burns Zoom, Rising Embers & Shimmer */}
          <div className="lg:col-span-6 relative aspect-[16/10] lg:aspect-auto lg:h-full min-h-[340px] overflow-hidden bg-stone-950">
            {/* Animated Ken Burns Breathing Image */}
            <img
              src="/src/assets/images/shawaya_combos_feast_1790867445558.jpg"
              alt="The Sultan Shawaya Feast Arabian Platter"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center animate-mojito-zoom group-hover:scale-110 transition-transform duration-700 ease-out"
            />

            {/* Specular Golden Shimmer Sweep across the hot feast */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute top-0 bottom-0 w-1/2 bg-gradient-to-r from-transparent via-amber-200/20 to-transparent animate-shimmer-sweep pointer-events-none" />
            </div>

            {/* Rising Charcoal Ember Sparks floating up from the hot grill */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
              <div className="absolute bottom-6 left-[22%] w-2 h-2 rounded-full bg-amber-400 border border-yellow-200 shadow-[0_0_8px_rgba(251,191,36,0.95)] animate-ember-1" />
              <div className="absolute bottom-10 left-[42%] w-2.5 h-2.5 rounded-full bg-orange-500 border border-amber-300 shadow-[0_0_9px_rgba(249,115,22,0.95)] animate-ember-2" />
              <div className="absolute bottom-4 left-[62%] w-1.5 h-1.5 rounded-full bg-yellow-300 border border-white shadow-[0_0_7px_rgba(253,224,71,0.95)] animate-ember-3" />
              <div className="absolute bottom-8 left-[78%] w-2 h-2 rounded-full bg-orange-400 border border-yellow-300 shadow-[0_0_8px_rgba(251,146,60,0.95)] animate-ember-4" />
              <div className="absolute bottom-12 left-[50%] w-2 h-2 rounded-full bg-amber-300 border border-orange-200 shadow-[0_0_8px_rgba(245,158,11,0.95)] animate-ember-5" />
            </div>

            {/* Scrim Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-[#181a1f] via-transparent to-transparent z-10" />

            {/* Floating Animated Badges on Image */}
            <div className="absolute top-4 right-4 z-20 px-3.5 py-1.5 rounded-full bg-stone-950/90 backdrop-blur-md border border-yellow-400/40 text-[11px] font-mono text-yellow-300 font-bold flex items-center gap-1.5 animate-banquet-glow shadow-xl">
              <Flame className="w-3.5 h-3.5 text-orange-400 fill-orange-400 animate-pulse shrink-0" />
              <span>Charcoal Roasted Hot Platter</span>
            </div>

            <div className="absolute bottom-4 left-4 z-20 px-3 py-1 rounded-lg bg-black/80 backdrop-blur-md border border-white/10 text-[10.5px] font-mono text-stone-200">
              🔥 Prepared fresh on open embers
            </div>
          </div>
        </div>

        {/* 3 Secondary Combos (Chicken+Kubus, Chicken+Rice, Shawaya+Mojito) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {PROMOTIONAL_OFFERS.slice(1).map((combo) => {
            const isMojitoCard = combo.id === 'combo-shawaya-mojito';

            return (
              <div
                key={combo.id}
                className="bg-[#121316] rounded-2xl border border-stone-800/90 hover:border-yellow-400/40 overflow-hidden flex flex-col justify-between card-hover-effect group transition-colors"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-stone-900">
                  <img
                    src={combo.image}
                    alt={combo.title}
                    referrerPolicy="no-referrer"
                    className={`w-full h-full object-cover transition-transform duration-750 ${
                      isMojitoCard
                        ? 'animate-mojito-zoom group-hover:scale-110'
                        : 'group-hover:scale-105'
                    }`}
                  />

                  {/* For Mojito Combo: Live Ambient Shimmer Sweep & Effervescent Fizz Bubbles */}
                  {isMojitoCard && (
                    <>
                      <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        <div className="absolute top-0 bottom-0 w-1/2 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer-sweep pointer-events-none" />
                      </div>
                      <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
                        <div className="absolute bottom-3 left-[20%] w-1.5 h-1.5 rounded-full bg-cyan-200/80 border border-white/60 shadow-[0_0_5px_rgba(103,232,249,0.9)] animate-bubble-1" />
                        <div className="absolute bottom-5 left-[45%] w-2 h-2 rounded-full bg-cyan-100/70 border border-white/70 shadow-[0_0_6px_rgba(103,232,249,0.9)] animate-bubble-2" />
                        <div className="absolute bottom-2 left-[75%] w-1.5 h-1.5 rounded-full bg-yellow-200/80 border border-white/60 shadow-[0_0_5px_rgba(254,240,138,0.9)] animate-bubble-4" />
                      </div>
                    </>
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-[#121316] via-transparent to-black/20" />
                  <div className="absolute top-3 left-3 text-[11px] font-mono font-bold text-yellow-400 bg-stone-950/85 px-2.5 py-1 rounded backdrop-blur-sm border border-yellow-500/20">
                    {combo.subtitle}
                  </div>

                  {isMojitoCard && (
                    <div className="absolute bottom-2.5 right-3 px-2 py-0.5 rounded-full bg-cyan-950/85 border border-cyan-400/40 text-[9.5px] font-mono text-cyan-200 animate-chill-pulse shadow-sm">
                      ❄️ Ice Cold Duo
                    </div>
                  )}
                </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h4 className="font-heading text-lg font-bold text-white">
                    {combo.title}
                  </h4>
                  <p className="mt-1 text-xs text-stone-400 leading-relaxed">
                    {combo.description}
                  </p>

                  <ul className="mt-3 space-y-1 text-[11px] text-stone-300">
                    {combo.itemsIncluded.map((feat, idx) => (
                      <li key={idx} className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-3 border-t border-stone-800 flex items-center justify-between">
                  <div className="flex items-baseline gap-2">
                    <span className="font-mono text-xl font-black text-yellow-400 tabular-nums">
                      ₹{combo.price}
                    </span>
                    {combo.originalPrice && (
                      <span className="font-mono text-xs text-stone-500 line-through tabular-nums">
                        ₹{combo.originalPrice}
                      </span>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() => handleAddCombo(combo)}
                    className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-black uppercase tracking-wider text-stone-950 bg-yellow-400 hover:bg-yellow-300 rounded-lg transition-colors cursor-pointer shadow-sm shadow-yellow-500/20"
                  >
                    <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                    <span>Add Combo</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
        </div>

        {/* Live Active Promotional Vouchers & Discount Strip */}
        <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-[#141519] via-[#101115] to-[#141519] border border-yellow-500/25 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-yellow-400">
                <Percent className="w-4 h-4 text-yellow-400" />
                <span>Today's Exclusive Dining Vouchers</span>
              </div>
              <h3 className="font-display text-xl sm:text-2xl font-bold text-white mt-0.5">
                Apply Coupons for Instant Savings
              </h3>
            </div>
            <span className="text-xs text-emerald-400 font-mono bg-emerald-950/80 border border-emerald-500/30 px-3 py-1 rounded-full font-bold self-start sm:self-auto">
              🛵 Free Delivery On Orders Above ₹300
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {availableCoupons.map((coupon) => (
              <div
                key={coupon.code}
                className="p-4 rounded-xl bg-stone-900/90 border border-stone-800 hover:border-yellow-400/50 flex flex-col justify-between space-y-3 transition-all group"
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono text-sm font-black text-yellow-400">
                      {coupon.code}
                    </span>
                    {coupon.badge && (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-yellow-400/20 text-yellow-300 font-bold">
                        {coupon.badge}
                      </span>
                    )}
                  </div>
                  <h4 className="text-xs font-bold text-white mt-1">
                    {coupon.title}
                  </h4>
                  <p className="text-[11px] text-stone-400 mt-0.5 leading-relaxed">
                    {coupon.desc}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => handleCopyAndApply(coupon.code)}
                  className="w-full flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-bold text-stone-950 bg-yellow-400 hover:bg-yellow-300 rounded-lg transition-colors cursor-pointer shadow-sm"
                >
                  {copiedCode === coupon.code ? (
                    <>
                      <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                      <span>Copied &amp; Applied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Apply Coupon</span>
                    </>
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
