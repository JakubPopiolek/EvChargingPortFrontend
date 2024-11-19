import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotElectricVehiclePageComponent } from './not-electric-vehicle-page.component';
import { Store, StoreModule } from '@ngrx/store';
import { Router, RouterModule } from '@angular/router';
import { ClearVehicleDetails } from '../../core/state/store/actions/api/vehicleDetailsService.actions';

describe('NotElectricVehiclePageComponent', () => {
  let component: NotElectricVehiclePageComponent;
  let fixture: ComponentFixture<NotElectricVehiclePageComponent>;
  let router: Router;
  let store: Store;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        NotElectricVehiclePageComponent,
        StoreModule.forRoot([]),
        RouterModule.forRoot([]),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(NotElectricVehiclePageComponent);
    store = TestBed.inject(Store);
    router = TestBed.inject(Router);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to vrn when continue button is clicked and change in route is undefined', () => {
    const btn = fixture.debugElement.nativeElement.querySelector('button');
    const spy = spyOn(router, 'navigate');

    btn.click();

    expect(spy).toHaveBeenCalledWith(['vrn'], {
      queryParams: { change: undefined },
    });
  });

  it('should call [vehicleEnquiryServiceActions -> ClearVehicleDetails] when continue button is clicked', () => {
    const btn = fixture.debugElement.nativeElement.querySelector('button');
    const spy = spyOn(store, 'dispatch').and.callThrough();

    btn.click();

    expect(spy).toHaveBeenCalledWith(ClearVehicleDetails());
  });
});
