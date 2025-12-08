import { Injectable } from '@nestjs/common';
import { BookRepository } from './books.repository';
import { BookData } from './Book.schema';

@Injectable()
export class BooksService {
    constructor(private readonly bookRepository: BookRepository) {}

    async getDefaultBooks(): Promise<BookData[] | []> {
        return (await this.bookRepository.findDefaultBooks()).slice(0, 20);
    }
    
}
