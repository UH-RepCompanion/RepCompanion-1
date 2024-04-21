import React from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const About = () => (
  <Container className="aboutBackground w-50">
    <Row className="text-center">
      <Col className="pt-5">
        <h1>About Us</h1>
        <Image width={100} height={100} className="rounded-circle mt-5" src="../images/uh-repcompanion.png" />
        {/* eslint-disable-next-line max-len */}
        <p className="m-5">RepCompanion is designed to connect students seeking gym partners. By matching users based on fitness goals, interests, availability, and preferred workout styles, RepCompanion helps students overcome shyness and build confidence while providing motivation and accountability to stick to their fitness routines. With RepCompanion, students can find compatible workout buddies who can push them to achieve their fitness goals, try new exercises, and stay committed to their health and wellness journey. </p>
      </Col>
    </Row>
    <Row>
      <Col>
        <div className="text-center">
          <h1>Guide</h1>
          <Image width={500} src="images/page-images/uh-repcompanion-landing-page.png" />
        </div>
        <div className="pt-3 px-5">
          <p>When you first visit the website, you&apos;ll be greeted with the landing page where you&apos;re able to go to the <Link to="/about">About Page</Link>, which is the page you&apos;re reading now!
          </p>
          <p>If you click the login button or the login link in the Connect Now! dropdown menu on the top right navbar, it will take you to the <Link to="/signin">Sign in Page</Link>.
          </p>
        </div>
      </Col>
    </Row>
    <Row>
      <Col>
        <div className="text-center">
          <Image width={500} src="images/page-images/uh-repcompanion-login-page.png" />
        </div>
        <div className="pt-3 px-5">
          <p>
            {/* eslint-disable-next-line max-len */}
            And, if you dont have an account with us, you can click the register link on the sign in page or back on the <Link to="/">Landing Page</Link> where there is a register button in the middle or a register link in the Connect Now! dropdown menu.
          </p>
          <p>
            After adding an email and password, you will see this page to enter
          </p>
        </div>
      </Col>
    </Row>
  </Container>
);

export default About;
