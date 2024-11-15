import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ApiFileUploadService } from '../../../../services/api/file-upload-service';
import * as fromFileUploadActions from '../../actions/api/fileUpload.actions';
import { catchError, map, mergeMap, of, switchMap, takeUntil } from 'rxjs';
import { HttpEvent, HttpEventType, HttpResponse } from '@angular/common/http';
import { serializeError } from 'serialize-error';

@Injectable()
export class FileUploadEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly fileUploadService: ApiFileUploadService
  ) {}

  uploadRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromFileUploadActions.uploadRequest),
      mergeMap((action) =>
        this.fileUploadService.uploadFile(action.file, action.id).pipe(
          map((event) => this.getActionFromHttpEvent(event)),
          catchError((error) => of(this.handleError(error)))
        )
      )
    )
  );

  deleteFile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromFileUploadActions.deleteFile),
      switchMap((action) =>
        this.fileUploadService.deleteFile(action.id).pipe(
          map(() => {
            return fromFileUploadActions.deleteFileSuccess({
              id: action.id,
            });
          }),
          catchError((error) =>
            of(
              fromFileUploadActions.deleteFileFailure({
                error: serializeError(error).message,
              })
            )
          )
        )
      )
    )
  );

  private getActionFromHttpEvent(event: HttpEvent<any>) {
    switch (event.type) {
      case HttpEventType.ResponseHeader:
      case HttpEventType.Response: {
        if (event instanceof HttpResponse) {
          if (event.status === 200) {
            return fromFileUploadActions.uploadCompleted({
              newFiles: event.body,
            });
          } else {
            return fromFileUploadActions.uploadFailure({
              error: event.statusText,
            });
          }
        } else {
          return fromFileUploadActions.uploadFailure({
            error: `Unexpected response type: ${event.constructor.name}`,
          });
        }
      }
      default: {
        return fromFileUploadActions.uploadFailure({
          error: `Unknown Event: ${JSON.stringify(event)}`,
        });
      }
    }
  }

  private handleError(error: any) {
    const friendlyErrorMessage = serializeError(error).message;
    return fromFileUploadActions.uploadFailure({
      error: friendlyErrorMessage,
    });
  }
}
