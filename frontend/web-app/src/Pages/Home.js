import React, { useState, useEffect } from 'react'; 
import { 
  Box, 
  TextField, 
  Container,
  Button, 
  Switch,
  FormControlLabel,
  Alert
} from '@mui/material'
import styles from '../styles';

const Home = () => {

  //Switcher State
  const [searchTicker, setSearchTicker] = useState(true); 
  const [searchMessage, setSearchMessage] = useState('Search by ticker symbol'); 
  
  //Stock State
  const [stock, setStock] = useState(''); 

  // Error State
  const [error, setError] = useState(false); 
  const [errorMsg, setErrorMsg] = useState(''); 

  const { inputBox, inputField} = styles; 

  const isEmpty = (stock) => {
    return (!stock || stock.length === 0);
  }

  const handleSearch = async (e) => {
    e.preventDefault(); 

    if(isEmpty(stock)) {
      setError(true); 
      setErrorMsg('Invalid Input!'); 
      return; 
    }

    if(searchTicker) {

      // search by ticker endpoint
      await fetchByTicker(); 
    
    } else {

      // search my security
    }

  }; 

  const fetchByTicker = async () => {

    const response = await fetch(`http://127.0.0.1:5000/stocks/symbol/${stock}`, {
      method: 'GET', 
      headers: {
        'Content-Type': 'application/json'
      }
    }); 

    if(!response.ok) {
      console.log('error')
      setError(true); 
      setErrorMsg('Error')
      return; 
    }

    const result = await response.json(); 

    console.log(result); 

  }; 


  useEffect(() => {

    if(!searchTicker) {
      
      setSearchMessage('Search by security');     

    } else {
    
      setSearchMessage('Search by ticker symbol');     
    }

  }, [searchTicker])

  useEffect(() => {
    setError(false); 
    setErrorMsg(''); 
  }, [stock])

  return(
    <Container maxWidth = 'sm'>

      {error && (
        <Alert severity="error">{errorMsg}</Alert>
      )}


      <Box
      sx = {inputBox}
      >
        <TextField 
        variant='standard'
        sx={inputField}
        value = {stock}
        onChange = {(e) => {setStock(e.target.value)}}
        >
        </TextField>

        <Button
        onClick={handleSearch}
        >Search
        </Button>
      
      </Box>
     
      <FormControlLabel 
      control ={<Switch defaultChecked onChange = {(e) => {setSearchTicker(e.target.checked)
      }}/>} 
      label={searchMessage}
      />
    </Container>

  ); 
}; 

export default Home; 

//       control ={<Switch defaultChecked onChange = {(e) => {setSearchTicker(e.target.checked)}}/>} 
