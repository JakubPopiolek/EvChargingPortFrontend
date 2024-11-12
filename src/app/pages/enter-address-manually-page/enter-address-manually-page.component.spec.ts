import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnterAddressManuallyPageComponent } from './enter-address-manually-page.component';
import { StoreModule } from '@ngrx/store';
import { Router, RouterModule } from '@angular/router';

describe('EnterAddressManuallyPageComponent', () => {
  let component: EnterAddressManuallyPageComponent;
  let fixture: ComponentFixture<EnterAddressManuallyPageComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        EnterAddressManuallyPageComponent,
        StoreModule.forRoot(),
        RouterModule.forRoot([]),
      ],
    }).compileComponents();

    router = TestBed.inject(Router);
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

  it('should route to [confirmAddress] page when continue button is clicked', () => {
    component.addressForm.get('line1')?.setValue('testLine1');
    component.addressForm.get('city')?.setValue('testCity');
    component.addressForm.get('postcode')?.setValue('testPostcode');
    const btn = fixture.debugElement.nativeElement.querySelector('button');
    const spy = spyOn(router, 'navigate');

    btn.click();

    expect(spy).toHaveBeenCalledWith(['confirmAddress'], {
      queryParams: { route: 'enter-manually' },
    });
  });
});
