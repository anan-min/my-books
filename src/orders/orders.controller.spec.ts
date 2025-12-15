import { Test, TestingModule } from '@nestjs/testing';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { BadRequestException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { CreateOrderResponseDto } from './dtos/create-order.dto';

describe('OrdersController', () => {
  let controller: OrdersController;
  let mockService: Partial<OrdersService>;

  beforeEach(async () => {
    mockService = {
      createOrder: jest.fn(),
    }
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrdersController],
      providers: [
        {
          provide: OrdersService,
          useValue: mockService
        }
      ]
    }).compile();

    controller = module.get<OrdersController>(OrdersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });


  // should return invalid request cartId is null 
  // should return invalid request when shipping address is missing
  // should create order successfully

  it('should return invalid request when cartId is null', async () => {

    const invalidCartId = "";
    const validAddress = "123 Main St, Springfield, USA";
    mockService.createOrder = jest.fn().mockImplementation(() => {
      throw new BadRequestException('Invalid cartId');
    });

    await expect(controller.createOrder({cartId: invalidCartId, shippingAddress: validAddress})).rejects.toThrow(BadRequestException);

    
  });

  it('should return invalid request when shipping address is missing', async () => {
    const validCartId = "validCartId123";
    const invalidAddress = "";

    mockService.createOrder = jest.fn().mockImplementation(() => {
      throw new BadRequestException('Invalid shipping address');
    });
    await expect(controller.createOrder({cartId: validCartId, shippingAddress: invalidAddress})).rejects.toThrow(BadRequestException);
  });

  it('should create order successfully', async () => {
    const validCartId = "validCartId123";
    const validAddress = "123 Main St, Springfield, USA";

    const mockOrderPlain = {
      items: [
        { _id: 'book1', title: 'Book One', price: 10, qty: 2 },
        { _id: 'book2', title: 'Book Two', price: 15, qty: 1 },
      ],
      totalPrice: 135,
      shippingAddress: validAddress,
      status: 'pending',
      paymentSessionId: '',
    };

    const mockOrderResponse = {
      toObject: jest.fn(() => mockOrderPlain),
    }


    const expectedResult = {
      orderId: expect.any(String),
      items: mockOrderPlain.items,
      totalPrice: mockOrderPlain.totalPrice,
      shippingAddress: mockOrderPlain.shippingAddress,
      status: mockOrderPlain.status,
      paymentSessionId: mockOrderPlain.paymentSessionId,
    }

    mockService.createOrder = jest.fn().mockResolvedValue(mockOrderResponse);
    const result = await controller.createOrder({cartId: validCartId, shippingAddress: validAddress});
    expect(result).toEqual(expectedResult);
  });
});
