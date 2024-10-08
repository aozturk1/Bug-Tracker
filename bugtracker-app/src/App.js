import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TicketList from './TicketList';
import TicketEdit from './TicketEdit';
import ProjectList from './ProjectList';
import ProjectEdit from './ProjectEdit';
import Home from './Home'

const App = () => {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/tickets' exact={true} element={<TicketList />} />
        <Route path='/tickets/:id' element={<TicketEdit />} />
        <Route path='/projects' exact={true} element={<ProjectList />} />
        <Route path='/projects/:id' element={<ProjectEdit />} />
      </Routes>
    </Router>
  );

}
export default App;

