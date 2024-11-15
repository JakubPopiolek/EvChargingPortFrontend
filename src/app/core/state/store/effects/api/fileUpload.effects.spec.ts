import { Observable, of } from 'rxjs';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import * as fromFileUploadActions from '../../actions/api/fileUpload.actions';
import { ApiFileUploadService } from '../../../../services/api/file-upload-service';
import { FileUploadEffects } from './fileUpload.effects';
import { ApiFileUploadServiceStubFactory } from '../../../../testing/mocks/api/file-upload-service-stub.factory';

describe('fileUploadEffects', () => {
  let actions$: Observable<any>;
  let effects: FileUploadEffects;
  let fileUploadServiceMock: ApiFileUploadService;

  beforeEach(() => {
    fileUploadServiceMock = ApiFileUploadServiceStubFactory.prepareWithMethods([
      'uploadFile',
      'deleteFile',
    ]);
    TestBed.configureTestingModule({
      providers: [
        FileUploadEffects,
        provideMockActions(() => actions$),
        {
          provide: ApiFileUploadService,
          useValue: fileUploadServiceMock,
        },
      ],
    });
    effects = TestBed.inject(FileUploadEffects);
  });

  it('should upload file', () => {
    const spy = spyOn(fileUploadServiceMock, 'uploadFile').and.callThrough();

    actions$ = of(fromFileUploadActions.uploadRequest);
    effects.uploadRequest$.subscribe((res) => {});
    expect(spy).toHaveBeenCalled();
  });

  it('should delete file', () => {
    const spy = spyOn(fileUploadServiceMock, 'deleteFile').and.callThrough();

    actions$ = of(fromFileUploadActions.deleteFile);
    effects.deleteFile$.subscribe((res) => {});
    expect(spy).toHaveBeenCalled();
  });
});
