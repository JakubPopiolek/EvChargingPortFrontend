import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnterAddressManuallyPageComponent } from './enter-address-manually-page.component';

describe('EnterAddressManuallyPageComponent', () => {
  let component: EnterAddressManuallyPageComponent;
  let fixture: ComponentFixture<EnterAddressManuallyPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnterAddressManuallyPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EnterAddressManuallyPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
