import { Injectable } from '@angular/core';
import { Topping } from '../models/topping';
import { TOPPINGS } from './static-data';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToppingsService {
  
  constructor(private http: HttpClient) { }

  getToppings() {
    return TOPPINGS;
  }

  getAll(): Observable<Topping[]>{
    return this.http.get<Topping[]>(`${environment.apiUrl}/toppings`)
  }

}
