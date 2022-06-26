import { Container } from '@mui/material'
import React from 'react'
import Carosel from './Carosel'

const Banner = () => {
    const style = {
        banner:{
            backgroundImage:'url(./banner2.jpg)',
            // backgroundColor:'red'

        }
    }
  return (
    <div style={style.banner}>
       <Container sx={{height:400,display:'flex',paddingTop:10,flexDirection:'column'}}>
        <div>

            <h2 style={{color:'white',fontWeight:'bold',fontSize:50,fontFamily:'Montserrat',textAlign:'center',marginBottom:10}}>Crypto Hunt</h2>
            <h5 style={{color:'grey',fontWeight:'400',fontSize:20,fontFamily:'Montserrat',textAlign:'center'}}>Get all info about your favourate Crypto</h5>
        </div>
        <Carosel/>
       </Container>
    </div>
  )
}

export default Banner