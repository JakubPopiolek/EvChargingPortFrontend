import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdequateParkingComponent } from './adequate-parking.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { MemoizedSelector, StoreModule } from '@ngrx/store';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FileUpload } from '../../core/interfaces/FileUpload.interface';
import { ApiFileUploadStateDouble } from '../../core/testing/doubles/api/file-upload-state.double';
import {
  fileUploadReducer,
  selectFileUploadState,
} from '../../core/state/store/reducers/api/fileUpload.reducer';
import { By } from '@angular/platform-browser';
import { Application } from '../../core/interfaces/Application.interface';
import { ApplicationDouble } from '../../core/testing/doubles/api/application.double';
import { selectId } from '../../core/state/store/reducers/application.reducer';
import {
  deleteFile,
  uploadRequest,
} from '../../core/state/store/actions/api/fileUpload.actions';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ApiFileUploadService } from '../../core/services/api/file-upload-service';
import { ApiFileUploadServiceStubFactory } from '../../core/testing/mocks/api/file-upload-service-stub.factory';
import { of } from 'rxjs';

describe('AdequateParkingComponent', () => {
  let component: AdequateParkingComponent;
  let fixture: ComponentFixture<AdequateParkingComponent>;
  let store: MockStore;
  let mockFileUploadState: FileUpload;
  let mockFileUploadStateSelector: MemoizedSelector<FileUpload, FileUpload>;
  let mockApplicationState: Application;
  let mockIdSelector: MemoizedSelector<Application, string>;
  let router: Router;
  let mockApiFileUploadService: ApiFileUploadService;

  beforeEach(async () => {
    mockFileUploadState = ApiFileUploadStateDouble.prepareFileUploadCompleted();
    mockApplicationState = ApplicationDouble.prepareApplication_onlyId();
    mockApiFileUploadService =
      ApiFileUploadServiceStubFactory.prepareWithMethods(['getFileExtensions']);

    await TestBed.configureTestingModule({
      imports: [
        AdequateParkingComponent,
        StoreModule.forRoot(fileUploadReducer),
        RouterModule.forRoot([]),
        HttpClientTestingModule,
      ],
      providers: [
        provideMockStore(),
        {
          provide: ApiFileUploadService,
          useValue: mockApiFileUploadService,
        },
      ],
    }).compileComponents();

    router = TestBed.inject(Router);
    store = TestBed.inject(MockStore);
    mockFileUploadStateSelector = store.overrideSelector(
      selectFileUploadState,
      mockFileUploadState
    );

    mockIdSelector = store.overrideSelector(
      selectId,
      mockApplicationState.referenceNumber
    );

    fixture = TestBed.createComponent(AdequateParkingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load file extensions when the page loads', () => {
    const mockAllowedExtensions = ['.png', '.pdf'];
    spyOn(mockApiFileUploadService, 'getFileExtensions').and.returnValue(
      of(mockAllowedExtensions)
    );
    component.ngOnInit();
    fixture.detectChanges();

    expect(component.allowedExtensions).toBe(mockAllowedExtensions);
  });

  it('should load already uploaded files when the page loads', () => {
    const fileRows = fixture.debugElement.queryAll(
      By.css('.govuk-summary-list__row')
    );

    fileRows.forEach((row, index) => {
      const rowKey = row.query(By.css('.govuk-summary-list__key'));
      expect(rowKey.nativeElement.innerText).toContain(
        mockFileUploadState.files[index].name
      );
    });
    expect(fileRows.length).toBe(mockFileUploadState.files.length);
  });

  it('should dispatch uploadRequest when a file is added', () => {
    const storeSpy = spyOn(store, 'dispatch');
    const dataTransfer = new DataTransfer();
    const testFile = new File([''], 'test-file.pdf');
    dataTransfer.items.add(testFile);

    const fileUploadEl = fixture.debugElement.query(
      By.css('.govuk-file-upload')
    );
    fileUploadEl.nativeElement.files = dataTransfer.files;

    fileUploadEl.nativeElement.dispatchEvent(new InputEvent('change'));

    fixture.detectChanges();

    expect(storeSpy).toHaveBeenCalledWith(
      uploadRequest({
        file: testFile,
        id: mockApplicationState.referenceNumber,
      })
    );
  });

  it('should dispatch deleteFile when a file is deleted', () => {
    const storeSpy = spyOn(store, 'dispatch');
    const firstFileRow = fixture.debugElement.query(
      By.css('.govuk-summary-list__row')
    );
    const firstFileId = component.uploadFilesForm.get('files')?.value[0].id;
    const deleteButton = firstFileRow.query(By.css('.delete-file'));
    deleteButton.nativeElement.click();
    expect(storeSpy).toHaveBeenCalledWith(
      deleteFile({
        id: firstFileId,
      })
    );
  });

  it('should navigate to name page when continue button is clicked', () => {
    const routerSpy = spyOn(router, 'navigate');
    const btn = fixture.debugElement.nativeElement.querySelector('button');

    btn.click();

    expect(routerSpy).toHaveBeenCalledWith(['name']);
  });

  it('should show error when upload failed with relevant error message', () => {
    mockFileUploadStateSelector.setResult({
      ...mockFileUploadState,
      error: 'test-error',
    });
    store.refreshState();

    const dataTransfer = new DataTransfer();
    const testFile = new File([''], 'test-file.pdf');
    dataTransfer.items.add(testFile);

    const fileUploadEl = fixture.debugElement.query(
      By.css('.govuk-file-upload')
    );
    fileUploadEl.nativeElement.files = dataTransfer.files;

    fileUploadEl.nativeElement.dispatchEvent(new InputEvent('change'));

    fixture.detectChanges();

    expect(component.uploadError).toBe(true);
    expect(component.uploadErrorMessage).toBe('test-error');
  });

  it('should route to checkAnswers page when form is valid and route has change=true', () => {
    TestBed.inject(ActivatedRoute).snapshot.queryParams = {
      change: true,
    };
    const routerSpy = spyOn(router, 'navigate');
    const btn = fixture.debugElement.nativeElement.querySelector('button');

    btn.click();

    expect(routerSpy).toHaveBeenCalledWith(['checkAnswers']);
  });
});
