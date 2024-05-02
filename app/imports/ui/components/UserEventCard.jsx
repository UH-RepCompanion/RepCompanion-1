import { Meteor } from 'meteor/meteor';
import { Badge, Button, Card, Col, Row } from 'react-bootstrap';
import PropTypes from 'prop-types';
import React from 'react';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import { removeEventMethod } from '../../startup/both/Methods';

const deleteEvent = (userEvent) => {
  // Created by chatgpt

  // Append the email to the data object. Ensure userEmail is not undefined.
  if (userEvent) {
    Meteor.call(removeEventMethod, userEvent, (error) => {
      if (error) {
        swal('Error', error.message, 'error');
      } else {
        swal('Success', 'Event deleted successfully', 'success');
      }
    });
  } else {
    // Handle the case where the email is somehow still undefined
    swal('Error', 'Event is undefined.', 'error');
  }
};
const UserEventCard = ({ event, profile }) => (
  <Row className="justify-content-center align-items-center">
    <Col>
      <Col className="justify-content-center text-center"><h2 style={{ color: 'white' }}>{profile?.firstName}&apos;s Event</h2></Col>
      <Card style={{ width: '600px', height: '600px', backgroundColor: 'white', border: '1px solid black' }}>
        <Card.Body className="d-flex flex-column justify-content-between" style={{ width: '800', height: 'auto' }}>
          <Card.Text>
            <h5>Circuit</h5>
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
        <div className="mt-auto d-flex justify-content-between w-100">
          <Button className="m-3" variant="danger" style={{ color: 'white', width: '120px' }} onClick={() => deleteEvent(event)}>Delete Event</Button>
          <Button className="m-3" variant="light" style={{ color: 'black', width: '160px' }} as={Link} to="/events">View All Events</Button>
          <Button className="m-3" variant="dark" style={{ color: 'white', width: '120px' }} as={Link} to="/editevent">Edit Event</Button>
        </div>
      </Card>
    </Col>
  </Row>
);

UserEventCard.propTypes = {
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
export default UserEventCard;
