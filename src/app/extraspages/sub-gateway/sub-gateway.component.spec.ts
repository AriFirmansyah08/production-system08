import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubGatewayComponent } from './sub-gateway.component';

describe('SubGatewayComponent', () => {
  let component: SubGatewayComponent;
  let fixture: ComponentFixture<SubGatewayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubGatewayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubGatewayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
