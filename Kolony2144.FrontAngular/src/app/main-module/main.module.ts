import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverviewComponent } from './overview/overview.component';
import { SharedModule } from '../shared/shared.module';
import { BuildingsComponent } from './buildings/buildings.component';
import { NewsComponent } from './news/news.component';

@NgModule({
  declarations: [
    OverviewComponent,
    BuildingsComponent,
    NewsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
  ],
  exports: [
    OverviewComponent,
  ]
})
export class MainModule { }
