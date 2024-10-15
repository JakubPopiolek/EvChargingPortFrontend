import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VrnFormComponent } from './vrn-form.component';

describe('VrnFormComponent', () => {
  let component: VrnFormComponent;
  let fixture: ComponentFixture<VrnFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VrnFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VrnFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
