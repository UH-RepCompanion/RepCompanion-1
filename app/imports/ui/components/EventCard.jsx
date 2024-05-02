import { Badge, Card, Col, Image } from 'react-bootstrap';
import PropTypes from 'prop-types';
import React from 'react';
import { format } from 'date-fns';

const EventCard = ({ event, profile }) => (
  <Col>
    <Card className="h-100" style={{ backgroundColor: 'whitesmoke' }}>
      <Card.Body>
        <Card.Text>
          <h5>Circuit <Image style={{ width: '35px', height: '40px' }} src="./images/circuit-workout.png" /></h5>
          {event.workouts.map((workout, index) => <Badge key={index} bg="info">{workout}</Badge>)}
        </Card.Text>
        <hr />
        <Card.Text>
          <h5>Training Plan</h5>
          {event.description}
        </Card.Text>
        <Card.Text>
          <div className="alert alert-success" role="alert">
            This is a success alert—check it out!
          </div>
          <Badge className="fw-lighter">
            {format(new Date(event.date), 'EEEE, MMMM d, yyyy')}
          </Badge>
          <hr />
          <p className="fw-lighter">
            Created by {profile.firstName} {profile.lastName} {format(new Date(event.createdAt), 'EEEE, MMMM d, yyyy')}
          </p>
        </Card.Text>
      </Card.Body>
    </Card>
  </Col>
);

EventCard.propTypes = {
  event: PropTypes.shape({
    owner: PropTypes.string,
    description: PropTypes.string,
    workouts: PropTypes.arrayOf(PropTypes.string),
    date: PropTypes.instanceOf(Date),
    createdAt: PropTypes.instanceOf(Date),
  }).isRequired,
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
export default EventCard;
