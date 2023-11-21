import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyappsComponent } from './myapps/myapps.component';
import { MachineComponent } from './machine/machine.component';
import { UsersComponent } from './users/users.component';


const routes: Routes = [
  {
    path: "myapps",
    component: MyappsComponent
  },
  {
    path: "machine",
    component: MachineComponent
  },
  {
    path: "user",
    component: UsersComponent
  },
  {
    path: 'schedule', loadChildren: () => import('./calendar/calendar.module').then(m => m.CalendarModule)
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
