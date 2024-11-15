import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import {
  Application,
  ApplicationSubmissionResponse,
} from '../../interfaces/Application.interface';
import { HttpStatusCode } from '@angular/common/http';
import { ApiApplicationService } from './application-service';
import { ApplicationDouble } from '../../testing/doubles/api/application.double';

describe('ApiApplicationService', () => {
  let service: ApiApplicationService;
  let mockApplication: Application;
  let mockApplicationSubmissionResponse: ApplicationSubmissionResponse;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    mockApplication = ApplicationDouble.prepareApplication();
    mockApplicationSubmissionResponse =
      ApplicationDouble.prepareApplicationSubmissionResponse();
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });

    service = TestBed.inject(ApiApplicationService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call put and return the submitted event', async () => {
    service.submitApplication(mockApplication).subscribe((res) => {
      expect(res).toEqual(mockApplicationSubmissionResponse);
    });

    const req = httpTestingController.expectOne({
      method: 'PUT',
      url: `/api/ApplicationItems/submitApplication`,
    });
    req.flush(mockApplicationSubmissionResponse);
  });

  it('should call ping and return data', () => {
    service.ping().subscribe((data) => {
      expect(data.status).toBe(HttpStatusCode.Ok);
    });

    httpTestingController.expectOne({
      method: 'GET',
      url: `/api/ping`,
    });
  });
});
