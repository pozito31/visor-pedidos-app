import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeeOrdersEmployeeComponent } from './see-orders-employee.component';

describe('SeeOrdersEmployeeComponent', () => {
  let component: SeeOrdersEmployeeComponent;
  let fixture: ComponentFixture<SeeOrdersEmployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeeOrdersEmployeeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeeOrdersEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
