import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductionRoutingModule } from './production-routing.module';
import { MdbModalModule } from 'mdb-angular-ui-kit/modal';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { ScrollSpyModule } from '@thisissoon/angular-scrollspy';
import { NgbAccordionModule, NgbCollapseModule, NgbDropdownModule, NgbModule, NgbNavModule, NgbPaginationModule, NgbProgressbarModule, NgbRatingModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { InViewportModule } from '@thisissoon/angular-inviewport';
import { NgxUsefulSwiperModule } from 'ngx-useful-swiper';
import { SimplebarAngularModule } from 'simplebar-angular';
import { SharedModule } from 'src/app/shared/shared.module';

//component pages
import { MyappsComponent } from './myapps/myapps.component';
import { MyappsModalComponent } from './myapps/myapps-modal/myapps-modal.component';

// Calendar package
import { FullCalendarModule } from '@fullcalendar/angular';
import { DatePipe } from '@angular/common';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { NgSelectModule } from '@ng-select/ng-select';
import { CountToModule } from 'angular-count-to';
import { FeatherModule } from 'angular-feather';
import { allIcons } from 'angular-feather/icons';
import { FlatpickrModule } from 'angularx-flatpickr';
import { NgApexchartsModule } from 'ng-apexcharts';
import { NgxMaskDirective,  provideNgxMask } from 'ngx-mask';
import { LOCALE_ID } from '@angular/core';
import { MachineComponent } from './machine/machine.component';
import { UsersComponent } from './users/users.component';


@NgModule({
  declarations: [
    MyappsComponent,
    MyappsModalComponent,
    MachineComponent,
    UsersComponent,

  ],
  imports: [
    CommonModule,
    ProductionRoutingModule,
    FormsModule,
    DropzoneModule,
    ScrollSpyModule.forRoot(),
    NgbDropdownModule,
    NgbRatingModule,
    NgxUsefulSwiperModule,
    InViewportModule,
    FullCalendarModule,
    ReactiveFormsModule,
    SharedModule,
    DatePipe,
    FormsModule,
    NgbTooltipModule,
    NgbDropdownModule,
    NgbAccordionModule,
    NgbProgressbarModule,
    NgbNavModule,
    NgbPaginationModule,
    NgbCollapseModule,
    FeatherModule.pick(allIcons),
    FlatpickrModule.forRoot(),
    SimplebarAngularModule,
    CountToModule,
    NgApexchartsModule,
    LeafletModule,
    NgSelectModule,
    NgxUsefulSwiperModule,
    NgxMaskDirective, 
    NgbModule,
    
    
  ],
  exports: [
    NgbModule,
    MdbModalModule,
    FormsModule,
    DropzoneModule,
    NgbDropdownModule,
    NgbRatingModule,
    NgxUsefulSwiperModule,
    InViewportModule,
    FullCalendarModule,
    ReactiveFormsModule,
    DatePipe,
    SimplebarAngularModule,
    SharedModule,

    
  ],
  providers: [
    DatePipe,
    provideNgxMask(),
    { provide: LOCALE_ID, useValue: 'id-ID' },
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProductionModule { }
