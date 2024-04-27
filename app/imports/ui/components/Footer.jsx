import React from 'react';
import { Col, Container, Image, Row } from 'react-bootstrap';

const Footer = () => (
  <footer className="mt-auto py-3 bg-dark gradient">
    <Container>
      <Row className="text-center">
        <Col className="text-center">
          <h5><strong>Resources</strong></h5>
          {' '}
          <br />
          <a href="app/imports/ui/pages/About.jsx" className="link">
            About Us
          </a>
          {' '}
          <br />
          <a href="https://uh-repcompanion.github.io/" className="link">
            Application Overview
          </a>
          {' '}
          <br />
          <a href="https://github.com/UH-RepCompanion" className="link">
            App Organization
          </a>
        </Col>
        <Col className="text-center mt-0">
          UH RepCompanion
          {' '}
          <br />
          University of Hawaii
          <br />
          <a href="https://static.wikia.nocookie.net/spongebob/images/1/12/MuscleBob_BuffPants_083.png/revision/latest/scale-to-width-down/1200?cb=20190905112630">
            <Image style={{ width: '60px', height: 'auto' }} src="./images/uh-logo.png" alt="[Image Not Found]" />
          </a>
          <br />
          Honolulu, HI 96822
          {' '}
          <br />
        </Col>
        <Col>
          <h5><strong>Terms of Service</strong></h5>
          {' '}
          <br />
          <a href="/policy" className="link">
            Privacy Policy
          </a>
          {' '}
          <br />
          {' '}
          <br />
          <a href="/terms&conditions" className="link">
            Terms & Conditions
          </a>
        </Col>
      </Row>
    </Container>
  </footer>
);

export default Footer;
