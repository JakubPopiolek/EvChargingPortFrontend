import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromPersonalDetailsActions from '../../core/state/store/actions/personalDetails.actions';
import { selectPersonalDetailsState } from '../../core/state/store/reducers/personalDetails.reducer';

@Component({
  selector: 'app-name-page',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './name-page.component.html',
  styleUrl: './name-page.component.scss',
})
export class NamePageComponent implements OnInit {
  public firstNameValid?: boolean = true;
  public lastNameValid?: boolean = true;
  public nameForm = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
  });

  constructor(
    private readonly router: Router,
    private readonly store: Store,
  ) {}

  public ngOnInit(): void {
    this.store.select(selectPersonalDetailsState).subscribe((details) => {
      this.nameForm.get('firstName')?.patchValue(details.firstName);
      this.nameForm.get('lastName')?.patchValue(details.lastName);
    });
  }

  public onClick() {
    if (this.nameForm.valid) {
      this.firstNameValid = true;
      this.lastNameValid = true;
      this.store.dispatch(
        fromPersonalDetailsActions.saveName({
          firstName: this.nameForm.get('firstName')?.value!,
          lastName: this.nameForm.get('lastName')?.value!,
        }),
      );
      this.router.navigate(['email']);
    } else {
      this.firstNameValid = this.nameForm.get('firstName')?.valid;
      this.lastNameValid = this.nameForm.get('lastName')?.valid;
    }
  }
}
