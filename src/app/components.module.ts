import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CarComponent } from './car/car.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [CarComponent],
  imports: [IonicModule, CommonModule],
  exports: [CarComponent],
})
export class ComponentsModule {}
