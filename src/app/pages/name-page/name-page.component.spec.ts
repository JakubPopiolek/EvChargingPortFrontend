import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NamePageComponent } from './name-page.component';
import { MemoizedSelector, StoreModule } from '@ngrx/store';
import { Router, RouterModule } from '@angular/router';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { PersonalDetails } from '../../core/interfaces/PersonalDetails.interface';
import { selectPersonalDetailsState } from '../../core/state/store/reducers/personalDetails.reducer';
import { PersonalDetailsDouble } from '../../core/testing/doubles/personal-details.double';

describe('NamePageComponent', () => {
  let component: NamePageComponent;
  let fixture: ComponentFixture<NamePageComponent>;
  let router: Router;
  let initialState;
  let store: MockStore;
  let mockPersonalDetailsSelector: MemoizedSelector<
    PersonalDetails,
    PersonalDetails | undefined
  >;
  initialState = PersonalDetailsDouble.preparePersonalDetails();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        NamePageComponent,
        StoreModule.forRoot(),
        RouterModule.forRoot([]),
      ],
      providers: [provideMockStore()],
    }).compileComponents();

    store = TestBed.inject(MockStore);
    mockPersonalDetailsSelector = store.overrideSelector(
      selectPersonalDetailsState,
      initialState
    );

    router = TestBed.inject(Router);
    fixture = TestBed.createComponent(NamePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should error when firstName is empty', () => {
    component.nameForm.get('firstName')?.setValue('');
    const btn = fixture.debugElement.nativeElement.querySelector('button');
    const firstNameInputBox =
      fixture.debugElement.nativeElement.querySelector('#first-name');
    const errorMessage =
      fixture.debugElement.nativeElement.querySelector('#first-name-error');

    btn.click();
    fixture.detectChanges();

    expect(component.nameForm.valid).toBe(false);
    expect(firstNameInputBox).toHaveClass('govuk-input--error');
    expect(errorMessage.style.display).toBe('block');
  });

  it('should error when lastName is empty', () => {
    component.nameForm.get('lastName')?.setValue('');
    const btn = fixture.debugElement.nativeElement.querySelector('button');
    const lastNameInputBox =
      fixture.debugElement.nativeElement.querySelector('#last-name');
    const errorMessage =
      fixture.debugElement.nativeElement.querySelector('#last-name-error');

    btn.click();
    fixture.detectChanges();

    expect(component.nameForm.valid).toBe(false);
    expect(lastNameInputBox).toHaveClass('govuk-input--error');
    expect(errorMessage.style.display).toBe('block');
  });

  it('should route to email page when form is valid', () => {
    const btn = fixture.debugElement.nativeElement.querySelector('button');
    const spy = spyOn(router, 'navigate');
    component.nameForm.get('firstName')?.setValue('testFirstName');
    component.nameForm.get('lastName')?.setValue('testLastName');
    fixture.detectChanges();

    btn.click();

    expect(component.nameForm.valid).toBe(true);
    expect(spy).toHaveBeenCalledWith(['email']);
  });

  it('should fill name boxes when values are present in store', () => {
    const firstNameInputBox =
      fixture.debugElement.nativeElement.querySelector('#first-name');
    const lastNameInputBox =
      fixture.debugElement.nativeElement.querySelector('#last-name');
    mockPersonalDetailsSelector.setResult({
      firstName: 'testFirstName',
      lastName: 'testLastName',
    });

    expect(firstNameInputBox.value).toBe(initialState.firstName);
    expect(lastNameInputBox.value).toBe(initialState.lastName);
  });
});
