import React from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';

const MenuBar = ({ onNew, onOpen, onSave, onSaveAs }) => {
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="#home">WriteApp</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <NavDropdown title="File" id="basic-nav-dropdown">
            <NavDropdown.Item onClick={onNew}>New</NavDropdown.Item>
            <NavDropdown.Item onClick={onOpen}>Open</NavDropdown.Item>
            <NavDropdown.Item onClick={onSave}>Save</NavDropdown.Item>
            <NavDropdown.Item onClick={onSaveAs}>Save As</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.5">Export PDF</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.6">Export FDX</NavDropdown.Item>
          </NavDropdown>
          <NavDropdown title="Edit" id="basic-nav-dropdown">
            <NavDropdown.Item href="#action/4.1">Undo</NavDropdown.Item>
            <NavDropdown.Item href="#action/4.2">Redo</NavDropdown.Item>
          </NavDropdown>
          <NavDropdown title="Format" id="basic-nav-dropdown">
            <NavDropdown.Item href="#action/5.1">Bold</NavDropdown.Item>
            <NavDropdown.Item href="#action/5.2">Italic</NavDropdown.Item>
            <NavDropdown.Item href="#action/5.3">Underline</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default MenuBar;
