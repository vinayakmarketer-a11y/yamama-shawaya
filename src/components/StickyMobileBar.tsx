import React from 'react';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const StickyMobileBar: React.FC = () => {
  const { totalItemsCount, subtotal, openCart } = useCart();

  const handleOrderClick = () => {
    const el = document.getElementById('order');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      openCart();
    }
  };

  return (
    <aside aria-label="Quick mobile order bar" className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0b0c0e]/95 backdrop-blur-md border-t border-white/10 px-4 py-2.5 max-h-[58px]">
      <div className="max-w-md mx-auto flex items-center justify-between gap-3">
        {/* Cart Quick Info */}
        <button
          onClick={openCart}
          className="flex items-center gap-2 text-left cursor-pointer"
        >
          <div className="relative">
            <ShoppingBag className="w-5 h-5 text-yellow-400 stroke-[2.5]" />
            {totalItemsCount > 0 && (
              <span className="absolute -top-1.5 -right-2 flex items-center justify-center min-w-4 h-4 px-1 text-[10px] font-black text-stone-950 bg-yellow-400 rounded-full tabular-nums shadow-sm">
                {totalItemsCount}
              </span>
            )}
          </div>
          <div>
            <span className="text-[11px] text-stone-400 block leading-tight">
              {totalItemsCount === 0 ? 'Cart Empty' : `${totalItemsCount} Items`}
            </span>
            <span className="font-mono text-xs font-black text-yellow-400 tabular-nums block">
              ₹{subtotal}
            </span>
          </div>
        </button>

        {/* Action Button */}
        <button
          onClick={handleOrderClick}
          className="flex items-center justify-center gap-1.5 px-5 py-2 text-xs font-black uppercase tracking-wider text-stone-950 bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-500 rounded-xl shadow-md shadow-yellow-500/20 active:scale-95 transition-all cursor-pointer shrink-0"
        >
          <span>ORDER NOW</span>
          <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
        </button>
      </div>
    </aside>
  );
};
