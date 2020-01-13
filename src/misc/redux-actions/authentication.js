import { userService } from '../user-service';
import { alertActions } from './alert-actions';
import { authenticationConstants } from '../constants/authentication-constants.js';

export function login(username, password) {
  // eslint-disable-next-line no-unused-vars
  function request(user) {
    return { type: authenticationConstants.LOGIN_REQUEST, user };
  }

  // eslint-disable-next-line no-unused-vars
  function success(user) {
    return { type: authenticationConstants.LOGIN_SUCCESS, user };
  }

  // eslint-disable-next-line no-unused-vars
  function failure(error) {
    return { type: authenticationConstants.LOGIN_FAILURE, error };
  }

  return dispatch => {
    dispatch(request({ username }));
    return userService.login(username, password).then(
      user => {
        dispatch(success(user));
      },
      error => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      },
    );
  };
}

export function logout() {
  userService.logout();
  return { type: authenticationConstants.LOGOUT };
}
