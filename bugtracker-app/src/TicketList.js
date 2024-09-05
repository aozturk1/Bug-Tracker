 import React, { useEffect, useState } from 'react';
 import { Button, ButtonGroup, Container, Table } from 'reactstrap';
 import AppNavbar from './AppNavbar';
 import { Link } from 'react-router-dom';

 const TicketList = () => {
  const [sortType, setSortType] = useState('noone');
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

  const sortTickets = (tickets, sortType) => {
    if (sortType === 'assigned') {
      return tickets.filter(ticket => ticket.assignedUser !== null);
    } else if (sortType === 'unassigned') {
      return tickets.filter(ticket => !ticket.assignedUser);
    } else if (sortType === 'newest') {
      return tickets.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (sortType === 'oldest') {
      return tickets.sort((a, b) => new Date(a.date) - new Date(b.date));
    }
    return tickets;
  };

  const sortedTickets = sortTickets([...tickets], sortType);

  if (loading) {
    return <p>Loading...</p>;
  }

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
  };

  const ticketList = sortedTickets.map(ticket => (
    <tr key={ticket.id}>
      <td>{ticket.title}</td>
      <td>{ticket.date ? formatDate(ticket.date) : ''}</td>
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
        <div className="mb-3">
          <ButtonGroup>
            <Button onClick={() => setSortType('assigned')}>Assigned</Button>
            <Button onClick={() => setSortType('unassigned')}>Unassigned</Button>
            <Button onClick={() => setSortType('newest')}>Newest</Button>
            <Button onClick={() => setSortType('oldest')}>Oldest</Button>
          </ButtonGroup>
        </div>
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
