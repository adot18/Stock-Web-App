import React, { useState } from 'react'; 
import logo from './logo.svg';
import './App.css';

function App() {

  
  const [symbol, setSymbol] = useState(''); 
  const [bruh, setBruh] = useState([]); 

  const fetchStock = async () => {

    const response = await fetch(`http://127.0.0.1:5000/stocks/symbol/${symbol}`, {
      method: 'GET', 
      headers: {
        'Content-Type': 'application/json'
      }
    }); 

    const result = await response.json(); 

    // console.log(result); 

    console.log(result.Stock)

    setBruh(result.Stock); 
  }; 

  return (
    <div>

      <input
      value = {symbol}
      onChange = {(e) => {setSymbol(e.target.value)}}
      >
      </input>

      <button onClick = {fetchStock}>Click Me</button>
    
      <br></br>

      {

        bruh.map(stock => (

          <ul>
            <li>{stock.added}</li>
            <li>{stock.founded}</li>
            <li>{stock.location}</li>
            <li>{stock.sector}</li>
            <li>{stock.security}</li>
            <li>{stock.symbol}</li>
          
          </ul>

        ))
        
      }
     


     
    </div>
  );
}

export default App;
