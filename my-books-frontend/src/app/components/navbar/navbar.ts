import { Component } from '@angular/core';
import { CartsService } from '../../services/carts.service';  

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  constructor(public cartsService: CartsService) {}
}
