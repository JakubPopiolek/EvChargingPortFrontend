import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NamePageComponent } from './name-page.component';
import { StoreModule } from '@ngrx/store';
import { RouterModule } from '@angular/router';

describe('NamePageComponent', () => {
  let component: NamePageComponent;
  let fixture: ComponentFixture<NamePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        NamePageComponent,
        StoreModule.forRoot(),
        RouterModule.forRoot([]),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(NamePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
