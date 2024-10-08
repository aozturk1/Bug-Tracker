import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import AppNavbar from './AppNavbar';

const TicketEdit = () => {
    const initialFormState = {
        title: '',
        description: '',
        //    status: '',
        priority: '',
        assignedUser: null,
    };

    const [ticket, setTicket] = useState(initialFormState);
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        // Fetch ticket if editing an existing ticket
        if (id !== 'new') {
            fetch(`/api/ticket/${id}`)
                .then(response => response.json())
                .then(data => setTicket(data));
        }

        // Fetch the list of users
        fetch('/api/users')
            .then(response => response.json())
            .then(data => setUsers(data));
    }, [id, setTicket]);

    const handleChange = (event) => {
        const { name, value } = event.target;

        if (name === 'assignedUserId') {
            // Find the selected user by ID and set it as assignedUser
            const selectedUser = users.find(user => user.id === parseInt(value));
            setTicket({ ...ticket, assignedUser: selectedUser });
        } else {
            setTicket({ ...ticket, [name]: value });
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        await fetch(`/api/ticket${ticket.id ? `/${ticket.id}` : ''}`, {
            method: (ticket.id) ? 'PUT' : 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(ticket)
        });
        setTicket(initialFormState);
        navigate('/tickets');
    }

    const title = <h2>{ticket.id ? 'Edit Ticket' : 'Add Ticket'}</h2>;

    return (
        <div>
            <AppNavbar />
            <Container>
                {title}
                <Form onSubmit={handleSubmit}>
                    <FormGroup>
                        <Label for="title">Title</Label>
                        <Input type="text" name="title" id="title" value={ticket.title || ''}
                            onChange={handleChange} autoComplete="title" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="description">Description</Label>
                        <Input type="text" name="description" id="description" value={ticket.description || ''}
                            onChange={handleChange} autoComplete="description" />
                    </FormGroup>
                    {/* <FormGroup>
            <Label for="status">Status</Label>
            <Input type="text" name="status" id="status" value={ticket.status || ''}
                   onChange={handleChange} autoComplete="status" />
          </FormGroup> */}
                    <FormGroup>
                        <Label for="priority">Priority</Label>
                        <Input type="select" name="priority" id="priority" value={ticket.priority || ''} onChange={handleChange}>
                            <option value="">Select Priority</option>
                            <option value="LOW">Low</option>
                            <option value="MEDIUM">Medium</option>
                            <option value="HIGH">High</option>
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Label for="assignedUserId">Assign to User</Label>
                        <Input type="select" name="assignedUserId" id="assignedUserId" value={ticket.assignedUser ? ticket.assignedUser.id : ''} onChange={handleChange}>
                            <option value="">Select User</option>
                            {users.map(user => (
                                <option key={user.id} value={user.id}>
                                    {user.name}
                                </option>
                            ))}
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Button color="primary" type="submit">Save</Button>{' '}
                        <Button color="secondary" tag={Link} to="/tickets">Cancel</Button>
                    </FormGroup>
                </Form>
            </Container>
        </div>
    );
};

export default TicketEdit;
