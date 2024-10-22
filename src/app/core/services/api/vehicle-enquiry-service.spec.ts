import { TestBed } from '@angular/core/testing';
import { VehicleDetails } from '../../interfaces/VehicleDetails.interface';
import { ApiVehicleDetailsDouble } from '../../testing/doubles/api/vehicle-details-result.double';
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

  //   it('should return data from endpoint based on request', async () => {
  //     service
  //       .getByRegNumber(mockVehicleDetails.registrationNumber)
  //       .subscribe((res) => {
  //         expect(res).toEqual(mockVehicleDetails);
  //       });

  //     const req = httpTestingController.expectOne({
  //       method: 'GET',
  //       url: `api/VehicleEnquiryService/`,
  //     });
  //   });
});
