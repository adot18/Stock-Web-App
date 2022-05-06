from contextlib import closing
from dataclasses import dataclass
from matplotlib import testing
from matplotlib.pyplot import close
import yfinance as yf
from flask import Flask; 
from flask_restful import Api
from flask import abort
from sqlite import Sqlite
import sqlite3
from flask_cors import CORS
import json

app = Flask(__name__)

CORS(app)
cors = CORS(app, resources={
  r"/*":{
    'origins': '*'
  }
})


api = Api(app)

@app.route('/stocks/symbol/<symbol>')
def get(symbol):
  '''' Searches db for ticker symbol and calls closingPrices() '''
  conn = sqlite3.connect('stocks.db')
  c = conn.cursor()    
  c.execute('SELECT * FROM stocks WHERE symbol=:symbol', {'symbol': symbol})

  try:
    stock = c.fetchall()[0]

  except:
    try:
      priceData = closingPrices(symbol)

    except:

      abort(404, 'Could not find stock')

    return {
    "stockInfo":
      {
        "standardPoor": priceData.get('standardPoor')
      },
      "closingPrices": priceData.get('closingPrices'),
    }

  priceData = closingPrices(symbol)
  
  return {
    "stockInfo":
      {
        "security": stock[1],
        "symbol": stock[0],
        "sector": stock[2],
        "location": stock[3],
        "added": stock[4],
        "founded": stock[5],
        "standardPoor": priceData.get('standardPoor')
      },
    "closingPrices": priceData.get('closingPrices'),
  }

@app.route('/stocks/security/<security>')
def getSecurity(security):
  '''' Searches db for security and calls closingPrices() NOTE: not currently using this endpoint '''
  conn = sqlite3.connect('stocks.db')
  c = conn.cursor()
  
  c.execute('SELECT * FROM stocks WHERE security=:security', {'security': security})
 
  try:
    stock = c.fetchall()[0]
    priceData = closingPrices(stock[0])
  except:
    abort(404, 'Could not find stock.')    
  
  return {
    "stockInfo": 
      {
        "security": stock[1],
        "symbol": stock[0],
        "sector": stock[2],
        "location": stock[3],
        "added": stock[4],
        "founded": stock[5],
        "standardPoor": priceData.get('standardPoor')
      },
    "closingPrices": priceData.get('closingPrices'),
  }

def closingPrices(symbol):
  ''''Uses yFinance library for closing price of last 12months'''
  stock = yf.Ticker(symbol); 
  
  history = stock.history(period='12mo', interval='1d')

  closePrice = history.loc[:, 'Close']; 

  stockData = json.loads(closePrice.to_json(date_format='iso'))

  if(len(stockData) == 0):
    abort(404, 'Could not find stock :(')

  arr = []

  standardPoor = inSP(symbol); 

  for date, price in stockData.items():
    obj = {
      'Date': date[0:10],
      'Price': round(price,2)    
    } 
    arr.append(obj)

  return {
    'closingPrices': arr,
    'standardPoor': standardPoor 
  }

def inSP(symbol): 
  ''''Returns true if the stock symbol is in the S&P 500 else false'''
  conn = sqlite3.connect('stocks.db')
  c = conn.cursor()    
  c.execute('SELECT * FROM stocks WHERE symbol=:symbol', {'symbol': symbol})

  try:
    stock = c.fetchall()[0]
  except:
    return False
  
  return True

if __name__ == "__main__":
  app.run(debug=True)
