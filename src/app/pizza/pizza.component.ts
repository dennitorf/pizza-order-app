import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { SizesService } from '../services/sizes.service';
import { ToppingTypesService } from '../services/topping-types.service';
import { ToppingsService } from '../services/toppings.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Size } from '../models/size';
import { ToppingType } from '../models/topping-type';
import { Topping } from '../models/topping';
import { Pizza } from '../models/pizza';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pizza',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './pizza.component.html',
  styleUrl: './pizza.component.css'
})
export class PizzaComponent implements OnInit {

  @Output() onAddPizzaToChart : EventEmitter<Pizza> = new EventEmitter();


  titleSystem : string = "Pizza System"
  titleSize : string = "Pizza Size"
  titleTopping : string = "Pizza Toppings"
  sizes : Size[] = []
  toppingTypes : ToppingType[] = []
  toppings : Topping[] = []
  pizzaForm : FormGroup

  
  
  constructor(
    private sizesService : SizesService,
    private toppingTypesService : ToppingTypesService, 
    private topppingsService : ToppingsService,
    private formBuilder : FormBuilder
  ) {
    this.pizzaForm = this.formBuilder.group({
      size : [Validators.required],
      toppings : [[]]
    })
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
    
     
  }

  onToppingChange(event: Event, topping: any) {
    const checkbox = event.target as HTMLInputElement;
    const toppingsArray = this.pizzaForm.get('toppings')?.value as Array<string>;

    if (checkbox.checked) {
      toppingsArray.push(topping.id);
    } else {
      const index = toppingsArray.indexOf(topping.id);
      if (index > -1) {
        toppingsArray.splice(index, 1);
      }
    }

    this.pizzaForm.patchValue({ toppings: toppingsArray });
  }

  resetPizzaForm() {
    this.pizzaForm?.reset(); 
  }
  addPizzaToCart() {
    let pizza : Pizza = Object.assign(this.pizzaForm?.value, {}); 
    this.onAddPizzaToChart.emit(pizza);
  }


}
