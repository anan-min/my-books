import { IsNumber, IsPositive, IsString, IsOptional } from "class-validator";
import type { Cart } from "./carts.repository";
import { Expose } from "class-transformer";

export class AddItemOutputDto {

  @Expose()
  @IsString()
  cartId: string;
  
  @Expose()
  cart: Cart;
}

export class AddItemInputDto {
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