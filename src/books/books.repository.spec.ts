import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { BookRepository } from './books.repository';
import { Types } from 'mongoose';

describe('BookRepository', () => {
    let repo: BookRepository;
    let mockBookModel: any; 

    function mockFindChain(mockData: any[]) {
        let limitValue = mockData.length;
        return {
            limit: function (n: number) {
            limitValue = n;
            return this;
            },
            lean: function () { return this; },
            exec: function () { return Promise.resolve(mockData); },
        };
    }


    function mockBookFromDatabase (count: number) {
        let books: any[] = [];
        for (let i = 0; i < count; i++) {
            books.push({
                _id: new Types.ObjectId(),
                title: `Book Title ${i}`,
                genre: ['Fiction', 'Adventure'],
                price: 10 + i,
                stock: 5 + i,
                createdAt: new Date(),
                updatedAt: new Date(),
            });
        }

        return books;
    }

    beforeEach( async () => {
        mockBookModel = {
            find: jest.fn()
        }

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                BookRepository,
                {
                    provide: getModelToken('Book'),
                    useValue: mockBookModel,
                },
            ],
        }).compile();


        repo = module.get<BookRepository>(BookRepository);
    })

    // it should be defined
    // it should return 20 books if more than 20 exists 
    // it should return all books if less than 20 exists 
    // should return an empty array if no books exists 
    // should return books with correct structure 
    // should call find limit lean exec 
    // should handle errorrs from the database

    it('should be defined', () => { 
        expect(repo).toBeDefined();
    });


    it('should return 20 books if more than 20 exists', async () => {
        const mockBooks = mockBookFromDatabase(30);
        mockBookModel.find.mockReturnValue(mockFindChain(mockBooks));
        const result = await repo.findDefaultBooks();
        expect(result.length).toBe(20);
        expect(mockBookModel.find).toHaveBeenCalled();
    });


    it('it should return all books if less than 20 exists', async () => {
        const mockBooks = mockBookFromDatabase(10);
        mockBookModel.find.mockReturnValue(mockFindChain(mockBooks));
        const result = await repo.findDefaultBooks();
        expect(result.length).toBe(10);
        expect(mockBookModel.find).toHaveBeenCalled();
    });


    it('should return an empty array if no books exists', async () => {
        const mockBooks = [];
        mockBookModel.find.mockReturnValue(mockFindChain(mockBooks));
        const result = await repo.findDefaultBooks();
        expect(result).toEqual([]);
        expect(mockBookModel.find).toHaveBeenCalled();
    });


    it('should return books with correct structure', async () => {
        const mockBooks = mockBookFromDatabase(2);
        mockBookModel.find.mockReturnValue(mockFindChain(mockBooks));
        const result = await repo.findDefaultBooks();
        const expectedResult = mockBooks.map(book => ({ 
            _id: book._id.toString(),
            title: book.title,
            genre: book.genre,
            price: book.price,
            stock: book.stock,
            createdAt: book.createdAt,
            updatedAt: book.updatedAt,
        }));
        expect(result).toEqual(expectedResult);
        expect(mockBookModel.find).toHaveBeenCalled();
    });


    it('should handle errors from the database', async () => {
        const errorMessage = 'Database error';
        mockBookModel.find.mockImplementation(() => {
            throw new Error(errorMessage);
        });

        await expect(repo.findDefaultBooks()).rejects.toThrow(errorMessage);
        expect(mockBookModel.find).toHaveBeenCalled();
    });

    

});