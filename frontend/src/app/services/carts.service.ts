import { Injectable } from '@angular/core';
import { Cart, AddToCartResponse, GetCartReponse, CheckoutSummaryResponse } from './carts.interface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})



export class CartsService {
  constructor(private http: HttpClient) {
    console.log('CartsService initialized');
  }
  
  public addToCart(bookId: string, quantity: number): Observable<AddToCartResponse> {
    const addToCartAPI = 'http://localhost:3000/carts/add';
    const payload = { bookId, quantity };
    return this.http.post<AddToCartResponse>(addToCartAPI, payload)
  } 

  public getCart(): Observable<GetCartReponse> {
    const cartId = this.getCartId();
    const getCartAPI = `http://localhost:3000/carts/${cartId}`;
    return this.http.patch<GetCartReponse>(getCartAPI, {})
  }

  public updateCartQuantity(cart: Cart | null): number {
    const cartQty =  cart ? cart.items.reduce((total, item) => total + item.qty, 0) : 0;
    localStorage.setItem('cartQty', cartQty.toString());
    return cartQty;
  }


  public getCheckoutSummary(): Observable<CheckoutSummaryResponse> {
    const cartId = this.getCartId();
    const getCartAPI = `http://localhost:3000/carts/${cartId}`;
    return this.http.get<CheckoutSummaryResponse>(getCartAPI);
  }


  
  public getCartQuantity() {
    return localStorage.getItem('cartQty') || null;
  }
  

  public updateCartId(cartId: string) { 
    localStorage.setItem('cartId', cartId);
  }


  public getCartId() {
    return localStorage.getItem('cartId') || null;
  }

}
