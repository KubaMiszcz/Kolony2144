import { PowerOverviewComponent } from './power-module/power-overview/power-overview.component';
import { CrewOverviewComponent } from './crew-module/crew-overview/crew-overview.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { NewsComponent } from './news-module/news/news.component';
import { OverviewComponent } from './overview-module/overview/overview.component';
import { WikiComponent } from './wiki-module/wiki/wiki.component';
import { AppSpinnerComponent } from './shared/spinner/spinner.component';
import { BuildingsComponent } from './buildings-module/buildings/buildings.component';

const routes: Routes = [
  { path: '', redirectTo: '/start', pathMatch: 'full' },
  { path: 'start', component: PowerOverviewComponent },
  { path: 'news', component: NewsComponent },
  { path: 'overview', component: OverviewComponent },
  { path: 'crew', component: CrewOverviewComponent },
  { path: 'power', component: PowerOverviewComponent },
  { path: 'buildings', component: BuildingsComponent },
  { path: 'wiki', component: WikiComponent },
  { path: 'loading-screen', component: AppSpinnerComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
