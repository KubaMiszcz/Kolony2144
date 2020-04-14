import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { WikiComponent } from './wiki/wiki.component';
import { WikiTileComponent } from './wiki-tile/wiki-tile.component';



@NgModule({
  declarations: [
    WikiComponent,
    WikiTileComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class WikiModule { }
