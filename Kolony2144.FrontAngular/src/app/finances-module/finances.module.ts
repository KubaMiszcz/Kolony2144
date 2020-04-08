import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { FinancesOverviewComponent } from './finances-overview/finances-overview.component';



@NgModule({
  declarations: [
    FinancesOverviewComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    FinancesOverviewComponent
  ]
})
export class OverviewModule { }
