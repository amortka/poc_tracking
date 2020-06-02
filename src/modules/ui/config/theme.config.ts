import { createMuiTheme } from '@material-ui/core/styles';
import { Color } from '../../canvas/canvas.model';

export const routeColors: Color[] = ['#e9842c', '#416BE8', '#11B573', '#E9842C', '#41E8D7', '#A853D8'];

export const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      light: '#3B434D',
      main: '#2C323A',
      dark: '#181D24',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#11B573',
    },
    error: {
      main: '#EA2E2E',
    },
    action: {
      hover: 'rgb(33, 40, 48)',
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#2C323A',
      disabled: 'rgba(255, 255, 255, 0.4)',
      // icon: '#989FA4',
    },
    divider: '#62686F',
    background: {
      paper: '#212830',
      default: '#181D24',
    },
  },
});
