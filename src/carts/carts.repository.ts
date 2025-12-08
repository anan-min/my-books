import { Injectable } from '@nestjs/common';



@Injectable()
export class CartRepository {
    constructor(
        // @InjectModel(Cart.name) private cartModel: Model<Cart>, --- IGNORE ---
    ) {}
}



//   {
//     "_id": "693691f884f2437364f43f5d",
//     "qty": 3,
//   },
