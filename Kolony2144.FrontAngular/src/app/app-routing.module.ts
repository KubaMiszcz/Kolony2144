// import { WikiModule } from './wiki-module/wiki.module';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { WikiComponent } from './wiki-module/wiki/wiki.component';

const routes: Routes = [
  { path: '', redirectTo: '/start', pathMatch: 'full' },
  { path: 'start', component: WikiComponent },
  { path: 'wiki', component: WikiComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
