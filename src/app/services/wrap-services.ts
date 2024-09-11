import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { wrapInterface } from '../models/wrap';

@Injectable({
  providedIn: 'root',
})
export class wrapServices {
  private url = 'assets/json/wrap.json';

  constructor(private http: HttpClient) {}
  //getWrap é a função para pegar as informações de dentro do json
  getWrap() {
    return this.http.get<wrapInterface[]>(this.url);
  }
}
