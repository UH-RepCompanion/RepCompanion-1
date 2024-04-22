import { Badge, Card, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';
import React from 'react';

const EventCard = ({ event }) => (
  <Col>
    <Card className="h-100" style={{ backgroundColor: 'azure' }}>
      <Card.Body>
        <Card.Text>
          <h5>Workouts</h5>
          {event.workouts.map((workout, index) => <Badge key={index} bg="info">{workout}</Badge>)}
        </Card.Text>
        <Card.Text>
          <h5>Level</h5>
          <Badge bg="secondary">{event.date}</Badge>
        </Card.Text>
        <Card.Text>
          {event.description}
        </Card.Text>
      </Card.Body>
    </Card>
  </Col>
);

EventCard.propTypes = {
  event: PropTypes.shape({
    description: PropTypes.string,
    workouts: PropTypes.arrayOf(PropTypes.string),
    customWorkouts: PropTypes.arrayOf(PropTypes.string),
    date: PropTypes.instanceOf(Date),
    createdAt: PropTypes.instanceOf(Date),
  }).isRequired,
};

export default EventCard;
