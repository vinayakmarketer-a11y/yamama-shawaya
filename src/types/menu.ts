export type PortionSize = 'quarter' | 'half' | 'full';

export interface PortionPricing {
  quarter: number;
  half: number;
  full: number;
}

export interface MenuItem {
  id: string;
  name: string;
  arabicName?: string;
  categoryId: 'shawaya' | 'shawaya-kubus' | 'bishawari-rice' | 'bene-tibi' | 'classic-mojitos';
  categoryLabel: string;
  description: string;
  image: string;
  isPortioned: boolean;
  prices?: PortionPricing;
  singlePrice?: number;
  highlight?: string;
  prepTime?: string;
  servesInfo?: {
    quarter?: string;
    half?: string;
    full?: string;
  };
}

export interface CartItem {
  cartId: string;
  menuItemId: string;
  name: string;
  portion?: PortionSize;
  unitPrice: number;
  quantity: number;
  image: string;
}

export interface ComboOffer {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  price: number;
  originalPrice?: number;
  badge?: string;
  itemsIncluded: string[];
  image: string;
}

export interface OrderCustomerDetails {
  customerName: string;
  phone: string;
  orderType: 'delivery' | 'pickup';
  address: string;
  instructions: string;
}
