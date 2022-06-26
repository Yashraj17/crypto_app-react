import React, { useEffect, useState } from 'react'
import {Box,Input, TableContainer, TextField,LinearProgress, Table,TableRow, TableHead,TableCell, TableBody, Stack, Pagination} from '@mui/material'
import axios from 'axios';
import { CoinList } from '../Config/api';
import {useNavigate} from 'react-router-dom'

const CoinTable = () => {
  const [coins,setCoins] = useState([]);
  const [page,setPage] = useState(1);
  const[isloading,setIsloading] = useState(false)

  const navigate = useNavigate()

  const tableData =  ()=>{
    setIsloading(true)
     axios.get(CoinList('inr')).then(res=>{
      setCoins(res.data)
      setIsloading(false)
    })
  }

  useEffect(()=>{
    tableData();
    },[])

    // console.log('this is table data',coins);
    function numberWithCommas(n) {
      return n.toString().replace(/\B(?!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
    }

    const style ={
      pagination:{
        "&		.MuiPagination-text":{
          color:'gold'
        }
      }
    }
  return (
    <div style={{backgroundColor:'#14161a', padding:20,}}>
      
      <h2 style={{color:'white',fontSize:30,fontWeight:'400',textAlign:'center'}}>Crypto Price by Market Cap</h2>
      <Box
      sx={{
        width: '100%',
        maxWidth: '100%',
        paddingX:20,
        marginTop:5
      }}
    >
      <TextField  size='small' fullWidth
       InputLabelProps={{
        style: { color: "grey",fontSize:12 },
         }}
        InputProps={{ disableUnderline: true,sx:{border: "0.5px solid #dbdbdb",color:'white',height:40,borderRadius:1} }}
         id="filled-basic" label="Search for a crypto currency" variant="filled" />
    </Box>
    
    <TableContainer sx={{paddingX:20,mt:3}}>
      {
        isloading? (<LinearProgress style={{backgroundColor:'gold'}}/>):( 
          <Table>
            <TableHead sx={{backgroundColor:'#eebc1d',border:0}}>
              <TableRow>
                {
                  ['Coin','Price','24hr Change','Market Cap'].map((head)=>(
                    <TableCell
                    sx={{fontWeight:'700',color:'black',fontFamily:'Montserrat'}}
                    >{head}</TableCell>
                  ))
                }
              </TableRow>
            </TableHead>
            <TableBody>
              {
                coins?.slice((page-1)*10,(page-1)*10+10).map((item)=>(
                  <TableRow
                  onClick={()=> navigate(`/coin/${item.id}`)}
                  sx={{marginLeft:10,cursor:'pointer'}} key={item.name}>
                  <TableCell component='th' scope='row' sx={{gap:15,display:'flex'}}> 
                  <div style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
                            <img 
                              src={item.image}
                              alt={item.name}
                              height='45'
                              style={{marginTop:10}}
                              />
                             
                                <span style={{fontSize:22,marginTop:2,color:'white',textTransform:'uppercase',textAlign:'center'}}>{item.symbol}</span>
                                <span style={{textAlign:'center',color:'grey'}}>{item.name}</span>
                              </div>
                  </TableCell>
                  <TableCell>
                    <span style={{color:'white'}}>
                    ₹ {numberWithCommas(item.current_price.toFixed(2)) }
                    </span>
                  </TableCell>
                  <TableCell>
                    <span style={{color:'white'}}>
                    {item.market_cap_change_percentage_24h}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span style={{color:'white'}}>
                    {numberWithCommas(item.market_cap.toString().slice(0.-6))}M
                    </span>
                  </TableCell>
                </TableRow>
                ))
              }
            
            </TableBody>
          </Table>
        )
      }
     
    </TableContainer>
    <Stack>
      <Pagination 
      color='primary'
      classes={{ul:style.pagination}}
      sx={{width:'100%',display:'flex',justifyContent:'center',mt:4}}
      count={(coins.length/10).toFixed(0)}
      onChange={(_,value)=>{
        setPage(value)
        window.scroll(0,450)
      }}
    
      />
    </Stack>
      </div>
  )
}

export default CoinTable