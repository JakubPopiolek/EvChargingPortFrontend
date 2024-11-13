import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiFileUploadService {
  constructor(public readonly http: HttpClient) {}

  public uploadFile(file: File): Observable<HttpEvent<{}>> {
    const formData = new FormData();
    formData.append('files', file, file.name);

    const options = {
      reportProgress: true,
    };

    const apiUrl: string = `/api/FileUpload`;

    const req = new HttpRequest('POST', apiUrl, formData, options);
    console.log(req);

    return this.http.request(req);
  }
}
