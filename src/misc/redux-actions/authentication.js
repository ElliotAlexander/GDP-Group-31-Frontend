import { userService } from '../user-service';
import { alertActions } from './alert-actions';
import { history } from '../helpers/history';
import { userConstants } from '../constants/authentication-constants';

export function login(username, password) {
  // eslint-disable-next-line no-unused-vars
  function request(user) {
    return { type: userConstants.LOGIN_REQUEST, user };
  }

  // eslint-disable-next-line no-unused-vars
  function success(user) {
    return { type: userConstants.LOGIN_SUCCESS, user };
  }

  // eslint-disable-next-line no-unused-vars
  function failure(error) {
    return { type: userConstants.LOGIN_FAILURE, error };
  }

  return dispatch => {
    dispatch(request({ username }));

    return userService.login(username, password).then(
      user => {
        dispatch(success(user));
        history.push('/');
      },
      error => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      },
    );
  };
}

// function logout() {
//   userService.logout();
//   return { type: userConstants.LOGOUT };
// }

// export const userActions = {
//   login,
// };
