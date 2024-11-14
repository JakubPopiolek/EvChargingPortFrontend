import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromFileUploadActions from '../../core/state/store/actions/api/fileUpload.actions';
import { selectId } from '../../core/state/store/reducers/application.reducer';
import { ApiFileUploadService } from '../../core/services/api/file-upload-service';
import {
  FileMetaData,
  FileUploadResponse,
} from '../../core/interfaces/FileUpload.interface';
import { selectFileUploadState } from '../../core/state/store/reducers/api/fileUpload.reducer';

@Component({
  selector: 'app-adequate-parking',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './adequate-parking.component.html',
  styleUrls: ['./adequate-parking.component.scss'],
})
export class AdequateParkingComponent implements OnInit {
  public uploadFilesForm: FormGroup = new FormGroup({
    files: new FormControl([]),
  });
  private files: Array<FileMetaData> = [];
  private id: string = '';

  constructor(
    private readonly router: Router,
    private readonly store: Store,
    private readonly fileUploadService: ApiFileUploadService
  ) {}

  public ngOnInit(): void {
    this.store
      .select(selectId)
      .subscribe((id) => {
        this.id = id;
      })
      .unsubscribe();

    this.fileUploadService
      .getFiles(this.id)
      .subscribe((files: FileUploadResponse[]) => {
        this.files = files;
        this.uploadFilesForm.get('files')?.setValue(files);
      });
  }

  public onClick(): void {
    this.router.navigate(['name']);
  }

  public onFileSelected(event: Event): void {
    const element = event.currentTarget as HTMLInputElement;
    if (element.files) {
      const files: FileList = element.files;
      Array.from(files).forEach((file) => {
        const fileUploadResponse: FileMetaData = {
          name: file.name,
          id: Number(this.id),
        };

        this.files.push(fileUploadResponse);
        this.store.dispatch(
          fromFileUploadActions.uploadRequest({
            file: file,
            id: this.id,
          })
        );
      });

      this.uploadFilesForm.get('files')?.setValue(this.files);
    }
  }

  public onFileDelete(fileId: number): void {
    this.store.dispatch(
      fromFileUploadActions.deleteFile({
        id: fileId,
      })
    );
    this.store.select(selectFileUploadState).subscribe((fileState) => {
      this.uploadFilesForm.get('files')?.setValue(fileState.files);
    });
  }
}
