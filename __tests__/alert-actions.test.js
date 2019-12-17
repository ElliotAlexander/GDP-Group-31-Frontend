import { alertActions } from '../src/misc/redux-actions/alert-actions';
import { alertConstants } from '../src/misc/constants/alert-constants';

describe('actions', () => {
  it('should create an action with a success message', () => {
    const message = 'This is a success message';
    const expectedAction = {
      type: alertConstants.SUCCESS,
      message,
    };
    expect(alertActions.success(message)).toEqual(expectedAction);
  });

  it('should create an action with a error message', () => {
    const message = 'This is an error message';
    const expectedAction = {
      type: alertConstants.ERROR,
      message,
    };
    expect(alertActions.error(message)).toEqual(expectedAction);
  });

  it('should create an action with a clear message', () => {
    const expectedAction = {
      type: alertConstants.CLEAR,
    };
    expect(alertActions.clear()).toEqual(expectedAction);
  });
});
