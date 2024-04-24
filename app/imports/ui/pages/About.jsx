import React from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';

const About = () => (
  <Container className="aboutBackground w-50 h-100">
    <Row className="text-center">
      <Col className="pt-5">
        <h1>About Us</h1>
        <Image width={100} height={100} className="rounded-circle mt-5" src="../images/uh-repcompanion.png" />
        {/* eslint-disable-next-line max-len */}
        <p className="m-5">RepCompanion is designed to connect students seeking gym partners. By matching users based on fitness goals, interests, availability, and preferred workout styles, RepCompanion helps students overcome shyness and build confidence while providing motivation and accountability to stick to their fitness routines. With RepCompanion, students can find compatible workout buddies who can push them to achieve their fitness goals, try new exercises, and stay committed to their health and wellness journey. </p>
      </Col>
    </Row>
  </Container>
);

export default About;
