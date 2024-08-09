import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PizzaComponent } from "./pizza/pizza.component";
import { OrderComponent } from "./order/order.component";
import { Cart } from './models/cart';
import { Pizza } from './models/pizza';
import { CartService } from './services/cart.service';
import { OffersService } from './services/offers.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, PizzaComponent, OrderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  
  constructor(
    private cartService : CartService,
    private offersService : OffersService
  ) {

  }

  cart : Cart = { pizzas : [], offers : [], total : 0, discount : 0, finalTotal : 0}

  onPizzaAddedToCart(e : Pizza) {
    this.cart.pizzas.push(e);

    this.cart.pizzas = this.cartService.getPizzasPrice(this.cart.pizzas);

    this.cart.pizzas = this.offersService.getApplicableOffers(this.cart.pizzas)    

    this.cart.discount = this.cartService.getDiscount(this.cart.pizzas)

    this.cart.total = this.cartService.getTotal(this.cart.pizzas) + this.cart.discount
    
    // const percentDiscount = this
    //   .cartService
    //   .getPercentDiscounts(this.cart.offers)
    
    // const discounts = this
    //   .cartService  
    //   .getDiscounts(this.cart.offers);
      
    //this.cart.discount = discounts + (percentDiscount === 0 ? 0 : (this.cart.total / percentDiscount) * 100);
    this.cart.finalTotal = this.cart.total - this.cart.discount;
    console.log(this.cart);
  }

  onPizzaRemovedFromCart(e : Event) {

  }


}
