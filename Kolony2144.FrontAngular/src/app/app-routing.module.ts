import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    // { path: 'login', component: LoginEntryComponent },
    // { path: 'managers-list', component: ManagersListComponent, canActivate: [AuthGuard] },

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
