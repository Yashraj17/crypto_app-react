import { CircularProgress,Box, Button,Stack, Grid } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { HistoricalChart } from '../Config/api';
import { Chart as ChartJS, registerables } from 'chart.js';
import { Line } from 'react-chartjs-2'
ChartJS.register(...registerables);


const CoinInfo = ({coin}) => {
    const [historicData,setHistoricData] = useState();
    const [day,setDay] = useState(1);
    const currency = 'inr';
    const getHistoricData = async ()=>{
            await axios.get(HistoricalChart(coin.id,day,currency)).then(res=>{
                setHistoricData(res.data.prices)
            
            })
    }
    useEffect(()=>{
        getHistoricData();
    },[day])
    const val = 1
            // console.log('chart data this is ',historicData[0]);

    const button = [
        {
            id:1,
            label:'24 Hours',
            val:1,
        },
        {
            id:2,
            label:'1 Month',
            val:30,
        },
        {
            id:3,
            label:'3 Months',
            val:90,
        },
        {
            id:4,
            label:'1 Year',
            val:365,
        }
    ]
  return (
    <div  style={{backgroundColor:'#181820'}}>
    {!historicData?
        <Box sx={{flex:1,justifyContent:'center',height:'100vh',display:'flex',alignItems:'center'}}>
                <CircularProgress size={80} style={{color:'gold'}} />
        </Box>:
            <Box>
          <Box sx={{px:3,py:3.8,mt:2}}>   
                <Line 
                data={{
                    labels: historicData.map((coinD)=>{
                        let date = new Date(coinD[0]);
                        let time = 
                        date.getHours() >12 ?
                        `${date.getHours() -12} : ${date.getMinutes()} PM`:
                        `${date.getHours()} : ${date.getMinutes()} AM`;

                        return (day === 1) ? time : (Number.isNaN(date)) ? "" :  date.toLocaleDateString();
                    }),
                    datasets: [{
                         data: historicData?.map((coinD)=>coinD[1]),
                         label:`₹ Price (Past ${day} days) in ${currency}`,
                         borderColor:'gold'
                        }]
                }}
                options={{
                    elements:{
                        point:{
                            radius:1,
                        }
                    }
                }}
                />
                  <Box>
                    <Stack direction='row' sx={{display:'flex',mt:'12px',paddingY:2 , justifyContent:'space-evenly'}}>
                        {
                            button.map((val)=>(
                                // <button key={val.id} style={style.button}  onClick={()=>setDay(val.val)}>{val.label}</button>
                                    <SelectedButton
                                    key={val.id}
                                    onClick={()=>setDay(val.val)}
                                    selected={val.val === day}
                                    >{val.label}</SelectedButton>
                                ))
                        }
                           
                    </Stack>
                 </Box>
        </Box>
        </Box>
    }
    </div>
  )
}


export default CoinInfo

const SelectedButton =({children,onClick,selected})=>{

    const style={
        // button:(day)=>(
        //   {  
            button:{
                color:selected? "":'white',
                backgroundColor: selected? 'gold':'transparent',
                borderColor:'gold',
                width:'14%',
                height:'40px',
                border:'2px solid gold',
                borderRadius:'4px',
                textAlign:'center',
                fontFamily:'Montserrat',
                fontWeight:'bold',
                cursor:'pointer',
                padding:8
            }
    }
    
    return (

        <span  style={style.button}  onClick={onClick}>{children}</span>
    )

}