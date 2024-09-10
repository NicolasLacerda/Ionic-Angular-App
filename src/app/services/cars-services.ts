import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { carInterface } from '../models/car';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class carsServices {
  private url = 'assets/json/db.json';

  constructor(private http: HttpClient) {}
  //getAll é a função para pegar as informações de dentro do json
  getAll() {
    return this.http.get<carInterface[]>(this.url);
  }
}
