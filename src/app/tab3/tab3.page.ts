import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
})
export class Tab3Page implements OnInit {
  ngOnInit(): void {
    //Ao cliwrap em qualquer elemento da classe btn executa a função (e) que coloca numa variável chamada chosenwrap o valor do próprio botão, depois bota nos localStorages da página esse valor.
    $('.btnW').on('click', function (e) {
      let wrapSel: string = $(this).attr('value')!;
      localStorage.setItem('wrapSel', wrapSel);
    });
  }
}
