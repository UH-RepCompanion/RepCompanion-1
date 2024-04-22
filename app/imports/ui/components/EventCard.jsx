import { Badge, Card, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';
import React from 'react';
import { format } from 'date-fns';

const EventCard = ({ event, profile }) => (
  <Col>
    <Card className="h-100" style={{ backgroundColor: 'azure' }}>
      <Card.Body>
        <Card.Text>
          <h5>Workouts</h5>
          {event.workouts.map((workout, index) => <Badge key={index} bg="info">{workout}</Badge>)}
        </Card.Text>
        <Card.Text>
          <h5>Routine</h5>
          {event.description}
        </Card.Text>
        <Card.Text>
          <Badge className="fw-lighter">
            {format(new Date(event.date), 'EEEE, MMMM d, yyyy')}
          </Badge>
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
