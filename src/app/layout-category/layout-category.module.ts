import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { NgbDropdownModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { SimplebarAngularModule } from 'simplebar-angular';
import { LanguageService } from '../core/services/language.service';
import { TranslateModule } from '@ngx-translate/core';
import { HorizontalComponent } from './horizontal/horizontal.component';
import { HorizontalTopbarComponent } from './horizontal-topbar/horizontal-topbar.component';
import { FooterComponent } from './footer/footer.component';
import { TopbarComponent } from './topbar/topbar.component';
import { LayoutCategoryComponent } from './layout-category.component';



@NgModule({
  declarations: [
    LayoutCategoryComponent,
    HorizontalComponent,
    HorizontalTopbarComponent,
    FooterComponent,
    TopbarComponent,
  ],
  imports: [
    CommonModule,
    CommonModule,
    RouterModule,
    NgbDropdownModule,
    NgbNavModule,
    SimplebarAngularModule,
    TranslateModule,
  ],
  providers: [LanguageService],
})
export class LayoutCategoryModule {
  static forRoot(layoutType: string): ModuleWithProviders<LayoutCategoryModule> {
    return {
      ngModule: LayoutCategoryModule,
      providers: [
        { provide: 'layoutType', useValue: layoutType },
      ],
    };
  }
}
