import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromFileUploadActions from '../../core/state/store/actions/api/fileUpload.actions';

@Component({
  selector: 'app-adequate-parking',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './adequate-parking.component.html',
  styleUrl: './adequate-parking.component.scss',
})
export class AdequateParkingComponent {
  public uploadFilesForm: FormGroup = new FormGroup({
    files: new FormControl([]),
  });
  private files: Array<File> = [];

  constructor(private readonly router: Router, private readonly store: Store) {}

  public onClick(): void {
    this.router.navigate(['name']);
  }

  public onFileSelected(event: Event): void {
    const element = event.currentTarget as HTMLInputElement;
    if (element.files) {
      const files: FileList = element.files;
      Array.from(files).forEach(async (file) => {
        // const text = await new Response(file).text();
        this.files.push(file);
        this.store.dispatch(
          fromFileUploadActions.uploadRequest({
            file: file,
          })
        );
      });
      this.uploadFilesForm.get('files')?.setValue(this.files);
    }
  }
}
