import React from "react";
import {
  AppBar,
  Container,
  Toolbar,
  Select,
  MenuItem,
  Typography,
  ThemeProvider,
  createTheme,
  Button,
  Modal,
  IconButton,
  Avatar
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import PropTypes from 'prop-types';
import Login from "./Login";
import Signup from "./Signup";
import SideBar from "./SideBar";
import { UserState } from "../Context/UserContext";

const Header = () => {
  const history = useNavigate();

  const {user} = UserState();

  const style = {
    title: {
      color: "gold",
      flex: 1,
      cursor: "pointer",
      fontFamily: "Montserrat",
      fontWeight: "600",
    },
  };

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      type: "dark",
    },
  });

  /////modal
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  ////tabs
  function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };
  
    const [value, setValue] = React.useState(0);
  
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
  
  const box = {
    modal:{
      position: "absolute",
      top: "40%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: 400,
      backgroundColor:'#14161a',
      border: "2px solid #000",
      boxShadow: 24,
      p: 3,
    }
   
  };
console.log('this is user logged',user);

  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar sx={{ bgcolor: "#14161a" }} position="static">
        <Container>
          <Toolbar>
            <Typography onClick={() => history("/")} sx={style.title}>
              {" "}
              Crypto Hunt
            </Typography>
                        {/* <Select
                             variant="outlined"
                            size='small'
                            sx={{width:100,height:40,marginLeft:15,border: "1px solid darkgrey",
                            color: "#fff",}}
                            >
                            <MenuItem value={'usd'}>USD</MenuItem>
                            <MenuItem value={"inr"}>INR</MenuItem>
                        </Select> */}       

        { (user)? 
          <SideBar/>
            :
            <Button
              onClick={handleOpen}
              sx={{
                fontFamily: "Montserrat",
                backgroundColor: "gold",
                ":hover": { backgroundColor: "gold" },
              }}
            >
              Login
            </Button>
            }
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={box.modal}>
                <IconButton 
                aria-label="close"
                onClick={()=>handleClose()}
                 sx={{
                  position: 'absolute',
                  right: 8,
                  top: 8,
                }}
                ><CloseIcon  onClick={()=>handleClose()} sx={{color:'red'}} /></IconButton>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                  <Tabs value={value} onChange={handleChange} centered>
                    <Tab label="Login" sx={{color:'gold'}}  />
                    <Tab label="SignUp" sx={{color:'gold'}} />
                  </Tabs>
                </Box>
                <TabPanel value={value} index={0}>
                  <Login handleClose={handleClose} />
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <Signup  handleClose={handleClose}/>
                </TabPanel>
              </Box>
            </Modal>
          </Toolbar>
        </Container>
      </AppBar>
   </ThemeProvider>
  );
};

export default Header;

