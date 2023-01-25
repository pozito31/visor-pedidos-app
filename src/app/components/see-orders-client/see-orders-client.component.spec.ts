import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeeOrdersClientComponent } from './see-orders-client.component';

describe('SeeOrdersClientComponent', () => {
  let component: SeeOrdersClientComponent;
  let fixture: ComponentFixture<SeeOrdersClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeeOrdersClientComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeeOrdersClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
