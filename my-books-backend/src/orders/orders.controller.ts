import { Body, Controller } from '@nestjs/common';
import { Post } from '@nestjs/common'
import { OrdersService } from './orders.service';
import { plainToInstance } from 'class-transformer';
import { CreateOrderResponseDto, CreateOrderRequestDto } from './dtos/create-order.dto'
import { Order } from './schemas/Order.schema';



@Controller('orders')
export class OrdersController {

    // create order 
    constructor (private readonly ordersService: OrdersService) {}

    @Post('create')
    async createOrder(
        @Body() body: CreateOrderRequestDto
    ): Promise<CreateOrderResponseDto> {
        const order = await this.ordersService.createOrder(body.cartId, body.shippingAddress);
        return this.mapOrderToDto(order);
    }


    private mapOrderToDto(order: Order): CreateOrderResponseDto {
        const plain = order.toObject({versionKey: false});        

        return plainToInstance(
            CreateOrderResponseDto,
            {
                orderId: plain._id?.toString?.() ?? '',
                items: plain.items,
                totalPrice: plain.totalPrice,
                shippingAddress: plain.shippingAddress,
                status: plain.status,
                paymentSessionId: plain.paymentSessionId,
                createdAt: plain.createdAt,
                updatedAt: plain.updatedAt,
            },
            { excludeExtraneousValues: true }
        );
    }

    
}
