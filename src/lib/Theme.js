import { createMuiTheme } from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';
import orange from '@material-ui/core/colors/orange';
import red from '@material-ui/core/colors/red';

const theme = createMuiTheme({
  palette: {
    primary: green,
    secondary: orange,
    error: red,
  },
  typography: {
    fontFamily: '"Lato", sans-serif',
  },
});

export default theme;
