import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { ApiSubmitApplicationService } from './application-service';
import {
  ApplicationSubmission,
  ApplicationSubmissionResponse,
} from '../../interfaces/Application.interface';
import { SubmitApplicationDouble } from '../../testing/doubles/api/submit-application.double';
import { HttpStatusCode } from '@angular/common/http';

describe('ApiSubmitApplicationService', () => {
  let service: ApiSubmitApplicationService;
  let mockApplicationSubmission: ApplicationSubmission;
  let mockApplicationSubmissionResponse: ApplicationSubmissionResponse;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    mockApplicationSubmission =
      SubmitApplicationDouble.prepareApplicationSubmission();
    mockApplicationSubmissionResponse =
      SubmitApplicationDouble.prepareApplicationSubmissionResponse();
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });

    service = TestBed.inject(ApiSubmitApplicationService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call post and return the submitted event', async () => {
    service.post(mockApplicationSubmission).subscribe((res) => {
      expect(res).toEqual(mockApplicationSubmissionResponse);
    });

    const req = httpTestingController.expectOne({
      method: 'POST',
      url: `/api/ApplicationItems`,
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
