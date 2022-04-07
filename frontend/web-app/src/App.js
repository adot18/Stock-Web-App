import React, { useState } from 'react'; 
import {Routes, Route } from "react-router-dom";
import './App.css';
import Layout from './Pages/Layout';
import Home from './Pages/Home';
import About from './Pages/About';

const App = () => {
  return (
    <Routes>
      <Route path = '/' element = {<Layout/>}>
        <Route index element = {<Home/>} />
        <Route path = '/about' element = {<About/>} />        
      </Route>
    </Routes>
  );
}

export default App;
