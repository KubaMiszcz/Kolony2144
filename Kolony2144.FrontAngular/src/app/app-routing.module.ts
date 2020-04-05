import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { BuildingsComponent } from './main-module/buildings/buildings.component';

const routes: Routes = [
  { path: '', redirectTo: '/start', pathMatch: 'full' },
  { path: 'start', component: BuildingsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
