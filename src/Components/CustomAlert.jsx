import { Snackbar  } from '@mui/material';
import React from 'react'
import { UserState } from '../Context/UserContext'
import MuiAlert from '@mui/material/Alert';
const CustomAlert = () => {
    const {alert,setAlert} = UserState();
    
      const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setAlert({open:false})
      };
 
  return (
     <Snackbar 
     anchorOrigin={{ vertical: 'top',
     horizontal: 'center', }}
     open={alert.open}
      autoHideDuration={3000}
       onClose={handleClose}>
        <MuiAlert onClose={handleClose} severity={alert.type}  variant="filled" elevation={10}>
          {alert.message}
        </MuiAlert>
      </Snackbar>
  )
}

export default CustomAlert