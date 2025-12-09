import { Injectable } from '@nestjs/common';
import { Cart, CartItem } from './carts.repository';
import { CartsRepository } from './carts.repository';
import { BooksService } from '../books/books.service';
import { v4 as uuidv4 } from 'uuid';


@Injectable()
export class CartsService {
    constructor(private readonly cartRepository: CartsRepository, private readonly bookService: BooksService)
    {}

    async addItem(bookId: string, quantity: number, cartId: string | null): Promise<{ cartId: string; cart: Cart } | undefined> {
        const hasEnoughStock = await this.bookService.hasEnoughStock(bookId, quantity);
        if(hasEnoughStock) {
            const IsCartExists = await this.cartRepository.getCart(cartId)
            if(!IsCartExists) {
                const newCartId = uuidv4();
                const initialItem: CartItem = {
                    _id: bookId,
                    qty: quantity
                }
                const newCart =  await this.cartRepository.createCart(newCartId, initialItem);
                return { cartId: newCartId, cart: newCart };
            }
        }
    }
}
