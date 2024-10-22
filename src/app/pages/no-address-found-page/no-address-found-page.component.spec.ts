import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoAddressFoundPageComponent } from './no-address-found-page.component';

describe('NoAddressFoundPageComponent', () => {
  let component: NoAddressFoundPageComponent;
  let fixture: ComponentFixture<NoAddressFoundPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoAddressFoundPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NoAddressFoundPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
