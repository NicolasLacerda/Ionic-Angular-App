import { Component, OnInit } from '@angular/core';
import { wrapInterface } from '../models/wrap';
import { wrapServices } from '../services/wrap-services';
import * as $ from 'jquery';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
})
export class Tab3Page implements OnInit {
  allWrap: wrapInterface[] = [];
  filteredWrap: wrapInterface[] = [];

  constructor(private service: wrapServices) {}

  ngOnInit(): void {
    //Ao cliwrap em qualquer elemento da classe btn executa a função (e) que coloca numa variável chamada chosenwrap o valor do próprio botão, depois bota nos cookies da página esse valor.
    $('.btnW').on('click', function (e) {
      let chosenWrap: string = $(this).attr('value')!;
      document.cookie = chosenWrap;
      console.log(chosenWrap);
    });

    //pega os dados da função getWrap() e reescreve usando como base a interface wrapInterface.
    this.service.getWrap().subscribe((data) => {
      //Pega os valores de data e passa para a variável Allwraps.
      this.allWrap = data;

      let arrW = $('.btnW')
        .map(function () {
          return $(this).attr('value')!;
        })
        .get();
      let testeW: any = arrW;

      console.log(testeW);
      //Filtra o array gerado de wrapros usando como base o cookie que possui o nome de uma marca.
      let filteredBrandW = this.allWrap.filter((value) => {
        let i: number = 0;
        if (i == 0) {
          i++;
        }
        console.log(i);
        return value.brand == testeW[i];
      });

      //Pega os valores de FilteredBrand e passa para a variável Filteredwraps.
      this.filteredWrap = filteredBrandW;
    });
  }
}
