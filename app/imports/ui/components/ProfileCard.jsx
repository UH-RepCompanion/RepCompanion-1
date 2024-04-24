import { Badge, Card, Col, Image, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import React from 'react';

const ProfileCard = ({ profile }) => (
  <Col>
    <Card className="h-100">
      <Card.Header className="text-center">
        <div className="image-border">
          <Image src={profile.picture} width={150} style={{ borderRadius: '50%', border: '3px solid black' }} roundedCircle />
        </div>
        <Card.Title>{profile.firstName} {profile.lastName}</Card.Title>
        <Card.Subtitle><span className="date">{profile.major}</span></Card.Subtitle>
      </Card.Header>
      <Card.Body>
        <Card.Text>
          <h5>Interest</h5>
          {profile.interests.map((interest, index) => <Badge key={index} bg="info">{interest}</Badge>)}
        </Card.Text>
        <Card.Text>
          <h5>Level</h5>
          <Badge bg="secondary">{profile.tag}</Badge>
        </Card.Text>
        <div className="icon-box p-3 my-3 border rounded d-flex justify-content-around">
          <Card.Text>
            {profile.bio}
          </Card.Text>
        </div>
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
