import axios from 'axios';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, onSnapshot } from 'firebase/firestore';
import React, { createContext, useContext, useEffect, useState } from 'react'
import { CoinList } from '../Config/api';
import { auth, db } from '../Config/firebase-config';

export const User = createContext();

const UserContext = ({children}) => {
    const [user,setUser] = useState(null);

    ///coin
    const [coins,setCoins] = useState([]);
    const[isloading,setIsloading] = useState(false)
    const tableData =  ()=>{
        setIsloading(true)
         axios.get(CoinList('inr')).then(res=>{
          setCoins(res.data)
          setIsloading(false)
        })
      }

    ///alert
    const [alert,setAlert] = useState({
        open:false,
        message:'',
        type:'success'
    });
    ///watchlist 
    const [watchlist,setWatchlist] = useState([]);

    useEffect(()=>{
        if(user){
            const coinRef = doc(db,'watchlist',user?.uid);
           var unsubscribe =  onSnapshot(coinRef,(coin)=>{
               if(coin.exists()){
                setWatchlist(coin.data().coins)
               }
               else{
                console.log(' no list is found');
            }
            })
            return ()=>{
                unsubscribe();
            }
        }
       
    },[user])

    useEffect(()=>{
        onAuthStateChanged(auth,(user)=>{
            if(user){
                setUser(user)
            }else{
                setUser(null)
            }
        })
    },[])

    // useEffect(()=>{
    //    axios.get("https://restcountries.com/v3.1/all").then(res=>{
    //     console.log('this is contrey list',res.data);
    //    })
    // },[])

    return (<User.Provider value={{user,setUser,alert,setAlert,watchlist,coins,tableData,isloading}}>{children}</User.Provider>)
}

export default UserContext

export const  UserState=()=>{
    return useContext(User)
}