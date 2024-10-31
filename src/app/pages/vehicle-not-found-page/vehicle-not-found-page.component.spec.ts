import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleNotFoundPageComponent } from './vehicle-not-found-page.component';
import { ActivatedRoute, RouterModule } from '@angular/router';

describe('VehicleNotFoundPageComponent', () => {
  let component: VehicleNotFoundPageComponent;
  let fixture: ComponentFixture<VehicleNotFoundPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VehicleNotFoundPageComponent, RouterModule.forRoot([])],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              queryParams: {
                vrn: 'mockVrn',
              },
            },
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(VehicleNotFoundPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should prefill vrn box with vrn from url params', () => {
    const vehicleRegNumber =
      fixture.debugElement.nativeElement.querySelector('#vehicleRegNumber');

    expect(vehicleRegNumber.innerText).toBe('mockVrn');
  });
});
