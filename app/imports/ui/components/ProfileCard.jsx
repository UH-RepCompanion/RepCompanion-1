import { Badge, Card, Col, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import React from 'react';
import { Mortarboard, TrophyFill } from 'react-bootstrap-icons';
import queryString from 'query-string';

const ProfileCard = ({ profile }) => {
// Function to determine border color based on the profile's tag
  const interests = Array.isArray(profile.interests) ? profile.interests : [profile.interests];
  const updatedProfile = { ...profile, interests };
  const profileQueryString = queryString.stringify(updatedProfile);
  const getBorderColor = (tag) => {
    switch (tag) {
    case 'Trainer':
      return '#ffd700'; // Gold for Trainer
    case 'Advanced':
      return '#c0c0c0'; // Silver for Advanced
    case 'Intermediate':
      return '#cd7f32'; // Bronze for Intermediate
    case 'Newbie':
      return '#808080'; // Gray for Newbie
    default:
      return 'black'; // Default to black if no tag matches
    }
  };
  const borderColor = getBorderColor(profile.tag);
  return (
    <Col>
      <Card className="h-100 d-flex flex-column">
        <Card.Header className="text-center">
          <div className="image-border">
            <Image
              src={profile.picture}
              width={150}
              height={150}
              style={{
                borderRadius: '50%',
                border: `3px solid ${borderColor}`, // Apply dynamic border color
              }}
              roundedCircle
            />
          </div>
          <Card.Title>{profile.firstName} {profile.lastName}</Card.Title>
          <Card.Subtitle><span className="date">{profile.major}</span><Mortarboard /></Card.Subtitle>
        </Card.Header>
        <Card.Body className="d-flex flex-column">
          <div className="flex-grow-1 d-flex flex-column justify-content-center">
            <Card.Text>
              <h5>Interest</h5>
              {profile.interests.map((interest, index) => <Badge key={index} bg="info">{interest}</Badge>)}
            </Card.Text>
            <Card.Text>
              <h5>Level</h5>
              <Badge bg="borderColor" style={{ backgroundColor: borderColor }}><TrophyFill /> {profile.tag} </Badge>
            </Card.Text>
            <div className="icon-box p-3 my-3 border rounded d-flex justify-content-around">
              <Card.Text>
                {profile.bio}
              </Card.Text>
            </div>
          </div>
          <Link to={`/test-page/?${profileQueryString}`} className="btn btn-outline-success mt-auto" onClick={profile}>View Profile</Link>
        </Card.Body>
      </Card>
    </Col>
  );
};

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
