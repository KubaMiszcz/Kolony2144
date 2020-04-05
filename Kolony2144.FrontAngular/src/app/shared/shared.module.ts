import { QueueAssetTileComponent } from './queue-asset-tile/queue-asset-tile.component';
import { AssetsTableComponent } from './assets-table/assets-table.component';
import { MaterialsTableComponent } from './materials-table/materials-table.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppSpinnerComponent } from './spinner/spinner.component';
import { NavbarComponent } from './navbar/navbar.component';
import { StatusBarComponent } from './status-bar/status-bar.component';
import { AppRoutingModule } from '../app-routing.module';
import { TileWithTableComponent } from './tile-with-table/tile-with-table.component';
import { ProgressbarModule } from 'ngx-bootstrap';
import { prefixUOMPipe } from './pipes/prefixUOM.pipe';
import { CamelCaseToHumanCasePipe } from './pipes/camelCaseToHumanCase.pipe';
import { AssetTileComponent } from './asset-tile/asset-tile.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AppRoutingModule,
    ProgressbarModule.forRoot()
  ],
  declarations: [
    AppSpinnerComponent,
    NavbarComponent,
    StatusBarComponent,
    TileWithTableComponent,
    MaterialsTableComponent,
    AssetsTableComponent,
    prefixUOMPipe,
    CamelCaseToHumanCasePipe,
    AssetTileComponent,
    QueueAssetTileComponent
  ],
  exports: [
    FormsModule,
    AppSpinnerComponent,
    NavbarComponent,
    StatusBarComponent,
    TileWithTableComponent,
    ProgressbarModule,
    prefixUOMPipe,
    CamelCaseToHumanCasePipe,
    AssetTileComponent,
    QueueAssetTileComponent
  ]
})
export class SharedModule { }
