import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ApiFileUploadService } from '../../../../services/api/file-upload-service';
import * as fromFileUploadActions from '../../actions/api/fileUpload.actions';
import { catchError, concatMap, exhaustMap, map, of, takeUntil } from 'rxjs';
import { HttpEvent, HttpEventType } from '@angular/common/http';
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
      concatMap((action) =>
        this.fileUploadService.uploadFile(action.file).pipe(
          takeUntil(
            this.actions$.pipe(ofType(fromFileUploadActions.uploadCancel))
          ),
          map((event) => this.getActionFromHttpEvent(event)),
          catchError((error) => of(this.handleError(error)))
        )
      )
    )
  );

  private getActionFromHttpEvent(event: HttpEvent<any>) {
    switch (event.type) {
      case HttpEventType.Sent: {
        return fromFileUploadActions.uploadStarted();
      }
      case HttpEventType.UploadProgress: {
        return fromFileUploadActions.uploadProgress({
          progress: Math.round(
            (100 * event.loaded) / (event.total ? event.total : 1)
          ),
        });
      }
      case HttpEventType.ResponseHeader:
      case HttpEventType.Response: {
        if (event.status === 200) {
          return fromFileUploadActions.uploadCompleted();
        } else {
          return fromFileUploadActions.uploadFailure({
            error: event.statusText,
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
