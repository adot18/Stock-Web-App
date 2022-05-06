import React from 'react'; 
import styles from '../styles';
import { Typography, 
  Box
} 
from '@mui/material';

const About = () => {
  //de-structuring style object
  const { about } = styles; 

  return(
    <Box sx = {about}>
      <Typography variant = 'h6'>This is project was for CS 122 at San Jose State University</Typography>
    </Box>

  );


}; 

export default About; 