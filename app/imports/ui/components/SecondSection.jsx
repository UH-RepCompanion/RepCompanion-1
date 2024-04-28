import React, { useState, useEffect } from 'react';
import { Col, Image, Row } from 'react-bootstrap';

const SecondSection = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Set visible to true when the component mounts
    setVisible(true);
  }, []);

  return (
    <div className={`w-100 py-4 white-footer-gradient infofooter fade-in ${visible ? 'visible' : ''}`} style={{ color: 'black' }}>
      <Row className="w-100 justify-content-center align-items-center">
        <Col>
          <Row>
            <Col className="text-center pb-3">
              <div className="bg-light pt-1" style={{ width: '500px', margin: '0 auto', border: '2px solid black' }}>
                <h4 className="pb-2"><strong>What is RepCompanion?</strong></h4>
                <h6>UH RepCompanion is an application designed to connect University of Hawai&apos;i students seeking gym partners.</h6>
              </div>
            </Col>
          </Row>
          <Row className="text-center">
            <Col>
              <Image className="mb-3" style={{ width: '500px', height: 'auto', border: '2px solid black' }} src="./images/uh-repcompanion-high-five.jpeg" />
            </Col>
            <Col>
              <Image className="mb-3" style={{ width: '500px', height: 'auto', border: '2px solid black' }} src="./images/uh-repcompanion-using-app.jpeg" />
            </Col>
          </Row>
          <Row className="text-center">
            <Col className="m-2" xs={3} sm={4} md={5}>
              <div className="bg-light text-center" style={{ width: '490px', marginLeft: 'auto', padding: '5px', border: '2px solid black' }}>
                <p style={{ width: '475px' }}>By matching users based on fitness goals, interests, availability,
                  and preferred workout styles, RepCompanion helps students overcome
                  shyness and build confidence while providing motivation and accountability
                  to stick to their fitness routines.
                </p>
              </div>
            </Col>
            <Col>
              <Image width={150} height={150} style={{ borderRadius: '50%', border: '1px solid white' }} className="rounded-circle" src="../images/uh-repcompanion.png" />
            </Col>
            <Col className="m-2" xs={3} sm={4} md={5}>
              <div className="bg-light pt-1 text-center" style={{ width: '490px', marginRight: 'auto', border: '2px solid black' }}>
                <p style={{ width: '475px' }}>
                  With RepCompanion, students can find and connect with compatible workout buddies who can push them to achieve their fitness goals, try new exercises, and help them stay committed to their health and wellness journey.
                </p>
              </div>
            </Col>
          </Row>
          <Row className="text-center mt-0">
            <Col>
              <Image style={{ width: '500px', height: 'auto', border: '2px solid black' }} src="./images/uh-repcompanion-connection.jpg" />
            </Col>
            <Col>
              <Image style={{ width: '500px', height: 'auto', border: '2px solid black' }} src="./images/uh-repcompanion-ritual.jpg" />
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default SecondSection;
