import React from 'react'; 
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import styles from '../styles';

import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate(); 

  const { navbarBox, navbar, button, navbarColor } = styles; 

  return(
    <Box sx = {navbarBox}>
      <AppBar position = 'static' sx = {navbarColor}>
        <Toolbar>
          <Typography 
            variant='h5'
            component = 'div'
            sx = {navbar}
            >
            Stock Web App
          </Typography>

          <Button 
          sx = {button}
          onClick = {() => navigate('/')}
          >
          Home
          </Button>
          
          <Button 
          sx = {button}
          onClick = {() => navigate('/about')}
          >
          About
          </Button>
        

        </Toolbar>
      </AppBar>
    </Box>
  )
}; 

export default Navbar; 