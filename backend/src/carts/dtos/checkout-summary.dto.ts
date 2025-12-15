
import { Expose } from "class-transformer";
import { IsNumber, IsPositive } from "class-validator";

export class  CheckoutSummaryDto {
  @Expose()
  @IsNumber()
  @IsPositive()
  totalItems: number;

  @Expose()
  @IsNumber()
  @IsPositive()
  totalPrice: number;

  @Expose()
  @IsNumber()
  @IsPositive()
  shippingCost: number;

  @Expose()
  @IsNumber()
  @IsPositive()
  grandTotal: number;
}