import { Test, TestingModule } from '@nestjs/testing';
import { BooksService } from './books.service';
import { BookRepository } from './books.repository';
import { BookData } from './Book.schema';
import { mock } from 'node:test';

describe('BooksService', () => {
  let service: BooksService;
  let mockRepo: Partial<BookRepository>;

  beforeEach(async () => {

    mockRepo = {
      findDefaultBooks: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [BooksService, {
        provide: BookRepository,
        useValue: mockRepo, 
      }],
    }).compile();

    service = module.get<BooksService>(BooksService);
  });


  function mockBooksFromRepo(count: number): BookData[] {
    let books: BookData[] = [];
    for (let i = 0; i < count; i++) {
      books.push({
        _id: `book-id-${i}`,
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


  // should be defined 
  // should return empty array if no books exists 
  // should return books with correct structure 
  // should call repository method 
  // should handle errors from the repository 

  it('should be defined', () => {
    expect(service).toBeDefined();
  });


  it('should return empty array if no books exists', async () => {
    const mockBooks = [];
    mockRepo.findDefaultBooks = jest.fn().mockResolvedValue(mockBooks);

    const result = await service.getDefaultBooks();
    expect(result).toEqual([]);
    expect(mockRepo.findDefaultBooks).toHaveBeenCalled();
  })


  it('should return books with correct structure', async () => {
    const mockBooks = mockBooksFromRepo(20);
    mockRepo.findDefaultBooks = jest.fn().mockResolvedValue( mockBooks );

    const expectedResult = mockBooks.map(book => ({
        _id: book._id,
        title: book.title,
        genre: book.genre,
        price: book.price,
        stock: book.stock,
        createdAt: book.createdAt,
        updatedAt: book.updatedAt,
      }));

    const result = await service.getDefaultBooks();
    expect(result).toEqual(expectedResult);
    expect(mockRepo.findDefaultBooks).toHaveBeenCalled();
  })


  it('should call repository method', async () => {
    const mockBooks = mockBooksFromRepo(5);
    mockRepo.findDefaultBooks = jest.fn().mockResolvedValue(mockBooks);
    await service.getDefaultBooks();
    expect(mockRepo.findDefaultBooks).toHaveBeenCalledTimes(1);
  });


  it('should handle errors from the repository', async () => {
    mockRepo.findDefaultBooks = jest.fn().mockRejectedValue(new Error('Database error'));
    await expect(service.getDefaultBooks()).rejects.toThrow('Database error');
    expect(mockRepo.findDefaultBooks).toHaveBeenCalled();
  });



});
