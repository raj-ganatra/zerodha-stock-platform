import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function Input({label,type,val,onChange,shrink,width}) {
  // console.log("val-->"+val);
  let styles={
    width:width,
    marginLeft:"12px",
    marginTop:"25px",
    marginBottom:"-10px",
  }
  return (
    <Box
      // component="form"
      sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
      noValidate
      autoComplete="off"
    >
      <TextField id="outlined-basic" label={label} InputLabelProps={{shrink}} variant="outlined" style={styles} type={type} value={val} onChange={onChange} required/>
    </Box>
  );
}