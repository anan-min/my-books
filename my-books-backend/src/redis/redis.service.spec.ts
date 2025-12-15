import { Test, TestingModule } from '@nestjs/testing';
import { RedisService } from './redis.service';
import { createClient, RedisClientType } from 'redis';
import { mock } from 'node:test';

describe('RedisService', () => {
  let service: RedisService;
  let mockClient: Partial<RedisClientType>;

  beforeEach(async () => {
    mockClient ={
        connect: jest.fn(),
        get: jest.fn(),
        set: jest.fn(),
        del: jest.fn(),
    }

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RedisService,
        {
            provide: 'REDIS_CLIENT',
            useValue: mockClient,
        }
      ],
    }).compile();

    service = module.get<RedisService>(RedisService);

  });


  // it should get 
  // it should set
  // it should delete


    it('should get value by key', async () => {
        const key = 'testKey';
        const value = 'testValue';
        (mockClient.get as jest.Mock).mockResolvedValue(value);
        const result = await service.get(key);
        expect(mockClient.get).toHaveBeenCalledWith(key);
        expect(result).toBe(value);
    });

    it('should return null if key does not exist', async () => {
        const key = 'invalidKey';
        const value = 'testValue';
        (mockClient.get as jest.Mock).mockResolvedValue(null);
        const result = await service.get(key);
        expect(mockClient.get).toHaveBeenCalledWith(key);
        expect(result).toBeNull();
    });


    it('should set value by key', async () => {
        const key = 'testKey';
        const value = 'testValue';
        (mockClient.set as jest.Mock).mockResolvedValue('OK');
        const result = await service.set(key, value, 60);
        expect(mockClient.set).toHaveBeenCalledWith(key, value, { EX: 60 });
        expect(result).toBe('OK');
    });


    it('should delete value by key', async () => { 
        const key = 'testKey';
        (mockClient.del as jest.Mock).mockResolvedValue(1);
        const result = await service.delete(key);
        expect(mockClient.del).toHaveBeenCalledWith(key);
        expect(result).toBe(1);
    });

    it('should return 0 when deleting non-existing key', async () => {
        const key = 'invalidKey';
        (mockClient.del as jest.Mock).mockResolvedValue(0);
        const result = await service.delete(key);
        expect(mockClient.del).toHaveBeenCalledWith(key);
        expect(result).toBe(0);
    });


    it('should handle errors from redis client when get', async () => {
        const key = 'testKey';
        const errorMessage = 'Redis error';
        (mockClient.get as jest.Mock).mockRejectedValue(new Error(errorMessage));
        await expect(service.get(key)).rejects.toThrow(errorMessage);
        expect(mockClient.get).toHaveBeenCalledWith(key);
    });


    it('should handle errors from redis client when set', async () => {
        const key = 'testKey';
        const value = 'testValue';
        const errorMessage = 'Redis error';
        (mockClient.set as jest.Mock).mockRejectedValue(new Error(errorMessage));
        await expect(service.set(key, value)).rejects.toThrow(errorMessage);
        expect(mockClient.set).toHaveBeenCalledWith(key, value);
    });


    it('should handle errors from redis client when delete', async () => {
        const key = 'testKey';
        const errorMessage = 'Redis error';
        (mockClient.del as jest.Mock).mockRejectedValue(new Error(errorMessage));
        await expect(service.delete(key)).rejects.toThrow(errorMessage);
        expect(mockClient.del).toHaveBeenCalledWith(key);   
    }); 



});