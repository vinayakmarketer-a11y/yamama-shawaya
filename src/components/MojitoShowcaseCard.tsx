import React, { useState } from 'react';
import { Plus, Minus, GlassWater, Sparkles, Check } from 'lucide-react';
import { BENE_TIBI_MOJITOS, CLASSIC_MOJITOS, MOJITO_SHARED_IMAGE } from '../data/menuData';
import { useCart } from '../context/CartContext';
import { MenuItem } from '../types/menu';

export const MojitoShowcaseCard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'bene-tibi' | 'classic'>('bene-tibi');
  const { items, addItem, updateQuantity } = useCart();

  const currentList = activeTab === 'bene-tibi' ? BENE_TIBI_MOJITOS : CLASSIC_MOJITOS;

  const getCartQuantity = (itemId: string) => {
    const found = items.find((i) => i.menuItemId === itemId);
    return found ? found.quantity : 0;
  };

  const getCartItemId = (itemId: string) => {
    const found = items.find((i) => i.menuItemId === itemId);
    return found ? found.cartId : itemId;
  };

  return (
    <div className="col-span-full rounded-2xl bg-[#111216] border border-yellow-500/25 overflow-hidden shadow-2xl">
      <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
        {/* The single Mojito Image Showcase with Live Ambient Animation (Left column on desktop) */}
        <div className="lg:col-span-5 relative aspect-[16/10] lg:aspect-auto min-h-[320px] lg:min-h-full overflow-hidden bg-stone-900 group">
          {/* Animated Ken Burns Breathing Image */}
          <img
            src={MOJITO_SHARED_IMAGE}
            alt="Handcrafted Bene Tibi and Classic fruit mojitos with crushed ice and fresh mint"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover animate-mojito-zoom group-hover:scale-110 transition-transform duration-700 ease-out"
          />

          {/* Periodic specular shimmer sweep across the condensation */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-0 bottom-0 w-1/2 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer-sweep pointer-events-none" />
          </div>

          {/* Rising effervescent fizz bubbles floating upward over the cold glasses */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
            <div className="absolute bottom-6 left-[18%] w-2 h-2 rounded-full bg-cyan-200/80 border border-white/70 shadow-[0_0_6px_rgba(103,232,249,0.9)] animate-bubble-1" />
            <div className="absolute bottom-10 left-[36%] w-3 h-3 rounded-full bg-cyan-100/70 border border-white/80 shadow-[0_0_8px_rgba(103,232,249,0.9)] animate-bubble-2" />
            <div className="absolute bottom-4 left-[52%] w-1.5 h-1.5 rounded-full bg-yellow-200/80 border border-white/70 shadow-[0_0_6px_rgba(254,240,138,0.9)] animate-bubble-3" />
            <div className="absolute bottom-8 left-[70%] w-2.5 h-2.5 rounded-full bg-cyan-200/80 border border-white/70 shadow-[0_0_7px_rgba(103,232,249,0.9)] animate-bubble-4" />
            <div className="absolute bottom-5 left-[84%] w-2 h-2 rounded-full bg-emerald-200/80 border border-white/70 shadow-[0_0_6px_rgba(167,243,208,0.9)] animate-bubble-5" />
            <div className="absolute bottom-12 left-[44%] w-2 h-2 rounded-full bg-white/85 shadow-[0_0_7px_rgba(255,255,255,0.95)] animate-bubble-6" />
          </div>

          <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-[#111216] via-black/35 to-transparent z-10" />

          {/* Floating Showcase Overlay */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-20">
            <span className="px-3 py-1 rounded-md bg-stone-950/90 backdrop-blur-md border border-yellow-400/30 text-[11px] font-mono font-bold tracking-wider text-yellow-300">
              Artisanal Beverage Lounge
            </span>
            <span className="text-[11px] text-stone-200 bg-black/70 px-2 py-0.5 rounded backdrop-blur-sm border border-white/10">
              19 Flavours
            </span>
          </div>

          <div className="absolute bottom-5 left-5 right-5 text-left z-20">
            {/* Live animated chill indicator */}
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-cyan-950/85 backdrop-blur-md border border-cyan-400/40 text-[10px] font-mono text-cyan-200 animate-chill-pulse shadow-md mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping inline-block" />
              <span>Effervescent · Ice Cold -2°C</span>
            </div>

            <h3 className="font-display text-2xl font-bold text-white leading-tight">
              Bene Tibi & Classic Mojitos
            </h3>
            <p className="mt-1 text-xs text-stone-300 line-clamp-2">
              Freshly muddled mint leaves, crushed crystal ice, natural fruit reductions, and effervescent sparkling soda.
            </p>
          </div>
        </div>

        {/* The Flavours Selector & Ordering Panel (Right column on desktop) */}
        <div className="lg:col-span-7 p-5 sm:p-7 flex flex-col justify-between space-y-5 bg-[#111216]">
          {/* Header & Sub-category Tabs */}
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-stone-850">
              <div>
                <span className="text-xs uppercase tracking-widest text-yellow-400 font-mono font-bold block">
                  Select Your Refreshment
                </span>
                <span className="text-xs text-stone-400">
                  Prepared ice-cold to balance the hot smoky Shawaya
                </span>
              </div>

              {/* Segmented Tab Switcher (Page 1 vs Page 2) */}
              <div className="flex p-1 bg-stone-900 rounded-xl border border-stone-800 shrink-0">
                <button
                  type="button"
                  onClick={() => setActiveTab('bene-tibi')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    activeTab === 'bene-tibi'
                      ? 'bg-yellow-400 text-stone-950 shadow-md shadow-yellow-500/20'
                      : 'text-stone-400 hover:text-white'
                  }`}
                >
                  Page 1: Bene Tibi (₹120)
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('classic')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    activeTab === 'classic'
                      ? 'bg-yellow-400 text-stone-950 shadow-md shadow-yellow-500/20'
                      : 'text-stone-400 hover:text-white'
                  }`}
                >
                  Page 2: Classic (₹80)
                </button>
              </div>
            </div>

            {/* Dynamic Animated Status Banner when on Page 2 (Classic) */}
            {activeTab === 'classic' ? (
              <div className="mt-3 px-3.5 py-2 rounded-xl bg-gradient-to-r from-cyan-950/80 via-blue-950/60 to-cyan-950/80 border border-cyan-400/40 flex items-center justify-between text-xs animate-fade-in-up shadow-lg">
                <span className="flex items-center gap-2 text-cyan-200 font-semibold">
                  <Sparkles className="w-4 h-4 text-cyan-300 animate-ice-glint shrink-0" />
                  <span>Showing Page 2: 9 Chilled Classic Coolers</span>
                </span>
                <span className="font-mono text-cyan-300 font-bold bg-cyan-900/60 px-2 py-0.5 rounded border border-cyan-400/30">
                  ₹80 All Flavours
                </span>
              </div>
            ) : (
              <div className="mt-3 px-3.5 py-2 rounded-xl bg-gradient-to-r from-amber-950/70 via-stone-900 to-amber-950/70 border border-yellow-500/30 flex items-center justify-between text-xs animate-fade-in-up">
                <span className="flex items-center gap-2 text-yellow-200 font-semibold">
                  <Sparkles className="w-4 h-4 text-yellow-400 animate-ice-glint shrink-0" />
                  <span>Showing Page 1: 10 Bene Tibi Signature Infusions</span>
                </span>
                <span className="font-mono text-yellow-400 font-bold bg-yellow-400/10 px-2 py-0.5 rounded border border-yellow-500/30">
                  ₹120 / Mumbai ₹220
                </span>
              </div>
            )}

            {/* Flavours Grid with Animated Staggered Page Transition */}
            <div
              key={activeTab}
              className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-[380px] overflow-y-auto pr-1"
            >
              {currentList.map((mojito, idx) => {
                const qty = getCartQuantity(mojito.id);
                const cartId = getCartItemId(mojito.id);

                return (
                  <div
                    key={mojito.id}
                    style={{ animationDelay: `${idx * 40}ms` }}
                    className={`p-3 rounded-xl border transition-all flex items-center justify-between gap-2.5 animate-fade-in-up hover:scale-[1.01] ${
                      qty > 0
                        ? 'bg-yellow-400/10 border-yellow-400/50 shadow-md shadow-yellow-500/10'
                        : 'bg-stone-900/60 border-stone-850 hover:border-yellow-500/40 hover:bg-stone-900 hover:shadow-lg'
                    }`}
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5">
                        <h4 className="text-xs font-bold text-white truncate">
                          {mojito.name}
                        </h4>
                        {mojito.highlight?.includes('220') && (
                          <span className="text-[9px] font-mono px-1 py-0.2 rounded bg-yellow-400/20 text-yellow-300 font-bold animate-pulse">
                            Signature
                          </span>
                        )}
                        {activeTab === 'classic' && (
                          <span className="text-[9px] font-mono text-cyan-300/80">
                            · Classic
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-stone-400 truncate">
                        {mojito.description}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <span className="font-mono text-xs font-black text-yellow-400 tabular-nums">
                        ₹{mojito.singlePrice}
                      </span>

                      {qty > 0 ? (
                        <div className="flex items-center gap-1 bg-stone-950 px-1.5 py-0.5 rounded-lg border border-yellow-500/30">
                          <button
                            type="button"
                            onClick={() => updateQuantity(cartId, qty - 1)}
                            className="text-stone-400 hover:text-white p-0.5"
                            aria-label={`Decrease ${mojito.name}`}
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="font-mono text-[11px] text-white px-1 font-bold tabular-nums">
                            {qty}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(cartId, qty + 1)}
                            className="text-stone-400 hover:text-white p-0.5"
                            aria-label={`Increase ${mojito.name}`}
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => addItem(mojito, 'full', 1)}
                          className="flex items-center justify-center w-7 h-7 rounded-lg bg-stone-800 hover:bg-yellow-400 text-stone-300 hover:text-stone-950 transition-colors cursor-pointer"
                          aria-label={`Add ${mojito.name} to cart`}
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick summary footer inside Mojito showcase */}
          <div className="pt-3 border-t border-stone-850 flex items-center justify-between text-xs text-stone-400">
            <span className="flex items-center gap-1 text-stone-300">
              <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
              <span>Single shared master image · Handcrafted fresh per glass</span>
            </span>
            <span className="font-mono text-yellow-400 font-bold">
              {activeTab === 'bene-tibi' ? '10 Bene Tibi Flavours' : '9 Classic Flavours'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
