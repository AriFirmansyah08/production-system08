import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Component Pages

import { GatewayComponent } from './gateway/gateway.component';
import { SubGatewayComponent } from './sub-gateway/sub-gateway.component';

const routes: Routes = [
  {
    path: "gateway",
    component:GatewayComponent
  },
  {
    path: "sub/can",
    component:SubGatewayComponent
  },

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class ExtrapagesRoutingModule { }
