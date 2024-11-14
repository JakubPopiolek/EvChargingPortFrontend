import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdequateParkingComponent } from './adequate-parking.component';
import { provideMockStore } from '@ngrx/store/testing';
import { StoreModule } from '@ngrx/store';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterModule } from '@angular/router';

describe('AdequateParkingComponent', () => {
  let component: AdequateParkingComponent;
  let fixture: ComponentFixture<AdequateParkingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AdequateParkingComponent,
        StoreModule.forRoot(),
        HttpClientTestingModule,
        RouterModule.forRoot([]),
      ],
      providers: [provideMockStore()],
    }).compileComponents();

    fixture = TestBed.createComponent(AdequateParkingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
