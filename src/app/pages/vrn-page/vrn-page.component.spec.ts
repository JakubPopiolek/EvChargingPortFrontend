import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Router, RouterModule } from '@angular/router';
import { provideMockStore } from '@ngrx/store/testing';
import { VrnPageComponent } from './vrn-page.component';

describe('VrnPageComponent', () => {
  let component: VrnPageComponent;
  let fixture: ComponentFixture<VrnPageComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VrnPageComponent, RouterModule.forRoot([])],
      providers: [provideMockStore()],
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
