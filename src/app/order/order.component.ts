import { Component, Input, SimpleChanges } from '@angular/core';
import { Cart } from '../models/cart';
import { CommonModule } from '@angular/common';
import { TableElement } from '../models/table-element';
import { Topping } from '../models/topping';
import { ToppingsService } from '../services/toppings.service';
import { Pizza } from '../models/pizza';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order.component.html',
  styleUrl: './order.component.css'
})
export class OrderComponent {
  @Input() cart : Cart | undefined = undefined

  tableCaption: string = "Pizza Order Summary";

  tableHeader: TableElement[] = [
    {id: "no", data: "No" },
    {id: "size", data: "Size" },
    {id: "price", data: "Price" },
    
    {id: "offer", data: "Offer" }
  ]
  tableData: TableElement[] = [
    {id: "no", data: "" },
    {id: "size", data: "" },
    {id: "price", data: "" },
    
    {id: "offer", data: "" }
  ]
  
  toppings: Topping[] | undefined;
  constructor(private topppingsService: ToppingsService,){}
  ngOnInit(): void {    
    this.topppingsService.getAll().subscribe((data: Topping[]) => {
      this.toppings = data;
      this.toppings.forEach(topping => {
        this.tableHeader.push({id: topping.code, data: topping.description });
      }); 
    })
     
  }

  getDataForRow(pizza: Pizza): TableElement[]{
    let tableData: TableElement[] = [];   
    tableData.push({ id: 'no', data: (this.cart?.pizzas.indexOf(pizza) ?? 0 + 1).toString() });
    tableData.push({ id: 'size', data: pizza.size.description });
    tableData.push({ id: 'price', data: pizza.offer ? '<s>' + pizza.beforePrice.toFixed(2) + "</s> -> " + pizza.price.toFixed(2) : pizza.price.toFixed(2) });    
    tableData.push({ id: 'offer', data: pizza.offer }); 
    // Add toppings
    this.toppings?.forEach(topping => {
        const hasTopping = pizza.toppings.some(pizzaTopping => pizzaTopping.id === topping.id);
        tableData.push({ id: topping.id, data: hasTopping ? 'x' : '' });
    });

    return tableData;
  }
}
