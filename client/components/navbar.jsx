import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import { Container, Nav } from 'react-bootstrap';
import AppContext from '../lib/app-context';

class NavLink extends React.Component {
  render() {
    const activeClass = this.context.route.path === this.props.path
      ? 'active'
      : '';
    const className = `${activeClass} ${this.props.className}`;

    return (
      <a {...this.props} className={className}>{this.props.children}</a>
    );
  }
}

NavLink.contextType = AppContext;
export default class AppNavBar extends React.Component {
  render() {
    return (
      <Navbar className='nav' bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand onClick={this.props.resetSearch} href="#home">Kami</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav onClick={this.props.resetSearch} className="me-auto">
              <NavLink href="#airing" className="nav-link" path="airing">Airing</NavLink>
              <NavLink href="#schedule" className="nav-link" path="schedule">Schedule</NavLink>
              <NavLink href="#upcoming" className="nav-link" path="upcoming">Upcoming</NavLink>
              <NavLink href="#saved" className="nav-link" path="saved">Saved</NavLink>
              <NavLink href="#top?page=1" className="nav-link" path="top">Top 100</NavLink>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }
}
