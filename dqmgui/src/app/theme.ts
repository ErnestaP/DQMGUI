import { createMuiTheme } from '@material-ui/core/styles';
import lightBlue from '@material-ui/core/colors/lightBlue';
import blueGrey from '@material-ui/core/colors/blueGrey';

declare module '@material-ui/core/styles/transitions' {
  interface Transitions {
    durationHover: string;
  }
}

declare module '@material-ui/core/styles/createPalette' {
  interface TypeText {
    placeholder: string;
  }

  interface PaletteColor {
    [key: string]: string;
  }
  interface TypeBackground {
    [key: string]: string;
  }
}

const createTheme = () => {
  // @ts-ignore
  const theme = createMuiTheme({
    palette: {
      primary: {
        // ...blue,
        main: '#039be5',
        light: '#29b6f6',
        dark: '#.277bd',
        contrastText: '#FFF',
      },
      secondary: {
        // ...amber,
        main: '#00acc1',
        light: '#A0D3F9',
        dark: '#00838f',
        contrastText: '#9DA6B0',
        [400]: '#000'
        // main: '#fcd734',
        // light: '#ffff6b',
        // dark: '#c5a600',
        // contrastText: '#9DA6B0',
        // [400]: '#ffca28'
      },
      text: {
        primary: '#22282D',
        secondary: '#666F7D',
        disabled: '#ACB0B4',
        placeholder: '#ACB0B4',
      },
      common: {
        // @ts-ignore
        lightBlack: lightBlue[500],
        lightWhite: blueGrey[500],
        fullBlack: blueGrey[500],
        white: '#FFF',
      },
      background: {
        lightBlue: '#e3f2fd'
      },
      grey: {
        [100]: '#f5f5f5',
        [300]: '#e0e0e0',
        [500]: '#9e9e9e',
      },
    },
    // overrides: {
    //   MuiSelect: {
    //     root: {
    //       '&$selected': {
    //         backgroundColor: 'orange',
    //       },
    //       background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    //       color: 'white'
    //     },
    //   },
    // },
  })
  return theme
};

export default createTheme();
