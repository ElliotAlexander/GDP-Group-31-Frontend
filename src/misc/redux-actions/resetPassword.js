import { userService } from '../user-service';
import { alertActions } from './alert-actions';
import { history } from '../helpers/history';
import { userConstants } from '../constants/user-constants';

export function resetPassword(username, newPassword) {
  // eslint-disable-next-line no-unused-vars
  function request(user) {
    return { type: userConstants.RESET_PASS_REQUEST, user };
  }

  // eslint-disable-next-line no-unused-vars
  function success(user) {
    return { type: userConstants.RESET_PASS_SUCCESS, user };
  }

  // eslint-disable-next-line no-unused-vars
  function failure(error) {
    return { type: userConstants.RESET_PASS_FAILURE, error };
  }

  return dispatch => {
    dispatch(request({ username }));

    return userService.resetPassword(username, newPassword).then(
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
