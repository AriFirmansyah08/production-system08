import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'daily', loadChildren: () => import('./daily/daily.module').then(m => m.DailyModule)
  },
  {
    path: 'wekly', loadChildren: () => import('./weekly/weekly.module').then(m => m.WeeklyModule)
  },
  {
    path: 'montly', loadChildren: () => import('./montly/montly.module').then(m => m.MontlyModule)
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportRoutingModule { }
