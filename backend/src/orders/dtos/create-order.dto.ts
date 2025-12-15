import { Exclude, Expose } from "class-transformer";
import { IsDate, IsNumber, IsString } from "class-validator";

export class CreateOrderRequestDto { 
    // shipping address
    // cartId 

    @IsString()
    cartId: string;

    @IsString()
    shippingAddress: string;
}

export interface Item  {
    _id: string;
    title: string;
    price: number;
    qty: number;
}


export class CreateOrderResponseDto {
    @Expose()
    @IsString()
    orderId: string;

    @Expose()
    items: Item[];

    @Expose()
    @IsNumber()
    totalPrice: number;

    @Expose()
    @IsString()
    shippingAddress: string;

    @Expose()
    @IsString()
    status: string;

    @Expose()
    @IsString()
    paymentSessionId: string;

    @Exclude()
    @IsDate()
    createdAt: Date;

    @Exclude()
    @IsDate()
    updatedAt: Date;
}