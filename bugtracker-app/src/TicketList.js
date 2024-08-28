 import React, { useEffect, useState } from 'react';
 import { Button, ButtonGroup, Container, Table } from 'reactstrap';
 import AppNavbar from './AppNavbar';
 import { Link } from 'react-router-dom';

 const TicketList = () => {

  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    fetch('api/tickets')
      .then(response => response.json())
      .then(data => {
        setTickets(data);
        setLoading(false);
      })
  }, []);

  const remove = async (id) => {
    await fetch(`/api/ticket/${id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(() => {
      let updatedTickets = [...tickets].filter(i => i.id !== id);
      setTickets(updatedTickets);
    });
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  const ticketList = tickets.map(ticket => (
    <tr key={ticket.id}>
      <td>{ticket.title}</td>
      <td>{ticket.date}</td>
      <td>{ticket.description}</td>
      <td>{ticket.priority}</td>
      <td>
        <ButtonGroup>
          <Button size="sm" color="primary" tag={Link} to={"/tickets/" + ticket.id}>Edit</Button>
          <Button size="sm" color="danger" onClick={() => remove(ticket.id)}>Delete</Button>
        </ButtonGroup>
      </td>
    </tr>
  ));

  return (
    <div>
      <AppNavbar/>
      <Container fluid>
        <div className="float-end">
          <Button color="success" tag={Link} to="/tickets/new">Add Ticket</Button>
        </div>
        <h3>Ticket List</h3>
        <Table className="mt-4">
          <thead>
            <tr>
              <th>Title</th>
              <th>Date</th>
              <th>Description</th>
              <th>Priority</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {ticketList}
          </tbody>
        </Table>
      </Container>
    </div>
  );
 };

 export default TicketList;
