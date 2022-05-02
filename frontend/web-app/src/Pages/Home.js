import React, { useState, useEffect } from 'react'; 
import Chart from './Chart';
import { 
  Box, 
  TextField, 
  Container,
  Button, 
  Switch,
  FormControlLabel,
  Alert,
  Grid
} from '@mui/material'


import { 
  LineChart, 
  AreaChart,
  Area,
  CartesianGrid, 
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line,
  ResponsiveContainer
} from 'recharts';
import styles from '../styles';

const Home = () => {

  //Chart State
  const [showChart, setShowChart] = useState(false); 

  //Switcher State
  const [searchTicker, setSearchTicker] = useState(false); 
  const [searchMessage, setSearchMessage] = useState('Search by ticker symbol'); 
  
  //Stock State
  const [stock, setStock] = useState(''); 
  const [stockInfo, setStockInfo] = useState({}); 
  // const [stockPrices, setStockPrices] = useState([]); 
  const [stockPrices, setStockPrices] = useState(null); 

  // Error State
  const [error, setError] = useState(false); 
  const [errorMsg, setErrorMsg] = useState(''); 

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

    // console.log(stockPrices.length)


    if(isEmpty(stock)) {
      setError(true); 
      setErrorMsg('Invalid Input!'); 
      return; 
    } 
    
    // else if(stockPrices.length >= 1) {

    //   setStockPrices([]); 
    //   console.log('bruh')
    //   console.log(stockPrices.length)
    //   return; 

    // }

    // setStockPrices([])


    if(searchTicker) {

      console.log('loading...')
      await fetchByTicker(); // search by ticker endpoint
    
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

    // console.log('result: ' + JSON.stringify(result)); 
    // console.log('stock info' + JSON.stringify(result.stockInfo)); 

    setShowChart(true); 
    setStockInfo(JSON.stringify(result.stockInfo)); 
    // setStockPrices(JSON.stringify(result.closingPrices)); 
    //stockPrices.push(result) //works but bug 

    setStockPrices(result); 
    
    //console.log(stockPrices); 

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
    // setShowChart(true); 
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

      {showChart && (
        // <Chart stockPrices={stockPrices} data = {data}></Chart> 

        
        <Box className = 'center-me'>
          <AreaChart 
            width={870} 
            height={380}
            data={stockPrices.closingPrices}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#23d398" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#23d398" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#23d398" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#23d398" stopOpacity={0}/>
            </linearGradient>
            </defs>
            <XAxis dataKey='Date' />
            <YAxis/>
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Area type="monotone" dataKey='Price' stroke="#23d398" fillOpacity={1} fill="url(#colorUv)" />
          </AreaChart>
        </Box>
      )}
    </Container>
  ); 
}; 

export default Home; 

//       control ={<Switch defaultChecked onChange = {(e) => {setSearchTicker(e.target.checked)}}/>} 
//             width={730} 
//            height={250}