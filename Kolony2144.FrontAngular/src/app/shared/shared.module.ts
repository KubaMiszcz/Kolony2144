import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from '../app-routing.module';
import { TileWithTableComponent } from './tile-with-table/tile-with-table.component';
import { AppSpinnerComponent } from './spinner/spinner.component';

@NgModule({
  declarations: [
    AppSpinnerComponent,
    TileWithTableComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    AppSpinnerComponent,
    TileWithTableComponent,
  ]
})
export class SharedModule { }
