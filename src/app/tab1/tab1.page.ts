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
  filteredCars: carInterface[] = [];

  constructor(private service: carsServices) {}

  ngOnInit(): void {
    //Ao clicar em qualquer elemento da classe btn executa a função (e) que coloca numa variável chamada chosenCar o valor do próprio botão, depois bota nos cookies da página esse valor.
    $('.btn').on('click', function (e) {
      let chosenCar: string = $(this).attr('value')!;
      document.cookie = chosenCar;
    });

    //pega os dados da função getAll() e reescreve usando como base a interface carInterface.
    this.service.getAll().subscribe((data) => {
      //Pega os valores de data e passa para a variável AllCars.
      this.allCars = data;

      let arr = $('.btn')
        .map(function () {
          return $(this).attr('value')!;
        })
        .get();
      let teste: any = arr;

      console.log(teste);
      //Filtra o array gerado de carros usando como base o cookie que possui o nome de uma marca.
      let filteredBrand = this.allCars.filter((value) => {
        let i: number = 0;
        if (i == 0) {
          i++;
        }
        console.log(i);
        return value.brand == teste[i];
      });

      //Pega os valores de FilteredBrand e passa para a variável FilteredCars.
      this.filteredCars = filteredBrand;

      //Armazena a quantidade de carros por marca.
      let numberOfCars: any = filteredBrand.length!;
      $('.printNumber').html(numberOfCars + ' Carros');
    });
  }
}
