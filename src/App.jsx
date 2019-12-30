import React, { useState } from 'react';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { Route, BrowserRouter } from 'react-router-dom';
import Dashboard from './components/dashboard/dashboard/Dashboard.jsx';
import DeviceDashboard from './components/dashboard/dashboard/DeviceDashboard.jsx';
import LoginPage from './components/login-page';

const App = () => {
  const [theme, setTheme] = useState({
    palette: {
      primary: { main: '#121212' },
      type: 'dark',
    },
  });

  // we change the palette type of the theme in state
  const toggleDarkTheme = () => {
    setTheme(prevState => ({
      ...prevState,
      palette: {
        ...prevState.palette,
        type: prevState.palette.type === 'light' ? 'dark' : 'light',
      },
    }));
  };
  // we generate a MUI-theme from state's theme object
  const muiTheme = createMuiTheme(theme);
  return (
    <BrowserRouter>
      <MuiThemeProvider theme={muiTheme}>
        <div>
          <Route
            path="/"
            exact
            render={() => <Dashboard onToggleDark={toggleDarkTheme} />}
          />
          <Route path="/login" render={() => <LoginPage />} />
          <Route path="/device" render={() => <DeviceDashboard />} />
        </div>
      </MuiThemeProvider>
    </BrowserRouter>
  );
};
export default App;
