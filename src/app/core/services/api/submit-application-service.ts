import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  ApplicationSubmission,
  ApplicationSubmissionResponse,
} from '../../interfaces/ApplicationSubmission.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiSubmitApplicationService {
  constructor(public readonly http: HttpClient) {}

  public post(
    applicationData: ApplicationSubmission
  ): Observable<ApplicationSubmissionResponse> {
    const apiUrl: string = `/api/ApplicationItems`;
    return this.http.post<ApplicationSubmissionResponse>(
      apiUrl,
      applicationData
    );
  }

  public get() {
    const apiUrl: string = `/api/ping`;
    return this.http.get(apiUrl, { observe: 'response', responseType: 'text' });
  }
}
