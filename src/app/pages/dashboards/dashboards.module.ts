import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbToastModule, NgbTypeaheadModule, NgbPaginationModule, NgbAccordionModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Feather Icon
import { FeatherModule } from 'angular-feather';
import { allIcons } from 'angular-feather/icons';
import { CountToModule } from 'angular-count-to';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { NgbDropdownModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { SimplebarAngularModule } from 'simplebar-angular';
// Apex Chart Package
import { NgApexchartsModule } from 'ng-apexcharts';
// Swiper Slider
import { NgxUsefulSwiperModule } from 'ngx-useful-swiper';
// Flat Picker
import { FlatpickrModule } from 'angularx-flatpickr';

//Module
import { DashboardsRoutingModule } from "./dashboards-routing.module";
import { SharedModule } from '../../shared/shared.module';
import { WidgetModule } from '../../shared/widget/widget.module';


// Component
import { DashboardProdComponent } from './dashboard-prod/dashboard-prod.component';
import { DashboardMaintComponent } from './dashboard-maint/dashboard-maint.component';
import { BackupComponent } from './backup/backup.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import lottie from 'lottie-web';
import { defineElement } from 'lord-icon-element';
import { LightboxModule } from 'ngx-lightbox';


@NgModule({
  declarations: [
    DashboardProdComponent,
    DashboardMaintComponent,
    BackupComponent

  ],
  
  imports: [
    CommonModule,
    NgbToastModule,
    FeatherModule.pick(allIcons),
    CountToModule,
    LeafletModule,
    NgbDropdownModule,
    NgbNavModule,
    SimplebarAngularModule,
    NgApexchartsModule,
    NgxUsefulSwiperModule,
    FlatpickrModule.forRoot(),
    DashboardsRoutingModule,
    SharedModule,
    WidgetModule,
    NgbTypeaheadModule,
    FormsModule,
    ReactiveFormsModule,
    NgbPaginationModule,
    LightboxModule,

    NgbAccordionModule,
    NgbTooltipModule,
    NgxUsefulSwiperModule,
    NgSelectModule,
    FlatpickrModule,
    SharedModule,
    Ng2SearchPipeModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DashboardsModule {
  constructor() {
    defineElement(lottie.loadAnimation);
  }
 }
