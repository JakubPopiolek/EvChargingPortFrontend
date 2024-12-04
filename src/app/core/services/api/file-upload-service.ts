import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FileMetaData } from '../../interfaces/FileUpload.interface';

@Injectable({
  providedIn: 'root',
})
export class ApiFileUploadService {
  constructor(public readonly http: HttpClient) {}

  public uploadFile(file: File, id: string): Observable<HttpEvent<{}>> {
    const formData = new FormData();
    formData.append('files', file, file.name);

    const options = {
      reportProgress: true,
    };

    const apiUrl: string = `/api/FileUpload/${id}`;

    const req = new HttpRequest('POST', apiUrl, formData, options);

    return this.http.request(req);
  }

  public getFiles(id: string): Observable<FileMetaData[]> {
    const apiUrl: string = `/api/FileUpload/${id}`;
    return this.http.get<FileMetaData[]>(apiUrl);
  }

  public deleteFile(id: number): Observable<any> {
    const apiUrl: string = `/api/FileUpload/${id}`;
    return this.http.delete<any>(apiUrl);
  }

  public getFileExtensions(): Observable<string[]> {
    const apiurl: string = `/api/FileUpload/getFileExtensions`;
    return this.http.get<string[]>(apiurl);
  }
}
