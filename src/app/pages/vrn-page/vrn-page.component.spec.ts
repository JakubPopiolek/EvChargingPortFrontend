import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { VrnPageComponent } from './vrn-page.component';
import { RouterModule } from '@angular/router';

describe('VrnPageComponent', () => {
  let component: VrnPageComponent;
  let fixture: ComponentFixture<VrnPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VrnPageComponent, RouterModule.forRoot([])]
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
