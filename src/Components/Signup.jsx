import React from 'react'
import {TextField,Stack, Button } from '@mui/material'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../Config/firebase-config';
import { UserState } from '../Context/UserContext';


const Signup = ({handleClose}) => {
        const {setAlert} = UserState();
    const [displayName,setDisplayName] = React.useState('');
    const [email,setEmail] = React.useState('');
    const [password,setPassword] = React.useState('');
    const handleSignup= async ()=>{
            console.log('hello',email);
            try {
                const result = await createUserWithEmailAndPassword(auth,email,password);
                setAlert({
                        open:true,
                        message:'SignUp Successfull !!',
                        type:'success'
                      })
                console.log(result.user);
                if(result !== null){
                        await updateProfile(auth.currentUser,{displayName}).then(()=>console.log('updated user'))
                }
                handleClose()
            } catch (error) {
                setAlert({
                        open:true,
                        message:'Invalid Email or Password !!',
                        type:'error'
                      })
            }
    }
  return (
    <Stack spacing={2}>
            <TextField
            type='text'
             InputLabelProps={{
                style: { color: "gold" },
                 }}
                 InputProps={{sx:{color:'white'}}}
            label="UserName"
            fullWidth
            size="small"
            onChange={(e)=>setDisplayName(e.target.value)}
            value={displayName}
    />
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
     <Button variant='contained' onClick={handleSignup} sx={{backgroundColor:'gold',color:'white',":hover":{backgroundColor:'gold'}}}>Signup</Button>
    </Stack>

  )
}

export default Signup