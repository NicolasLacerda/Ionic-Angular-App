import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
})
export class Tab3Page implements OnInit {
  private isCurrentView!: boolean;

  constructor(private platform: Platform) {
    this.platform.backButton.subscribeWithPriority(
      9999,
      (processNextHandler) => {
        if (this.isCurrentView) {
          history.go(-1);
          localStorage.removeItem('carUrl');
          localStorage.removeItem('carName');
          localStorage.removeItem('carYear');
        } else {
          processNextHandler();
        }
      }
    );
  }

  ionViewDidEnter() {
    this.isCurrentView = true;
  }

  ionViewWillLeave() {
    this.isCurrentView = false;
  }

  ngOnInit(): void {
    $('.btnW').on('click', function (e) {
      let brandWrapSel: string = $(this).attr('value')!;
      localStorage.setItem('brandWrapSel', brandWrapSel);
    });
  }

  clear() {
    history.go(-1);
    localStorage.removeItem('carUrl');
    localStorage.removeItem('carName');
    localStorage.removeItem('carYear');
  }
}
