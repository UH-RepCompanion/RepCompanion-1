import React from 'react';
import { Col, Container, Row, Image, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import LandingPageCard from '../components/LandingPageCard';

/* A simple component that welcomes users to the app. */
const Landing = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { currentUser } = useTracker(() => ({
    currentUser: Meteor.user() ? Meteor.user().username : '',
  }), []);

  return (
    <Container id="landing-page" className="py-3 justify-content-center">
      <Row className="text-center">
        <Col>
          <h1 style={{ color: 'white' }}><strong>Welcome to</strong></h1>
          <h1 style={{ color: 'white' }}><strong>UH RepCompanion!</strong></h1>
          <Image width={350} height={350} style={{ marginTop: '20px', marginBottom: '20px' }} className="rounded-circle" src="../images/uh-repcompanion.png" />
          {currentUser ? ([
            '',
          ]) : ([
            <Row className="justify-content-center">
              <Button className="py-3 justify-content-center" variant="dark" id="landing-page-button" style={{ marginTop: '20px', marginBottom: '20px', width: '150px' }} as={Link} to="/signin"><strong> Login </strong></Button>
            </Row>,
            <Row className="justify-content-center">
              <Button className="py-3 justify-content-center" variant="dark" style={{ marginTop: '20px', marginBottom: '20px', width: '150px' }} as={Link} to="/signup"><strong> Register   </strong></Button>
            </Row>,
          ])}
        </Col>
        <LandingPageCard />
      </Row>
    </Container>
  );
};

export default Landing;
