import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { MenuItem, PortionSize } from '../types/menu';
import { useCart } from '../context/CartContext';

interface MenuCardProps {
  item: MenuItem;
}

export const MenuCard: React.FC<MenuCardProps> = ({ item }) => {
  const { items, addItem, updateQuantity } = useCart();
  const [selectedPortion, setSelectedPortion] = useState<PortionSize>('full');

  // Compute current display price
  const currentPrice = item.isPortioned && item.prices
    ? item.prices[selectedPortion]
    : item.singlePrice ?? 0;

  // Determine cart item id for active selection
  const cartItemId = item.isPortioned ? `${item.id}-${selectedPortion}` : item.id;
  const existingCartItem = items.find((i) => i.cartId === cartItemId);

  const handleAddToCart = () => {
    addItem(item, selectedPortion, 1);
  };

  return (
    <article className="group bg-[#111216] rounded-2xl border border-stone-800/90 hover:border-yellow-400/50 overflow-hidden flex flex-col justify-between card-hover-effect transition-colors">
      {/* Top Image Container */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-stone-900">
        <img
          src={item.image}
          alt={item.name}
          referrerPolicy="no-referrer"
          loading="lazy"
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#111216] via-transparent to-black/30" />

        {/* Quiet highlight label */}
        {item.highlight && (
          <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-stone-950/85 backdrop-blur-md border border-yellow-400/30 text-[11px] font-bold tracking-wide text-yellow-300 shadow-md">
            {item.highlight}
          </div>
        )}

        {/* Serves info for portioned items */}
        {item.isPortioned && item.servesInfo && (
          <div className="absolute bottom-2.5 right-3 text-[11px] font-mono text-stone-200 bg-black/70 px-2 py-0.5 rounded backdrop-blur-sm border border-white/5">
            {item.servesInfo[selectedPortion]}
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          {/* Header & Arabic Subtitle */}
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="font-heading text-lg font-bold text-white group-hover:text-yellow-400 transition-colors">
                {item.name}
              </h3>
              {item.arabicName && (
                <span className="block text-xs text-yellow-500/80 font-serif">
                  {item.arabicName}
                </span>
              )}
            </div>
            {/* Live Price Tag */}
            <div className="text-right shrink-0">
              <span className="font-mono text-xl font-black text-yellow-400 tabular-nums">
                ₹{currentPrice}
              </span>
            </div>
          </div>

          {/* Description */}
          <p className="mt-2 text-xs text-stone-400 line-clamp-2 leading-relaxed">
            {item.description}
          </p>
        </div>

        {/* Portion Selector (Full / Half / Quarter) if Portioned */}
        {item.isPortioned && item.prices && (
          <div className="pt-2 border-t border-stone-800/80">
            <div className="flex items-center justify-between text-[11px] text-stone-400 mb-1.5">
              <span>Select Size:</span>
              <span className="font-mono text-yellow-400 font-bold">
                ₹{item.prices[selectedPortion]}
              </span>
            </div>

            {/* Segmented Portion Selector Tabs */}
            <div className="grid grid-cols-3 gap-1.5 p-1 bg-stone-900 rounded-lg border border-stone-800">
              {(['quarter', 'half', 'full'] as PortionSize[]).map((size) => {
                const isSelected = selectedPortion === size;
                const sizePrice = item.prices![size];
                return (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setSelectedPortion(size)}
                    className={`py-1.5 px-2 rounded text-xs font-semibold transition-all text-center cursor-pointer ${
                      isSelected
                        ? 'bg-yellow-400 text-stone-950 font-bold shadow-md shadow-yellow-500/20'
                        : 'text-stone-400 hover:text-stone-200 hover:bg-stone-800/60'
                    }`}
                  >
                    <span className="block capitalize">{size}</span>
                    <span className="block text-[10px] font-mono opacity-90 tabular-nums">
                      ₹{sizePrice}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Bottom Cart Action */}
        <div className="pt-1 flex items-center justify-between gap-3">
          {existingCartItem ? (
            <div className="w-full flex items-center justify-between p-1 bg-stone-900 rounded-xl border border-yellow-400/40">
              <button
                type="button"
                onClick={() => updateQuantity(cartItemId, existingCartItem.quantity - 1)}
                className="w-9 h-8 flex items-center justify-center rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 transition-colors cursor-pointer"
                aria-label="Decrease quantity"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>

              <div className="flex flex-col items-center">
                <span className="font-mono text-sm font-bold text-white tabular-nums">
                  {existingCartItem.quantity} in cart
                </span>
                <span className="text-[10px] font-mono text-yellow-400 font-bold tabular-nums">
                  ₹{existingCartItem.quantity * currentPrice}
                </span>
              </div>

              <button
                type="button"
                onClick={() => updateQuantity(cartItemId, existingCartItem.quantity + 1)}
                className="w-9 h-8 flex items-center justify-center rounded-lg bg-yellow-400 hover:bg-yellow-300 text-stone-950 transition-colors cursor-pointer"
                aria-label="Increase quantity"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={handleAddToCart}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-black uppercase tracking-wider text-stone-950 bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-500 hover:from-yellow-300 hover:to-amber-300 rounded-xl transition-all shadow-md shadow-yellow-500/20 active:scale-[0.98] cursor-pointer"
            >
              <Plus className="w-4 h-4 stroke-[2.5]" />
              <span>Add to Cart · ₹{currentPrice}</span>
            </button>
          )}
        </div>
      </div>
    </article>
  );
};
