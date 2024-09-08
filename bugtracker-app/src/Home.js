import React, {useEffect, useState} from 'react';
import './App.css';
import AppNavbar from './AppNavbar';
import { Link } from 'react-router-dom';
import { Button, Container, Row, Col, Card, CardBody, CardTitle, CardText } from 'reactstrap';


const Home = () => {

  const [ticketCount, setTicketCount] = useState(0);
  const [projectCount, setProjectCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await fetch('/api/tickets');
        const data = await response.json();
        const nonHighPriorityTickets = data.filter(ticket => ticket.priority === 'HIGH');
        setTicketCount(nonHighPriorityTickets.length);
      } catch (error) {
        console.error('Error fetching tickets:', error);
      }

      try {
        const response = await fetch('/api/projects');
        const data = await response.json();
        setProjectCount(data.length);
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <AppNavbar />
      <Container fluid className="mt-4">
        <h2>Welcome to the Bug Tracker Dashboard!</h2>
        <Row className="mt-4">
          <Col sm="4">
            <Card>
              <CardBody>
                <CardTitle tag="h5">🎫 Manage Tickets</CardTitle>
                <CardText>View and manage all tickets in the system.</CardText>
                <Button color="primary" tag={Link} to="/tickets">Go to Tickets</Button>
              </CardBody>
            </Card>
          </Col>
          <Col sm="4">
            <Card>
              <CardBody>
                <CardTitle tag="h5">📂 Manage Projects</CardTitle>
                <CardText>View and manage all projects.</CardText>
                <Button color="primary" tag={Link} to="/projects">Go to Projects</Button>
              </CardBody>
            </Card>
          </Col>
          <Col sm="4">
            <Card>
              <CardBody>
                <CardTitle tag="h5">👥 Manage Users</CardTitle>
                <CardText>View and manage all users in the system.</CardText>
                <Button color="primary" tag={Link} to="/users">Go to Users</Button>
              </CardBody>
            </Card>
          </Col>
        </Row>

        <Row className="mt-4">
          <Col sm="4">
            <Card>
              <CardBody>
                <CardTitle tag="h5">Open Tickets</CardTitle>
                <CardText>Currently, {ticketCount} high priority tickets are open.</CardText>
              </CardBody>
            </Card>
          </Col>
          <Col sm="4">
            <Card>
              <CardBody>
                <CardTitle tag="h5">Active Projects</CardTitle>
                <CardText>There are {projectCount} active projects.</CardText>
              </CardBody>
            </Card>
          </Col>
          <Col sm="4">
            <Card>
              <CardBody>
                <CardTitle tag="h5">Registered Users</CardTitle>
                <CardText>15 users are registered in the system.</CardText>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Home;

