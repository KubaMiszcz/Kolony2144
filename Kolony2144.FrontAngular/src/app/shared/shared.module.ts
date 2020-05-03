import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from '../app-routing.module';
import { TileWithTableComponent } from './tile-with-table/tile-with-table.component';
import { AppSpinnerComponent } from './spinner/spinner.component';
import { ProductionEntityTileComponent } from './production-entity-tile/production-entity-tile.component';
import { QueueEntityTileComponent } from './queue-entity-tile/queue-entity-tile.component';
import { PlayerNotesComponent } from './player-notes/player-notes.component';

@NgModule({
  declarations: [
    AppSpinnerComponent,
    TileWithTableComponent,
    ProductionEntityTileComponent,
    QueueEntityTileComponent,
    PlayerNotesComponent,
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
    ProductionEntityTileComponent,
    QueueEntityTileComponent,
    PlayerNotesComponent,
  ]
})
export class SharedModule { }
