import React from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const About = () => (
  <Container className="aboutBackground w-50 h-100">
    <Row className="text-center">
      <Col className="pt-5">
        <h1>About Us</h1>
        <Image width={200} height={200} className="rounded-circle mt-5" src="../images/uh-repcompanion.png" />
        {/* eslint-disable-next-line max-len */}
        <p className="m-5">RepCompanion is designed to connect students seeking gym partners. By matching users based on fitness goals, interests, availability, and preferred workout styles, RepCompanion helps students overcome shyness and build confidence while providing motivation and accountability to stick to their fitness routines. With RepCompanion, students can find compatible workout buddies who can push them to achieve their fitness goals, try new exercises, and stay committed to their health and wellness journey. </p>
      </Col>
    </Row>
    <Row>
      <Col>
        <div className="text-center">
          <h1>Guide</h1>
          <Image width={500} src="images/page-images/landing-page.png" />
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
            And, if you dont have an account with us, you can click the register link on the sign in page or back on the <Link to="/">Landing Page</Link> where there is a register button in the middle or a register link in the Connect Now!
            dropdown menu.
          </p>
          <p>
            After adding an email and password, you will see this page to enter your information.
          </p>
        </div>
        <div className="text-center">
          <Image width={500} src="images/page-images/register-page.png" />
        </div>
      </Col>
    </Row>
    <Row>
      <Col>
        <div className="pt-3 px-5">
          <p>Once you&apos;re signed in, you&apos;ll see the updated home page with new options in the top navbar!</p>
        </div>
        <div className="text-center">
          <Image width={500} src="images/page-images/uh-repcompanion-home-page.png" />
        </div>
      </Col>
    </Row>
    <Row>
      <Col>
        <div className="pt-3 px-5">
          <p>If you want to view your profile page, you can click on the dropdown menu with your account name and click on the Profile link. Your profile page will look like this (below) where you are able to edit your information if you need to!</p>
        </div>
        <div className="text-center">
          <Image width={500} src="images/page-images/profile-page.png" />
        </div>
      </Col>
    </Row>
    <Row>
      <Col>
        <div className="pt-3 px-5">
          <p>Clicking on the Finder link in the navbar will take you to this page (below) where you&apos;re able to see all the other users on the website. You can also filter the profiles to see the profiles that have the same interests as you!</p>
        </div>
        <div className="text-center">
          <Image width={500} src="images/page-images/finder-profile-page.png" />
        </div>
      </Col>
    </Row>
    <Row className="pb-5">
      <Col>
        <div className="text-center pt-5">
          <p>More features coming soon!</p>
        </div>
      </Col>
    </Row>
  </Container>
);

export default About;
