import axios from 'axios'
import React, { useEffect, useState } from 'react'
import AliceCarousel from 'react-alice-carousel'
import { TrendingCoins } from '../Config/api'
import {useNavigate} from 'react-router-dom'

const Carosel = () => {
    const [trendingData,setTrendingData] = useState(null)
    const navigate = useNavigate()

    const style={
        Carosel:{
            color:'white',
            display:'flex',
            alignItem:'center',
            height:'50%'
        }
    }

    useEffect(()=>{
        const getTendingData = async ()=>{
            await axios.get(TrendingCoins('inr')).then(res=>{
                setTrendingData(res.data)
                // console.log('this is response',res.data);
            })
    }
        getTendingData()
    },[])


// console.log('this is trending data of crypto',trendingData);

    const items = trendingData?.map((coin)=>(
        <div style={{flexDirection:'column',display:'flex',alignItems:'center'}}>
         <img 
        onClick={()=> navigate(`/coin/${coin.id}`)}
        src={coin.image}
        alt={coin.name}
        height='80'
        style={{marginTop:10,cursor:'pointer'}}
        />
                <span style={{color:'gold',textTransform:'uppercase'}} >{coin.symbol}</span>
                <span style={{color:'white'}} >₹ {coin.current_price}</span>

        </div>
       
    ))
    const responsive = {
        0:{
            item:2
        },
        512:{
            item:4
        },
        1024: {
            items: 5
        }
  
    }


  return (
    <div style={style.Carosel}>
        <AliceCarousel
        mouseTracking
        infinite
        autoPlayInterval={1000}
        animationDuration={1500}
        disableButtonsControls
        disableDotsControls
        autoPlay
        items={items}
        responsive={responsive}
        />
       
    </div>
  )
}

export default Carosel