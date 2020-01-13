import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { authenticationConstants } from 'misc/constants/authentication-constants';
import { alertConstants } from 'misc/constants/alert-constants';
import { login } from 'misc/redux-actions/authentication';

describe('login action', () => {
  const middlewares = [thunk];
  const mockStore = configureMockStore(middlewares);

  it('should return a USERS_LOGIN_FAILURE message when login fails ', () => {
    const store = mockStore({ actions: [] });
    return store.dispatch(login('uname', 'pass')).then(() => {
      expect(store.getActions()[1].type).toEqual(
        authenticationConstants.LOGIN_FAILURE,
      );
    });
  });

  it('should return a ALERT_ERROR message when login fails ', () => {
    const store = mockStore({ actions: [] });
    return store.dispatch(login('uname', 'pass')).then(() => {
      expect(store.getActions()[2].type).toEqual(alertConstants.ERROR);
    });
  });

  it('should return a USERS_LOGIN_REQUEST message when login attempted ', () => {
    const expectedRequestActions = {
      type: authenticationConstants.LOGIN_REQUEST,
      user: { username: 'uname' },
    };
    const store = mockStore({ actions: [] });
    return store.dispatch(login('uname', 'test')).then(() => {
      expect(store.getActions()[0]).toEqual(expectedRequestActions);
    });
  });
});
