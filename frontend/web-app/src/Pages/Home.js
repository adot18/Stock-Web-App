import React, { useState, useEffect } from "react";
import styles from "../styles";
import Chart from "./Chart";
import {
  Box,
  TextField,
  Container,
  Button,
  Alert,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

const Home = () => {
  //de-structuring style object
  const { center, errorBanner } = styles;
  //Chart State
  const [showChart, setShowChart] = useState(false);

  //Stock State
  const [stock, setStock] = useState("");
  const [stockInfo, setStockInfo] = useState({});
  const [stockPrices, setStockPrices] = useState(null);

  // Error State
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [infoSpinner, setInfoSpinner] = useState("info");

  // Loading State
  const [isLoading, setIsLoading] = useState(false);

  const { inputBox, inputField } = styles;

  /**
   * Check to see if the stock string is empty or not
   * @param {*} stock
   * @returns a boolean. True if the stock is not empty and false
   * if the stock is empty
   */
  const isEmpty = (stock) => {
    return !stock || stock.length === 0;
  };

  /**
   * Gets called when the user clicks search button
   * @param {*} e
   * @returns
   */
  const handleSearch = async (e) => {
    e.preventDefault();

    if (isEmpty(stock)) {
      setError(true);

      setErrorMsg("Invalid Input!");

      return;
    }

    await fetchByTicker(); // search by ticker endpoint
  };

  /**
   * Fetches the backend api by passing a stock ticker symbol
   */
  const fetchByTicker = async () => {
    setIsLoading(true);

    const response = await fetch(
      `http://127.0.0.1:5000/stocks/symbol/${stock}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      console.log("error");
      setError(true);
      setErrorMsg("Error");
      setShowChart(false);
      setIsLoading(false);
      setInfoSpinner("error");
      return;
    }

    setIsLoading(false);
    setInfoSpinner("info");

    const result = await response.json();

    console.log("stock info" + JSON.stringify(result.stockInfo));

    setShowChart(true);
    setStockInfo(result.stockInfo);
    setStockPrices(result);
  };

  /**
   *
   * Used to make an empty object so that data
   * filled is only objects that are called
   */
  function createStock(symbol) {
    this.symbol = symbol;
  }
  const stockNull = new createStock("N/A");
  const stockInfo2 = [stockNull];

  /**
   * Once the user starts typing the error banner will disappear
  useEffect(() => {
    setError(false);
    setErrorMsg("");
  }, [stock]);

  /**
   * If the stockPrices array is not null then the shart will show.
   * Note that this state is being passed on as a prop to the child
   * component
   */
  useEffect(() => {
    if (stockPrices !== null) {
      setShowChart(true);
    }
  }, [stockPrices]);

  return (
    <Container maxWidth="lx">
      {error && (
        <Box sx={errorBanner}>
          <Alert severity="error">{errorMsg}</Alert>
        </Box>
      )}
      <Box sx={inputBox}>
        <TextField
          variant="standard"
          sx={inputField}
          value={stock}
          onChange={(e) => {
            setStock(e.target.value);
          }}
        ></TextField>

        <Button onClick={handleSearch} disabled={isLoading}>
          Search
        </Button>
      </Box>
      {isLoading ? (
        <Box sx={center} mt="100px">
          <CircularProgress color={infoSpinner} />
        </Box>
      ) : (
        <div>
          <Chart stockPrices={stockPrices} showChart={showChart} />
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Symbol</TableCell>
                  <TableCell align="right">Security</TableCell>
                  <TableCell align="right">Sector</TableCell>
                  <TableCell align="right">Location</TableCell>
                  <TableCell align="right">Added</TableCell>
                  <TableCell align="right">Founded</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {stockInfo2.map((stockInfo2) => (
                  <TableRow key={stockInfo2.symbol}>
                    <TableCell component="th" scope="stockInfo">
                      {stockInfo.symbol}
                    </TableCell>
                    <TableCell align="right">{stockInfo.security}</TableCell>
                    <TableCell align="right">{stockInfo.sector}</TableCell>
                    <TableCell align="right">{stockInfo.location}</TableCell>
                    <TableCell align="right">{stockInfo.added}</TableCell>
                    <TableCell align="right">{stockInfo.founded}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      )}
    </Container>
  );
};

export default Home;
