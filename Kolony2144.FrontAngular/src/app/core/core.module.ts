import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { StatusBarComponent } from './status-bar/status-bar.component';
import { SharedModule } from '../shared/shared.module';
import { DevTabComponent } from './dev-tab/dev-tab.component';

@NgModule({
  declarations: [
    NavbarComponent,
    StatusBarComponent,
    DevTabComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
  ],
  exports: [
    NavbarComponent,
    StatusBarComponent,
  ]
})
export class CoreModule { }
