import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes, BrowserRouter } from 'react-router-dom';
import TicketList from './TicketList';
import Home from './Home'
import AppNavbar from './AppNavbar'
//import GroupEdit from './GroupEdit';

const App = () => {

  return (

    <Router>
      <Routes>
        <Route exact path="/" index element={<Home />} />
        <Route path='/tickets' exact={true} element={<TicketList />} />
      </Routes>
    </Router>

  );

}
export default App;

