import { Injectable } from '@angular/core';
import { Offer } from '../models/offer';
import { SIZE_DATA } from './static-data';
import { Pizza } from '../models/pizza';

@Injectable({
  providedIn: 'root'
})
export class OffersService {

  private OFFERS_DATA : Offer[] = [
    { id : '1', description : '1 Medium Pizza with 2 toppings', minPizza : 1, size : SIZE_DATA[1], minToppings : 2, minToppingsPerPizza: 0, discount : 5, percentDiscount : 0},
    { id : '2', description : '2 Medium Pizza with 4 toppings each', minPizza: 2, size : SIZE_DATA[1], minToppings : 0, minToppingsPerPizza : 4, discount : 9, percentDiscount : 0},
    { id : '2', description : '1 Large with 4 toppings (Peperoni and Barbecue chiking are counted as 2 toppings)', minPizza: 1, size : SIZE_DATA[2], minToppings : 4, minToppingsPerPizza : 0, discount : 9, percentDiscount : 0},
  ]

  constructor() { }

  getAllOffers() {
    return this.OFFERS_DATA;
  }

  getApplicableOffers(pizzas : Pizza[]) {
    const applicableOffers : Offer[] = [];

    for(let offer of this.OFFERS_DATA)
    {
      const pizzasForOfferSize = pizzas.filter(c => c.size)

      if (offer.minPizza <= pizzasForOfferSize.length)
      {
        const isOfferApplicable = false; 

        if (offer.minToppings > 0) {
          const toppingsNumber = pizzas
            .map(c => c.toppings)
            .length
          
          if (toppingsNumber >= offer.minToppings)
            applicableOffers.push(offer)
            
        }

        if (offer.minToppingsPerPizza > 0) {
          const toppingLenghts =  pizzas
            .map(c => c.toppings.length)
          
          if (toppingLenghts.filter(c => c < offer.minToppingsPerPizza).length == 0) {
            applicableOffers.push(offer)
          }
        }
      }
    }
    
    return applicableOffers;

  }
}
