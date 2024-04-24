import { Badge, Card, Col, Row, Image, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import React from 'react';
import './ProfileCard.css'; // Ensure your CSS is properly linked

const ProfileCard = ({ profile }) => (
  <Col lg={8} xl={6}>
    <Card className="h-100">
      <Card.Header className="text-center">
        <div className="image-border">
          <Image src={profile.picture} width={150} style={{ borderRadius: '50%', border: '3px solid black' }} roundedCircle />
        </div>
        <Card.Title>{profile.firstName} {profile.lastName}</Card.Title>
        <Card.Subtitle><span className="date">{profile.major}</span></Card.Subtitle>
      </Card.Header>
      <Card.Body>
        <Row className="mb-3">
          <Col md={6}>
            <h5>Interest</h5>
            <div className="interests">
              {profile.interests.map((interest, index) => <Badge key={index} bg="info" className="m-1">{interest}</Badge>)}
            </div>
          </Col>
          <Col md={6}>
            <h5>Level</h5>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <h5>Bio</h5>
            <p className="bio">{profile.bio}</p>
          </Col>
        </Row>
        <Button variant="outline-success">Contact Me</Button>
      </Card.Body>
    </Card>
  </Col>
);

ProfileCard.propTypes = {
  profile: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    bio: PropTypes.string,
    picture: PropTypes.string,
    major: PropTypes.string,
    interests: PropTypes.arrayOf(PropTypes.string),
    tag: PropTypes.string,
    progress: PropTypes.number,
  }).isRequired,
};

export default ProfileCard;
