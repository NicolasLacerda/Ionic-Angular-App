import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page implements OnInit {
  constructor() {}

  ngOnInit(): void {
    const all_buttons = document.querySelectorAll('#btn1');
    console.log(all_buttons);

    all_buttons.forEach((bt) => {
      bt.addEventListener('click', (event: any) => {
        console.log(event.target.className);
      });
    });
  }
}
