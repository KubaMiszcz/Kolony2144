import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { StatusBarComponent } from './status-bar/status-bar.component';

@NgModule({
  declarations: [
    NavbarComponent,
    StatusBarComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    NavbarComponent,
    StatusBarComponent,
  ]
})
export class CoreModule { }
