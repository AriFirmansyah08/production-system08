import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeklyReportComponent } from './wekly-report.component';

describe('WeklyReportComponent', () => {
  let component: WeklyReportComponent;
  let fixture: ComponentFixture<WeklyReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WeklyReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WeklyReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
