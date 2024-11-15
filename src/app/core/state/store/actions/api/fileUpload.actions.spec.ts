import * as Actions from './fileUpload.actions';

describe('fileUpload actions', () => {
  it('should create an action - [ uploadRequest ]', () => {
    const action = Actions.uploadRequest({
      file: new File([''], 'test-file'),
      id: 'test-id',
    });
    expect(action.type).toEqual(Actions.ActionType.UPLOAD_REQUEST);
  });

  it('should create an action - [ uploadFailure ]', () => {
    const action = Actions.uploadFailure({
      error: 'error',
    });
    expect(action.type).toEqual(Actions.ActionType.UPLOAD_FAILURE);
  });

  it('should create an action - [ uploadCompleted ]', () => {
    const action = Actions.uploadCompleted({
      newFiles: [],
    });
    expect(action.type).toEqual(Actions.ActionType.UPLOAD_COMPLETED);
  });

  it('should create an action - [ deleteFile ]', () => {
    const action = Actions.deleteFile({
      id: 0,
    });
    expect(action.type).toEqual(Actions.ActionType.DELETE_FILE);
  });

  it('should create an action - [ deleteFoleSuccess ]', () => {
    const action = Actions.deleteFileSuccess({
      id: 0,
    });
    expect(action.type).toEqual(Actions.ActionType.DELETE_FILE_SUCCESS);
  });

  it('should create an action - [ deleteFileFailure ]', () => {
    const action = Actions.deleteFileFailure({
      error: 'error',
    });
    expect(action.type).toEqual(Actions.ActionType.DELETE_FILE_FAILURE);
  });
});
