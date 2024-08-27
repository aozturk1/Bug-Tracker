import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';

const App = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    fetch('api/tickets') // Update this to match your Spring Boot endpoint for fetching tickets
      .then(response => response.json())
      .then(data => {
        setTickets(data);
        setLoading(false);
      })
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div className="App-intro">
          <h2>Ticket List</h2>
          {tickets.map(ticket =>
            <div key={ticket.id}>
              {ticket.title} - {ticket.description}
            </div>
          )}
        </div>
      </header>
    </div>
  );
}

export default App;
