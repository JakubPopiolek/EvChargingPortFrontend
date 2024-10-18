import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VrnPageComponent } from './vrn-page.component';
import { Router, RouterModule } from '@angular/router';

describe('VrnPageComponent', () => {
  let component: VrnPageComponent;
  let fixture: ComponentFixture<VrnPageComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VrnPageComponent, RouterModule.forRoot([])],
    }).compileComponents();

    fixture = TestBed.createComponent(VrnPageComponent);
    router = TestBed.inject(Router);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
