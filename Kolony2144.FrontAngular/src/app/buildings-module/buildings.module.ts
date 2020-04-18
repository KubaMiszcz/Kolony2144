import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { BuildingsOverviewComponent } from './buildings-overview/buildings-overview.component';
import { ConstructionPanelComponent } from './construction-panel/construction-panel.component';
import { ConstructionQueueComponent } from './construction-queue/construction-queue.component';


@NgModule({
  declarations: [
    BuildingsOverviewComponent,
    ConstructionPanelComponent,
    ConstructionQueueComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class BuildingsModule { }
