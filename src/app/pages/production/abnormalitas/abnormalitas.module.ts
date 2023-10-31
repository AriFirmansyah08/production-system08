import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AbnormalitasRoutingModule } from './abnormalitas-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import lottie from 'lottie-web';
import { AddComponent } from './add/add.component';
import { DetailComponent } from './detail/detail.component';
import { NgbDropdownModule, NgbHighlight, NgbModal, NgbNavModule, NgbPaginationModule, NgbRatingModule, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlatpickrModule } from 'angularx-flatpickr';
import { SimplebarAngularModule } from 'simplebar-angular';
import { defineElement } from 'lord-icon-element';


// Ng Search 
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ViewComponent } from './view/view.component';
import { SliceWordsPipe } from 'src/app/slice-words.pipe';
import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { ProductionModule } from '../production.module';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { NgSelectModule } from '@ng-select/ng-select';
import { ArchwizardModule } from 'angular-archwizard';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { ColorPickerModule } from 'ngx-color-picker';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';
import { UiSwitchModule } from 'ngx-ui-switch';
import { FormRoutingModule } from '../../form/form-routing.module';
import { NgxUsefulSwiperModule } from 'ngx-useful-swiper';
import { InViewportModule } from '@thisissoon/angular-inviewport';


@NgModule({
  declarations: [
    AddComponent,
    DetailComponent,
    ViewComponent,
    SliceWordsPipe
  ],
  imports: [
    CommonModule,
    AbnormalitasRoutingModule,
    FormsModule,

    NgbDropdownModule,
    NgbPaginationModule,
    NgbTypeaheadModule,
    HttpClientModule,
    FlatpickrModule,
    SharedModule,
    SimplebarAngularModule,
    Ng2SearchPipeModule,
    ReactiveFormsModule,
    DropzoneModule,
    NgbHighlight,
    NgbNavModule,
    NgSelectModule,
    UiSwitchModule,
    ColorPickerModule,
    NgxMaskDirective, 
    NgxMaskPipe,
    NgxSliderModule,
    ArchwizardModule,
    AutocompleteLibModule,
    FormRoutingModule,
    NgbRatingModule,
    NgxUsefulSwiperModule,
    InViewportModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AbnormalitasModule {
  constructor() {
    defineElement(lottie.loadAnimation);
    
  }
}
