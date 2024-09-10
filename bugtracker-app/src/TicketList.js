import React, { useEffect, useState } from 'react';
import { Button, ButtonGroup, Container, Table, Pagination, PaginationItem, PaginationLink, FormGroup, Input } from 'reactstrap';
import AppNavbar from './AppNavbar';
import { Link } from 'react-router-dom';

const TicketList = () => {
  const [sortType, setSortType] = useState('newest');
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');

  const pageSize = 10;

  useEffect(() => {
    setLoading(true);

    fetch(`/api/tickets/paged?page=${currentPage}&size=${pageSize}`)
      .then(response => response.json())
      .then(data => {
        setTickets(data.content);
        setTotalPages(data.totalPages);
        setLoading(false);
      });
  }, [currentPage]);

  const handlePageClick = (page) => {
    setCurrentPage(page);
  }

  const remove = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete the " + tickets.find(ticket => ticket.id === id).title + " ticket?");
    if (confirmed) {
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
  };


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

  // Filtering based on search term
  const filterTickets = (tickets, searchTerm) => {
    if (!searchTerm) return tickets;
    return tickets.filter(ticket =>
      ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  // Combine sorting and filtering
  const sortedAndFilteredTickets = filterTickets(sortTickets([...tickets], sortType), searchTerm);


  if (loading) {
    return <p>Loading...</p>;
  }

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
  };

  const ticketList = sortedAndFilteredTickets.map(ticket => (
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
      <AppNavbar />
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

          {/* Search Box */}
          <FormGroup className="float-end" style={{ width: '25%' }}>
            <Input
              type="text"
              placeholder="Search by title or description..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </FormGroup>
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

        {/* Pagination */}
        <Pagination aria-label="Page navigation example" className="d-flex justify-content-center">
          <PaginationItem disabled={currentPage === 0}>
            <PaginationLink first onClick={() => handlePageClick(0)} />
          </PaginationItem>
          <PaginationItem disabled={currentPage === 0}>
            <PaginationLink previous onClick={() => handlePageClick(currentPage - 1)} />
          </PaginationItem>
          {[...Array(totalPages)].map((_, i) => (
            <PaginationItem active={i === currentPage} key={i}>
              <PaginationLink onClick={() => handlePageClick(i)}>
                {i + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem disabled={currentPage === totalPages - 1}>
            <PaginationLink next onClick={() => handlePageClick(currentPage + 1)} />
          </PaginationItem>
          <PaginationItem disabled={currentPage === totalPages - 1}>
            <PaginationLink last onClick={() => handlePageClick(totalPages - 1)} />
          </PaginationItem>
        </Pagination>
      </Container>
    </div>
  );
};

export default TicketList;
