import React, { useState } from 'react';
import {
  Send,
  Phone,
  CheckCircle2,
  ShoppingBag,
  MapPin,
  Clock,
  Trash2,
  Plus,
  Minus,
  MessageSquare,
  Tag,
  Percent,
  Sparkles,
  CreditCard,
  Banknote,
  Smartphone,
  ArrowRight,
  Receipt,
  Copy,
  Check,
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { RESTAURANT_INFO } from '../data/menuData';

type PaymentMethod = 'cash' | 'upi' | 'card';

export const OrderSection: React.FC = () => {
  const {
    items,
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
  } = useCart();

  const [customerName, setCustomerName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [orderType, setOrderType] = useState<'delivery' | 'pickup'>('delivery');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('upi');
  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [copiedReceipt, setCopiedReceipt] = useState(false);

  const [confirmedOrder, setConfirmedOrder] = useState<{
    orderId: string;
    date: string;
    items: typeof items;
    subtotal: number;
    discount: number;
    couponCode: string | null;
    deliveryFee: number;
    total: number;
    customerName: string;
    phoneNumber: string;
    orderType: string;
    address: string;
    paymentMethod: string;
    notes: string;
  } | null>(null);

  // Generate structured WhatsApp message
  const constructWhatsAppUrl = (orderData?: typeof confirmedOrder) => {
    const activeItems = orderData ? orderData.items : items;
    const name = orderData ? orderData.customerName : customerName.trim() || 'Valued Guest';
    const phone = orderData ? orderData.phoneNumber : phoneNumber.trim() || 'Not specified';
    const type = orderData ? orderData.orderType : orderType;
    const addr = orderData ? orderData.address : address.trim() || 'To be shared';
    const total = orderData ? orderData.total : finalTotal;
    const discount = orderData ? orderData.discount : discountAmount;
    const coupon = orderData ? orderData.couponCode : appliedCoupon?.code;
    const dFee = orderData ? orderData.deliveryFee : deliveryFee;
    const oId = orderData ? orderData.orderId : `SHW-${Math.floor(1000 + Math.random() * 9000)}`;
    const pay = orderData
      ? orderData.paymentMethod
      : paymentMethod === 'upi'
      ? 'UPI (Google Pay / PhonePe / Paytm)'
      : paymentMethod === 'cash'
      ? 'Cash on Delivery'
      : 'Card on Delivery';
    const note = orderData ? orderData.notes : notes.trim();

    let orderLines = activeItems
      .map(
        (i, idx) =>
          `${idx + 1}. *${i.name}* x ${i.quantity} = ₹${i.unitPrice * i.quantity}`
      )
      .join('\n');

    if (activeItems.length === 0) {
      orderLines = 'I would like to order directly from your daily charcoal menu.';
    }

    const message = `*🍗 YAMAMA SHAWAYA — OFFICIAL ORDER*
----------------------------------------
🧾 *Order ID:* #${oId}
👤 *Customer:* ${name} (${phone})
🛵 *Order Mode:* ${type === 'delivery' ? 'EXPRESS HOME DELIVERY' : 'COUNTER TAKEAWAY PICKUP'}
${type === 'delivery' ? `📍 *Address:* ${addr}` : `📍 *Pickup At:* Yamama Shawaya Outlet, Calicut Bypass`}
💳 *Payment:* ${pay}
----------------------------------------
🛒 *ORDER ITEMS:*
${orderLines}
----------------------------------------
💰 *Subtotal:* ₹${orderData ? orderData.subtotal : subtotal}
${coupon && discount > 0 ? `🎟️ *Coupon Applied:* ${coupon} (-₹${discount})\n` : ''}🛵 *Delivery Fee:* ${dFee === 0 ? 'FREE Express Delivery' : `₹${dFee}`}
🔥 *GRAND TOTAL:* ₹${total}
${note ? `----------------------------------------\n📝 *Notes:* ${note}` : ''}
----------------------------------------
Hi Yamama team! Please confirm receipt of my order and estimated dispatch time. Thank you!`;

    const encoded = encodeURIComponent(message);
    return `https://wa.me/${RESTAURANT_INFO.whatsappNumber}?text=${encoded}`;
  };

  const handleApplyCoupon = (e?: React.FormEvent, directCode?: string) => {
    if (e) e.preventDefault();
    setCouponError(null);
    const code = directCode || couponInput;
    if (!code.trim()) return;

    const res = applyCoupon(code);
    if (!res.success) {
      setCouponError(res.message);
    } else {
      setCouponInput('');
    }
  };

  const handleConfirmOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (items.length === 0) {
      setErrorMsg('Please add at least one item to your cart before placing an order.');
      return;
    }

    if (!customerName.trim()) {
      setErrorMsg('Please enter your full name.');
      return;
    }

    if (!phoneNumber.trim() || phoneNumber.trim().length < 8) {
      setErrorMsg('Please enter a valid phone number for kitchen updates.');
      return;
    }

    if (orderType === 'delivery' && !address.trim()) {
      setErrorMsg('Please provide your complete delivery address and landmark.');
      return;
    }

    const newOrderId = `SHW-${Math.floor(1000 + Math.random() * 9000)}`;
    const newOrder = {
      orderId: newOrderId,
      date: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      items: [...items],
      subtotal,
      discount: discountAmount,
      couponCode: appliedCoupon?.code || null,
      deliveryFee,
      total: finalTotal,
      customerName: customerName.trim(),
      phoneNumber: phoneNumber.trim(),
      orderType,
      address: orderType === 'delivery' ? address.trim() : 'Takeaway Pickup Desk',
      paymentMethod:
        paymentMethod === 'upi'
          ? 'UPI (Google Pay / PhonePe)'
          : paymentMethod === 'cash'
          ? 'Cash on Delivery'
          : 'Card on Delivery',
      notes: notes.trim(),
    };

    setConfirmedOrder(newOrder);

    // Auto-launch WhatsApp with formatted order
    const waUrl = constructWhatsAppUrl(newOrder);
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  };

  const handleDirectWhatsAppClick = () => {
    const url = constructWhatsAppUrl();
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleCopyReceipt = () => {
    if (!confirmedOrder) return;
    const text = `YAMAMA SHAWAYA ORDER #${confirmedOrder.orderId}
Total: ₹${confirmedOrder.total}
Customer: ${confirmedOrder.customerName}
Items: ${confirmedOrder.items.map((i) => `${i.name} x${i.quantity}`).join(', ')}`;
    navigator.clipboard.writeText(text);
    setCopiedReceipt(true);
    setTimeout(() => setCopiedReceipt(false), 2000);
  };

  return (
    <section id="order" className="py-16 sm:py-24 bg-[#0b0c0e] relative border-t border-stone-850">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-400/10 border border-yellow-400/30 text-yellow-300 text-xs font-mono font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Direct Kitchen Ordering · Express Dispatch</span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            ONLINE ORDERING &amp; CHECKOUT
          </h2>

          <p className="mt-3 text-sm text-stone-300 leading-relaxed">
            Fill in your delivery or takeaway details to transmit your order directly to our kitchen with 1-click WhatsApp confirmation.
          </p>
        </div>

        {/* Order Confirmation Screen */}
        {confirmedOrder ? (
          <div className="max-w-2xl mx-auto bg-[#121316] rounded-2xl border border-yellow-500/40 p-6 sm:p-10 text-center space-y-6 shadow-2xl charcoal-glow animate-fade-in-up">
            <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-9 h-9 stroke-[2.5]" />
            </div>

            <div className="space-y-2">
              <span className="text-xs uppercase tracking-widest text-yellow-400 font-mono font-bold block">
                Order Generated Successfully
              </span>
              <h3 className="font-display text-2xl sm:text-3xl font-black text-white">
                Order #{confirmedOrder.orderId}
              </h3>
              <p className="text-xs sm:text-sm text-stone-300 max-w-md mx-auto">
                Thank you, <strong className="text-white">{confirmedOrder.customerName}</strong>! Your order is queued for preparation.
              </p>
            </div>

            {/* Receipt Card */}
            <div className="p-4 sm:p-5 rounded-xl bg-stone-900/90 border border-stone-800 text-left space-y-3 font-mono text-xs">
              <div className="flex justify-between items-center pb-2 border-b border-stone-800">
                <span className="text-stone-400">Order Mode:</span>
                <span className="text-yellow-400 font-bold uppercase">
                  {confirmedOrder.orderType === 'delivery' ? 'Home Delivery' : 'Counter Takeaway'}
                </span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-stone-800">
                <span className="text-stone-400">Phone:</span>
                <span className="text-white font-bold">{confirmedOrder.phoneNumber}</span>
              </div>
              {confirmedOrder.orderType === 'delivery' && (
                <div className="flex justify-between items-start pb-2 border-b border-stone-800">
                  <span className="text-stone-400">Address:</span>
                  <span className="text-white text-right max-w-xs">{confirmedOrder.address}</span>
                </div>
              )}
              <div className="flex justify-between items-center pb-2 border-b border-stone-800">
                <span className="text-stone-400">Payment:</span>
                <span className="text-emerald-400 font-bold">{confirmedOrder.paymentMethod}</span>
              </div>

              {/* Items */}
              <div className="py-2 space-y-1.5 border-b border-stone-800">
                <span className="text-stone-400 block mb-1">Items ({confirmedOrder.items.length}):</span>
                {confirmedOrder.items.map((it, idx) => (
                  <div key={idx} className="flex justify-between text-stone-200 text-[11.5px]">
                    <span>
                      {it.name} x {it.quantity}
                    </span>
                    <span className="font-bold">₹{it.unitPrice * it.quantity}</span>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="pt-1 space-y-1">
                {confirmedOrder.discount > 0 && (
                  <div className="flex justify-between text-emerald-400">
                    <span>Coupon ({confirmedOrder.couponCode})</span>
                    <span>-₹{confirmedOrder.discount}</span>
                  </div>
                )}
                <div className="flex justify-between text-stone-400">
                  <span>Delivery</span>
                  <span>{confirmedOrder.deliveryFee === 0 ? 'FREE' : `₹${confirmedOrder.deliveryFee}`}</span>
                </div>
                <div className="flex justify-between items-baseline pt-2 border-t border-stone-800 text-sm font-bold text-white">
                  <span>Total Amount</span>
                  <span className="font-mono text-xl text-yellow-400">₹{confirmedOrder.total}</span>
                </div>
              </div>
            </div>

            {/* Next Steps: WhatsApp Direct Link */}
            <div className="pt-2 space-y-2.5">
              <a
                href={constructWhatsAppUrl(confirmedOrder)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3.5 px-6 text-xs font-black uppercase tracking-wider text-white bg-emerald-600 hover:bg-emerald-500 rounded-xl transition-all shadow-lg shadow-emerald-600/30 cursor-pointer"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Open &amp; Confirm on WhatsApp</span>
              </a>

              <div className="grid grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={handleCopyReceipt}
                  className="flex items-center justify-center gap-1.5 py-2.5 px-4 text-xs font-semibold text-stone-300 bg-stone-900 hover:bg-stone-800 border border-stone-700 rounded-xl transition-colors cursor-pointer"
                >
                  {copiedReceipt ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Receipt</span>
                    </>
                  )}
                </button>

                <a
                  href={`tel:${RESTAURANT_INFO.phoneClean}`}
                  className="flex items-center justify-center gap-1.5 py-2.5 px-4 text-xs font-semibold text-stone-300 hover:text-white bg-stone-900 hover:bg-stone-800 border border-stone-700 rounded-xl transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-yellow-400" />
                  <span>Call Hotline</span>
                </a>
              </div>

              <button
                type="button"
                onClick={() => {
                  setConfirmedOrder(null);
                  clearCart();
                }}
                className="text-xs text-stone-400 hover:text-yellow-400 underline font-mono cursor-pointer pt-2"
              >
                Place Another Order
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Customer Details Form */}
            <div className="lg:col-span-7 bg-[#121316] rounded-2xl border border-stone-800 p-6 sm:p-8 space-y-6 shadow-xl">
              <div>
                <h3 className="font-heading text-xl font-bold text-white">
                  Customer &amp; Delivery Details
                </h3>
                <p className="mt-1 text-xs text-stone-400">
                  Please provide your contact information to receive real-time preparation updates.
                </p>
              </div>

              {errorMsg && (
                <div className="p-3.5 rounded-xl bg-red-950/60 border border-red-500/40 text-xs text-red-300 font-medium">
                  {errorMsg}
                </div>
              )}

              <form onSubmit={handleConfirmOrder} className="space-y-4">
                {/* Name */}
                <div>
                  <label className="block text-xs font-semibold text-stone-300 uppercase tracking-wider mb-1.5">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ameen Rahman / Rahul Sharma"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full px-4 py-2.5 text-sm bg-stone-900 text-white placeholder-stone-600 rounded-xl border border-stone-800 focus:border-yellow-400 focus:outline-none transition-colors"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-xs font-semibold text-stone-300 uppercase tracking-wider mb-1.5">
                    Phone Number (WhatsApp Updates) *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 98472 88990"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="w-full px-4 py-2.5 text-sm bg-stone-900 text-white placeholder-stone-600 rounded-xl border border-stone-800 focus:border-yellow-400 focus:outline-none transition-colors font-mono"
                  />
                </div>

                {/* Order Type Switcher */}
                <div>
                  <label className="block text-xs font-semibold text-stone-300 uppercase tracking-wider mb-1.5">
                    Fulfillment Mode
                  </label>
                  <div className="grid grid-cols-2 gap-2 p-1 bg-stone-900 rounded-xl border border-stone-800">
                    <button
                      type="button"
                      onClick={() => setOrderType('delivery')}
                      className={`py-2.5 text-xs font-bold rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                        orderType === 'delivery'
                          ? 'bg-yellow-400 text-stone-950 shadow-md shadow-yellow-500/20'
                          : 'text-stone-400 hover:text-white'
                      }`}
                    >
                      <span>🚀 Doorstep Delivery</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setOrderType('pickup')}
                      className={`py-2.5 text-xs font-bold rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                        orderType === 'pickup'
                          ? 'bg-yellow-400 text-stone-950 shadow-md shadow-yellow-500/20'
                          : 'text-stone-400 hover:text-white'
                      }`}
                    >
                      <span>🥡 Takeaway Pickup Desk</span>
                    </button>
                  </div>
                </div>

                {/* Address (If delivery) */}
                {orderType === 'delivery' ? (
                  <div>
                    <label className="block text-xs font-semibold text-stone-300 uppercase tracking-wider mb-1.5">
                      Delivery Address &amp; Nearby Landmark *
                    </label>
                    <textarea
                      required
                      rows={3}
                      placeholder="Building name, Floor/Flat #, Street, Landmark, Calicut..."
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full px-4 py-2.5 text-sm bg-stone-900 text-white placeholder-stone-600 rounded-xl border border-stone-800 focus:border-yellow-400 focus:outline-none transition-colors"
                    />
                  </div>
                ) : (
                  <div className="p-3.5 rounded-xl bg-stone-900/80 border border-stone-800 text-xs text-stone-300 space-y-1">
                    <span className="font-bold text-yellow-400 block">Takeaway Pickup Location:</span>
                    <p>{RESTAURANT_INFO.address}</p>
                    <p className="text-[11px] text-stone-400 font-mono">Ready in 15 – 20 mins from confirmation</p>
                  </div>
                )}

                {/* Payment Method Selector */}
                <div>
                  <label className="block text-xs font-semibold text-stone-300 uppercase tracking-wider mb-1.5">
                    Payment Preference
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('upi')}
                      className={`p-2.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer flex flex-col items-center gap-1 text-center ${
                        paymentMethod === 'upi'
                          ? 'bg-yellow-400/10 border-yellow-400 text-yellow-300 font-bold'
                          : 'bg-stone-900/60 border-stone-800 text-stone-400 hover:text-white'
                      }`}
                    >
                      <Smartphone className="w-4 h-4 text-yellow-400" />
                      <span>UPI / GPay</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('cash')}
                      className={`p-2.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer flex flex-col items-center gap-1 text-center ${
                        paymentMethod === 'cash'
                          ? 'bg-yellow-400/10 border-yellow-400 text-yellow-300 font-bold'
                          : 'bg-stone-900/60 border-stone-800 text-stone-400 hover:text-white'
                      }`}
                    >
                      <Banknote className="w-4 h-4 text-yellow-400" />
                      <span>Cash</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('card')}
                      className={`p-2.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer flex flex-col items-center gap-1 text-center ${
                        paymentMethod === 'card'
                          ? 'bg-yellow-400/10 border-yellow-400 text-yellow-300 font-bold'
                          : 'bg-stone-900/60 border-stone-800 text-stone-400 hover:text-white'
                      }`}
                    >
                      <CreditCard className="w-4 h-4 text-yellow-400" />
                      <span>Card Machine</span>
                    </button>
                  </div>
                </div>

                {/* Special Instructions */}
                <div>
                  <label className="block text-xs font-semibold text-stone-300 uppercase tracking-wider mb-1.5">
                    Special Cooking / Packaging Instructions (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Extra garlic toum, cut into 8 pieces, less spicy..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full px-4 py-2 text-xs bg-stone-900 text-white placeholder-stone-600 rounded-xl border border-stone-800 focus:border-yellow-400 focus:outline-none"
                  />
                </div>

                {/* Submit Order Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3.5 px-6 text-sm font-black uppercase tracking-wider text-stone-950 bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-500 hover:from-yellow-300 hover:to-amber-300 rounded-xl shadow-xl shadow-yellow-500/20 active:scale-[0.98] transition-all cursor-pointer"
                  >
                    PLACE ORDER &amp; SEND TO WHATSAPP · ₹{finalTotal}
                  </button>
                </div>
              </form>

              {/* Direct Instant Action Buttons */}
              <div className="pt-4 border-t border-stone-800 space-y-2">
                <span className="text-[11px] text-stone-400 uppercase tracking-wider font-mono block text-center">
                  Or Order Directly Without Filling Form
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={handleDirectWhatsAppClick}
                    className="flex items-center justify-center gap-2 py-3 px-4 text-xs font-bold uppercase tracking-wider text-white bg-emerald-600 hover:bg-emerald-500 rounded-xl transition-colors cursor-pointer shadow"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>INSTANT WHATSAPP CHAT</span>
                  </button>

                  <a
                    href={`tel:${RESTAURANT_INFO.phoneClean}`}
                    className="flex items-center justify-center gap-2 py-3 px-4 text-xs font-bold uppercase tracking-wider text-stone-200 bg-stone-900 hover:bg-stone-800 border border-stone-700 rounded-xl transition-colors"
                  >
                    <Phone className="w-4 h-4 text-yellow-400" />
                    <span>DIRECT PHONE ORDER</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column: Live Order Summary & Promo Coupons */}
            <div className="lg:col-span-5 bg-[#121316] rounded-2xl border border-stone-800 p-6 sm:p-8 space-y-5 shadow-xl">
              <div className="flex items-center justify-between pb-3 border-b border-stone-800">
                <h3 className="font-heading text-lg font-bold text-white flex items-center gap-2">
                  <ShoppingBag className="w-4 h-4 text-yellow-400" />
                  <span>Order Summary ({totalItemsCount})</span>
                </h3>
                {items.length > 0 && (
                  <button
                    type="button"
                    onClick={clearCart}
                    className="text-xs text-stone-500 hover:text-red-400 transition-colors cursor-pointer"
                  >
                    Clear All
                  </button>
                )}
              </div>

              {items.length === 0 ? (
                <div className="text-center py-10 space-y-3">
                  <p className="text-sm text-stone-400">
                    Your cart is currently empty.
                  </p>
                  <a
                    href="#menu"
                    className="inline-block px-5 py-2.5 text-xs font-black uppercase text-stone-950 bg-yellow-400 hover:bg-yellow-300 rounded-xl transition-all shadow-md shadow-yellow-500/20"
                  >
                    Browse Menu &amp; Add Items
                  </a>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Items list */}
                  <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
                    {items.map((item) => (
                      <div
                        key={item.cartId}
                        className="flex items-center justify-between gap-3 p-2.5 rounded-xl bg-stone-900/60 border border-stone-850"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-12 h-12 rounded-lg object-cover bg-stone-800 shrink-0"
                        />

                        <div className="flex-1 min-w-0">
                          <h4 className="text-xs font-bold text-white truncate">
                            {item.name}
                          </h4>
                          <span className="font-mono text-xs text-yellow-400 tabular-nums">
                            ₹{item.unitPrice} each
                          </span>
                        </div>

                        {/* Quantity Stepper */}
                        <div className="flex items-center gap-1.5 shrink-0 bg-stone-950 px-2 py-1 rounded-lg border border-stone-800">
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.cartId, item.quantity - 1)}
                            className="text-stone-400 hover:text-white p-0.5"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="font-mono text-xs text-white px-1 tabular-nums font-bold">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.cartId, item.quantity + 1)}
                            className="text-stone-400 hover:text-white p-0.5"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <button
                          type="button"
                          onClick={() => removeItem(item.cartId)}
                          aria-label={`Remove ${item.name}`}
                          className="text-stone-500 hover:text-red-400 transition-colors p-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* Promo Coupon Box */}
                  <div className="pt-2 border-t border-stone-800">
                    {appliedCoupon ? (
                      <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-500/40 flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <Percent className="w-4 h-4 text-emerald-400 shrink-0" />
                          <div>
                            <span className="font-mono text-xs font-black text-emerald-300">
                              {appliedCoupon.code} Applied
                            </span>
                            <span className="block text-[11px] text-stone-300">
                              {appliedCoupon.title} (You saved ₹{discountAmount})
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
                      <div className="space-y-2">
                        <form onSubmit={handleApplyCoupon} className="flex gap-2">
                          <input
                            type="text"
                            value={couponInput}
                            onChange={(e) => {
                              setCouponInput(e.target.value.toUpperCase());
                              setCouponError(null);
                            }}
                            placeholder="Coupon (e.g. YAMAMA50)"
                            className="flex-1 bg-stone-900 border border-stone-800 rounded-lg px-3 py-1.5 text-xs text-white placeholder-stone-500 font-mono uppercase focus:border-yellow-400 outline-none"
                          />
                          <button
                            type="submit"
                            disabled={!couponInput.trim()}
                            className="px-3 py-1.5 rounded-lg bg-yellow-400 disabled:opacity-50 text-stone-950 font-bold text-xs transition-colors cursor-pointer"
                          >
                            Apply
                          </button>
                        </form>
                        {couponError && (
                          <p className="text-[11px] text-red-400 font-mono">{couponError}</p>
                        )}
                        {/* Quick Coupon Chips */}
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {availableCoupons.slice(0, 3).map((cp) => (
                            <button
                              key={cp.code}
                              type="button"
                              onClick={() => handleApplyCoupon(undefined, cp.code)}
                              className="px-2 py-0.5 rounded text-[10px] font-mono bg-stone-900 hover:bg-stone-800 border border-stone-800 text-yellow-400 cursor-pointer"
                            >
                              + {cp.code} ({cp.title})
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Calculations */}
                  <div className="pt-3 border-t border-stone-800 space-y-2 text-xs">
                    <div className="flex justify-between text-stone-400">
                      <span>Subtotal ({totalItemsCount} items)</span>
                      <span className="font-mono text-stone-200 tabular-nums">
                        ₹{subtotal}
                      </span>
                    </div>

                    {appliedCoupon && (
                      <div className="flex justify-between text-emerald-400 font-semibold">
                        <span>Coupon Discount ({appliedCoupon.code})</span>
                        <span className="font-mono tabular-nums">-₹{discountAmount}</span>
                      </div>
                    )}

                    <div className="flex justify-between text-stone-400">
                      <span>Charcoal Thermal Packaging</span>
                      <span className="font-mono text-emerald-400 uppercase text-[11px] font-semibold">
                        Complimentary
                      </span>
                    </div>

                    <div className="flex justify-between text-stone-400">
                      <span>Express Delivery Fee</span>
                      <span className="font-mono tabular-nums">
                        {deliveryFee === 0 ? (
                          <span className="text-emerald-400 font-semibold">FREE</span>
                        ) : (
                          `₹${deliveryFee}`
                        )}
                      </span>
                    </div>

                    <div className="pt-3 border-t border-stone-800 flex justify-between items-baseline text-base font-bold">
                      <span className="text-white">Total Amount</span>
                      <div className="text-right">
                        <span className="font-mono text-2xl font-black text-yellow-400 tabular-nums">
                          ₹{finalTotal}
                        </span>
                        {discountAmount > 0 && (
                          <span className="block text-[10px] font-mono text-emerald-400 font-normal">
                            Saved ₹{discountAmount} on this order
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
