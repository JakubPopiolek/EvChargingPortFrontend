import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CheckAnswersPageComponent } from './check-answers-page.component';
import { MemoizedSelector, StoreModule } from '@ngrx/store';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Router, RouterModule } from '@angular/router';
import { By } from '@angular/platform-browser';
import { PersonalDetails } from '../../core/interfaces/PersonalDetails.interface';
import { VehicleDetails } from '../../core/interfaces/VehicleDetails.interface';
import { PersonalDetailsDouble } from '../../core/testing/doubles/personal-details.double';
import { ApiVehicleDetailsDouble } from '../../core/testing/doubles/api/vehicle-details.double';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { selectPersonalDetailsState } from '../../core/state/store/reducers/personalDetails.reducer';
import { selectVehicleDetails } from '../../core/state/store/reducers/api/vehicleDetailsService.reducer';
import { throwError } from 'rxjs';
import { ApiApplicationService } from '../../core/services/api/application-service';
import { ApiApplicationServiceStubFactory } from '../../core/testing/mocks/api/submit-application-service-stub.factory';
import { selectFileUploadState } from '../../core/state/store/reducers/api/fileUpload.reducer';
import { FileUpload } from '../../core/interfaces/FileUpload.interface';
import { ApiFileUploadStateDouble } from '../../core/testing/doubles/api/file-upload-state.double';

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
  let mockFileUploadStateSelector: MemoizedSelector<
    FileUpload,
    FileUpload | undefined
  >;
  let mockFileUploadState: FileUpload;
  let mockVehicleDetails: VehicleDetails;
  let store: MockStore;
  let apiApplicationServiceMock: ApiApplicationService;
  let router: Router;

  beforeEach(async () => {
    apiApplicationServiceMock =
      ApiApplicationServiceStubFactory.prepareWithMethods([
        'submitApplication',
      ]);
    mockFileUploadState = ApiFileUploadStateDouble.prepareFileUploadCompleted();
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
      providers: [
        provideMockStore({}),
        {
          provide: ApiApplicationService,
          useValue: apiApplicationServiceMock,
        },
      ],
    }).compileComponents();

    store = TestBed.inject(MockStore);
    router = TestBed.inject(Router);

    mockPersonalDetailsSelector = store.overrideSelector(
      selectPersonalDetailsState,
      mockPesonalDetails
    );

    mockVehicleDetailsSelector = store.overrideSelector(
      selectVehicleDetails,
      mockVehicleDetails
    );

    mockFileUploadStateSelector = store.overrideSelector(
      selectFileUploadState,
      mockFileUploadState
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

    var mockFileUploadInnerText: string = '';
    mockFileUploadState.files.forEach((file, index, array) => {
      mockFileUploadInnerText += file.name;
      if (index < array.length - 1) {
        mockFileUploadInnerText += '\n';
      }
    });

    expect(prefilledData[0].nativeElement.innerText).toBe(
      mockVehicleDetails.registrationNumber
    );

    expect(prefilledData[1].nativeElement.innerText).toBe(
      mockFileUploadInnerText
    );

    expect(prefilledData[2].nativeElement.innerText).toBe(
      `${mockPesonalDetails.firstName} ${mockPesonalDetails.lastName}`
    );

    expect(prefilledData[3].nativeElement.innerText).toBe(
      mockPesonalDetails.email
    );

    expect(prefilledData[4].nativeElement.innerText).toContain(
      `${mockPesonalDetails.address?.line1}`
    );
  });

  it('should route to [service unavailable] page when API call fails', () => {
    const storeSpy = spyOn(store, 'dispatch').and.callThrough();
    const routerSpy = spyOn(router, 'navigate');
    spyOn(apiApplicationServiceMock, 'submitApplication').and.returnValue(
      throwError(() => {
        new Error('Api Error');
      })
    );

    const btn = fixture.debugElement.query(
      By.css('.govuk-button')
    ).nativeElement;

    btn.click();
    expect(storeSpy).not.toHaveBeenCalled();
    expect(routerSpy).toHaveBeenCalledWith(['serviceUnavailable']);
  });
});
