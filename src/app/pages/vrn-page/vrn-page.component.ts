import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { VrnFormComponent } from './vrn-form/vrn-form.component';

@Component({
  selector: 'app-vrn-page',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, VrnFormComponent],
  templateUrl: './vrn-page.component.html',
  styleUrl: './vrn-page.component.scss',
})
export class VrnPageComponent {}
