import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { Document, HydratedDocument } from "mongoose";


export type OrderDocument = HydratedDocument<Order>;

export enum OrderStatus {
    PENDING = 'pending', 
    PAYING = 'paying',
    COMPLETED = 'completed',
    CANCELLED = 'cancelled',
}


// create order dto should include cartID and shipping address
@Schema({timestamps: true})
export class Order extends Document {
    // items array
    @Prop({ required: true, type: [{ 
        _id: String, 
        title: String,
        price: Number,
        qty: Number,
    }]})
    items: Array<{
        _id: string;
        title: string;
        price: number;
        qty: number;
    }>;


    // summary 
    // total 
    @Prop({ required: true })
    totalPrice: number;
    // shipping address 
    @Prop({ required: true })
    shippingAddress: string;
    // status 

    @Prop({ required: false, default: OrderStatus.PENDING })
    status: OrderStatus;
    // payment session id 
    @Prop({ required: false, default: '' })
    paymentSessionId: string;
}


export const OrderSchema = SchemaFactory.createForClass(Order);