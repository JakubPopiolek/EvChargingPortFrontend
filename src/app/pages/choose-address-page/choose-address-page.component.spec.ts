import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseAddressPageComponent } from './choose-address-page.component';

describe('ChooseAddressPageComponent', () => {
  let component: ChooseAddressPageComponent;
  let fixture: ComponentFixture<ChooseAddressPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChooseAddressPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChooseAddressPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
