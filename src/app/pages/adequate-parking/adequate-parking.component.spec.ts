import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdequateParkingComponent } from './adequate-parking.component';

describe('AdequateParkingComponent', () => {
  let component: AdequateParkingComponent;
  let fixture: ComponentFixture<AdequateParkingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdequateParkingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdequateParkingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
