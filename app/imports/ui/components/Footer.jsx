import React from 'react';
import { Col, Container } from 'react-bootstrap';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
const Footer = () => (
  <footer className="mt-auto py-3 bg-dark gradient">
    <Container>
      <Col className="text-center">
        UH RepCompanion
        {' '}
        <br />
        University of Hawaii
        <br />
        Honolulu, HI 96822
        {' '}
        <br />
        <a href="https://uh-repcompanion.github.io/">
          Organization Home Page
        </a>
      </Col>
    </Container>
  </footer>
);

export default Footer;
