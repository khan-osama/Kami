import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import { Container, Nav } from 'react-bootstrap';

export default class AppNavBar extends React.Component {
  render() {
    return (
      <Navbar className='nav' bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand onClick={this.props.resetSearch} href="#home">Kami</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav onClick={this.props.resetSearch} className="me-auto">
              <Nav.Link href="#airing">Airing</Nav.Link>
              <Nav.Link href="#schedule">Schedule</Nav.Link>
              <Nav.Link href="#upcoming">Upcoming</Nav.Link>
              <Nav.Link href="#saved">Saved</Nav.Link>
              <Nav.Link href="#top?page=1">Top 100</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }
}
