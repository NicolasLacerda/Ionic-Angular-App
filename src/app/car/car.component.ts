import { Component, OnInit } from '@angular/core';
import { carsServices } from '../services/cars-services';
import { carInterface } from 'src/app/models/car';
import { filter } from 'rxjs';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.scss'],
})
export class CarComponent implements OnInit {
  allCars: carInterface[] = [];
  filteredCars: carInterface[] = [];

  constructor(private service: carsServices) {}

  ngOnInit(): void {
    this.service.getAll().subscribe((data) => {
      this.allCars = data;

      let teste = this.allCars.filter((value1) => {
        return value1.brand == 'dacia';
      });

      let teste2 = this.allCars.filter((value) => {
        return value.brand == 'seat';
      });

      this.filteredCars = teste;
    });
  }
}
