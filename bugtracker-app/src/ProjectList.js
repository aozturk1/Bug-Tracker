import React, { useEffect, useState } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from './AppNavbar';
import { Link } from 'react-router-dom';

const ProjectList = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch('/api/projects')
      .then(response => response.json())
      .then(data => {
        setProjects(data);
        setLoading(false);
      });
  }, []);

  const remove = async (id) => {
    await fetch(`/api/project/${id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(() => {
      let updatedProjects = [...projects].filter(i => i.id !== id);
      setProjects(updatedProjects);
    });
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  const projectList = projects.map(project => (
    <tr key={project.id}>
      <td>{project.name}</td>
      <td>{project.description}</td>
      <td>
        <ButtonGroup>
          <Button size="sm" color="primary" tag={Link} to={`/projects/${project.id}`}>Edit</Button>
          <Button size="sm" color="danger" onClick={() => remove(project.id)}>Delete</Button>
        </ButtonGroup>
      </td>
    </tr>
  ));

  return (
    <div>
      <AppNavbar />
      <Container fluid>
        <div className="float-end">
          <Button color="success" tag={Link} to="/projects/new">Add Project</Button>
        </div>
        <h3>Project List</h3>
        <Table className="mt-4">
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {projectList}
          </tbody>
        </Table>
      </Container>
    </div>
  );
};

export default ProjectList;
