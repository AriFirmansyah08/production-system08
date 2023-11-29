import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Component pages
import { DashboardComponent } from "./dashboards/dashboard/dashboard.component";
import { KartuStockComponent } from './kartu-stock/kartu-stock.component';

const routes: Routes = [
    {
        path: "",
        component: DashboardComponent
    },
    {
      path: "kartustock",
      component: KartuStockComponent
    },
    {
      path: '', loadChildren: () => import('./dashboards/dashboards.module').then(m => m.DashboardsModule)
    },
    {
      path: 'myapps', loadChildren: () => import('./production/production.module').then(m => m.ProductionModule)
    },
    {
      path: 'forms', loadChildren: () => import('./form/form.module').then(m => m.FormModule)
    },
    {
      path: 'charts', loadChildren: () => import('./charts/charts.module').then(m => m.ChartsModule)
    },
    {
      path: 'production', loadChildren: () => import('./production/production.module').then(m => m.ProductionModule)
    },
    {
      path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
    },
    
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
