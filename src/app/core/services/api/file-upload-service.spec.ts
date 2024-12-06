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
import { ApiFileUploadService } from './file-upload-service';
import { FileUpload, FileUploadResponse } from '../../interfaces/FileUpload.interface';
import { ApiFileUploadServiceStubFactory } from '../../testing/mocks/api/file-upload-service-stub.factory';
import { ApiFileUploadStateDouble } from '../../testing/doubles/api/file-upload-state.double';

describe('ApiFileUploadService', () => {
  let service: ApiFileUploadService;
  let mockFileUpload: FileUpload;
  let mockFileUploadResponse: FileUploadResponse;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    mockApplication = ApplicationDouble.prepareApplication();
    mockApplicationSubmissionResponse =
      .();
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
