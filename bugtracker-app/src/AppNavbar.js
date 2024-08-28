 import React, { useState } from 'react';
 import { Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
 import { Link } from 'react-router-dom';

 const AppNavbar = () => {

   const [isOpen, setIsOpen] = useState(false);

   return (
     <Navbar color="dark" dark expand="md">
       <NavbarBrand as={Link} to="/">Home</NavbarBrand>
       <NavbarToggler onClick={() => { setIsOpen(!isOpen) }}/>
       <Collapse isOpen={isOpen} navbar>
         <Nav className="justify-content-end" style={{width: "100%"}} navbar>
           <NavItem>
             <NavLink href="https://www.linkedin.com/in/alper-ozturk-a1aa00290/">LinkedIn</NavLink>
           </NavItem>
           <NavItem>
             <NavLink href="https://www.linkedin.com/in/alper-ozturk-a1aa00290/">GitHub</NavLink>
           </NavItem>
         </Nav>
       </Collapse>
     </Navbar>
   );
 };

 export default AppNavbar;
