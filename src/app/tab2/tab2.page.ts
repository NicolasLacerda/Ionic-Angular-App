import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page implements OnInit {
  private isCurrentView!: boolean;

  constructor(private platform: Platform) {
    this.platform.backButton.subscribeWithPriority(
      9999,
      (processNextHandler) => {
        if (this.isCurrentView) {
          history.go(-1);
          localStorage.removeItem('brandSel');
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

  ngOnInit(): void {}

  clear() {
    history.go(-1);
    localStorage.removeItem('brandSel');
  }
}
