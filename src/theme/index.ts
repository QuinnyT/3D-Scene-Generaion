import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
    interface Palette {
        parametrix: Palette['primary'];
    }
  
    interface PaletteOptions {
        parametrix?: PaletteOptions['primary'];
    }
  }
  
declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    parametrix: true;
  }
}

const customTheme = createTheme({
  palette: {
    parametrix: {
      main: '#5AB091',
      light: '#A7E3CE',
      dark: '#295444',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          // 使用flex布局使内容始终居中
          // justifyContent: 'center',
          '& .MuiButton-endIcon': {
            margin: '0.5rem',
            // marginLeft: '0.5rem',
            // marginRight: '0.5rem',
          },
        }
      }
    },
    MuiChip: {
      styleOverrides: {
        filled: {
          backgroundColor: '#5AB091',
          borderColor: '#A5A5A5',
          color: 'white',
          '&:hover': {
            backgroundColor: '#295444',
          }
        },
        outlined: {
          backgroundColor: 'rgba(0, 0, 0, 0)',
          borderColor: '#A5A5A5',
          color: 'white'
        },
        root: {
          '&.MuiChip-outlined': {   // 能够覆盖默认样式
            '&:hover': {
              backgroundColor: '#295444',
            }
          }
        },
      }
    }
  }
});

export default customTheme;