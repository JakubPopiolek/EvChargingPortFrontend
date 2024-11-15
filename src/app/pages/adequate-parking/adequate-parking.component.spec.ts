import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdequateParkingComponent } from './adequate-parking.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { MemoizedSelector, StoreModule } from '@ngrx/store';
import { Router, RouterModule } from '@angular/router';
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
import {
  HttpClientTestingModule,
  provideHttpClientTesting,
} from '@angular/common/http/testing';

describe('AdequateParkingComponent', () => {
  let component: AdequateParkingComponent;
  let fixture: ComponentFixture<AdequateParkingComponent>;
  let store: MockStore;
  let mockFileUploadState: FileUpload;
  let mockFileUploadStateSelector: MemoizedSelector<FileUpload, FileUpload>;
  let mockApplicationState: Application;
  let mockIdSelector: MemoizedSelector<Application, string>;
  let router: Router;

  beforeEach(async () => {
    mockFileUploadState = ApiFileUploadStateDouble.prepareFileUploadCompleted();
    mockApplicationState = ApplicationDouble.prepareApplication_onlyId();

    await TestBed.configureTestingModule({
      imports: [
        AdequateParkingComponent,
        StoreModule.forRoot(fileUploadReducer),
        RouterModule.forRoot([]),
        HttpClientTestingModule,
      ],
      providers: [provideMockStore()],
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

  //TODO
  it('should show error when upload failed with relevant error message', () => {});
});
