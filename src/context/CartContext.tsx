import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, MenuItem, PortionSize } from '../types/menu';

export interface Coupon {
  code: string;
  title: string;
  desc: string;
  minOrder: number;
  discount: number;
  type: 'flat' | 'percentage';
  badge?: string;
}

export const AVAILABLE_COUPONS: Coupon[] = [
  {
    code: 'YAMAMA50',
    title: 'Flat ₹50 OFF',
    desc: 'On orders above ₹399',
    minOrder: 399,
    discount: 50,
    type: 'flat',
    badge: 'Popular',
  },
  {
    code: 'FEAST100',
    title: 'Flat ₹100 OFF',
    desc: 'On feast platters above ₹799',
    minOrder: 799,
    discount: 100,
    type: 'flat',
    badge: 'Best Value',
  },
  {
    code: 'ARABIAN10',
    title: '10% OFF',
    desc: 'Save 10% on orders above ₹250 (up to ₹80)',
    minOrder: 250,
    discount: 10,
    type: 'percentage',
    badge: 'Welcome',
  },
  {
    code: 'FREEKUBUS',
    title: 'Free Kubus Deal',
    desc: 'Instant ₹40 OFF on any combo above ₹200',
    minOrder: 200,
    discount: 40,
    type: 'flat',
  },
];

interface CartContextType {
  items: CartItem[];
  addItem: (item: MenuItem, portion?: PortionSize, quantity?: number) => void;
  addCustomItem: (custom: {
    menuItemId: string;
    name: string;
    unitPrice: number;
    portion?: PortionSize;
    quantity: number;
    image: string;
  }) => void;
  removeItem: (cartId: string) => void;
  updateQuantity: (cartId: string, quantity: number) => void;
  clearCart: () => void;
  totalItemsCount: number;
  subtotal: number;
  totalAmount: number;
  finalTotal: number;
  appliedCoupon: Coupon | null;
  discountAmount: number;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  availableCoupons: Coupon[];
  deliveryFee: number;
  freeDeliveryThreshold: number;
  amountNeededForFreeDelivery: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  openCart: () => void;
  closeCart: () => void;
  toastMessage: string | null;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'yamama_shawaya_cart_v2';
const COUPON_STORAGE_KEY = 'yamama_shawaya_coupon_v2';

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [appliedCouponCode, setAppliedCouponCode] = useState<string | null>(() => {
    try {
      return localStorage.getItem(COUPON_STORAGE_KEY);
    } catch {
      return null;
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch {
      // ignore
    }
  }, [items]);

  useEffect(() => {
    try {
      if (appliedCouponCode) {
        localStorage.setItem(COUPON_STORAGE_KEY, appliedCouponCode);
      } else {
        localStorage.removeItem(COUPON_STORAGE_KEY);
      }
    } catch {
      // ignore
    }
  }, [appliedCouponCode]);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage((prev) => (prev === message ? null : prev));
    }, 2800);
  };

  const addItem = (item: MenuItem, portion: PortionSize = 'full', quantity: number = 1) => {
    let unitPrice = 0;
    if (item.isPortioned && item.prices) {
      unitPrice = item.prices[portion];
    } else if (item.singlePrice) {
      unitPrice = item.singlePrice;
    }

    const portionLabel = item.isPortioned ? ` (${portion.toUpperCase()})` : '';
    const cartId = item.isPortioned ? `${item.id}-${portion}` : item.id;

    setItems((prev) => {
      const existing = prev.find((i) => i.cartId === cartId);
      if (existing) {
        return prev.map((i) =>
          i.cartId === cartId ? { ...i, quantity: i.quantity + quantity } : i
        );
      }
      return [
        ...prev,
        {
          cartId,
          menuItemId: item.id,
          name: `${item.name}${portionLabel}`,
          portion: item.isPortioned ? portion : undefined,
          unitPrice,
          quantity,
          image: item.image,
        },
      ];
    });

    showToast(`Added ${item.name}${portionLabel} to cart`);
  };

  const addCustomItem = (custom: {
    menuItemId: string;
    name: string;
    unitPrice: number;
    portion?: PortionSize;
    quantity: number;
    image: string;
  }) => {
    const cartId = `${custom.menuItemId}-${Date.now()}`;
    setItems((prev) => [
      ...prev,
      {
        cartId,
        menuItemId: custom.menuItemId,
        name: custom.name,
        portion: custom.portion,
        unitPrice: custom.unitPrice,
        quantity: custom.quantity,
        image: custom.image,
      },
    ]);

    showToast(`Added ${custom.name} to cart`);
  };

  const updateQuantity = (cartId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(cartId);
      return;
    }
    setItems((prev) =>
      prev.map((i) => (i.cartId === cartId ? { ...i, quantity } : i))
    );
  };

  const removeItem = (cartId: string) => {
    setItems((prev) => prev.filter((i) => i.cartId !== cartId));
  };

  const clearCart = () => {
    setItems([]);
    setAppliedCouponCode(null);
  };

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  const totalItemsCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);

  // Delivery fee calculation: free if subtotal >= 300, else free if cart is empty, else 30
  const freeDeliveryThreshold = 300;
  const deliveryFee = subtotal >= freeDeliveryThreshold || subtotal === 0 ? 0 : 30;
  const amountNeededForFreeDelivery = Math.max(0, freeDeliveryThreshold - subtotal);

  // Coupon evaluation
  const activeCoupon = AVAILABLE_COUPONS.find(
    (c) => c.code.toUpperCase() === (appliedCouponCode || '').toUpperCase()
  ) || null;

  let discountAmount = 0;
  if (activeCoupon) {
    if (subtotal >= activeCoupon.minOrder) {
      if (activeCoupon.type === 'flat') {
        discountAmount = activeCoupon.discount;
      } else if (activeCoupon.type === 'percentage') {
        discountAmount = Math.min(Math.round((subtotal * activeCoupon.discount) / 100), 80);
      }
    }
  }

  const applyCoupon = (rawCode: string): { success: boolean; message: string } => {
    const clean = rawCode.trim().toUpperCase();
    const found = AVAILABLE_COUPONS.find((c) => c.code === clean);

    if (!found) {
      return { success: false, message: `Invalid coupon code "${rawCode}".` };
    }

    if (subtotal < found.minOrder) {
      return {
        success: false,
        message: `Add ₹${found.minOrder - subtotal} more to use coupon ${clean} (Min order ₹${found.minOrder}).`,
      };
    }

    setAppliedCouponCode(clean);
    showToast(`Coupon ${clean} applied! You saved ₹${found.type === 'flat' ? found.discount : Math.min(Math.round((subtotal * found.discount) / 100), 80)}`);
    return { success: true, message: `Coupon ${clean} applied successfully!` };
  };

  const removeCoupon = () => {
    setAppliedCouponCode(null);
    showToast('Coupon removed');
  };

  const finalTotal = Math.max(0, subtotal - discountAmount + (items.length > 0 ? deliveryFee : 0));
  const totalAmount = finalTotal;

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        addCustomItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalItemsCount,
        subtotal,
        totalAmount,
        finalTotal,
        appliedCoupon: subtotal >= (activeCoupon?.minOrder || 0) ? activeCoupon : null,
        discountAmount,
        applyCoupon,
        removeCoupon,
        availableCoupons: AVAILABLE_COUPONS,
        deliveryFee,
        freeDeliveryThreshold,
        amountNeededForFreeDelivery,
        isCartOpen,
        setIsCartOpen,
        openCart,
        closeCart,
        toastMessage,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
