import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WikiComponent } from './wiki/wiki.component';
import { WikiTileComponent } from './wiki-tile/wiki-tile.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    WikiComponent,
    WikiTileComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    WikiComponent,
    WikiTileComponent
  ]
})
export class WikiModule { }
