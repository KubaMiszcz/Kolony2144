import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { BuildingsComponent } from './buildings/buildings.component';


@NgModule({
  declarations: [
    BuildingsComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class BuildingsModule { }
