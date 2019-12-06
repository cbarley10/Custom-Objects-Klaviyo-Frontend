import React from "react";
import Navbar from "react-bootstrap/Navbar";

const Header = props => {
  const { name } = props;

  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand href="/">{name}</Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse className="justify-content-end"></Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
