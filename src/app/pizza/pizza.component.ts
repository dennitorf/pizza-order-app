import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { SizesService } from '../services/sizes.service';
import { ToppingTypesService } from '../services/topping-types.service';
import { ToppingsService } from '../services/toppings.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Size } from '../models/size';
import { ToppingType } from '../models/topping-type';
import { Topping } from '../models/topping';
import { Pizza } from '../models/pizza';

@Component({
  selector: 'app-pizza',
  standalone: true,
  imports: [],
  templateUrl: './pizza.component.html',
  styleUrl: './pizza.component.css'
})
export class PizzaComponent implements OnInit {

  @Output() onAddPizzaToChart : EventEmitter<Pizza> = new EventEmitter();

  sizes : Size[] = []
  toppingTypes : ToppingType[] = []
  toppings : Topping[] = []
  pizzaForm : FormGroup | undefined = undefined

  
  
  constructor(
    private sizesService : SizesService,
    private toppingTypesService : ToppingTypesService, 
    private topppingsService : ToppingsService,
    private formBuilder : FormBuilder
  ) {

  }
  
  ngOnInit(): void { 
    this.sizes = this
      .sizesService
      .getAllSizes(); 

    this.toppingTypes = this
      .toppingTypesService
      .getToppingTypes(); 
    
    this.toppings = this
      .topppingsService
      .getToppings(); 
    
      this.pizzaForm = this.formBuilder.group({
        size : [Validators.required],
        toppings : [[]]
      })
  }

  resetPizzaForm() {
    this.pizzaForm?.reset(); 
  }

  addPizzaToChart() {
    let pizza : Pizza = Object.assign(this.pizzaForm?.value, {}); 
    this.onAddPizzaToChart.emit(pizza);
  }


}
