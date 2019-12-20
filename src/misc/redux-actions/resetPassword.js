import { userService } from '../user-service';
import { alertActions } from './alert-actions';
import { userConstants } from '../constants/user-constants';

export function resetPassword(username, newPassword) {
  function request(user) {
    return { type: userConstants.RESET_PASS_REQUEST, user };
  }

  function success(user) {
    return { type: userConstants.RESET_PASS_SUCCESS, user };
  }

  function failure(error) {
    return { type: userConstants.RESET_PASS_FAILURE, error };
  }

  return dispatch => {
    dispatch(request({ username }));

    return userService.resetPassword(username, newPassword).then(
      user => {
        dispatch(success(user));
        window.location.reload();
      },
      error => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      },
    );
  };
}
