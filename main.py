from dataclasses import dataclass
from flask import Flask; 
from flask_restful import Api, Resource, fields, marshal_with
from flask_sqlalchemy import SQLAlchemy
from sqlite import Sqlite
import sqlite3

app = Flask(__name__)

api = Api(app)

# conn = sqlite3.connect('stocks.db')
# c = conn.cursor()

class HelloWorld(Resource):


  def get(self, symbol):
    conn = sqlite3.connect('stocks.db')
    c = conn.cursor()    
    c.execute('SELECT * FROM stocks WHERE symbol=:symbol', {'symbol': symbol})
    stock = c.fetchall()[0]

    print(stock)
    # symbol = stock[0]
    security = stock[1]
    sector = stock[2]
    location = stock[3]
    added = stock[4]
    founded = stock[5]

    return {
      "security": security,
      "sector": sector,
      "location": location,
      "added": added,
      "founded": founded

    }


api.add_resource(HelloWorld, '/stocks/<symbol>')
 


if __name__ == "__main__":
  app.run(debug=True)



# Initial steps is to make the database

# Create the API endpoints

# Test endpoints 


# Endpoints:

# Stocks: 

# GET REQUEST
# Returns all the stocks in the S&P500
# http://127.0.0.1:5000/stocks


# GET REQUEST
# //Returns a single stock by company name
# http://127.0.0.1:5000/stocks/<string:company>

# GET REQUEST
# //Returns a single stock by ticker symbol
# http://127.0.0.1:5000/stocks/<string:symbol>


# JSON Format: 

# {
#   Symbol: '...',
#   Company: '...',
#   Sector: '...',
#   Location: '...',
#   Added: '...',
#   Founded: '...'
  

# }


# !!! First focus on stocks, worry about crypto later

# Crypto:

# //GET REQUEST
# //Returns all the crypto 
# http://127.0.0.1:5000/crypto

# //GET REQUEST
# //Returns a single crypto
# http://127.0.0.1:5000/crypto/<string:name>


# http://127.0.0.1:5000/helloworld

# http://127.0.0.1:5000/helloworld
