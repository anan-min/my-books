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
  @Expose()
  @IsString()
  bookId: string;

  @Expose()
  @IsNumber()
  @IsPositive()
  quantity: number;
  
  @Expose()
  @IsOptional()
  cartId?: string | null;
}
