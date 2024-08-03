import { Component, Input } from '@angular/core';
import { Cart } from '../models/cart';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [],
  templateUrl: './order.component.html',
  styleUrl: './order.component.css'
})
export class OrderComponent {
  @Input() cart : Cart | undefined = undefined
}
