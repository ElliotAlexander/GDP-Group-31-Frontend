import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import { authenticationConstants } from '../src/misc/constants/authentication-constants';
import { alertConstants } from '../src/misc/constants/alert-constants';
import { login } from '../src/misc/redux-actions/authentication';

describe('login action', () => {
  const middlewares = [thunk];
  const mockStore = configureMockStore(middlewares);

  afterEach(() => {
    fetchMock.restore();
  });

  it('should return a USERS_LOGIN_FAILURE message when login fails ', () => {
    fetchMock.post('/authenticate', 400);

    const store = mockStore({ actions: [] });

    return store.dispatch(login('uname', 'pass')).then(() => {
      expect(store.getActions()[1].type).toEqual(
        authenticationConstants.LOGIN_FAILURE,
      );
    });
  });

  it('should return a ALERT_ERROR message when login fails ', () => {
    fetchMock.post('/authenticate', 400);

    const store = mockStore({ actions: [] });

    return store.dispatch(login('uname', 'pass')).then(() => {
      expect(store.getActions()[2].type).toEqual(alertConstants.ERROR);
    });
  });

  it('should return a USERS_LOGIN_SUCCESS message when login succeeds ', () => {
    fetchMock.post('/authenticate', 200);

    const store = mockStore({ actions: [] });

    return store.dispatch(login('uname', 'pass')).then(() => {
      expect(store.getActions()[1].type).toEqual(
        authenticationConstants.LOGIN_SUCCESS,
      );
    });
  });

  it('should return a USERS_LOGIN_REQUEST message when login attempted ', () => {
    const expectedRequestActions = {
      type: authenticationConstants.LOGIN_REQUEST,
      user: { username: 'uname' },
    };

    fetchMock.post('/authenticate', 200);

    const store = mockStore({ actions: [] });

    return store.dispatch(login('uname', 'test')).then(() => {
      expect(store.getActions()[0]).toEqual(expectedRequestActions);
    });
  });
});
