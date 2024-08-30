import React, { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, BrowserRouter } from 'react-router-dom';
import TicketList from './TicketList';
import TicketEdit from './TicketEdit';
import Home from './Home'
//import GroupEdit from './GroupEdit';

const App = () => {

  return (
    <Router>
      <Routes>
        <Route exact path="/" index element={<Home />} />
        <Route path='/tickets' exact={true} element={<TicketList />} />
        <Route path='/tickets/:id' element={<TicketEdit />} />
      </Routes>
    </Router>
  );

}
export default App;

