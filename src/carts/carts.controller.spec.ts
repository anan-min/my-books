import { Test, TestingModule } from '@nestjs/testing';
import { CartsController } from './carts.controller';
import { CartsService } from './carts.service';
import { AddItemInputDto } from './cart.dto';
import { v4 as uuidv4 } from 'uuid';
import { Cart } from './carts.repository';

        // Logic to add item to cart

        // ( scenario 1 )
        // no cartid (null)
        // always enough item in stock 


            // (cart service test cases )
            // test cases 
            // (1) normal flow 
            // should create a new cart and add the item, return the new cart id
            // should call enoughStock(1) getCart(1) createCart(1)
            // should call enoughStock getCart createCart with correct arguments
        
        
            // (2) error flow 
            // 2.1 should handle errors from repository when creating cart
            // 2.2 should handle erros from service when checking bookstock
            // 2.3 should handle errors from repository when get cart


        // test case I can think of 
        // should set cartId to null if not send from user 
        // shouldcall cart service add item. 
        // should return result from cart service add item and convert it to output item dto 
        // should validate bookId and quatity 
        




  describe('CartsController', () => {
    let controller: CartsController;
    let mockCartService: Partial<CartsService>;

    beforeEach(async () => {

      mockCartService = {
        addItem: jest.fn()
      }
      const module: TestingModule = await Test.createTestingModule({
        controllers: [CartsController],
        providers: [
          {
            provide: CartsService,
            useValue: mockCartService
          }
        ]
      }).compile();

      controller = module.get<CartsController>(CartsController);
    });


    describe('addItemToCart', () => { 

      it('controller should be defined', () => {
        expect(controller).toBeDefined();
      });
  
      it('should set carId to null if not send from user', async () => {
        const input: AddItemInputDto = {
          bookId: "valid_book_id",
          quantity: 1,
        }
  
        const cartId: string = "some cart id"
        const cart: Cart = {
          items: [
            {
              _id: input.bookId,
              qty: input.quantity
            }
          ]
        }
        
  
        mockCartService.addItem = jest.fn().mockResolvedValue({cartId, cart})
        await controller.addItemToCart(input);
        expect(mockCartService.addItem).toHaveBeenCalledTimes(1);
        expect(mockCartService.addItem).toHaveBeenCalledWith(input.bookId, input.quantity, null);
        
      });
      
  
      it('should set carId to null if not send from user', async () => {
        const input: AddItemInputDto = {
          bookId: "valid_book_id",
          quantity: 1,
        }
  
        const cartId: string = "some cart id"
        const cart: Cart = {
          items: [
            {
              _id: input.bookId,
              qty: input.quantity
            }
          ]
        }
        
  
        mockCartService.addItem = jest.fn().mockResolvedValue({cartId, cart})
        const result = await controller.addItemToCart(input);
        const {cartId: returnedCartId, cart: returnedCart} = result;
        expect(returnedCartId).toBe(cartId);
        expect(returnedCart).toBe(returnedCart);
        expect(mockCartService.addItem).toHaveBeenCalledTimes(1);
        expect(mockCartService.addItem).toHaveBeenCalledWith(input.bookId, input.quantity, null);
        
      });
    });


    
  });
