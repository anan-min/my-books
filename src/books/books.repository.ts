import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Book } from './Book.schema';
import { Model } from 'mongoose';
import {  BookDocument } from './Book.schema';
import { BookData } from './books.interface';


@Injectable()
export class BookRepository {
    constructor(
        @InjectModel(Book.name) private bookModel: Model<Book>,
    ) {}

    async findDefaultBooks(): Promise<BookData[]> {
        const books = await this.bookModel.find()
            .exec();
        
        return books.map(book => this.bookToBookData(book))
    }


    async getBookStock(id: string): Promise<number | null> {
        const book = await this.bookModel.findById(id).exec();
        if (!book) {
            return null;
        }
        return book.stock;
    }

    async getBooksByIds(ids: string[]): Promise<BookData[]> {
        if(ids.length === 0){
            return [] 
        }

        try {
            const books = await this.bookModel.find({
                _id: { $in: ids }
            }).exec();
            return books.map(book => this.bookToBookData(book));
        } catch (error) {
            throw error;
        }

    }

    
    private bookToBookData(book: BookDocument): BookData {
        return {
            _id: book._id.toString(),
            title: book.title,
            genre: book.genre,
            price: book.price,
            stock: book.stock,
            createdAt: book.createdAt,
            updatedAt: book.updatedAt,
        };
    }
}
