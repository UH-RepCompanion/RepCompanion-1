import React from 'react';
import { Card, Col, Container, Image, Row } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';

const Footer = () => {
  const { currentUser } = useTracker(() => ({
    currentUser: Meteor.user() ? Meteor.user().username : '',
  }), []);

  return (
    <>
      {!currentUser && (
        <footer className="mt-auto d-flex py-5 bg-light infofooter">
          <Container>
            <Row className="justify-content-center align-items-center">
              <Col>
                <Row>
                  <Col className="text-center pb-4">
                    <h4><strong>What is RepCompanion?</strong></h4>
                    <h6>UH RepCompanion is an application designed to connect University of Hawai&apos;i students seeking gym partners.</h6>
                  </Col>
                </Row>
                <Row className="text-center">
                  <Col>
                    <h5>*Put image here*</h5>
                  </Col>
                  <Col>
                    <h5>*Put image here*</h5>
                  </Col>
                </Row>
                <Row className="text-center">
                  <Col>
                    <p>By matching users based on fitness goals, interests, availability,
                      and preferred workout styles, RepCompanion helps students overcome
                      shyness and build confidence while providing motivation and accountability
                      to stick to their fitness routines.
                    </p>
                  </Col>
                  <Col>
                    <p>With RepCompanion, students can find compatible workout buddies who can push them to achieve their fitness goals, try new exercises, and stay committed to their health and wellness journey.</p>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Container>
        </footer>
      )}

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
    </>
  );
};

export default Footer;
