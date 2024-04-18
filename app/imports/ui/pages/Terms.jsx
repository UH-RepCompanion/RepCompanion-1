import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Terms = () => (
  <Container className="aboutBackground w-50 h-50 infofooter" style={{ backgroundColor: 'light' }}>
    <Row className="text-center">
      <Col className="pt-5">
        <h1><strong>UH RepCompanion</strong></h1>
        <h2 className="m-4">Terms & Conditions</h2>
        {/* eslint-disable-next-line max-len */}
        <p className="m-5">

          By using UH RepCompanion, you agree to abide by and follow these guidelines while using the application. Failure to follow these terms may result in an account removal and report to the University of Hawai&apos;i.
        </p>
        <h4>Privacy Policy</h4>

        <p className="m-5"> Please review our Privacy Policy under our Terms of Service or by clicking&nbsp;
          <a href="/policy" className="link">
            here
          </a>
          .
        </p>

        <h4>RepCompanion Service</h4>

        <p className="m-5">UH RepCompanion is a platform designed to connect University of
          Hawaii students seeking gym partners. The service allows users to find workout
          buddies based on fitness goals, interests, availability, and preferred workout styles. UH RepCompanion serves as a social application that is designed around connecting with other via fitness routines and schedules.
        </p>

        <h4>User Accounts</h4>

        <li className="m-3 pt-2 text-start">Users must have a valid University of Hawaii account to access the service</li>
        <li className="m-3 pt-2 text-start">Users are responsible for maintaining the confidentiality of their account credentials</li>
        <li className="m-3 pt-2 text-start">Users are solely responsible for all activities that occur under their account</li>
        <li className="m-3 pt-2 pb-2 text-start">Users must provide accurate and complete information when creating their account</li>

        <h4>RepCompanion Guidelines</h4>

        <p className="m-5">By agreeing to these terms, users agree not to engage in any of the following prohibited activities:</p>
        <li className="m-3 pt-2 text-start">Sharing account credentials with others</li>
        <li className="m-3 pt-2 text-start">Impersonating another person or entity</li>
        <li className="m-3 pt-2 text-start">Displaying any content that may be deemed as inappropriate or harmful</li>
        <li className="m-3 pt-2 pb-2 text-start">Using the service for any unlawful purpose or in violation of any applicable regulations</li>

        <h4>Modifications of Terms</h4>

        <p className="m-5">UH RepCompanion reserves the right to modify or revise these
          Terms and Conditions at any time. Users are responsible for regularly reviewing
          these terms. Continued use of the service after any changes constitutes acceptance
          of those changes.
        </p>
        <p className="m-5">
          Last updated: [04/16/2024]
        </p>
      </Col>
    </Row>
  </Container>
);

export default Terms;
