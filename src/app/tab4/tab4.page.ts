import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {
  private isCurrentView!: boolean;

  constructor(private platform: Platform) {
    this.platform.backButton.subscribeWithPriority(
      9999,
      (processNextHandler) => {
        if (this.isCurrentView) {
          history.go(-1);
          localStorage.removeItem('brandWrapSel');
          localStorage.removeItem('wrapTypeSel');
          localStorage.removeItem('colorGroup');
          localStorage.removeItem('color');
          localStorage.removeItem('colorRetro');
          localStorage.removeItem('colorRoof');
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

  ngOnInit() {}

  clear() {
    history.go(-1);
    localStorage.removeItem('brandWrapSel');
    localStorage.removeItem('wrapTypeSel');
    localStorage.removeItem('colorGroup');
    localStorage.removeItem('color');
    localStorage.removeItem('colorRetro');
    localStorage.removeItem('colorRoof');
  }
}
