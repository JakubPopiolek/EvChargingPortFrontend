import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VrnPageComponent } from './vrn-page.component';

describe('VrnPageComponent', () => {
  let component: VrnPageComponent;
  let fixture: ComponentFixture<VrnPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VrnPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VrnPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
