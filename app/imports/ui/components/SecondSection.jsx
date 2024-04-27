import React from 'react';
import { Col, Image, Row } from 'react-bootstrap';

const SecondSection = () => (
  <div className="w-100 py-5 bg-light">
    <Row className="w-100 justify-content-center align-items-center">
      <Col>
        <Row>
          <Col className="text-center pb-4">
            <h4><strong>What is RepCompanion?</strong></h4>
            <h6>UH RepCompanion is an application designed to connect University of Hawai&apos;i students seeking gym partners.</h6>
          </Col>
        </Row>
        <Row className="text-center">
          <Col>
            <Image className="mb-3" style={{ width: '500px', height: 'auto' }} src="./images/uh-repcompanion-high-five.jpeg" />
          </Col>
          <Col>
            <Image className="mb-3" style={{ width: '500px', height: 'auto' }} src="./images/uh-repcompanion-using-app.jpeg" />
          </Col>
        </Row>
        <Row className="text-center">
          <Col className="m-3">
            <p>By matching users based on fitness goals, interests, availability,
              and preferred workout styles, RepCompanion helps students overcome
              shyness and build confidence while providing motivation and accountability
              to stick to their fitness routines.
            </p>
          </Col>
          <Col className="m-3">
            <p>With RepCompanion, students can find compatible workout buddies who can push them to achieve their fitness goals, try new exercises, and stay committed to their health and wellness journey.</p>
          </Col>
        </Row>
        <Row className="text-center">
          <Col>
            <Image style={{ width: '500px', height: 'auto' }} src="./images/uh-repcompanion-connection.jpg" />
          </Col>
          <Col>
            <Image style={{ width: '500px', height: 'auto' }} src="./images/uh-repcompanion-ritual.jpg" />
          </Col>
        </Row>
      </Col>
    </Row>
  </div>
);

export default SecondSection;
