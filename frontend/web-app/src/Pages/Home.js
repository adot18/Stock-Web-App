import React, { useState, useEffect } from 'react'; 
import styles from '../styles';
import Chart from './Chart';
import { 
  Box, 
  TextField, 
  Container,
  Button, 
  Alert,
  CircularProgress
} from '@mui/material'

const Home = () => {

  const { center, errorBanner } = styles; 

  //Chart State
  const [showChart, setShowChart] = useState(false); 
  
  //Stock State
  const [stock, setStock] = useState(''); 
  const [stockInfo, setStockInfo] = useState({}); 
  const [stockPrices, setStockPrices] = useState(null); 

  // Error State
  const [error, setError] = useState(false); 
  const [errorMsg, setErrorMsg] = useState(''); 
  const [infoSpinner, setInfoSpinner] = useState('info'); 

  // Loading State 
  const [isLoading, setIsLoading] = useState(false); 

  const { inputBox, inputField} = styles; 

  const isEmpty = (stock) => {
    return (!stock || stock.length === 0);
  }

  /**
   * Gets called when the user clicks search button
   * @param {*} e 
   * @returns 
   */
  const handleSearch = async (e) => {
    e.preventDefault(); 

    if(isEmpty(stock)) {

      setError(true); 

      setErrorMsg('Invalid Input!'); 

      return; 

    } 
    
    await fetchByTicker(); // search by ticker endpoint
  
  }; 

  /*
  * Fetches the backend api by passing a stock ticker symbol
  */
  const fetchByTicker = async () => {

    setIsLoading(true); 

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
      setShowChart(false)
      setIsLoading(false); 
      setInfoSpinner('error'); 
      return; 
    }

    setIsLoading(false); 
    setInfoSpinner('info')

    const result = await response.json(); 

    console.log('stock info' + JSON.stringify(result.stockInfo)); 

    setShowChart(true); 
    setStockInfo(JSON.stringify(result.stockInfo)); 
    setStockPrices(result); 
    
  }; 


  useEffect(() => {
    setError(false); 
    setErrorMsg(''); 
  }, [stock])


  useEffect(() => {

    if(stockPrices !== null) {
      setShowChart(true)
    }

  }, [stockPrices])


  return(
    <Container maxWidth = 'lx'>

      {error && (
        <Box sx = {errorBanner}>
          <Alert severity="error">{errorMsg}</Alert>
        </Box>
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
        disabled={isLoading}
        >Search
        </Button>
      
    </Box>

      {isLoading ? 
        <Box sx = {center} mt = '100px'>
          <CircularProgress  color = {infoSpinner} />
        </Box>
      : 
        <Chart stockPrices={stockPrices} showChart = {showChart}/>
      }
    


    
    </Container>
  ); 
}; 

export default Home; 
