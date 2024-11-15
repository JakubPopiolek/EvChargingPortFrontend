import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  Application,
  ApplicationSubmissionResponse,
} from '../../interfaces/Application.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiApplicationService {
  constructor(public readonly http: HttpClient) {}

  public submitApplication(
    applicationData: Application
  ): Observable<ApplicationSubmissionResponse> {
    const apiUrl: string = `/api/ApplicationItems/submitApplication`;
    return this.http.put<ApplicationSubmissionResponse>(
      apiUrl,
      applicationData
    );
  }

  public ping() {
    const apiUrl: string = `/api/ping`;
    return this.http.get(apiUrl, { observe: 'response', responseType: 'text' });
  }

  public startApplication(): Observable<string> {
    const apiUrl: string = `/api/ApplicationItems/startApplication`;
    return this.http.post<string>(apiUrl, {});
  }
}
