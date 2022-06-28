import { onAuthStateChanged } from 'firebase/auth';
import React, { createContext, useContext, useEffect, useState } from 'react'
import { auth } from '../Config/firebase-config';

export const User = createContext();

const UserContext = ({children}) => {
    const [user,setUser] = useState(null);

    const [alert,setAlert] = useState({
        open:false,
        message:'',
        type:'success'
    });


    useEffect(()=>{
        onAuthStateChanged(auth,(user)=>{
            if(user){
                setUser(user)
            }else{
                setUser(null)
            }
        })
    },[])

    return (<User.Provider value={{user,setUser,alert,setAlert}}>{children}</User.Provider>)
}

export default UserContext

export const  UserState=()=>{
    return useContext(User)
}