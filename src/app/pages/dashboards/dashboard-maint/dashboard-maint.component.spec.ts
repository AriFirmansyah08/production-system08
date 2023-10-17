import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardMaintComponent } from './dashboard-maint.component';

describe('DashboardMaintComponent', () => {
  let component: DashboardMaintComponent;
  let fixture: ComponentFixture<DashboardMaintComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardMaintComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardMaintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
