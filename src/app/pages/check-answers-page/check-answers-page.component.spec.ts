import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckAnswersPageComponent } from './check-answers-page.component';

describe('CheckAnswersPageComponent', () => {
  let component: CheckAnswersPageComponent;
  let fixture: ComponentFixture<CheckAnswersPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckAnswersPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CheckAnswersPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
