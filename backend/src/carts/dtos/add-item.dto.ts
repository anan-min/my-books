import { Expose } from "class-transformer";
import { IsNumber, IsPositive, IsString, IsOptional } from "class-validator";
import type { Cart } from "../cart.interface";

export class AddItemResponseDto {
  @Expose()
  @IsString()
  cartId: string;
  
  @Expose()
  cart: Cart;
}

export class AddItemRequestDto {
  @IsString()
  bookId: string;

  @IsNumber()
  @IsPositive()
  quantity: number;
  
  @IsOptional()
  cartId?: string | null;
}
