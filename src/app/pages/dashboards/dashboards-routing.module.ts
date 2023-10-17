import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Component Pages
import { DashboardProdComponent } from './dashboard-prod/dashboard-prod.component';
import { DashboardMaintComponent } from './dashboard-maint/dashboard-maint.component';

const routes: Routes = [
  {
    path: "dashboard-prod",
    component: DashboardProdComponent
  },
  {
    path: "dashboard-maint",
    component: DashboardMaintComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class DashboardsRoutingModule { }
