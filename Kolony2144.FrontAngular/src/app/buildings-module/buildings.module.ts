import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from '../core/core.module';
import { SharedModule } from '../shared/shared.module';
import { BuildingsComponent } from './buildings/buildings.component';


@NgModule({
  declarations: [
    BuildingsComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    SharedModule
  ],
  exports: [
    BuildingsComponent
  ]
})
export class BuildingsModule { }
