import { userService } from '../user-service';
import { alertActions } from './alert-actions';
import { history } from '../helpers/history';
import { userConstants } from '../constants/user-constants';

export function login(username, password) {
  function request(user) {
    return { type: userConstants.LOGIN_REQUEST, user };
  }

  function success(user) {
    return { type: userConstants.LOGIN_SUCCESS, user };
  }

  function failure(error) {
    return { type: userConstants.LOGIN_FAILURE, error };
  }

  return dispatch => {
    dispatch(request({ username }));

    return userService.login(username, password).then(
      user => {
        dispatch(success(user));

        // check if password needs resetting
        if (!userService.checkPasswordFlag()) {
          history.push('/'); // go to dashboard if flag is false
        } else {
          history.push('/login'); // go to login to reset password
        }
      },
      error => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
        return 'ERR';
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
