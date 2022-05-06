import React, { useState, useEffect } from 'react'; 
import styles from '../styles';
import { 
  AreaChart,
  Area,
  CartesianGrid, 
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

import { 
  Box, 
} from '@mui/material'

const Chart = ( { stockPrices, showChart } ) => {
  //de-structuring style object
  const { center } = styles; 

  return(
      <Box sx = {center}>
      {showChart && (   
          <AreaChart 
              width={870} 
              height={380}
              data={stockPrices.closingPrices}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
              <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#4682B4" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#4682B4" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#4682B4" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#4682B4" stopOpacity={0}/>
              </linearGradient>
              </defs>
              <XAxis dataKey='Date' />
              <YAxis/>
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <Area type="monotone" dataKey='Price' stroke="#4682B4" fillOpacity={1} fill="url(#colorUv)" />
          </AreaChart>
        )}
      </Box>
 
    ); 
}; 

export default Chart; 