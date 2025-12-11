
export interface BookData {
  _id: string;
  title: string;
  genre: string[];
  price: number;
  stock: number;
  
  // check if timestamp exists manually 
  createdAt?: Date;
  updatedAt?: Date;
}
