import sqlite3
import pandas as pd 
from stock import Stock 

# conn = sqlite3.connect('stocks.db')

# c = conn.cursor()

# c.execute("""CREATE TABLE stocks (symbol text, security text, sector text, location text, firstAdded text, founded text)""")

# conn.commit()

class Sqlite:  
  def getStocks(self): 
    """" Web Scraps the all 500 stocks from wikipedia """
    url = 'https://en.wikipedia.org/wiki/List_of_S%26P_500_companies';
    html = pd.read_html(url, header=0)
    df = html[0]

    stocks = df.to_dict('records')

    for index, row in df.iterrows():

      symbol = stocks[index].get('Symbol')
      security = stocks[index].get('Security')
      sector = stocks[index].get('GICS Sector')
      location = stocks[index].get('Headquarters Location')
      added = stocks[index].get('Date first added')
      founded = stocks[index].get('Founded')
    
      stock = Stock(symbol, security, sector, location, added, founded)
      self.insert(stock)
    return df

  def insert(self, stock):
    """" insert dataframe data into database """    
    with conn:
      c.execute("INSERT INTO stocks VALUES  (:symbol, :security, :sector, :location, :added, :founded)", 
      {'symbol': stock.symbol, 'security': stock.security, 'sector':stock.sector, 'location': stock.location, 'added': stock.added, 'founded': stock.founded})

  def search(self, symbol):
    """ Search database by symbol """
    c.execute('SELECT * FROM stocks WHERE symbol=:symbol', {'symbol': symbol})
    return c.fetchall()

  def searchSecurity(self, security):
    """" search for security (full company name) """    

    c.execute('SELECT * FROM stocks WHERE security=:security', {'security': security})
    return c.fetchone()

  def printEverything(self):
   c.execute('SELECT * FROM stocks')
   return c.fetchone()
