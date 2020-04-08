import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { NewsComponent } from './news/news.component';



@NgModule({
  declarations: [
    NewsComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    NewsComponent
  ]
})
export class NewsModule { }
