import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmAddressPageComponent } from './confirm-address-page.component';

describe('ConfirmAddressPageComponent', () => {
  let component: ConfirmAddressPageComponent;
  let fixture: ComponentFixture<ConfirmAddressPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmAddressPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConfirmAddressPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
