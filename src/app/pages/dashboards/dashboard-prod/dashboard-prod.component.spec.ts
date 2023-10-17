import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardProdComponent } from './dashboard-prod.component';

describe('DashboardProdComponent', () => {
  let component: DashboardProdComponent;
  let fixture: ComponentFixture<DashboardProdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardProdComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardProdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
