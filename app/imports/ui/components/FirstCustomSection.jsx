import React from 'react';
import { Container, Col, Row, Image } from 'react-bootstrap';

const FirstCustomSection = () => (
  <div id="first-custom" className="bg-white">
    <Container className="pt-lg-5 px-lg-5">
      <Row>
        <Col className="d-grid justify-content-center">
          <Image height={100} width={100} src="../images/uh-repcompanion.png" />
          <h1>Test</h1>
          <h1>Test</h1>
          <h1>Test</h1>
          <h1>Test</h1>
        </Col>
        <Col className="d-grid justify-content-center">
          <Image height={100} width={100} src="../images/uh-repcompanion.png" />
          <h1>Test</h1>
          <h1>Test</h1>
          <h1>Test</h1>
          <h1>Test</h1>
        </Col>
      </Row>
    </Container>
  </div>
);

export default FirstCustomSection;
