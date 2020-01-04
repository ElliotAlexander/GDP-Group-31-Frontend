import { userConstants } from '../constants/user-constants';

const initialState = {
  userObject: {},
};

export function userReducer(state = initialState, action) {
  if (action.type === userConstants.SET) {
    return {
      user: action.userObject,
    };
  }
  if (action.type === userConstants.CLEAR) {
    return {
      user: {},
    };
  }
  if (action.type === userConstants.GET) {
    return {
      user: state.userObject,
    };
  }
  return {};
}
