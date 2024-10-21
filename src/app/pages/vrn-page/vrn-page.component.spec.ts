import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VrnPageComponent } from './vrn-page.component';
import { Router, RouterModule } from '@angular/router';
import { ApiVehicleDetailsResponseDouble } from '../../core/testing/doubles/api/vehicle-details-result.double';
import { SessionUtils } from '../../core/state/utils/session.utils';
import { provideMockStore } from '@ngrx/store/testing';

describe('VrnPageComponent', () => {
  let component: VrnPageComponent;
  let fixture: ComponentFixture<VrnPageComponent>;
  let router: Router;

  const vehicleDetails =
    ApiVehicleDetailsResponseDouble.prepareSuccessfulResultElectric();

  beforeEach(async () => {
    spyOn(SessionUtils, 'getVehicleDetails').and.returnValue(() => {
      vehicleDetails;
    });
    await TestBed.configureTestingModule({
      imports: [VrnPageComponent, RouterModule.forRoot([])],
      providers: [provideMockStore()],
    }).compileComponents();

    fixture = TestBed.createComponent(VrnPageComponent);
    router = TestBed.inject(Router);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
