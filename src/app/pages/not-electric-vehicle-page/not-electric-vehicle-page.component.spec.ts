import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotElectricVehiclePageComponent } from './not-electric-vehicle-page.component';

describe('NotElectricVehiclePageComponent', () => {
  let component: NotElectricVehiclePageComponent;
  let fixture: ComponentFixture<NotElectricVehiclePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotElectricVehiclePageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NotElectricVehiclePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
