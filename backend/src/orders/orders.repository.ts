import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Order, OrderDocument } from './schemas/Order.schema';



@Injectable()
export class OrdersRepository {

    constructor(
        @InjectModel(Order.name) private orderModel: Model<OrderDocument>,
    ) {}

    async createOrder(orderData: Order): Promise<Order> {
        return this.orderModel.create(orderData);
    }
}