import React from 'react';
import Button, { ButtonProps } from '@mui/material/Button';
import Chip, {ChipProps} from '@mui/material/Chip'

import { ThemeProvider } from '@mui/material/styles';
import customTheme from '../theme';


const OutlineButton: React.FC<ButtonProps> = (props) => {
  return (
    // 使用 ThemeProvider 自定义样式
    <ThemeProvider theme={customTheme}>
      <Button {...props} sx={{ color: '#fff', borderColor: '#ACACAC' }} color='parametrix' variant="outlined"></Button>
    </ThemeProvider>
    
    // 使用 sx 自定义样式
    // <ColorButton {...props} variant="outlined"></ColorButton>
    // <Button {...props} sx={{ color: '#fff', borderColor: '#ACACAC', ':hover': { borderColor: '#5AB091' } }}  variant="outlined"></Button>
  );
};

const ContainedButton: React.FC<ButtonProps> = (props) => {
  return (
    <ThemeProvider theme={customTheme}>
      <Button {...props} color='parametrix' variant="contained"></Button>
    </ThemeProvider>
  //  <Button {...props} sx={{ color: '#fff', backgroundColor: "#5AB091", ':hover': { backgroundColor: '#295444' } }}  variant="contained"></Button>
  );
};

const CustomChip: React.FC<ChipProps> = (props) => {
  return (
    <ThemeProvider theme={customTheme}>
      <Chip {...props} />
    </ThemeProvider>
  //  <Button {...props} sx={{ color: '#fff', backgroundColor: "#5AB091", ':hover': { backgroundColor: '#295444' } }}  variant="contained"></Button>
  );
};

export { OutlineButton, ContainedButton, CustomChip };