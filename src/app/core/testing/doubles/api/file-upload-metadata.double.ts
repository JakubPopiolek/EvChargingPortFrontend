import { FileMetaData } from '../../../interfaces/FileUpload.interface';

export class FileUploadMetadataDouble {
  public static prepareFileUploadMetadata(): FileMetaData[] {
    return [
      {
        id: 0,
        name: 'test-file-name-1',
      },
      {
        id: 1,
        name: 'test-file-name-2',
      },
    ];
  }
}
