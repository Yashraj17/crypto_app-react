import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { Avatar, Stack } from '@mui/material';
import { signOut } from 'firebase/auth';
import { auth } from '../Config/firebase-config';
import { UserState } from '../Context/UserContext';

export default function SideBar() {

  const {user} = UserState();

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
                        <span style={{fontSize:15,color:'white',marginTop:'10px'}}>watchlist</span>
                        <Stack style={style.watchlist}>
                        <div style={{display:'flex',flexDirection:'column',gap:12,marginTop:4}}>
                            <span style={{fontSize:15,color:'white',}}>watchlist this is me</span>
                            <span style={{fontSize:15,color:'white',}}>watchlist</span>
                            <span style={{fontSize:15,color:'white',}}>watchlist</span>
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
