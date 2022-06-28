
import './App.css';
import * as React from 'react';
import { BrowserRouter,Route,Routes } from 'react-router-dom';
import Header from './Components/Header';
import HomePage from './Pages/HomePage';
import CoinPage from './Pages/CoinPage';
import { makeStyles } from '@mui/material';
import UserContext from './Context/UserContext';
import CustomAlert from './Components/CustomAlert';

function App() {

  const Appstyle ={
    App:{
      backgoundColor:'#14161a',
      color:'white',
      minHeight:'100vh',
  },
  }


  return (
    <BrowserRouter>
    <div className={Appstyle.App}>
      <Header/>
        <Routes>

            <Route path='/' element={<HomePage/>} />
            <Route path='/coin/:id' element={<CoinPage/>} />
        </Routes>
    </div>
        <CustomAlert/>
   
    </BrowserRouter>
   
  );
}

export default App;
