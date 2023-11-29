import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';

import { ReportRoutingModule } from './report-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbDropdownModule, NgbNavModule, NgbPaginationModule, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { SimplebarAngularModule } from 'simplebar-angular';
import { HttpClientModule } from '@angular/common/http';
import { FlatpickrModule } from 'angularx-flatpickr';

// Load Icon
import { defineElement } from 'lord-icon-element';
import lottie from 'lottie-web';
import { DatePipe } from '@angular/common';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { NgSelectModule } from '@ng-select/ng-select';
import { ArchwizardModule } from 'angular-archwizard';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { ColorPickerModule } from 'ngx-color-picker';
import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { UiSwitchModule } from 'ngx-ui-switch';
import { ProductionModule } from '../production.module';



@NgModule({
    declarations: [
    ],
    imports: [
        CommonModule,
        ReportRoutingModule,
        ProductionModule,
        NgxMaskDirective, 
        NgxMaskPipe,
    ],

    exports:[
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

        NgxSliderModule,
        ArchwizardModule,
        DropzoneModule,
        AutocompleteLibModule,
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
