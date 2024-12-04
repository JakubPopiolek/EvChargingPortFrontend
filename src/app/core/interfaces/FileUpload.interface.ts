import { UploadStatus } from '../enums/UploadStatus.enum';

export interface FileUpload {
  status: UploadStatus;
  error: string | null;
  progress: number | null;
  files: FileMetaData[];
}

export interface FileMetaData {
  id: number | null;
  name: string | null;
}
