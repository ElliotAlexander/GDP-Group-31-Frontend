import { alertConstants } from 'misc/constants/alert-constants';
import { alert } from 'misc/reducers/alert-reducer';

describe('alert reducer', () => {
  it('should return the initial state', () => {
    expect(alert(undefined, {})).toEqual({});
  });

  it('should handle a success alert', () => {
    expect(
      alert(
        {},
        {
          type: alertConstants.SUCCESS,
          message: 'success',
        },
      ),
    ).toEqual({
      type: 'alert-success',
      message: 'success',
    });
  });

  it('should handle a danger alert', () => {
    expect(
      alert(
        {},
        {
          type: alertConstants.ERROR,
          message: 'error',
        },
      ),
    ).toEqual({
      type: 'alert-danger',
      message: 'error',
    });
  });

  it('should handle a clear alert', () => {
    expect(
      alert(
        {},
        {
          type: alertConstants.CLEAR,
          message: 'clear',
        },
      ),
    ).toEqual({});
  });
});
