import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';

const theme = responsiveFontSizes(
  createMuiTheme({
    palette: {
      primary: blue,
    },
    custom: {
      backdrop: '200#90caf9',
    },
  }),
);

export default theme;
