import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyappsComponent } from './myapps/myapps.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { CalendarComponent } from './calendar/calendar.component';


const routes: Routes = [
  {
    path: "myapps",
    component: MyappsComponent
  },
  {
    path: "calendar",
    component: CalendarComponent
  },
  {
    path: "production/schedule",
    component: ScheduleComponent
  },
  {
    path: 'report', loadChildren: () => import('./report/report.module').then(m => m.ReportModule)
  },
  {
    path: 'abnormal', loadChildren: () => import('./abnormalitas/abnormalitas.module').then(m => m.AbnormalitasModule)
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductionRoutingModule { }
