import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartPageComponent } from './start-page.component';
import { Store, StoreModule } from '@ngrx/store';
import { Router, RouterModule } from '@angular/router';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { of, throwError } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { ApiApplicationService } from '../../core/services/api/application-service';
import { ApiApplicationServiceStubFactory } from '../../core/testing/mocks/api/submit-application-service-stub.factory';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { saveId } from '../../core/state/store/actions/application.actions';

describe('StartPageComponent', () => {
  let component: StartPageComponent;
  let fixture: ComponentFixture<StartPageComponent>;
  let apiApplicationServiceMock: ApiApplicationService;
  let router: Router;
  let httpMock: HttpTestingController;
  let store: MockStore;

  beforeEach(async () => {
    apiApplicationServiceMock =
      ApiApplicationServiceStubFactory.prepareWithMethods([
        'ping',
        'startApplication',
      ]);
    await TestBed.configureTestingModule({
      imports: [
        RouterModule.forRoot([]),
        StartPageComponent,
        StoreModule.forRoot([]),
        HttpClientTestingModule,
      ],
      providers: [provideMockStore()],
    }).compileComponents();

    store = TestBed.inject(MockStore);
    router = TestBed.inject(Router);
    httpMock = TestBed.inject(HttpTestingController);
    apiApplicationServiceMock = TestBed.inject(ApiApplicationService);
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
    spyOn(apiApplicationServiceMock, 'ping').and.returnValue(
      of(mockApiResponse)
    );
    const routerSpy = spyOn(router, 'navigate');

    const btn = fixture.debugElement.nativeElement.querySelector('button');

    btn.click();

    expect(routerSpy).toHaveBeenCalledWith(['vrn']);
  });

  it('should navigate to serviceUnavailable page when ping endpoint returns error', () => {
    spyOn(apiApplicationServiceMock, 'ping').and.returnValue(
      throwError(() => 'error')
    );
    const routerSpy = spyOn(router, 'navigate');

    const btn = fixture.debugElement.nativeElement.querySelector('button');

    btn.click();

    expect(routerSpy).toHaveBeenCalledWith(['serviceUnavailable']);
  });

  it('should navigate to serviceUnavailable page when startApplication endpoint returns error', () => {
    let mockApiResponse = new HttpResponse({
      body: '2024-10-29T13:23:47.143615+00:00',
    });

    spyOn(apiApplicationServiceMock, 'ping').and.returnValue(
      of(mockApiResponse)
    );
    spyOn(apiApplicationServiceMock, 'startApplication').and.returnValue(
      throwError(() => 'error')
    );
    const routerSpy = spyOn(router, 'navigate');

    const btn = fixture.debugElement.nativeElement.querySelector('button');

    btn.click();

    expect(routerSpy).toHaveBeenCalledWith(['serviceUnavailable']);
  });

  it('should dispatch saveId action startApplication endpoint returns id', () => {
    let mockApiResponse = new HttpResponse({
      body: '2024-10-29T13:23:47.143615+00:00',
    });

    spyOn(apiApplicationServiceMock, 'ping').and.returnValue(
      of(mockApiResponse)
    );
    spyOn(apiApplicationServiceMock, 'startApplication').and.returnValue(
      of('test-id')
    );

    const storeSpy = spyOn(store, 'dispatch');

    const btn = fixture.debugElement.nativeElement.querySelector('button');

    btn.click();

    expect(storeSpy).toHaveBeenCalledWith(saveId({ id: 'test-id' }));
  });
});
