import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { BuildingsOverviewComponent } from './buildings-overview/buildings-overview.component';


@NgModule({
  declarations: [
    BuildingsOverviewComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class BuildingsModule { }
