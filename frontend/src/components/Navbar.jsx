import React from "react";
import { Navbar, Container } from "react-bootstrap";
import logo from "./Images/verify.png";

const NavBar = () => {
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand>
          <img src={logo} width="50" height="50" alt=""></img> To Do
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
};
export default NavBar;
