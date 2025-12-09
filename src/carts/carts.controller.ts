import { Controller } from '@nestjs/common';
import { Body, Post } from '@nestjs/common'
import { AddItemInputDto, AddItemOutputDto } from './cart.dto';
import { CartsService} from './carts.service';
import { plainToInstance } from 'class-transformer';
import { UsePipes, ValidationPipe } from '@nestjs/common';


@Controller('carts')
export class CartsController {

    constructor(private cartsService: CartsService) 
    {}

    @Post('add')
    // @UsePipes(new ValidationPipe({ transform: true }))
    async addItemToCart(
        @Body() body: AddItemInputDto
    ) {
        const cartId = body.cartId ? body.cartId : null;
        const result = await this.cartsService.addItem(body.bookId, body.quantity, cartId);
        return plainToInstance(AddItemOutputDto, result);
    }
}
