import React from 'react';
import { Card } from 'react-bootstrap';

const LandingPageCard = () => (
  <Card className="square-card" style={{ backgroundColor: 'white', marginTop: '40px' }}>
    <Card.Header style={{ color: 'black' }}>
      <strong>What is RepCompanion?</strong>
    </Card.Header>
    <Card.Body style={{ color: 'black' }}>
      <Card.Text>UH RepCompanion is an application designed to connect University of Hawai&apos;i students seeking gym partners.</Card.Text>
    </Card.Body>
  </Card>
);

export default LandingPageCard;
