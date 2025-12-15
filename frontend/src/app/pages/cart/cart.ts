import { Component } from '@angular/core';
import { CartsService } from '../../services/carts.service';
import { CartDisplay, CartSummary } from '../../services/carts.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart',
  imports: [CommonModule],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})

export class CartComponent {
  constructor(public cartsService: CartsService) {}

  cartDisplay: CartDisplay[] = [];
  cartSummary: CartSummary = {
    totalItems: 0,
    totalPrice: 0,
    message: []
  }

  ngOnInit(): void {
    this.cartsService.getCart().subscribe({
      next: (data) => {
        const { cart, cartId, cartDisplay, cartSummary } = data;
        this.cartDisplay = cartDisplay;
        this.cartSummary = cartSummary;
        this.cartsService.updateCartId(cartId);
        this.cartsService.updateCartQuantity(cart);
        console.log('Cart display fetched:', this.cartDisplay);
        console.log('Cart summary fetched:', this.cartSummary);
      },
      error: (err) => console.error('Cart fetch error', err),
    });
  }

}
