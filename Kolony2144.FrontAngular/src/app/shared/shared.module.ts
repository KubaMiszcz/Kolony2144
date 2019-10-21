import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppSpinnerComponent } from './spinner/spinner.component';
import { NavbarComponent } from './navbar/navbar.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    AppSpinnerComponent,
    NavbarComponent
  ],
  exports:[
    FormsModule,
    AppSpinnerComponent,
    NavbarComponent
  ]
})
export class SharedModule { }
