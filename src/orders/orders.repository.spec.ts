import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { OrdersRepository } from './orders.repository';
import { Types } from 'mongoose';

describe('Order Repository', () => {
    let repo: OrdersRepository
    let mockOrderModel: any; 


    beforeEach( async () => {
        mockOrderModel = {
            create: jest.fn()
        }
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                OrdersRepository,
                {
                    provide: getModelToken('Order'),
                    useValue: mockOrderModel
                }
            ]
        }).compile();
        repo = module.get<OrdersRepository>(OrdersRepository);
    });

    describe('create order', () => {
        // it should be defined 
        // should create new order without session / status

        const mockOrderData = {
            _id: new Types.ObjectId(),
            userId: new Types.ObjectId(),
            items: [
                {
                    _id: new Types.ObjectId(),
                    title: 'Book 1',
                    price: 20,
                    qty: 2,
                }
            ],
            totalPrice: 140,
            shippingAddress: '123 Main St, City, Country',
        };



        it('should be defined', async () => {
            expect(repo).toBeDefined();
        });



        it('should create order ', async () => {
            const mockResult = {
                ...mockOrderData,
                status: 'pending',
                paymentSessionId: '',
            }

            mockOrderModel.create.mockResolvedValue(mockResult);
            const result = await repo.createOrder(mockOrderData as any);
            expect(mockOrderModel.create).toHaveBeenCalledWith(mockOrderData);
            expect(result).toEqual(mockResult);
            
        });

    })

})