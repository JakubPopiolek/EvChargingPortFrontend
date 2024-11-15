import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromFileUploadActions from '../../core/state/store/actions/api/fileUpload.actions';
import { selectId } from '../../core/state/store/reducers/application.reducer';
import { FileMetaData } from '../../core/interfaces/FileUpload.interface';
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

  constructor(private readonly router: Router, private readonly store: Store) {}

  public ngOnInit(): void {
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
    this.store.select(selectFileUploadState).subscribe((fileState) => {
      this.uploadFilesForm.get('files')?.setValue(fileState.files);
    });
  }
}
