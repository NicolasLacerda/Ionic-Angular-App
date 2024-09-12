import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { CarComponent } from './car/car.component';
import { WrapComponent } from './wrap/wrap.component';
import { SceneComponent } from './scene/scene.component';

@NgModule({
  declarations: [CarComponent, WrapComponent, SceneComponent],
  imports: [IonicModule, CommonModule],
  exports: [CarComponent, WrapComponent, SceneComponent],
})
export class ComponentsModule {}
