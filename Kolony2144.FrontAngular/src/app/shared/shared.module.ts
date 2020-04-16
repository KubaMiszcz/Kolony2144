import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from '../app-routing.module';
import { TileWithTableComponent } from './tile-with-table/tile-with-table.component';
import { AppSpinnerComponent } from './spinner/spinner.component';
import { AssetTileComponent } from './asset-tile/asset-tile.component';

@NgModule({
  declarations: [
    AppSpinnerComponent,
    TileWithTableComponent,
    AssetTileComponent
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
    AssetTileComponent
  ]
})
export class SharedModule { }
