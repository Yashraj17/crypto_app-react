import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import { Avatar, Stack } from '@mui/material';
import { signOut } from 'firebase/auth';
import { auth, db } from '../Config/firebase-config';
import { UserState } from '../Context/UserContext';
import DeleteIcon from '@mui/icons-material/Delete';
import { doc, setDoc } from 'firebase/firestore';
export default function SideBar() {

  const {user,watchlist,coins,setAlert} = UserState();

  const [state, setState] = React.useState({
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };    

  const handleLogout = async() =>{
    signOut(auth);
    
  }

  // console.log('hello this is watchlist coin',coins);
  function numberWithCommas(n) {
    return n.toString().replace(/\B(?!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
  }

  const removeFromwatchlist =(coin)=>{
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

  return (
    <div>
      {['right'].map((anchor) => (
        <React.Fragment key={anchor}>
            <Avatar
                onClick={toggleDrawer(anchor, true)}
                sx={{backgroundColor:'orange',cursor:'pointer' }}
                alt={user.displayName}
                src={user.photoURL}
            />
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {/* {list(anchor)} */}
            <div style={style.container}>
                   <Stack sx={{display:'flex',alignItems:'center'}}>
                        <Avatar
                        sx={{backgroundColor:'orange',cursor:'pointer',height:'140px',width:'140px' }}
                        alt={user.displayName}
                        src={user.photoURL}
                        />
                        <h2 style={{color:'white',marginTop:'25px'}}>{user.email}</h2>
                        <span style={{fontSize:15,color:'white',margin:'10px',}}>watchlist</span>
                        <Stack style={style.watchlist} className="scrollable">
                        <div style={{display:'flex',flexDirection:'column',gap:12,marginTop:4}}>
                         {
                          coins.map((val)=>{
                            if(watchlist.includes(val.id)){
                                return (
                                  <>
                                  <Box sx={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:1.5,width:'100%',borderRadius:'5px',border:'1px solid black',boxShadow:'0 0 5px grey',backgroundColor:'gold'}}>
                                  <h6 style={{fontSize:15,color:'white',textTransform: 'capitalize',marginRight:'6px'}}> {val.id } </h6>
                                <span style={{color:'white',fontSize:'15px'}}>
                                ₹{numberWithCommas(val.current_price.toFixed(2)) }
                                </span>
                                  <DeleteIcon onClick={()=>removeFromwatchlist(val)} sx={{fontSize:'20px',cursor:'pointer',marginLeft:'6px'}}/>
                                  </Box>
                                  </>
                               
                                )
                            }
                              
                          })
                         }
                           
                        </div>
                       
                        </Stack>
                        <Button variant='contained' onClick={()=>handleLogout()} fullWidth sx={{backgroundColor:'gold',position:'absolute',padding:1.5,borderRadius:0,fontWeight:'600',bottom:0,color:'white',":hover":{backgroundColor:'gold'}}}>Logout</Button>
                   </Stack>
            </div>
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}

const style={
    container:{
        backgroundColor:'#14161a',
        flex:1,
        width:300,
        height:'100%',
        paddingTop:30,
        flexDirection:'column',
        fontFamily:'monospace'
    },
    watchlist:{
        // flex:1,
        // backgroundColor:'red',
        marginTop:2,
        width:'100%',
        height:350,
        display:'flex',
        alignItems:'center',
        overflowY: 'scroll',
        flexDirection:'column',
    }
}
