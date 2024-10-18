import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vrn-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './vrn-form.component.html',
  styleUrl: './vrn-form.component.scss',
})
export class VrnFormComponent {
  vrn = new FormControl('', [Validators.required]);
  isValid = true;

  constructor(private router: Router) {}

  public onClick() {
    if (this.vrn.valid) {
      this.router.navigate(['/confirmVehicleDetails']);
    } else {
      this.isValid = false;
    }
  }
}
