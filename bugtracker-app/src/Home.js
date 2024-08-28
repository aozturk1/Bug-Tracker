 import React from 'react';
 import './App.css';
 import AppNavbar from './AppNavbar';
 import { Link } from 'react-router-dom';
 import { Button, Container } from 'reactstrap';

 const Home = () => {
   return (
     <div>
       <AppNavbar/>
       <Container fluid>
         <Button color="link"><Link to="/tickets">Manage Tickets</Link></Button>
       </Container>
     </div>
   );
 }

 export default Home;

//import React from 'react';
//
//const Home = () => {
//  return (
//    <div>
//      <h1>Welcome to the Home Page</h1>
//    </div>
//  );
//}
//
//export default Home;
