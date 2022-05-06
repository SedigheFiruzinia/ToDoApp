import React from "react";
import { Navbar, Container } from "react-bootstrap";
import logo from "./Images/check (1).png";

const NavBar = () => {
  return (
    <Navbar bg="light" variant="dark">
      <Container style={{ marginLeft: 0 }}>
        <Navbar.Brand style={{ color: "black" }}>
          <img src={logo} width="50" height="50" alt=""></img> To Do
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
};
export default NavBar;
