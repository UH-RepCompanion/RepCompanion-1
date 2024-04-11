import React from 'react';
import { Col, Container, Image } from 'react-bootstrap';

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
        <a href="https://static.wikia.nocookie.net/spongebob/images/1/12/MuscleBob_BuffPants_083.png/revision/latest/scale-to-width-down/1200?cb=20190905112630">
          <Image style={{ width: '60px', height: 'auto' }} src="../images/weightlift.png" alt="[Image Not Found]" />
        </a>
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
