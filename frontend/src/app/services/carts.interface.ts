
export interface CartItem {
  _id: string;
  qty: number;
}

export interface Cart { 
    items: CartItem[];
}

export interface CheckoutSummary {
  totalItems: number;
  totalPrice: number;
  shippingCost: number;
  grandTotal: number;
}

export interface AddToCartResponse {
  cartId: string;
  cart: Cart;
}


export interface GetCartReponse {
  cartId: string;
  cart: Cart;
  cartDisplay: CartDisplay[];
  cartSummary: CartSummary;
}

export interface CheckoutSummaryResponse { 
  totalItems: number;
  totalPrice: number;
  shippingCost: number;
  grandTotal: number;
}



export interface CartDisplay {
  bookId: string; 
  bookTitle: string;
  bookPrice: number;
  bookQty: number;
}

export interface CartSummary {
  totalItems: number;
  totalPrice: number;
  message: string[];
}