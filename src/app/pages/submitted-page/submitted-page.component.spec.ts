import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmittedPageComponent } from './submitted-page.component';
import { StoreModule } from '@ngrx/store';

describe('SubmittedPageComponent', () => {
  let component: SubmittedPageComponent;
  let fixture: ComponentFixture<SubmittedPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubmittedPageComponent, StoreModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(SubmittedPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
