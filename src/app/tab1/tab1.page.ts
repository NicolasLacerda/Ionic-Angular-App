import { Component, OnInit } from '@angular/core';
import { carsServices } from '../services/cars-services';
import { carInterface } from 'src/app/models/car';
import * as $ from 'jquery';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page implements OnInit {
  allCars: carInterface[] = [];

  constructor(private service: carsServices) {}

  ngOnInit(): void {
    localStorage.clear();

    //Ao clicar no botão armazena a marca escolhida no local storage.
    $('.btn').on('click', function (e) {
      let brandSel: string = $(this).attr('value')!;
      localStorage.setItem('brandSel', brandSel);
    });

    //Pega do serviço getAll os dados da json cars.
    this.service.getAll().subscribe((data) => {
      this.allCars = data;

      //Cria um array com a quantidade de carros repitidos de cada marca.
      let obj: any = [];

      this.allCars.forEach((item) => {
        if (!obj[item.brand]) {
          obj[item.brand] = 1;
        } else {
          obj[item.brand] += 1;
        }
      });

      //Pega o atributo value dos botões chamados btn.
      let arr = $('.btn')
        .map(function () {
          return $(this).attr('value')!;
        })
        .get();

      //Cria uma array com as divs chamadas printNumber
      let printNumbers = $('.printNumber');

      //For loop adicionando +1 a variável i a cada objeto da array.
      for (var i = 0; i < arr.length; i++) {
        if (obj[arr[i]] == 1) {
          $(printNumbers[i]).html(obj[arr[i]] + ' Coche');
        } else {
          $(printNumbers[i]).html(obj[arr[i]] + ' Coches');
        }
      }
    });
  }
}
