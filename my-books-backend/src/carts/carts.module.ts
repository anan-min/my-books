import { Module } from '@nestjs/common';
import { CartsService } from './carts.service';
import { CartsRepository } from './carts.repository';
import { BooksModule } from '../books/books.module';
import { RedisModule } from '../redis/redis.module';

@Module({
  imports: [BooksModule, RedisModule],
  providers: [  
                CartsService, 
                CartsRepository,
              ], 
  exports: [CartsService, CartsRepository],
})
export class CartsModule {}
