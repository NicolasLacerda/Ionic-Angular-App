import { Component, OnInit } from '@angular/core';
import { carsServices } from '../services/cars-services';
import { carInterface } from 'src/app/models/car';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.scss'],
})
export class CarComponent implements OnInit {
  allCars: carInterface[] = [];

  constructor(private service: carsServices) {}

  ngOnInit(): void {
    this.service.getAll().subscribe((data) => {
      this.allCars = data;
      console.log(data);
    });
  }
}
