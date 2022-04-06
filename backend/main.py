from dataclasses import dataclass
from flask import Flask; 
from flask_restful import Api
from flask import abort
from sqlite import Sqlite
import sqlite3
from flask_cors import CORS

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
  conn = sqlite3.connect('stocks.db')
  c = conn.cursor()    
  c.execute('SELECT * FROM stocks WHERE symbol=:symbol', {'symbol': symbol})

  try:
    stock = c.fetchall()[0]
  except:
    abort(404, 'Could not find stock.')    
  
  return {
    "Stock": [
      {
        "security": stock[1],
        "symbol": stock[0],
        "sector": stock[2],
        "location": stock[3],
        "added": stock[4],
        "founded": stock[5]
      }
    ]
  }

@app.route('/stocks/security/<security>')
def getSecurity(security):
  conn = sqlite3.connect('stocks.db')
  c = conn.cursor()
  
  c.execute('SELECT * FROM stocks WHERE security=:security', {'security': security})
 
  try:
    stock = c.fetchall()[0]
  except:
    abort(400, 'Could not find stock.')    
  
  return {
    "Stock": [
      {
        "security": stock[1],
        "symbol": stock[0],
        "sector": stock[2],
        "location": stock[3],
        "added": stock[4],
        "founded": stock[5]
      }
    ]
  }



if __name__ == "__main__":
  app.run(debug=True)
