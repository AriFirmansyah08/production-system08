import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';

import { FlatpickrModule } from 'angularx-flatpickr';
import { CountToModule } from 'angular-count-to';
import { NgApexchartsModule } from 'ng-apexcharts';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { SimplebarAngularModule } from 'simplebar-angular';
import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';

// Swiper Slider
import { NgxUsefulSwiperModule } from 'ngx-useful-swiper';

// Load Icons
import { defineElement } from 'lord-icon-element';
import lottie from 'lottie-web';

// Pages Routing
import { PagesRoutingModule } from "./pages-routing.module";
import { SharedModule } from "../shared/shared.module";
import { WidgetModule } from '../shared/widget/widget.module';
import { DashboardComponent } from './dashboards/dashboard/dashboard.component';
import { ToastsContainer } from './dashboards/dashboard/toasts-container.component';
import { ProductionModule } from './production/production.module';
import { DashboardsModule } from './dashboards/dashboards.module';
import { KartuStockComponent } from './kartu-stock/kartu-stock.component';
import { KartuStockBackupComponent } from './kartu-stock-backup/kartu-stock-backup.component';

@NgModule({
  declarations: [
    DashboardComponent,
    ToastsContainer,
    KartuStockComponent,
    KartuStockBackupComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgbToastModule,
    FlatpickrModule.forRoot(),
    CountToModule,
    NgApexchartsModule,
    LeafletModule,
    NgbDropdownModule,
    SimplebarAngularModule,
    PagesRoutingModule,
    SharedModule,
    WidgetModule,
    NgxUsefulSwiperModule,
    ProductionModule,
    DashboardsModule,
    NgxQRCodeModule
  ],
})
export class PagesModule { 
  constructor() {
    defineElement(lottie.loadAnimation);
  }
}
