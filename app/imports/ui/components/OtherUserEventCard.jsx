import { Meteor } from 'meteor/meteor';
import { Badge, Button, Card, Col, Container, Row, Image } from 'react-bootstrap';
import PropTypes from 'prop-types';
import React from 'react';
import { format } from 'date-fns';
import swal from 'sweetalert';
import { PencilSquare, Check, Calendar } from 'react-bootstrap-icons';
import { joinEventMethod, unjoinEventMethod } from '../../startup/both/Methods';
import { pageStyle } from '../pages/pageStyles';

const joinEvent = (isParticipant, event) => {
  const data = { owner: event.owner, currentSize: event.currentSize, profile: Meteor.user()?.username, eventId: event._id };
  // Append the email to the data object. Ensure userEmail is not undefined.
  if (!isParticipant && (event.currentSize < event.maxSize)) {
    Meteor.call(joinEventMethod, data, (error) => {
      if (error) {
        swal('Error', error.message, 'error');
      } else {
        swal('Success', 'Event joined successfully', 'success');
      }
    });
  } else if (isParticipant) {
    Meteor.call(unjoinEventMethod, data, (error) => {
      if (error) {
        swal('Error', error.message, 'error');
      } else {
        swal('Success', 'Event unjoined successfully', 'success');
      }
    });
  } else {
    // Handle the case where the email is somehow still undefined
    swal('Error', 'Cannot join', 'error');
  }
};

const OtherUserEventCard = ({ event, profile, isParticipant }) => (
  <Container className="d-flex justify-content-center align-items-center infofooter" style={pageStyle}>
    <Row className="justify-content-center align-items-center">
      <Col>
        <Col className="justify-content-center text-center"><h2 style={{ color: 'white' }}>{profile?.firstName}&apos;s Event</h2></Col>
        <Card style={{ width: '600px', height: '600px', backgroundColor: 'azure', border: '1px solid black' }}>
          <Card.Body className="d-flex flex-column justify-content-between" style={{ width: '800', height: 'auto' }}>
            <Card.Text>
              <Row>
                <Col sx={3}><h5>Circuit <Image style={{ width: '35px', height: '40px' }} src="/images/circuit-workout.png" /></h5></Col>
                <Col sx={9} className="justify-content-end d-flex">
                  {(event.owner !== Meteor.user()?.username) ? (
                    <Button onClick={() => joinEvent(isParticipant, event)} variant={isParticipant ? 'danger' : 'info'} style={{ color: 'white', width: '80px', height: '40px' }}>
                      {isParticipant ? 'Unjoin' : 'Join'}
                    </Button>
                  ) : (<div />)}
                </Col>
              </Row>
              <Image style={{ width: '20px', height: '25px', marginRight: '5px' }} src="/images/dumbbell-icon.png" />{event.workouts.map((workout, index) => <Badge key={index} bg="info">{workout}</Badge>)}
            </Card.Text>
            <hr />
            <Card.Text>
              <h5>Training Plan <Image style={{ width: '35px', height: '40px' }} src="/images/training-plan.png" /></h5>
              {event.description}
            </Card.Text>
            <Card.Text>
              <div className="alert alert-success" role="alert">
                This is a success alert—check it out! <Check style={{ width: '20px', height: '25px' }} />
              </div>
              <Row>
                <Col xs={3}>
                  <Badge className="fw-lighter">
                    <Calendar style={{ marginRight: '5px' }} />{format(new Date(event.date), 'EEEE, MMMM d, yyyy')}
                  </Badge>
                </Col>
                <Col xs={9} className="justify-content-end d-flex">
                  <div>{event.currentSize}/{event.maxSize}</div>
                </Col>
              </Row>
              <hr />
              <p className="fw-lighter">
                Created by {profile.firstName} {profile.lastName} {format(new Date(event.createdAt), 'EEEE, MMMM d, yyyy')} <PencilSquare />
              </p>
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  </Container>
);

OtherUserEventCard.propTypes = {
  event: PropTypes.shape({
    owner: PropTypes.string,
    description: PropTypes.string,
    workouts: PropTypes.arrayOf(PropTypes.string),
    date: PropTypes.instanceOf(Date),
    createdAt: PropTypes.instanceOf(Date),
    currentSize: PropTypes.number,
    maxSize: PropTypes.number,
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
  isParticipant: PropTypes.bool.isRequired,
};
export default OtherUserEventCard;
