import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EksportsComponent } from './eksports.component';

describe('EksportsComponent', () => {
  let component: EksportsComponent;
  let fixture: ComponentFixture<EksportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EksportsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EksportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
