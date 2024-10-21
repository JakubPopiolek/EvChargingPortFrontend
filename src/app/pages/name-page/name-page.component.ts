import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromPersonalDetailsActions from '../../core/state/store/actions/personalDetails.actions';

@Component({
  selector: 'app-name-page',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './name-page.component.html',
  styleUrl: './name-page.component.scss',
})
export class NamePageComponent {
  constructor(private readonly router: Router, private readonly store: Store) {}

  public formIsValid: boolean = true;
  public firstNameValid?: boolean = true;
  public lastNameValid?: boolean = true;
  public nameForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
  });

  public onClick() {
    if (this.nameForm.valid) {
      this.firstNameValid = true;
      this.lastNameValid = true;
      this.store.dispatch(
        fromPersonalDetailsActions.saveName({
          firstName: this.nameForm.get('firstName')?.value!,
          lastName: this.nameForm.get('lastName')?.value!,
        })
      );
      this.router.navigate(['email']);
    } else {
      this.firstNameValid = this.nameForm.get('firstName')?.valid;
      this.lastNameValid = this.nameForm.get('lastName')?.valid;
    }
  }
}
