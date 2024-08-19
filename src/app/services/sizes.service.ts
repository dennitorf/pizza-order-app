import { Injectable } from '@angular/core';
import { Size } from '../models/size';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';


@Injectable({
  providedIn: 'root'
})
export class SizesService {
  constructor(private http: HttpClient) { }

  getSizes(): Observable<Size[]>{
    return this.http.get<Size[]>(`${environment.apiUrl}/sizes`)
  }

}
