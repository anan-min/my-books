import { Injectable } from '@nestjs/common';
import { RedisService } from '../redis/redis.service';




export interface CartItem {
    _id: string; 
    qty: number;
}


export interface Cart { 
    items: CartItem[];
}

@Injectable()
export class CartsRepository {
    constructor(
        private readonly redisService: RedisService,
    ) {}


    async getCart(cartid: string | null): Promise<Cart | null> {
        if (!cartid) {
            return null
        } 
        try {
            const value = await this.redisService.get(cartid);
            if (!value) return null;
            try {
                return JSON.parse(value) as Cart;
            } catch {
                return null;
            }
        } catch (err) {
            throw err;
        }
    }


    async createCart(cartId: string, initialItem: CartItem): Promise<Cart> {
        if (!cartId) {
            throw new Error('cartId is required to create a cart');
        }
        try {
            const existingCart = await this.getCart(cartId);
            if (existingCart) {
                throw new Error('Cart with this ID already exists');
            }

            const newCart: Cart = { items: [initialItem] };
            const status = await this.redisService.set(cartId, JSON.stringify(newCart));
            if (status !== 'OK') {
                throw new Error('Failed to create cart in Redis');
            }
            return newCart;
        } catch (err) {
            throw err;
        }
    }
    
}



//   {
//     "_id": "693691f884f2437364f43f5d",
//     "qty": 3,
//   },


// how would you add u