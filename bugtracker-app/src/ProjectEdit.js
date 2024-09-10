import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import AppNavbar from './AppNavbar';

const ProjectEdit = () => {
    const initialFormState = {
        name: '',
        description: '',
        tickets: [],
        users: [] // list of users assigned to this project
    };

    const [project, setProject] = useState(initialFormState);
    const [availableUsers, setAvailableUsers] = useState([]);
    const navigate = useNavigate();
    const { id } = useParams();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        // Fetch project if editing an existing project
        if (id !== 'new') {
            fetch(`/api/project/${id}`)
                .then(response => response.json())
                .then(data => setProject(data));
        }

        // Fetch the list of all users
        fetch('/api/users')
            .then(response => response.json())
            .then(data => setAvailableUsers(data));
            setLoading(false);
    }, [id, setProject]);

    if (loading || !project || !project.users) {
        console.log("Project:", project);
        console.log("Project Users:", project?.users);
        return <p>Loading...</p>;
    }    

    const handleChange = (event) => {
        const { name, value } = event.target;
        setProject({ ...project, [name]: value });
    };

    const handleUserToggle = (userId) => {
        const updatedUsers = project.users.some(user => user.id === userId)
            ? project.users.filter(user => user.id !== userId)
            : [...project.users, availableUsers.find(user => user.id === userId)];

        setProject({ ...project, users: updatedUsers });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        await fetch(`/api/project${project.id ? `/${project.id}` : ''}`, {
            method: project.id ? 'PUT' : 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(project)
        });
        setProject(initialFormState);
        navigate('/projects');
    };

    const title = <h2>{project.id ? 'Edit Project' : 'Add Project'}</h2>;

    return (
        <div>
            <AppNavbar />
            <Container>
                {title}
                <Form onSubmit={handleSubmit}>
                    <FormGroup>
                        <Label for="name">Project Name</Label>
                        <Input type="text" name="name" id="name" value={project.name || ''}
                            onChange={handleChange} autoComplete="name" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="description">Description</Label>
                        <Input type="text" name="description" id="description" value={project.description || ''}
                            onChange={handleChange} autoComplete="description" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="users">Team Members</Label>
                        <div>
                            {availableUsers.map(user => (
                                <div key={user.id}>
                                    <Input
                                        type="checkbox"
                                        checked={project.users.some(u => u.id === user.id)}
                                        onChange={() => handleUserToggle(user.id)}
                                    />{' '}
                                    {user.name}
                                </div>
                            ))}
                        </div>
                    </FormGroup>
                    <FormGroup>
                        <Button color="primary" type="submit">Save</Button>{' '}
                        <Button color="secondary" tag={Link} to="/projects">Cancel</Button>
                    </FormGroup>
                </Form>
            </Container>
        </div>
    );
};

export default ProjectEdit;
