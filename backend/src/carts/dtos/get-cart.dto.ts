import { Expose } from "class-transformer";
import { IsOptional, IsString } from "class-validator";
import type { Cart, CartItemDisplay, CartSummary} from "../cart.interface";



export class GetCartResponseDto { 
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