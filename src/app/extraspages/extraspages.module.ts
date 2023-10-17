import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Component pages
import { ExtrapagesRoutingModule } from './extraspages-routing.module';
import { GatewayComponent } from './gateway/gateway.component';
import { SubGatewayComponent } from './sub-gateway/sub-gateway.component';
import { LayoutsModule } from '../layouts/layouts.module';
import { NgbDropdownModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { SimplebarAngularModule } from 'simplebar-angular';



@NgModule({
  declarations: [
    GatewayComponent,
    SubGatewayComponent,
  ],

  imports: [
    CommonModule,
    ExtrapagesRoutingModule,
    LayoutsModule.forRoot('horizontal'),
    NgbDropdownModule,
    NgbNavModule,
    SimplebarAngularModule,
  ]

})

export class ExtraspagesModule { }
