import { Component, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import {
  selectEmail,
  selectPersonalDetailsState,
} from '../../core/state/store/reducers/personalDetails.reducer';
import { CommonModule } from '@angular/common';
import * as fromPersonalDetailsActions from '../../core/state/store/actions/personalDetails.actions';

@Component({
  selector: 'app-email-page',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './email-page.component.html',
  styleUrl: './email-page.component.scss',
})
export class EmailPageComponent implements OnInit {
  public email: FormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  public isValid: boolean = true;
  public errorMessage: string = '';

  constructor(private readonly router: Router, private readonly store: Store) {}

  ngOnInit(): void {
    this.store
      .select(selectEmail)
      .subscribe((email) => {
        this.email.setValue(email);
      })
      .unsubscribe();
  }
  public onClick() {
    if (this.email.valid) {
      this.store.dispatch(
        fromPersonalDetailsActions.saveEmail({
          email: this.email.value,
        })
      );
      this.router.navigate(['address']);
      this.isValid = true;
    } else if (this.email.value) {
      this.errorMessage = 'Enter a valid email address';
      this.isValid = false;
    } else {
      this.errorMessage = 'Enter email address';
      this.isValid = false;
    }
  }
}
