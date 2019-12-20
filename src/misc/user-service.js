function logout() {
  // remove user from local storage to log user out
  localStorage.removeItem('user');
}

function authHeader() {
  // return authorization header with jwt token
  const user = JSON.parse(localStorage.getItem('user'));

  // but is this safe ??
  if (user && user.token) {
    return { Authorization: 'Token ' + user.token };
  }

  return {};
}

function handleResponse(response) {
  return response.text().then(text => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      if (response.status === 401) {
        // auto logout if 401 response returned from api
        logout();
        // eslint-disable-next-line no-restricted-globals
        location.reload(true);
      }

      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
}

function login(username, password) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  };

  return fetch(`/authenticate`, requestOptions)
    .then(handleResponse)
    .then(user => {
      // store user details and jwt token in local storage to keep user logged in between page refreshes
      localStorage.setItem('user', JSON.stringify(user));

      return user;
    });
}

function resetPassword(username, newPassword) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, newPassword }),
  };

  return fetch('/resetPassword', requestOptions).then(handleResponse);
}

function checkPasswordFlag() {
  const requestOptions = {
    method: 'GET',
    headers: authHeader(),
  };

  // will lead to returning true or false
  return fetch('/checkPasswordFlag', requestOptions).then(handleResponse);
}

export const userService = {
  login,
  logout,
  resetPassword,
  checkPasswordFlag,
};
