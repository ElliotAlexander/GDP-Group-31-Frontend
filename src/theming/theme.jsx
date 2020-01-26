import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';

const theme = responsiveFontSizes(
  createMuiTheme({
    palette: {
      primary: {
        main: '#212121',
      },
      type: 'dark',
    },
    custom: {
      backdrop: '200#90caf9',
    },
  }),
);

export default theme;
