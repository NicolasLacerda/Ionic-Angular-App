import { Component, OnInit } from '@angular/core';
import { carsServices } from '../services/cars-services';
import { carInterface } from 'src/app/models/car';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.scss'],
})
export class CarComponent implements OnInit {
  //Variável allCars e FilteredCars se baseiam na interface Car Interface
  allCars: carInterface[] = [];
  filteredCars: carInterface[] = [];

  constructor(private service: carsServices) {}

  ngOnInit(): void {
    //pega os dados da função getAll() e reescreve usando como base a interface carInterface.
    this.service.getAll().subscribe((data) => {
      //Pega os valores de data e passa para a variável AllCars.
      this.allCars = data;

      //Pega o localStorage geradoo pela página 1 onde o valor é o nome da marca.
      let brand: any = localStorage.getItem('brandSel');

      //Filtra o array gerado de carros usando como base o localStorage que possui o nome de uma marca.
      let filteredBrand = this.allCars.filter((value) => {
        return value.brand == brand;
      });

      //Pega os valores de FilteredBrand e passa para a variável FilteredCars.
      this.filteredCars = filteredBrand;
    });

    setTimeout(() => {
      //Ao clicar no botão armazena o carro escolhido no local storage.
      $('.carBtn').on('click', function () {
        let carUrl: string = $(this).attr('value')!;
        localStorage.setItem('carUrl', carUrl);
      });
    }, 100);
  }
}
