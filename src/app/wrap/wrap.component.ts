import { Component, OnInit } from '@angular/core';
import { wrapInterface } from '../models/wrap';
import { wrapServices } from '../services/wrap-services';

@Component({
  selector: 'app-wrap',
  templateUrl: './wrap.component.html',
  styleUrls: ['./wrap.component.scss'],
})
export class WrapComponent implements OnInit {
  //Variável allCars e FilteredCars se baseiam na interface Car Interface
  allWrap: wrapInterface[] = [];
  filteredWrap: wrapInterface[] = [];

  constructor(private service: wrapServices) {}

  ngOnInit(): void {
    //pega os dados da função getAll() e reescreve usando como base a interface carInterface.
    this.service.getWrap().subscribe((data) => {
      //Pega os valores de data e passa para a variável AllCars.
      this.allWrap = data;

      //Pega o localStorage geradoo pela página 1 onde o valor é o nome da marca.
      let brand = localStorage.getItem('wrapSel');

      //Filtra o array gerado de carros usando como base o localStorage que possui o nome de uma marca.
      let filteredBrand = this.allWrap.filter((value) => {
        return value.brand == brand;
      });

      //Pega os valores de FilteredBrand e passa para a variável FilteredCars.
      this.filteredWrap = filteredBrand;
    });
  }
}
