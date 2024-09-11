import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { carInterface } from '../models/car';

@Injectable({
  providedIn: 'root',
})
export class carsServices {
  private url = 'assets/json/cars.json';

  constructor(private http: HttpClient) {}
  //getAll é a função para pegar as informações de dentro do json
  getAll() {
    return this.http.get<carInterface[]>(this.url);
  }
  getWrap() {
    return this.http.get<carInterface[]>(this.url);
  }
}
