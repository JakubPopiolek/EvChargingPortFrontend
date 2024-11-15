import { Component, ElementRef, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromFileUploadActions from '../../core/state/store/actions/api/fileUpload.actions';
import { selectId } from '../../core/state/store/reducers/application.reducer';
import { FileMetaData } from '../../core/interfaces/FileUpload.interface';
import * as selectors from '../../core/state/store/reducers/api/fileUpload.reducer';
import { CommonModule } from '@angular/common';
import { ApiFileUploadService } from '../../core/services/api/file-upload-service';

@Component({
  selector: 'app-adequate-parking',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './adequate-parking.component.html',
  styleUrls: ['./adequate-parking.component.scss'],
})
export class AdequateParkingComponent implements OnInit {
  public uploadFilesForm: FormGroup = new FormGroup({
    files: new FormControl([]),
  });
  private id: string = '';
  public uploadErrorMessage?: string;
  public uploadError: boolean = false;
  public allowedExtensions: string[] = [];

  constructor(
    private readonly router: Router,
    private readonly store: Store,
    private readonly ApiFileUploadService: ApiFileUploadService
  ) {}

  public ngOnInit(): void {
    this.ApiFileUploadService.getFileExtensions().subscribe((ext) => {
      this.allowedExtensions = ext;
    });

    this.store
      .select(selectId)
      .subscribe((id) => {
        this.id = id;
      })
      .unsubscribe();

    this.loadFilesFromStore();
  }

  public onClick(): void {
    this.router.navigate(['name']);
  }

  public onFileSelected(event: Event): void {
    const element = event.currentTarget as HTMLInputElement;
    if (element.files) {
      const files: FileList = element.files;
      Array.from(files).forEach((file) => {
        this.store.dispatch(
          fromFileUploadActions.uploadRequest({
            file: file,
            id: this.id,
          })
        );
      });

      this.store.select(selectors.selectError).subscribe((error) => {
        if (error) {
          this.uploadError = true;
          this.uploadErrorMessage = error;
        } else {
          this.uploadError = false;
        }
      });

      this.loadFilesFromStore();
    }
  }

  public onFileDelete(fileId: number): void {
    this.store.dispatch(
      fromFileUploadActions.deleteFile({
        id: fileId,
      })
    );
    this.loadFilesFromStore();
  }

  private loadFilesFromStore() {
    this.store
      .select(selectors.selectFileUploadState)
      .subscribe((fileState) => {
        this.uploadFilesForm.get('files')?.setValue(fileState.files);
      });
  }
}
