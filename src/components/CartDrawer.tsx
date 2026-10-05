import React, { useState } from 'react';
import {
  X,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ShoppingBag,
  MessageSquare,
  Tag,
  Check,
  Percent,
  Sparkles,
  Truck,
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { RESTAURANT_INFO } from '../data/menuData';

export const CartDrawer: React.FC = () => {
  const {
    items,
    isCartOpen,
    closeCart,
    updateQuantity,
    removeItem,
    clearCart,
    subtotal,
    finalTotal,
    totalItemsCount,
    appliedCoupon,
    discountAmount,
    applyCoupon,
    removeCoupon,
    availableCoupons,
    deliveryFee,
    freeDeliveryThreshold,
    amountNeededForFreeDelivery,
  } = useCart();

  const [inputCode, setInputCode] = useState('');
  const [couponError, setCouponError] = useState<string | null>(null);
  const [showCouponList, setShowCouponList] = useState(false);

  if (!isCartOpen) return null;

  const handleApplyCoupon = (e?: React.FormEvent, directCode?: string) => {
    if (e) e.preventDefault();
    setCouponError(null);
    const codeToApply = directCode || inputCode;
    if (!codeToApply.trim()) return;

    const res = applyCoupon(codeToApply);
    if (!res.success) {
      setCouponError(res.message);
    } else {
      setInputCode('');
      setShowCouponList(false);
    }
  };

  const handleCheckoutScroll = () => {
    closeCart();
    const el = document.getElementById('order');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleQuickWhatsApp = () => {
    const orderLines = items
      .map(
        (i, idx) =>
          `${idx + 1}. *${i.name}* x ${i.quantity} = ₹${i.unitPrice * i.quantity}`
      )
      .join('\n');

    const couponLine = appliedCoupon
      ? `\n*Coupon Applied:* ${appliedCoupon.code} (-₹${discountAmount})`
      : '';
    const deliveryLine = deliveryFee === 0 ? 'FREE Express Delivery' : `₹${deliveryFee}`;

    const message = `*🍗 YAMAMA SHAWAYA — QUICK CART ORDER*
----------------------------------------
*ITEMS:*
${orderLines}
----------------------------------------
*Subtotal:* ₹${subtotal}${couponLine}
*Delivery Fee:* ${deliveryLine}
*GRAND TOTAL:* ₹${finalTotal}
----------------------------------------
Hi Yamama team, I would like to confirm this order. Please send me the kitchen status!`;

    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/${RESTAURANT_INFO.whatsappNumber}?text=${encoded}`, '_blank');
  };

  const freeDeliveryProgress = Math.min(100, Math.round((subtotal / freeDeliveryThreshold) * 100));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={closeCart}
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
      />

      {/* Slide-over panel */}
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-6 sm:pl-10">
        <div className="w-screen max-w-md bg-[#121316] border-l border-yellow-500/25 shadow-2xl flex flex-col justify-between">
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-stone-800 flex items-center justify-between bg-stone-900/90">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-yellow-400 text-stone-950 flex items-center justify-center font-bold">
                <ShoppingBag className="w-4 h-4 stroke-[2.5]" />
              </div>
              <div>
                <h2 className="font-heading text-base font-bold text-white">
                  Your Order Cart
                </h2>
                <span className="text-[11px] font-mono text-stone-400">
                  {totalItemsCount} {totalItemsCount === 1 ? 'item' : 'items'} in bag
                </span>
              </div>
            </div>

            <button
              onClick={closeCart}
              aria-label="Close cart"
              className="p-2 rounded-xl text-stone-400 hover:text-white hover:bg-stone-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Delivery Goal Bar */}
          {items.length > 0 && (
            <div className="px-5 py-2.5 bg-stone-950 border-b border-stone-850">
              <div className="flex items-center justify-between text-xs mb-1.5 font-mono">
                <span className="flex items-center gap-1.5 text-stone-300">
                  <Truck className="w-3.5 h-3.5 text-yellow-400" />
                  {amountNeededForFreeDelivery === 0 ? (
                    <span className="text-emerald-400 font-bold">🎉 FREE Delivery Unlocked!</span>
                  ) : (
                    <span>Add <strong className="text-yellow-400 font-bold">₹{amountNeededForFreeDelivery}</strong> for FREE Delivery</span>
                  )}
                </span>
                <span className="text-[11px] text-stone-500 font-bold">{freeDeliveryProgress}%</span>
              </div>
              <div className="w-full h-1.5 bg-stone-850 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full transition-all duration-500"
                  style={{ width: `${freeDeliveryProgress}%` }}
                />
              </div>
            </div>
          )}

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3.5">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-16">
                <div className="w-16 h-16 rounded-full bg-stone-900 border border-stone-800 flex items-center justify-center text-stone-600 shadow-inner">
                  <ShoppingBag className="w-8 h-8 text-stone-500" />
                </div>
                <div>
                  <h3 className="font-heading text-base font-bold text-white">
                    Your cart is empty
                  </h3>
                  <p className="mt-1 text-xs text-stone-400 max-w-xs">
                    Explore our charcoal roasted Shawaya, Bishawari rice and refreshing artisan mojitos.
                  </p>
                </div>
                <button
                  onClick={() => {
                    closeCart();
                    const el = document.getElementById('menu');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-6 py-3 text-xs font-black uppercase tracking-wider text-stone-950 bg-yellow-400 hover:bg-yellow-300 rounded-xl transition-all shadow-md shadow-yellow-500/20 cursor-pointer"
                >
                  Explore Menu
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.cartId}
                  className="p-3 rounded-xl bg-stone-900/90 border border-stone-800/90 hover:border-yellow-500/30 flex items-center gap-3 transition-colors shadow-sm"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-14 h-14 rounded-lg object-cover bg-stone-800 shrink-0 border border-white/5"
                  />

                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-white truncate">
                      {item.name}
                    </h4>
                    <span className="font-mono text-xs text-yellow-400 font-semibold tabular-nums">
                      ₹{item.unitPrice} each
                    </span>
                    <span className="block text-[11px] font-mono text-stone-400 tabular-nums">
                      Sub: ₹{item.unitPrice * item.quantity}
                    </span>
                  </div>

                  {/* Quantity Stepper */}
                  <div className="flex items-center gap-1.5 shrink-0 bg-stone-950 px-2 py-1 rounded-lg border border-stone-800">
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.cartId, item.quantity - 1)}
                      className="text-stone-400 hover:text-white p-1 cursor-pointer transition-colors"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="font-mono text-xs text-white px-1.5 font-bold tabular-nums">
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.cartId, item.quantity + 1)}
                      className="text-stone-400 hover:text-white p-1 cursor-pointer transition-colors"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => removeItem(item.cartId)}
                    className="text-stone-500 hover:text-red-400 transition-colors p-1.5 cursor-pointer"
                    aria-label="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}

            {/* Offers & Coupon Code Section */}
            {items.length > 0 && (
              <div className="pt-2">
                {appliedCoupon ? (
                  <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-500/40 flex items-center justify-between gap-2 shadow-sm animate-fade-in-up">
                    <div className="flex items-center gap-2">
                      <Percent className="w-4 h-4 text-emerald-400 shrink-0" />
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="font-mono text-xs font-black text-emerald-300">
                            {appliedCoupon.code}
                          </span>
                          <span className="text-[10px] font-mono text-emerald-400 bg-emerald-900/60 px-1.5 py-0.2 rounded font-bold">
                            Applied
                          </span>
                        </div>
                        <span className="text-[11px] text-stone-300">
                          {appliedCoupon.title} (Saved ₹{discountAmount})
                        </span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={removeCoupon}
                      className="text-xs text-red-400 hover:text-red-300 underline font-mono cursor-pointer"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <div className="p-3 rounded-xl bg-stone-900/60 border border-stone-850 space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-stone-200 flex items-center gap-1.5">
                        <Tag className="w-3.5 h-3.5 text-yellow-400" />
                        <span>Have a Promo Coupon?</span>
                      </span>
                      <button
                        type="button"
                        onClick={() => setShowCouponList(!showCouponList)}
                        className="text-xs text-yellow-400 hover:text-yellow-300 font-semibold cursor-pointer underline"
                      >
                        {showCouponList ? 'Hide Offers' : 'View Offers'}
                      </button>
                    </div>

                    <form onSubmit={handleApplyCoupon} className="flex gap-2">
                      <input
                        type="text"
                        value={inputCode}
                        onChange={(e) => {
                          setInputCode(e.target.value.toUpperCase());
                          setCouponError(null);
                        }}
                        placeholder="ENTER CODE (e.g. YAMAMA50)"
                        className="flex-1 bg-stone-950 border border-stone-800 rounded-lg px-3 py-1.5 text-xs text-white placeholder-stone-600 font-mono uppercase focus:border-yellow-400 outline-none"
                      />
                      <button
                        type="submit"
                        disabled={!inputCode.trim()}
                        className="px-3.5 py-1.5 rounded-lg bg-yellow-400 disabled:opacity-50 text-stone-950 font-black text-xs transition-colors cursor-pointer"
                      >
                        Apply
                      </button>
                    </form>

                    {couponError && (
                      <p className="text-[11px] text-red-400 font-mono leading-tight">
                        {couponError}
                      </p>
                    )}

                    {/* Quick Coupon Voucher Cards Drawer */}
                    {showCouponList && (
                      <div className="pt-2 space-y-2 border-t border-stone-800">
                        {availableCoupons.map((coupon) => {
                          const isEligible = subtotal >= coupon.minOrder;

                          return (
                            <div
                              key={coupon.code}
                              className="p-2.5 rounded-lg bg-stone-950 border border-stone-800 flex items-center justify-between gap-2"
                            >
                              <div className="min-w-0">
                                <div className="flex items-center gap-1.5">
                                  <span className="font-mono text-xs font-bold text-yellow-400">
                                    {coupon.code}
                                  </span>
                                  {coupon.badge && (
                                    <span className="text-[9px] font-mono bg-yellow-400/20 text-yellow-300 px-1 rounded">
                                      {coupon.badge}
                                    </span>
                                  )}
                                </div>
                                <p className="text-[11px] text-stone-400 truncate">
                                  {coupon.desc}
                                </p>
                              </div>

                              <button
                                type="button"
                                onClick={() => handleApplyCoupon(undefined, coupon.code)}
                                disabled={!isEligible}
                                className={`px-2.5 py-1 rounded text-xs font-bold font-mono transition-colors shrink-0 ${
                                  isEligible
                                    ? 'bg-yellow-400 hover:bg-yellow-300 text-stone-950 cursor-pointer'
                                    : 'bg-stone-850 text-stone-500 cursor-not-allowed'
                                }`}
                              >
                                {isEligible ? 'Apply' : `Min ₹${coupon.minOrder}`}
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Footer with Subtotal, Coupon Breakdown & Dual Checkout */}
          {items.length > 0 && (
            <div className="p-4 sm:p-5 border-t border-stone-800 bg-[#0e0f13] space-y-3.5">
              <div className="space-y-1.5 text-xs text-stone-400">
                <div className="flex justify-between">
                  <span>Item Subtotal ({totalItemsCount} items)</span>
                  <span className="font-mono text-stone-200 tabular-nums">
                    ₹{subtotal}
                  </span>
                </div>

                {appliedCoupon && (
                  <div className="flex justify-between text-emerald-400">
                    <span className="flex items-center gap-1 font-semibold">
                      <Sparkles className="w-3.5 h-3.5" />
                      Coupon Discount ({appliedCoupon.code})
                    </span>
                    <span className="font-mono font-bold tabular-nums">
                      -₹{discountAmount}
                    </span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Express Delivery</span>
                  <span className="font-mono text-stone-200 tabular-nums">
                    {deliveryFee === 0 ? (
                      <span className="text-emerald-400 font-bold">FREE</span>
                    ) : (
                      `₹${deliveryFee}`
                    )}
                  </span>
                </div>

                <div className="flex justify-between items-baseline pt-2 border-t border-stone-850 text-base font-bold">
                  <span className="text-white">To Pay</span>
                  <div className="text-right">
                    <span className="font-mono text-2xl font-black text-yellow-400 tabular-nums">
                      ₹{finalTotal}
                    </span>
                    {discountAmount > 0 && (
                      <span className="block text-[10px] font-mono text-emerald-400">
                        Total savings: ₹{discountAmount}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Buttons: Continue to Details Form vs Direct WhatsApp Checkout */}
              <div className="space-y-2">
                <button
                  type="button"
                  onClick={handleCheckoutScroll}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 text-xs font-black uppercase tracking-wider text-stone-950 bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-500 hover:from-yellow-300 hover:to-amber-300 rounded-xl transition-all shadow-md shadow-yellow-500/20 active:scale-[0.98] cursor-pointer"
                >
                  <span>Proceed to Delivery Details</span>
                  <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                </button>

                <button
                  type="button"
                  onClick={handleQuickWhatsApp}
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-bold text-emerald-300 bg-emerald-950/60 hover:bg-emerald-900/60 border border-emerald-700/60 rounded-xl transition-colors cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4 text-emerald-400" />
                  <span>Order via WhatsApp Instantly</span>
                </button>
              </div>

              <div className="flex justify-between items-center pt-1 text-[11px] text-stone-500">
                <button
                  onClick={clearCart}
                  className="hover:text-red-400 transition-colors cursor-pointer"
                >
                  Clear Bag
                </button>
                <span className="font-mono text-stone-400">100% Charcoal Roasted Guarantee</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
