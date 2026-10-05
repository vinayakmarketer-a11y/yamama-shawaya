import React from 'react';
import { CheckCircle2, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const Toast: React.FC = () => {
  const { toastMessage, openCart } = useCart();

  if (!toastMessage) return null;

  return (
    <div className="fixed top-24 right-4 sm:right-8 z-50 animate-in fade-in slide-in-from-top-4 duration-200">
      <div className="flex items-center gap-3 px-4 py-3 bg-[#121316]/95 backdrop-blur-md text-white rounded-xl border border-amber-500/40 shadow-xl shadow-black/50">
        <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
        <span className="text-xs font-medium text-stone-200">{toastMessage}</span>
        <button
          onClick={openCart}
          className="ml-2 px-2.5 py-1 text-[11px] font-bold text-stone-950 bg-amber-400 hover:bg-amber-300 rounded-md transition-colors shrink-0"
        >
          View Cart
        </button>
      </div>
    </div>
  );
};
