import { userConstants } from '../constants/user-constants';

export function setUser(user) {
  return { type: userConstants.SET, user };
}

export function clearUser() {
  return { type: userConstants.CLEAR };
}

export function getUser() {
  return { type: userConstants.GET };
}
