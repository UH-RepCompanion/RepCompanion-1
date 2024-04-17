import React, { useState, useEffect } from 'react';
import { Col, Container, Row, Image, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import LandingPageCard from '../components/LandingPageCard';

const Landing = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
  }, []);

  const { currentUser } = useTracker(() => ({
    currentUser: Meteor.user() ? Meteor.user().username : '',
  }), []);

  /* GPT assistance with fade-in */
  return (
    <Container id="landing-page" className={`py-3 justify-content-center fade-in ${visible ? 'visible' : ''}`}>
      <Row className="text-center">
        <Col>
          <h1 className="welcome" style={{ color: 'white' }}><strong>Welcome to</strong></h1>
          <h1 className="welcome" style={{ color: 'white' }}><strong>UH RepCompanion!</strong></h1>
          {currentUser ? (
            ''
          ) : (
            <Button className="py-3 justify-content-center" variant="dark" id="landing-page-button" style={{ width: '150px' }} as={Link} to="/signin"><strong> Login </strong></Button>
          )}
          <Image width={350} height={350} style={{ marginTop: '20px', marginBottom: '20px', marginRight: '20px', marginLeft: '20px' }} className="rounded-circle" src="../images/uh-repcompanion.png" />
          {currentUser ? (
            ''
          ) : (
            <Button className="py-3 justify-content-center" variant="dark" id="landing-page-button" style={{ width: '150px' }} as={Link} to="/signup"><strong> Register </strong></Button>
          )}
        </Col>
        <LandingPageCard />
      </Row>
    </Container>
  );
};

export default Landing;
