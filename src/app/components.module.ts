import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CarComponent } from './car/car.component';
import { WrapComponent } from './wrap/wrap.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [CarComponent, WrapComponent],
  imports: [IonicModule, CommonModule],
  exports: [CarComponent, WrapComponent],
})
export class ComponentsModule {}
