import { Routes } from '@angular/router';
import { BooksComponent } from './pages/books/books';
import { CartComponent } from './pages/cart/cart';
import { CheckoutComponent } from './pages/checkout/checkout';

export const routes: Routes = [
    {
        path: '',
        component: BooksComponent,
    },
    {
        path: 'cart',
        component: CartComponent,
    },
    {
        path: 'checkout',
        component: CheckoutComponent,
    }

];
