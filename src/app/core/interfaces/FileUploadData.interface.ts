import { UploadStatus } from '../enums/UploadStatus.enum';

export interface FileUploadData {
  status: UploadStatus;
  error: string | null;
  progress: number | null;
}

export interface FileUploadDataResponse {
  name: string | null;
  timestamp: string | null;
}
