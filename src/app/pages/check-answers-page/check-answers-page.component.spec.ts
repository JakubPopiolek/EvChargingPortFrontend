import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckAnswersPageComponent } from './check-answers-page.component';
import { MemoizedSelector, StoreModule } from '@ngrx/store';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterModule } from '@angular/router';
import { By } from '@angular/platform-browser';
import { PersonalDetails } from '../../core/interfaces/PersonalDetails.interface';
import { VehicleDetails } from '../../core/interfaces/VehicleDetails.interface';
import { PersonalDetailsDouble } from '../../core/testing/doubles/personal-details.double';
import { ApiVehicleDetailsDouble } from '../../core/testing/doubles/api/vehicle-details-result.double';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { selectPersonalDetailsState } from '../../core/state/store/reducers/personalDetails.reducer';
import { selectVehicleDetails } from '../../core/state/store/reducers/api/vehicleDetailsService.reducer';

describe('CheckAnswersPageComponent', () => {
  let component: CheckAnswersPageComponent;
  let fixture: ComponentFixture<CheckAnswersPageComponent>;
  let mockPersonalDetailsSelector: MemoizedSelector<
    PersonalDetails,
    PersonalDetails | undefined
  >;
  let mockPesonalDetails: PersonalDetails;
  let mockVehicleDetailsSelector: MemoizedSelector<
    VehicleDetails,
    VehicleDetails | undefined
  >;
  let mockVehicleDetails: VehicleDetails;
  let store: MockStore;

  beforeEach(async () => {
    mockPesonalDetails = PersonalDetailsDouble.preparePersonalDetails();
    mockVehicleDetails =
      ApiVehicleDetailsDouble.prepareSuccessfulResultElectric();

    await TestBed.configureTestingModule({
      imports: [
        CheckAnswersPageComponent,
        StoreModule.forRoot(),
        HttpClientTestingModule,
        RouterModule.forRoot([]),
      ],
      providers: [provideMockStore({})],
    }).compileComponents();

    TestBed.configureTestingModule({ teardown: { destroyAfterEach: false } });
    store = TestBed.inject(MockStore);

    mockPersonalDetailsSelector = store.overrideSelector(
      selectPersonalDetailsState,
      mockPesonalDetails
    );
    mockVehicleDetailsSelector = store.overrideSelector(
      selectVehicleDetails,
      mockVehicleDetails
    );

    fixture = TestBed.createComponent(CheckAnswersPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should prefill information from store', () => {
    const prefilledData = fixture.debugElement.queryAll(
      By.css('.govuk-summary-list__value')
    );

    expect(prefilledData[0].nativeElement.innerText).toBe(
      mockVehicleDetails.registrationNumber
    );

    expect(prefilledData[1].nativeElement.innerText).toBe(
      `${mockPesonalDetails.firstName} ${mockPesonalDetails.lastName}`
    );

    expect(prefilledData[2].nativeElement.innerText).toBe(
      mockPesonalDetails.email
    );

    expect(prefilledData[3].nativeElement.innerText).toContain(
      `${mockPesonalDetails.address?.line1}`
    );
  });

  // it('should call application submission when submit button is clicked', () => {

  // })
});
