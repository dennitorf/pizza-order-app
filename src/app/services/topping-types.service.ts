import { Injectable } from '@angular/core';
import { ToppingType } from '../models/topping-type';

@Injectable({
  providedIn: 'root'
})
export class ToppingTypesService {
  
  private TOPPINGS_TYPES : ToppingType[] = [
    { id: 1, code : "veg", description : "Veg"},
    { id: 2, code : "non-veg", description : "Non Veg"},
    
  ]

  constructor() { }

  getToppingTypes() : ToppingType[] {
    return this.TOPPINGS_TYPES;
  }
}
