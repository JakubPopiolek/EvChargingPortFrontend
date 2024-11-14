import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectId } from '../../core/state/store/reducers/application.reducer';

@Component({
  selector: 'app-submitted-page',
  standalone: true,
  imports: [],
  templateUrl: './submitted-page.component.html',
  styleUrl: './submitted-page.component.scss',
})
export class SubmittedPageComponent implements OnInit {
  public referenceNumber?: string;

  constructor(private readonly store: Store) {}

  public ngOnInit(): void {
    this.store.select(selectId).subscribe((refNumber) => {
      this.referenceNumber = refNumber;
    });
  }
}
