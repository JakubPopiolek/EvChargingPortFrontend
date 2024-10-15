import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmVehicleDetailsPageComponent } from './confirm-vehicle-details-page.component';

describe('ConfirmVehicleDetailsPageComponent', () => {
  let component: ConfirmVehicleDetailsPageComponent;
  let fixture: ComponentFixture<ConfirmVehicleDetailsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmVehicleDetailsPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConfirmVehicleDetailsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
