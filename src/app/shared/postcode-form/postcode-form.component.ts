import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-postcode-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './postcode-form.component.html',
  styleUrl: './postcode-form.component.scss',
})
export class PostcodeFormComponent {
  @Input() addressForm: FormGroup = new FormGroup({});
  @Input() postcodeValid? = true;
  constructor() {}
  ngOnInit() {}
}
