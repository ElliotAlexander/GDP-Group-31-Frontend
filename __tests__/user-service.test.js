import fetchMock from 'fetch-mock';
import { userService } from '../src/misc/redux-actions/user-service';

describe('login service', () => {
  afterEach(() => {
    fetchMock.restore();
  });

  it('login fails', () => {
    fetchMock.post('/authenticate', 400);

    const result = userService.login('uname', 'pass');

    result
      .then(function() {})
      .catch(res => {
        expect(res.toString()).toEqual('Bad Request');
      });
  });

  // TODO: redo after endpoint has been implemented
  it('login succeeds', () => {
    fetch.mockResponse(JSON.stringify({ user: 'uname' }));
    const result = userService.login('uname', 'pass');

    result.then(function(res) {
      expect(res.user).toEqual('uname');
    });
  });
});
