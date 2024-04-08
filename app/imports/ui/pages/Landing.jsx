import React from 'react';
import { Col, Container, Row, Image, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import LandingPageCard from '../components/LandingPageCard';

/* A simple component that welcomes users to the app. */
const Landing = () => (
  <Container id="landing-page" className="py-3 justify-content-center">
    <Row className="text-center">
      <Col>
        <h1 style={{ color: 'white' }}>Welcome to</h1>
        <h1 style={{ color: 'white' }}>UH RepCompanion!</h1>
        <Image width={350} height={350} style={{ marginTop: '20px', marginBottom: '20px' }} className="rounded-circle" src="../images/uh-repcompanion.png" />
        <Row className="justify-content-center">
          <Button className="py-3 justify-content-center" variant="dark" id="landing-page-button" style={{ marginTop: '20px', marginBottom: '20px', width: '150px' }} as={Link} to="/signin"> Login </Button>
        </Row>
        <Row className="justify-content-center">
          <Button className="py-3 justify-content-center" variant="dark" style={{ marginTop: '20px', marginBottom: '20px', width: '150px' }} as={Link} to="/signup"> Register </Button>
        </Row>
      </Col>
      <LandingPageCard />
    </Row>
  </Container>
);

export default Landing;
