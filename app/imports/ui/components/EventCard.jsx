import { Badge, Card, Col, Image } from 'react-bootstrap';
import PropTypes from 'prop-types';
import React from 'react';
import { format } from 'date-fns';
import { PencilSquare, Check, Calendar } from 'react-bootstrap-icons';

const EventCard = ({ event, profile }) => (
  <Col>
    <Card className="h-100" style={{ backgroundColor: 'azure' }}>
      <Card.Body>
        <Card.Text>
          <h5>Circuit <Image style={{ width: '35px', height: '40px' }} src="./images/circuit-workout.png" /></h5>
          <Image style={{ width: '20px', height: '25px', marginRight: '5px' }} src="./images/dumbbell-icon.png" />{event.workouts.map((workout, index) => <Badge key={index} bg="info">{workout}</Badge>)}
        </Card.Text>
        <hr />
        <Card.Text>
          <h5>Training Plan <Image style={{ width: '35px', height: '40px' }} src="./images/training-plan.png" /></h5>
          {event.description}
        </Card.Text>
        <Card.Text>
          <div className="alert alert-success" role="alert">
            This is a success alert—check it out! <Check style={{ width: '20px', height: '25px' }} />
          </div>
          <Badge className="fw-lighter">
            <Calendar style={{ marginRight: '5px' }} />{format(new Date(event.date), 'EEEE, MMMM d, yyyy')}
          </Badge>
          <hr />
          <p className="fw-lighter">
            Created by {profile.firstName} {profile.lastName} {format(new Date(event.createdAt), 'EEEE, MMMM d, yyyy')} <PencilSquare />
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
