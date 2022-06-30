import React from 'react'
import {TextField,Stack, Button, Divider } from '@mui/material'
import GoogleButton from 'react-google-button';
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth } from '../Config/firebase-config';
import { UserState } from '../Context/UserContext';

const Login = ({handleClose}) => {
    const {setAlert} = UserState();
    const [email,setEmail] = React.useState();
    const [password,setPassword] = React.useState();
    const handleLogin= async ()=>{
          try {
            const result = await signInWithEmailAndPassword(auth,email,password);
            console.log('you are logged in now',result.user);
            handleClose()
            setAlert({
              open:true,
              message:'Login Successfull !!',
              type:'success'
            })
          } catch (error) {
            setAlert({
              open:true,
              message:error.message,
              type:'error'
            })
          }
    }
    const googleServiceProvider = new GoogleAuthProvider();
    const signInwithGoogle = async ()=>{
        signInWithPopup(auth,googleServiceProvider).then(res=>{
          handleClose()
          setAlert({
            open:true,
            message:'Login Successfull !!',
            type:'success'
          })
        })
    }
  return (
    <Stack spacing={2}>
            <TextField
            type='email'
             InputLabelProps={{
                style: { color: "gold" },
                 }}
                 InputProps={{sx:{color:'white'}}}
            label="Email"
            fullWidth
            size="small"
            onChange={(e)=>setEmail(e.target.value)}
            value={email}
    />
            <TextField
            type='password'
             InputLabelProps={{
                style: { color: "gold" },
                 }}
                 InputProps={{sx:{color:'white'}}}
                label="Password"
                fullWidth
                size="small"
    onChange={(e)=>setPassword(e.target.value)}
    value={password}
    />
     <Button variant='contained' onClick={handleLogin} sx={{backgroundColor:'gold',color:'white',":hover":{backgroundColor:'gold'}}}>Login</Button>
     <Divider sx={{color:'white'}}>OR</Divider> 
      <GoogleButton style={{width:'100%',marginTop:10}}
          onClick={() => signInwithGoogle()}
       />
    </Stack>

  )
}

export default Login