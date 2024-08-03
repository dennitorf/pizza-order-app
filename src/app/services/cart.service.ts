import { Injectable } from '@angular/core';
import { Cart } from '../models/cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor() { }

  getTotal(cart : Cart) : number {
    return cart.pizza.reduce((sum, current) => sum + current.size.price, 0)
  } 

  getDiscounts(cart : Cart) : number {
    return cart.offers.reduce((sum, current) => sum + current.discount, 0); 
  }

  getPercentDiscounts(cart : Cart) : number {
    return cart.offers.reduce((sum, current) => sum + current.percentDiscount, 0);
  }
}
