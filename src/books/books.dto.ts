
import { Exclude, Expose } from 'class-transformer';
import { IsString, IsDate, Max, Min, IsArray } from 'class-validator';


export class BookOutputDto {
    @Expose()
    @IsString()
    _id: string;

    @Expose()
    @IsString()
    title: string; 

    @Expose()
    @IsString()
    @Min(0)
    price: number; 

    @Expose()
    @IsString()
    @Min(0)
    stock: number; 

    @Expose()
    @IsArray()
    @IsString({ each: true })
    genre: string[];

    @Exclude()
    @IsDate()
    createdAt: Date; 

    @Exclude()
    @IsDate()
    updatedAt: Date; 
}