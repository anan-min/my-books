import { IsString, IsOptional, IsNumber, IsPositive } from "class-validator";
import type { Cart } from "./cart.interface";
import { Expose } from "class-transformer";



export const SHIPPING_COST = 100;

export interface CartSummary {
  totalItems: number;
  totalPrice: number;
  messages: string[];
}


export interface CheckoutSummary {
  totalItems: number;
  totalPrice: number;
  shippingCost: number;
  grandTotal: number;
}

export interface CartItemDisplay {
  bookId: string;
  bookTitle: string;
  bookPrice: number; 
  bookQty: number; 
}

export class GetCartInputDto {
  @Expose()
  @IsOptional()
  @IsString()
  cartId?: string | null;
}


export class GetCartOutputDto { 
  @Expose()
  @IsString()
  cartId: string;

  @Expose()
  cartDisplay : CartItemDisplay[];

  @Expose()
  cart: Cart;

  @Expose()
  cartSummary: CartSummary;
}



