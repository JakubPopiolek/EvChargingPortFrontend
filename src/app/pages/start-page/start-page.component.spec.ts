import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartPageComponent } from './start-page.component';
import { StoreModule } from '@ngrx/store';
import { Router, RouterModule } from '@angular/router';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { ApiSubmitApplicationService } from '../../core/services/api/application-service';
import { ApiSubmitApplicationServiceStubFactory } from '../../core/testing/mocks/api/submit-application-service-stub.factory';
import { of, throwError } from 'rxjs';
import {
  HttpErrorResponse,
  HttpResponse,
  HttpStatusCode,
} from '@angular/common/http';

describe('StartPageComponent', () => {
  let component: StartPageComponent;
  let fixture: ComponentFixture<StartPageComponent>;
  let apiSubmitApplicationServiceMock: ApiSubmitApplicationService;
  let router: Router;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    apiSubmitApplicationServiceMock =
      ApiSubmitApplicationServiceStubFactory.prepareWithMethods(['ping']);
    await TestBed.configureTestingModule({
      imports: [
        RouterModule.forRoot([]),
        StartPageComponent,
        StoreModule.forRoot([]),
        HttpClientTestingModule,
      ],
    }).compileComponents();

    router = TestBed.inject(Router);
    httpMock = TestBed.inject(HttpTestingController);
    apiSubmitApplicationServiceMock = TestBed.inject(
      ApiSubmitApplicationService
    );
    fixture = TestBed.createComponent(StartPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to vrn page when api returns ok status', () => {
    let mockApiResponse = new HttpResponse({
      body: '2024-10-29T13:23:47.143615+00:00',
    });
    spyOn(apiSubmitApplicationServiceMock, 'ping').and.returnValue(
      of(mockApiResponse)
    );
    const routerSpy = spyOn(router, 'navigate');

    const btn = fixture.debugElement.nativeElement.querySelector('button');

    btn.click();

    expect(routerSpy).toHaveBeenCalledWith(['vrn']);
  });

  it('should navigate to serviceUnavailable page when api returns error', () => {
    spyOn(apiSubmitApplicationServiceMock, 'ping').and.returnValue(
      throwError(() => 'error')
    );
    const routerSpy = spyOn(router, 'navigate');

    const btn = fixture.debugElement.nativeElement.querySelector('button');

    btn.click();

    expect(routerSpy).toHaveBeenCalledWith(['serviceUnavailable']);
  });
});
