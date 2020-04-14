import { TradeOverviewComponent } from './trade-module/trade-overview/trade-overview.component';
import { PowerOverviewComponent } from './power-module/power-overview/power-overview.component';
import { CrewOverviewComponent } from './crew-module/crew-overview/crew-overview.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { OverviewComponent } from './overview-module/overview/overview.component';
import { WikiComponent } from './wiki-module/wiki/wiki.component';
import { AppSpinnerComponent } from './shared/spinner/spinner.component';
import { BuildingsComponent } from './buildings-module/buildings/buildings.component';
import { FinancesOverviewComponent } from './finances-module/finances-overview/finances-overview.component';
import { DevTabComponent } from './core/dev-tab/dev-tab.component';

const routes: Routes = [
  { path: '', redirectTo: '/start', pathMatch: 'full' },
  { path: 'start', component: DevTabComponent },
  { path: 'trade', component: TradeOverviewComponent },
  { path: 'overview', component: OverviewComponent },
  { path: 'finances', component: FinancesOverviewComponent },
  { path: 'crew', component: CrewOverviewComponent },
  { path: 'power', component: PowerOverviewComponent },
  { path: 'buildings', component: BuildingsComponent },
  { path: 'wiki', component: WikiComponent },
  { path: 'devtab', component: DevTabComponent },
  { path: 'loading-screen', component: AppSpinnerComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
