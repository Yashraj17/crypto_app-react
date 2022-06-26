import React from 'react'
import {AppBar,Container,Toolbar,Select,MenuItem,Typography, ThemeProvider,createTheme} from '@mui/material'
import { useNavigate } from 'react-router-dom'

const Header = () => {
    const history = useNavigate()
    const style={
        title:{
                color:'gold',
                flex:1,
                cursor:'pointer',
                fontFamily:'Montserrat',
                fontWeight:'600'
        }
    }

    const darkTheme = createTheme({
        palette: {
          primary:{
            main:"#fff"
          },
          type:'dark'
        },
      });

  return (
    <ThemeProvider theme={darkTheme}>
        <AppBar sx={{bgcolor:'#14161a'}} position='static' >
                    <Container>
                            <Toolbar>
                                <Typography onClick={()=>history('/')} sx={style.title}> Crypto Hunt</Typography>
                            <Select
                             variant="outlined"
                            size='small'
                            sx={{width:100,height:40,marginLeft:15,border: "1px solid darkgrey",
                            color: "#fff",}}
                            >
                            <MenuItem value={'usd'}>USD</MenuItem>
                            <MenuItem value={"inr"}>INR</MenuItem>
                            </Select>
                            </Toolbar>
                    </Container>
        </AppBar>
  </ThemeProvider>
  )
}

export default Header