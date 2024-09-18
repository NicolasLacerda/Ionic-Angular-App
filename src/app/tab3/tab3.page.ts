import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
})
export class Tab3Page implements OnInit {
  ngOnInit(): void {
    $('.btnW').on('click', function (e) {
      let brandWrapSel: string = $(this).attr('value')!;
      localStorage.setItem('brandWrapSel', brandWrapSel);
    });

    setTimeout(() => {
      localStorage.removeItem('colorGroup');
      localStorage.removeItem('wrapTypeSel');
    }, 100);
  }
}
