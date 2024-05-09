import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { NavLink } from 'react-router-dom';
import { Roles } from 'meteor/alanning:roles';
import { Container, Image, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { BoxArrowRight, Calendar, PersonFill, PersonPlusFill, PersonSquare, PlusCircleFill } from 'react-bootstrap-icons';

const NavBar = () => {
  const { currentUser } = useTracker(() => ({
    currentUser: Meteor.user() ? Meteor.user().username : '',
  }), []);

  return (
    <Navbar bg="dark" expand="lg" className="gradient">
      <Container>
        <Image style={{ marginTop: '8px', marginBottom: '20px', marginRight: '10px', width: '50px', height: 'auto' }} src="/images/uh-warriors-logo.png" />
        <Navbar.Brand as={NavLink} to="/">
          <h2><strong>RepCompanion</strong></h2>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto justify-content-start">
            {currentUser ? ([
              <NavDropdown title={<span><PlusCircleFill /> Event</span>} id="navbar-event-dropdown">
                <NavDropdown.Item id="navbar-add-event" as={NavLink} to="/addevent">Add Event</NavDropdown.Item>
                <NavDropdown.Item id="navbar-list-event" as={NavLink} to="/events">Events</NavDropdown.Item>
              </NavDropdown>,
              <Nav.Link id="finder-nav" as={NavLink} to="/filter" key="filter">Finder</Nav.Link>,
            ]) : ''}
            {Roles.userIsInRole(Meteor.userId(), 'admin') ? (
              <Nav.Link id="list-stuff-admin-nav" as={NavLink} to="/admin" key="admin">Admin</Nav.Link>
            ) : ''}
            <Nav.Link id="about-nav" as={NavLink} to="/about" key="about">About Us</Nav.Link>
          </Nav>
          <Nav className="justify-content-end">
            {currentUser === '' ? (
              <NavDropdown id="login-dropdown" title="Connect Now!">
                <NavDropdown.Item id="login-dropdown-sign-in" as={NavLink} to="/signin">
                  <PersonFill />
                  Login
                </NavDropdown.Item>
                <NavDropdown.Item id="login-dropdown-sign-up" as={NavLink} to="/signup">
                  <PersonPlusFill />
                  Register
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <NavDropdown id="navbar-current-user" title={currentUser}>
                <NavDropdown.Item id="navbar-profile" as={NavLink} to="/userprofile">
                  <PersonSquare />
                  {' '}
                  Profile
                </NavDropdown.Item>
                <NavDropdown.Item id="navbar-schedule" as={NavLink} to="/userSchedule">
                  <Calendar />
                  {' '}
                  Schedule
                </NavDropdown.Item>
                <NavDropdown.Item id="navbar-sign-out" as={NavLink} to="/signout">
                  <BoxArrowRight />
                  {' '}
                  Sign
                  out
                </NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
