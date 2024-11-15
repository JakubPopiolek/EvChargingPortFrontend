import { FuelType } from '../../../enums/FuelType.enum';
import { UploadStatus } from '../../../enums/UploadStatus.enum';
import { FileUpload } from '../../../interfaces/FileUpload.interface';
import { FileUploadMetadataDouble } from './file-upload-metadata.double';

export class ApiFileUploadStateDouble {
  public static prepareFileUploadCompleted(): FileUpload {
    return {
      status: UploadStatus.Completed,
      error: null,
      progress: null,
      files: FileUploadMetadataDouble.prepareFileUploadMetadata(),
    };
  }
}
