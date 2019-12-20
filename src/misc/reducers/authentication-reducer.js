import { userConstants } from '../constants/user-constants';

const user = JSON.parse(localStorage.getItem('user'));
const initialState = user ? { loggedIn: true, user } : {};

export function authentication(state = initialState, action) {
  switch (action.type) {
    case userConstants.LOGIN_REQUEST:
      return {
        loggingIn: true,
        user: action.user,
      };
    case userConstants.LOGIN_SUCCESS:
      return {
        loggedIn: true,
        user: action.user,
      };
    case userConstants.LOGIN_FAILURE:
      return {};
    case userConstants.LOGOUT:
      return {};
    case userConstants.RESET_PASS_REQUEST:
      return {
        loggedIn: false,
        user: action.user,
      };
    case userConstants.RESET_PASS_SUCCESS:
      return {
        loggedIn: false,
        user: action.user,
      };
    case userConstants.RESET_PASS_FAILURE:
      return {};
    default:
      return state;
  }
}
