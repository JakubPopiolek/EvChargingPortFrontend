import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceUnavailablePageComponent } from './service-unavailable-page.component';

describe('ServiceUnavailablePageComponent', () => {
  let component: ServiceUnavailablePageComponent;
  let fixture: ComponentFixture<ServiceUnavailablePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServiceUnavailablePageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ServiceUnavailablePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
