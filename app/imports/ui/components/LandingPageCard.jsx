import React from 'react';
import { Card } from 'react-bootstrap';

const LandingPageCard = () => (
  <Card className="square-card" style={{ backgroundColor: 'white', marginTop: '40px' }}>
    <Card.Header style={{ color: 'black' }}>
      What is RepCompanion?
    </Card.Header>
    <Card.Body style={{ color: 'black' }}>
      <Card.Text>RepCompanion is designed to connect students seeking gym partners.
        By matching users based on fitness goals, interests, availability,
        and preferred workout styles, RepCompanion helps students
        overcome shyness and build confidence while providing
        motivation and accountability to stick to their fitness
        routines. With RepCompanion, students can find compatible workout buddies who can push them to achieve their fitness goals, try new exercises, and stay committed to their health and wellness journey.
      </Card.Text>
    </Card.Body>
  </Card>
);

export default LandingPageCard;
