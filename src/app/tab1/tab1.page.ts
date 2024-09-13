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
    $('.btn').on('click', function (e) {
      let chosenCar: string = $(this).attr('value')!;
      document.cookie = chosenCar;
    });

    this.service.getAll().subscribe((data) => {
      this.allCars = data;

      let obj: any = [];

      this.allCars.forEach((item) => {
        if (!obj[item.brand]) {
          obj[item.brand] = 1;
        } else {
          obj[item.brand] += 1;
        }
      });

      let arr = $('.btn')
        .map(function () {
          return $(this).attr('value')!;
        })
        .get();

      let printNumbers = $('.printNumber');

      for (var i = 0; i < arr.length; i++) {
        if (i == 1) {
          $(printNumbers[i]).html(obj[arr[i]] + ' Carro');
        } else {
          $(printNumbers[i]).html(obj[arr[i]] + ' Carros');
        }
      }
    });
  }
}
