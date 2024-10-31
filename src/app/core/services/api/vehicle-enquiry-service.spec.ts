import { TestBed } from '@angular/core/testing';
import { VehicleDetails } from '../../interfaces/VehicleDetails.interface';
import { ApiVehicleDetailsDouble } from '../../testing/doubles/api/vehicle-details.double';
import { ApiVehicleEnquiryService } from './vehicle-enquiry-service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

describe('ApiVehicleDetailsService', () => {
  let service: ApiVehicleEnquiryService;
  let mockVehicleDetails: VehicleDetails;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    mockVehicleDetails =
      ApiVehicleDetailsDouble.prepareSuccessfulResultElectric();
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(ApiVehicleEnquiryService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  xit('should return data from endpoint based on request', async () => {
    service
      .getByRegNumber(mockVehicleDetails.registrationNumber)
      .subscribe((res) => {
        expect(res).toEqual(mockVehicleDetails);
      });

    httpTestingController.expectOne({
      method: 'GET',
      url: `api/VehicleEnquiryService/`,
    });
  });
});
