import { NewsComponent } from './main-module/news/news.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AppSpinnerComponent } from './shared/spinner/spinner.component';
import { OverviewComponent } from './main-module/overview/overview.component';
import { BuildingsComponent } from './main-module/buildings/buildings.component';
import { ProductionComponent } from './main-module/production/production.component';
import { CrewComponent } from './main-module/crew/crew.component';
import { WarehouseComponent } from './main-module/warehouse/warehouse.component';
import { WikiComponent } from './wiki-module/wiki/wiki.component';
import { MachinesComponent } from './main-module/machines/machines.component';
import { MiningComponent } from './main-module/mining/mining.component';
import { TradeComponent } from './main-module/trade/trade.component';

const routes: Routes = [
  { path: '', redirectTo: '/start', pathMatch: 'full' },
  { path: 'start', component: BuildingsComponent },
  { path: 'news', component: NewsComponent },
  { path: 'overview', component: OverviewComponent },
  { path: 'loading-screen', component: AppSpinnerComponent },
  { path: 'crew', component: CrewComponent },
  { path: 'buildings', component: BuildingsComponent },
  { path: 'machines', component: MachinesComponent },
  { path: 'warehouse', component: WarehouseComponent },
  { path: 'production', component: ProductionComponent },
  { path: 'mining', component: MiningComponent },
  { path: 'trade', component: TradeComponent },
  { path: 'wiki', component: WikiComponent },
  // { path: 'trade', component: trad },
  // { path: 'warehouse', component: WarehouseOverviewComponent },
  // { path: 'finances', component: FinancesComponent },
  // { path: 'trade', component: TradeComponent },
  // // { path: 'managers-list', component: ManagersListComponent, canActivate: [AuthGuard] },

  // { path: 'adverts-list', component: AdvertsListComponent, canActivate: [AuthGuard] },
  // { path: 'adverts-pending-list', component: AdvertsPendingListComponent, canActivate: [AuthGuard] },
  // { path: 'advert-edit', component: AdvertEditComponent, canActivate: [AuthGuard] },
  // { path: 'advert-preview', component: AdvertPreviewComponent, canActivate: [AuthGuard] },

  // { path: 'templates-list', component: TemplatesListComponent, canActivate: [AuthGuard] },
  // { path: 'template-edit', component: TemplateEditComponent, canActivate: [AuthGuard] },
  // { path: 'template-preview', component: TemplatePreviewComponent, canActivate: [AuthGuard] },
  // {

  // path: 'content', component: ContentComponent, canActivate: [AuthGuard],
  // children: [
  //   { path: 'inventory', component: InventoryComponent, canActivate: [AuthGuard] },
  //   { path: 'test-certs', component: TestCertComponent, canActivate: [AuthGuard] },
  //   { path: 'open-orders', component: OpenOrdersComponent, canActivate: [AuthGuard] },
  //   { path: 'invoiced-orders', component: InvoicedOrdersComponent, canActivate: [AuthGuard] },
  // ]
  // },
  // { path: '**', redirectTo: '/login', pathMatch: 'full' },
  // { path: '', component: LoginEntryComponent, pathMatch: 'full' },
  // { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
