// import React, { useEffect, useState } from 'react';
// import logo from './logo.svg';
// import './App.css';
// import { BrowserRouter as Router, Route, Routes, BrowserRouter } from 'react-router-dom';
// import TicketList from './TicketList';
// import Home from './Home'
// import AppNavbar from './AppNavbar'
// //import GroupEdit from './GroupEdit';
//
// const App = () => {
//   const [tickets, setTickets] = useState([]);
//   const [loading, setLoading] = useState(false);
//
//   useEffect(() => {
//     setLoading(true);
//
//     fetch('api/tickets')
//       .then(response => response.json())
//       .then(data => {
//         setTickets(data);
//         setLoading(false);
//       })
//   }, []);
//
//   if (loading) {
//     return <p>Loading...</p>;
//   }
//
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <div className="App-intro">
//           <h2>Ticket List</h2>
//           {tickets.map(ticket =>
//             <div key={ticket.id}>
//               {ticket.title} - {ticket.description}
//             </div>
//           )}
//         </div>
//       </header>
//     </div>
//   );
//
////   return (
////     <BrowserRouter>
////       <Router>
////         <Routes>
////           <Route exact path="/" index element={<Home/>}/>
////           <Route path='/tickets' exact={true} element={<TicketList/>}/>
////         </Routes>
////       </Router>
////     </BrowserRouter>
////   );
//
// }
// export default App;
//

import React, { useState, useEffect } from 'react';
import logo from './logo.svg'; // Assuming you have a logo file
import './App.css';
import AppNavbar from './AppNavbar'; // Import the AppNavbar component

const App = () => {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    fetch('api/tickets') // Adjust this URL if needed
      .then(response => response.json())
      .then(data => setTickets(data));
  }, []);

  return (
    <div className="App">
      <AppNavbar />  {/* Include the Navbar component here */}
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div className="App-intro">
          <h2>Ticket List</h2>
          {tickets.map(ticket => (
            <div key={ticket.id}>
              {ticket.title} - {ticket.description}
            </div>
          ))}
        </div>
      </header>
    </div>
  );
};

export default App;
