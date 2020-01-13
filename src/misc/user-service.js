import ApolloClient, { gql } from 'apollo-boost';

function logout() {
  // remove user from local storage to log user out
  localStorage.removeItem('user');
}

function login(username, password) {
  const client = new ApolloClient({
    uri: 'http://localhost:5000/graphql',
  });

  const mutation = gql(`
  mutation {
    authenticate(input: {
      email: "${username}",
      password:"${password}"
    }) {
      jwtToken
    }
  }
  `);

  /* eslint-disable */
  return client.mutate({ mutation }).then(response => {
    if (response.error || response.data.authenticate.jwtToken === null) {
      logout();
      throw new Error('Failed to login');
    }

    localStorage.setItem('user', response.data.authenticate.jwtToken);
    return response.data.authenticate.jwtToken;
  });
}

export const userService = {
  login,
  logout,
};
