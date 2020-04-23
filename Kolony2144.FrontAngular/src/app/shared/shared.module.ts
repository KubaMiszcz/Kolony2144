import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from '../app-routing.module';
import { TileWithTableComponent } from './tile-with-table/tile-with-table.component';
import { AppSpinnerComponent } from './spinner/spinner.component';
import { AssetTileComponent } from './asset-tile/asset-tile.component';
import { QueueAssetTileComponent } from './queue-asset-tile/queue-asset-tile.component';

@NgModule({
  declarations: [
    AppSpinnerComponent,
    TileWithTableComponent,
    AssetTileComponent,
    QueueAssetTileComponent
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
    AssetTileComponent,
    QueueAssetTileComponent
  ]
})
export class SharedModule { }
