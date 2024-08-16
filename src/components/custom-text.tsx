import React from 'react';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import { styled } from '@mui/material/styles';


const ColorTextField = styled(TextField)<TextFieldProps>(() => ({
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#B9B9B9',
      backgroundColor: 'rgba(20, 22, 21, 0.3)',
    },
    '&:hover fieldset': {
      borderColor: '#5AB091',
    },
    '&.Mui-focused fieldset': {
      borderColor: "#5AB091",
    }
  },
  '& .MuiInputBase-input': {
    color: 'white',
  },
  '& .MuiInputBase-input::placeholder': {
    color: 'white',
  },
  // '.MuiOutlinedInput-notchedOutline' : {
  //   borderColor: '#B9B9B9',
  // }
  
}));


const TextInput: React.FC<TextFieldProps> = (props) => {
  return (
    // <TextField 
    //   {...props}
    //   fullWidth
    //   id="outlined-basic"
    //   variant="outlined"
    //   sx={{ 
    //         '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#5AB091' },
    //         '& .MuiOutlinedInput-root': { 'fieldset': { borderColor: '#B9B9B9', backgroundColor: 'rgba(20, 22, 21, 0.3)' }, '&:hover fieldset': { borderColor: '#5AB091' }, '& input': { color: 'white' }, '& input::placeholder': { color: 'white' } }
    //       }}/>
    <ColorTextField {...props} fullWidth id="outlined-basic" variant="outlined"/>
  );
};

const TextArea: React.FC<TextFieldProps> = (props) => {
  return (
    // <TextField 
    //   {...props} 
    //   fullWidth
    //   id="outlined-basic"
    //   variant="outlined"
    //   multiline
      
    //   sx={{ 
    //     '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#5AB091' },
    //     '& .MuiOutlinedInput-root': { 'fieldset': { borderColor: '#B9B9B9', backgroundColor: 'rgba(20, 22, 21, 0.3)' }, '&:hover fieldset': { borderColor: '#5AB091' }, '& textarea': { color: 'white' }, '& textarea::placeholder': { color: 'white' } }
    //   }}
    //   />
    <ColorTextField multiline {...props} fullWidth id="outlined-basic" variant="outlined"
      // sx={{
      // '& .MuiInputBase-inputMultiline': {
      //   padding: '0.5rem 0', 
      //   lineHeight: 'normal',
      // }}}
    />
  )
}

export { TextInput, TextArea };