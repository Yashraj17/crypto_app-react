import { Container,Grid,Box, Typography,Stack, LinearProgress, Button } from '@mui/material';
import axios from 'axios';
import { doc, setDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import CoinInfo from '../Components/CoinInfo';
import { SingleCoin } from '../Config/api';
import { db } from '../Config/firebase-config';
import { UserState } from '../Context/UserContext';
// import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser'

const CoinPage = () => {
  const {user,watchlist,setAlert} = UserState();
  const {id} = useParams();
  const [coin,setCoin] = useState();
  const fetchCoin = ()=>{
     axios.get(SingleCoin(id)).then(res=> {
      setCoin(res.data)
      // console.log('data',res.data);
     })
   
  }
  useEffect(()=>{
    fetchCoin()
     // eslint-disable-next-line
  },[])
  function numberWithCommas(n) {
    return n.toString().replace(/\B(?!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
  }
  const currency = 'inr';

  ///adding watchlist 
  const inWatchlist = watchlist.includes(coin?.id);
  const addwatchlist = ()=>{
    const coinRef = doc(db,'watchlist',user.uid);
    try {
      setDoc(coinRef,{
        coins:watchlist?[...watchlist,coin?.id] : [coin?.id]
       })
       setAlert({
        open:true,
        message:'Coin Inserted ',
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

  const removeFromwatchlist =()=>{
    const coinRef = doc(db,'watchlist',user.uid);
    try {
      setDoc(coinRef,{
        coins : watchlist.filter((watch)=>watch !== coin?.id)
       },
       {merge:'true'}
       );
       setAlert({
        open:true,
        message:'Coin Removed !! ',
        type:'error'
       })
    } catch (error) {
      setAlert({
        open:true,
        message:error.message,
        type:'error'
       })
    }
  }

  if(!coin) return <LinearProgress  style={{backgroundColor:'gold'}}/>
  return (
    
    <div>
        <Grid container  style={{backgroundColor:'#181820'}}>
            <Grid item xs={12} sx={{padding:5,borderRight:'1px solid white',display:'flex',justifyContent:'center'}} lg={4}>
                {/* <div>CoinPage {id}</div> */}
                <Box>
                  <Stack sx={{display:'flex',alignItems:'center'}}>
                  <img 
                    src={coin?.image.large}
                    alt={coin?.name}
                    height='120'
                    width='120'
                    style={{marginTop:5,marginBottom:2}}
                    />
                  </Stack>
                    <h1 style={{textAlign:'center',color:'white',fontFamily:'Montserrat',margin:5}}>{coin?.name}</h1>
                    <Typography variant='h6' sx={{textAlign:'center',color:'white',fontFamily:'Montserrat',fontSize:15}}>{coin?.description.en.split(". ")[0]}</Typography>
                  <Stack direction='column' sx={{paddingX:1,marginTop:3}}>
                      <Stack direction='row'>
                      <h2 style={{textAlign:'center',color:'white',fontFamily:'Montserrat',margin:5}}>Rank : <span style={{fontWeight:'500'}}>{coin?.market_cap_rank}</span></h2>
                      </Stack>
                      <Stack direction='row'>
                      <h2 style={{textAlign:'center',color:'white',fontFamily:'Montserrat',margin:5}}>Current Price : <span style={{fontWeight:'500'}}> ₹ {coin?.market_data.current_price[currency.toLowerCase()] }</span></h2>
                      </Stack>
                      <Stack direction='row'>
                      <h2 style={{textAlign:'center',color:'white',fontFamily:'Montserrat',margin:5}}>Market Cap : <span style={{fontWeight:'500'}}> ₹ {numberWithCommas( coin?.market_data.market_cap[currency.toLowerCase()].toString().slice(0,-6))}M</span></h2>
                      </Stack>
                  </Stack>
                  {
                    (user) && <Box sx={{mt:3}}>
                        {
                           (inWatchlist)?<Button onClick={()=>removeFromwatchlist()} fullWidth sx={{color:'white',fontWeight:'600',backgroundColor:'red',':hover':{backgroundColor:'red'}}}>Remove from Watchlist</Button>
                                          :
                                          <Button onClick={()=>addwatchlist()} fullWidth sx={{color:'white',fontWeight:'600',backgroundColor:'gold',':hover':{backgroundColor:'gold'}}}>Add to Watchlist</Button>
                        }
                            </Box>
                  }
                 
                </Box>

            </Grid>
            <Grid item lg={8}  xs={12}>
                <CoinInfo coin={coin}/>
            </Grid>
        </Grid>
   </div>
  )
}

export default CoinPage