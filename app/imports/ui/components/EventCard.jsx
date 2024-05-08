import { Meteor } from 'meteor/meteor';
import swal from 'sweetalert';
import { Badge, Button, Card, Col, Container, Image, OverlayTrigger, Row, Tooltip } from 'react-bootstrap';
import PropTypes from 'prop-types';
import React from 'react';
import { format } from 'date-fns';
import { PencilSquare, Calendar } from 'react-bootstrap-icons';
import { joinEventMethod, unjoinEventMethod } from '../../startup/both/Methods';
import { Profiles } from '../../api/profiles/Profiles';

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

const EventCard = ({ event, profile, isParticipant, participantsProfiles }) => (
  <Col>
    <Card className="d-flex flex-column h-100" style={{ backgroundColor: 'azure', minHeight: '300px' }}>
      <Card.Body className="d-flex flex-column">
        <Card.Text>
          <Row>
            <Col sx={3}><h5>Circuit <Image style={{ width: '35px', height: '40px' }} src="./images/circuit-workout.png" /></h5></Col>
            <Col sx={9} className="justify-content-end d-flex">
              {(event.owner !== Meteor.user()?.username) ? (
                <Button onClick={() => joinEvent(isParticipant, event)} variant={isParticipant ? 'danger' : 'info'} style={{ color: 'white', width: '75px', height: '40px' }}>
                  {isParticipant ? 'Unjoin' : 'Join'}
                </Button>
              ) : (<div />)}
            </Col>
          </Row>
          <Row>
            <Col>
              <div
                className="workout-container"
                style={{
                  display: 'flex',
                  overflowX: 'auto',
                  whiteSpace: 'nowrap',
                  alignItems: 'center',
                }}
              >
                <Image style={{ width: '20px', height: '25px', marginRight: '5px' }} src="./images/dumbbell-icon.png" />
                {event.workouts.map((workout, index) => (
                  <Badge key={index} bg="info" className="me-1">{workout}</Badge>
                ))}
              </div>
            </Col>
          </Row>
        </Card.Text>
        <hr />
        <Card.Text>
          <h5>Training Plan <Image style={{ width: '35px', height: '40px' }} src="./images/training-plan.png" /></h5>
          <div
            className="description-container"
            style={{
              maxHeight: '100px', // Set this to your desired maximum height
              minHeight: '100px',
              overflowY: 'auto',
            }}
          >
            {event.description}
          </div>
        </Card.Text>
        <Card.Text>
          <Container className="py-1">
            <Row>
              <Col xs={3}>
                <OverlayTrigger
                  placement="top"
                  overlay={(
                    <Tooltip>
                      {profile.firstName} {profile.lastName}
                    </Tooltip>
                  )}
                >
                  <div className="image-border"><Image
                    src={profile.picture}
                    alt="Profile"
                    width={60}
                    height={60}
                    style={{ borderRadius: '50%' }}
                    roundedCircle
                  />
                  </div>
                </OverlayTrigger>
              </Col>
              {participantsProfiles.map((p, index) => {
                const profileEvent = Profiles.collection.findOne({ email: p.profile });
                return (
                  <Col xs={2} className="align-items-center d-flex" key={index}>
                    <OverlayTrigger
                      placement="top"
                      overlay={(
                        <Tooltip id={`tooltip-${index}`}>
                          {profileEvent.firstName} {profileEvent.lastName}
                        </Tooltip>
                      )}
                    >
                      <div className="image-border"><Image
                        src={profileEvent.picture}
                        alt="Profile"
                        width={50}
                        height={50}
                        style={{ borderRadius: '50%' }}
                        roundedCircle
                      />
                      </div>
                    </OverlayTrigger>
                  </Col>
                );
              })}
            </Row>
          </Container>
          <Row className="mt-auto">
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
);

EventCard.propTypes = {
  event: PropTypes.shape({
    owner: PropTypes.string,
    description: PropTypes.string,
    workouts: PropTypes.arrayOf(PropTypes.string),
    date: PropTypes.instanceOf(Date),
    createdAt: PropTypes.instanceOf(Date),
    currentSize: PropTypes.number,
    maxSize: PropTypes.number,
    _id: PropTypes.string,
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
  participantsProfiles: PropTypes.arrayOf(PropTypes.string).isRequired,
};
export default EventCard;
