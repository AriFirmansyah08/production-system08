import { NgModule } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';

import { ReportRoutingModule } from './report-routing.module';
import { DailyReportComponent } from './daily-report/daily-report.component';
import { WeklyReportComponent } from './wekly-report/wekly-report.component';
import { MontlyReportComponent } from './montly-report/montly-report.component';
import { SharedModule } from "../../../shared/shared.module";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbDropdownModule, NgbPaginationModule, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { SimplebarAngularModule } from 'simplebar-angular';
import { HttpClientModule } from '@angular/common/http';
import { FlatpickrModule } from 'angularx-flatpickr';
import { DailyHistoryComponent } from './daily-history/daily-history.component';

// Load Icon
import { defineElement } from 'lord-icon-element';
import lottie from 'lottie-web';
import { NgDailySortableHeader } from './daily-report/daily-report-sortable.directive';
import { DatePipe } from '@angular/common';
import { EksportsComponent } from './eksports/eksports.component';



@NgModule({
    declarations: [
        DailyReportComponent,
        WeklyReportComponent,
        MontlyReportComponent,
        NgDailySortableHeader,
        DailyHistoryComponent,
        EksportsComponent,
        
    ],
    imports: [
        CommonModule,
        ReportRoutingModule,
        SharedModule,
        FormsModule,
        ReactiveFormsModule,
        NgbDropdownModule,
        NgbTypeaheadModule,
        HttpClientModule,
        FlatpickrModule,
        SimplebarAngularModule,
        NgbPaginationModule,
        DatePipe
        
    ],
    providers: [
        DecimalPipe,
    ],
})
export class ReportModule { 
    constructor() {
        defineElement(lottie.loadAnimation);
    }
    
}
