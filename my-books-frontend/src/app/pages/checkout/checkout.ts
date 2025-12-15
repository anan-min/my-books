import { Component } from '@angular/core';
import { CheckoutSummary } from '../../services/carts.interface';
import { CartsService } from '../../services/carts.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-checkout',
  imports: [CommonModule],
  templateUrl: './checkout.html',
  styleUrl: './checkout.css',
})
export class CheckoutComponent {
  
  checkoutSummary: CheckoutSummary = {
    totalItems: 0,
    totalPrice: 0,
    shippingCost: 0,
    grandTotal: 0
  }
  constructor(private cartService: CartsService) {}


  ngOnInit(): void { 
    this.cartService.getCheckoutSummary().subscribe({
      next: (data) => {
        const {totalItems, totalPrice, shippingCost, grandTotal} = data 
        const summary: CheckoutSummary = {
          totalItems,
          totalPrice,
          shippingCost,
          grandTotal
        }
        this.checkoutSummary = summary;
        console.log("Checkout Summary fetched:", this.checkoutSummary);
      }, 
      error: (err) => console.log("Server Error")
    })
  }



}
