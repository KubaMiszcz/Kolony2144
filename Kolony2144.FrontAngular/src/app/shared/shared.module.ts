import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppSpinnerComponent } from './spinner/spinner.component';
import { NavbarComponent } from './navbar/navbar.component';
import { StatusBarComponent } from './status-bar/status-bar.component';
import { AppRoutingModule } from '../app-routing.module';
import { prefixUOMPipe } from './pipes/prefixUOM.pipe';
import { CamelCaseToHumanCasePipe } from './pipes/camelCaseToHumanCase.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AppRoutingModule,
  ],
  declarations: [
    AppSpinnerComponent,
    NavbarComponent,
    StatusBarComponent,
    prefixUOMPipe,
    CamelCaseToHumanCasePipe,
  ],
  exports: [
    FormsModule,
    AppSpinnerComponent,
    NavbarComponent,
    StatusBarComponent,
    prefixUOMPipe,
    CamelCaseToHumanCasePipe,
  ]
})
export class SharedModule { }
