import { authenticationConstants } from '../src/misc/constants/authentication-constants';
import { authentication } from '../src/misc/reducers/authentication-reducer';

describe('authentication reducer', () => {
  it('should return the initial state', () => {
    expect(authentication(undefined, {})).toEqual({});
  });

  it('should handle a login request', () => {
    expect(
      authentication(
        {},
        {
          type: authenticationConstants.LOGIN_REQUEST,
          user: 'test_user',
        },
      ),
    ).toEqual({
      loggingIn: true,
      user: 'test_user',
    });
  });

  it('should handle a login success', () => {
    expect(
      authentication(
        {},
        {
          type: authenticationConstants.LOGIN_SUCCESS,
          user: 'test_user',
        },
      ),
    ).toEqual({
      loggedIn: true,
      user: 'test_user',
    });
  });

  it('should handle a login failure', () => {
    expect(
      authentication(
        {},
        {
          type: authenticationConstants.LOGIN_FAILURE,
          user: 'test_user',
        },
      ),
    ).toEqual({});
  });

  it('should handle a logout', () => {
    expect(
      authentication(
        {},
        {
          type: authenticationConstants.LOGOUT,
          user: 'test_user',
        },
      ),
    ).toEqual({});
  });
});
