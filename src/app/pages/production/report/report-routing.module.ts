import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DailyReportComponent } from './daily-report/daily-report.component';
import { WeklyReportComponent } from './wekly-report/wekly-report.component';
import { MontlyReportComponent } from './montly-report/montly-report.component';
import { DailyHistoryComponent } from './daily-history/daily-history.component';
import { EksportsComponent } from './eksports/eksports.component';
import { DailyActivityComponent } from './daily-activity/daily-activity.component';

const routes: Routes = [
  {
    path:'daily/proses',
    component: DailyReportComponent,
  },
  {
    path:'daily/activity',
    component: DailyActivityComponent,
  },
  {
    path:'wekly',
    component: WeklyReportComponent,
  },
  {
    path:'montly',
    component: MontlyReportComponent,
  },
  {
    path:'daily/proses/history',
    component: DailyHistoryComponent,
  },

  {
    path:'daily/history/:id',
    component:  EksportsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportRoutingModule { }
