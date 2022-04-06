class Stock: 
  def __init__(self, symbol, security, sector, location, added, founded):
    self.__symbol = symbol
    self.__security = security
    self.__sector = sector
    self.__location = location
    self.__added = added
    self.__founded = founded


  @property
  def symbol(self):
    """" Getter for symbol variable """
    return self.__symbol

  @symbol.setter
  def setSymbol(self, newSymbol):
    """" Setter for symbol variable """
    self.__symbol = newSymbol

  @property
  def security(self):
    """" Getter for company variable """
    return self.__security

  @security.setter
  def setCompany(self, newSecurity):
    """" Setter for company variable """
    self.__security = newSecurity

  @property
  def sector(self):
    """" Getter for sector variable """
    return self.__sector

  @sector.setter
  def setSector(self, newSector):
    """" Setter for sector variable """
    self.__sector = newSector

  @property
  def location(self):
    """" Getter for location variable """
    return self.__location

  @location.setter
  def setLocation(self, newLocation):
    """" Setter for location variable """
    self.__location = newLocation

  @property 
  def added(self):
    """" Getter for location variable """
    return self.__added
  
  @added.setter
  def setAdded(self, newAdded):
    """" Setter for added variable """
    self.__added = newAdded

  @property
  def founded(self):
    """" Getter for founded variable """
    return self.__founded

  @founded.setter
  def setFounded(self, newFounded):
    """" Setter for founded variable """
    self.__founded = newFounded

  def __repr__(self):
    return f"Company: {self.__security}\nSymbol: {self.__symbol}\nSector: {self.__sector}\nlocation: {self.__location}\nadded: {self.__added}\nfounded: {self.__founded}"
   
