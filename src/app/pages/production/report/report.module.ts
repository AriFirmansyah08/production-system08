import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';

import { ReportRoutingModule } from './report-routing.module';
import { DailyReportComponent } from './daily-report/daily-report.component';
import { WeklyReportComponent } from './wekly-report/wekly-report.component';
import { MontlyReportComponent } from './montly-report/montly-report.component';
import { SharedModule } from "../../../shared/shared.module";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbDropdownModule, NgbNavModule, NgbPaginationModule, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { SimplebarAngularModule } from 'simplebar-angular';
import { HttpClientModule } from '@angular/common/http';
import { FlatpickrModule } from 'angularx-flatpickr';
import { DailyHistoryComponent } from './daily-history/daily-history.component';

// Load Icon
import { defineElement } from 'lord-icon-element';
import lottie from 'lottie-web';
import { DatePipe } from '@angular/common';
import { EksportsComponent } from './eksports/eksports.component';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { NgSelectModule } from '@ng-select/ng-select';
import { ArchwizardModule } from 'angular-archwizard';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { ColorPickerModule } from 'ngx-color-picker';
import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { UiSwitchModule } from 'ngx-ui-switch';
import { FormRoutingModule } from '../../form/form-routing.module';



@NgModule({
    declarations: [
        DailyReportComponent,
        WeklyReportComponent,
        MontlyReportComponent,
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
        DatePipe,
    NgbNavModule,
    NgSelectModule,
    UiSwitchModule,
    ColorPickerModule,
    NgxMaskDirective, 
    NgxMaskPipe,
    NgxSliderModule,
    ArchwizardModule,
    CKEditorModule,
    DropzoneModule,
    AutocompleteLibModule,
    FormRoutingModule,

        
    ],
    providers: [
        DecimalPipe,
        provideNgxMask(),
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]


})
export class ReportModule { 
    constructor() {
        defineElement(lottie.loadAnimation);
    }
    
}
