import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '../app-routing.module';
import { NavbarComponent } from './navbar/navbar.component';
import { StatusBarComponent } from './status-bar/status-bar.component';
import { AppSpinnerComponent } from './spinner/spinner.component';

@NgModule({
  imports: [
    CommonModule,
    AppRoutingModule,
  ],
  declarations: [
    NavbarComponent,
    StatusBarComponent,
    AppSpinnerComponent
  ],
  exports: [
    NavbarComponent,
    StatusBarComponent,
    AppSpinnerComponent
  ]
})
export class SharedModule { }
