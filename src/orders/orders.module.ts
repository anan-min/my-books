import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { OrdersRepository } from './orders.repository';


import { CartsModule } from 'src/carts/carts.module';
import { BooksModule } from 'src/books/books.module';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderSchema } from './schemas/Order.schema';

@Module({
  imports: [  CartsModule, 
              BooksModule, 
              MongooseModule.forFeature([{ name: 'Order', schema:  OrderSchema }])
          ],
  controllers: [OrdersController],
  providers: [ 
                OrdersRepository, 
                OrdersService
            ],
  exports: [OrdersRepository, OrdersService],
})
export class OrdersModule {}
