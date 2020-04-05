import { NewsComponent } from './main-module/news/news.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AppSpinnerComponent } from './shared/spinner/spinner.component';
import { OverviewComponent } from './main-module/overview/overview.component';
import { BuildingsComponent } from './main-module/buildings/buildings.component';

const routes: Routes = [
  { path: '', redirectTo: '/start', pathMatch: 'full' },
  { path: 'start', component: BuildingsComponent },
  { path: 'news', component: NewsComponent },
  { path: 'overview', component: OverviewComponent },
  { path: 'loading-screen', component: AppSpinnerComponent },
  { path: 'buildings', component: BuildingsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
