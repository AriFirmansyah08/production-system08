import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyappsModalComponent } from './myapps-modal.component';

describe('MyappsModalComponent', () => {
  let component: MyappsModalComponent;
  let fixture: ComponentFixture<MyappsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyappsModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyappsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
