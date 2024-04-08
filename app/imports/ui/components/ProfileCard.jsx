import { Badge, Card, Col, Image } from 'react-bootstrap';
import PropTypes from 'prop-types';
import React from 'react';

const ProfileCard = ({ profile }) => (
  <Col>
    <Card className="h-100">
      <Card.Header>
        <Image src={profile.picture} width={50} />
        <Card.Title>{profile.firstName} {profile.lastName}</Card.Title>
        <Card.Subtitle><span className="date">{profile.major}</span></Card.Subtitle>
      </Card.Header>
      <Card.Body>
        <Card.Text>
          {profile.bio}
        </Card.Text>
        <Card.Text>
          <h5>Interests</h5>
          {profile.interests.map((interest, index) => <Badge key={index} bg="info">{interest}</Badge>)}
        </Card.Text>
        <Card.Text>
          <h5>Tags</h5>
          {profile.tags.map((tag, index) => <Badge key={index} bg="info">{tag}</Badge>)}
        </Card.Text>
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
    tags: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};

export default ProfileCard;
