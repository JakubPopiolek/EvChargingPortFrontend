import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnterAddressManuallyPageComponent } from './enter-address-manually-page.component';
import { StoreModule } from '@ngrx/store';
import { RouterModule } from '@angular/router';

describe('EnterAddressManuallyPageComponent', () => {
  let component: EnterAddressManuallyPageComponent;
  let fixture: ComponentFixture<EnterAddressManuallyPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        EnterAddressManuallyPageComponent,
        StoreModule.forRoot(),
        RouterModule.forRoot([]),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EnterAddressManuallyPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should error when required fields are empty', () => {
    component.addressForm.get('line1')?.setValue('');
    component.addressForm.get('city')?.setValue('');

    const btn = fixture.debugElement.nativeElement.querySelector('button');

    const errorMessage_addressLineOne =
      fixture.debugElement.nativeElement.querySelector('#line1-error');
    const errorMessage_townOrCity =
      fixture.debugElement.nativeElement.querySelector('#city-error');

    btn.click();
    fixture.detectChanges();

    expect(component.addressForm.valid).toBe(false);
    expect(errorMessage_addressLineOne.style.display).toBe('block');
    expect(errorMessage_townOrCity.style.display).toBe('block');
  });
});
