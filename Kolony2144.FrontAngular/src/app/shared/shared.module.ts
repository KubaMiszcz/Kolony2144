import { AppSpinnerComponent } from './spinner/spinner.component';
import { StatusBarComponent } from './status-bar/status-bar.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './../shared/navbar/navbar.component';
import { AppRoutingModule } from '../app-routing.module';

@NgModule({
  declarations: [
    NavbarComponent,
    StatusBarComponent,
    AppSpinnerComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
  ],
  exports: [
    NavbarComponent,
    StatusBarComponent,
    AppSpinnerComponent
  ]
})
export class SharedModule { }
