import { Meteor } from 'meteor/meteor';
import { Badge, Button, Card, Col, Container, Row, Image, OverlayTrigger, Tooltip } from 'react-bootstrap';
import PropTypes from 'prop-types';
import React from 'react';
import { format } from 'date-fns';
import swal from 'sweetalert';
import { PencilSquare, Calendar } from 'react-bootstrap-icons';
import { joinEventMethod, unjoinEventMethod } from '../../startup/both/Methods';
import { pageStyle } from '../pages/pageStyles';
import { Profiles } from '../../api/profiles/Profiles';
import { ProfilesEvents } from '../../api/profiles/ProfilesEvents';

const joinEvent = (isParticipant, event) => {
  const data = { owner: event.owner, currentSize: event.currentSize, profile: Meteor.user()?.username, eventId: event._id };
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
    swal('Error', 'Cannot join', 'error');
  }
};

const OtherUserEventCard = ({ event, profile, isParticipant }) => {
  const participantsProfiles = ProfilesEvents.collection.find({ eventId: event._id }).fetch();
  return (
    <Container className="d-flex justify-content-center align-items-center infofooter" style={pageStyle}>
      <Row className="justify-content-center align-items-center">
        <Col>
          <Col className="justify-content-center text-center"><h2 style={{ color: 'white' }}>{profile?.firstName}&apos;s Event</h2></Col>
          <Card className="d-flex flex-column h-100" style={{ width: '600px', height: '600px', backgroundColor: 'azure', border: '1px solid black' }}>
            <Card.Body className="d-flex flex-column">
              <Card.Text>
                <Row>
                  <Col sx={3}><h5>Circuit <Image style={{ width: '35px', height: '40px' }} src="../images/circuit-workout.png" /></h5></Col>
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
                      <Image style={{ width: '20px', height: '25px', marginRight: '5px' }} src="../images/dumbbell-icon.png" />
                      {event.workouts.map((workout, index) => (
                        <Badge key={index} bg="info" className="me-1">{workout}</Badge>
                      ))}
                    </div>
                  </Col>
                </Row>
              </Card.Text>
              <hr />
              <Card.Text>
                <h5>Training Plan <Image style={{ width: '35px', height: '40px' }} src="../images/training-plan.png" /></h5>
                <div
                  className="description-container"
                  style={{
                    maxHeight: '100px',
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
                    <Col xs={3} className="align-items-center justify-content-center d-flex">
                      <OverlayTrigger
                        placement="top"
                        overlay={(
                          <Tooltip>
                            {profile.firstName} {profile.lastName}
                          </Tooltip>
                        )}
                      >
                        <div><Image
                          className="image-border"
                          src={profile.picture}
                          alt="Profile"
                          width={60}
                          height={60}
                          style={{
                            borderRadius: '50%',
                            border: '3px solid', // Apply dynamic border color
                            objectFit: 'cover',
                          }}
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
                            <div><Image
                              className="image-border"
                              src={profileEvent.picture}
                              alt="Profile"
                              width={50}
                              height={50}
                              style={{
                                borderRadius: '50%',
                                border: '3px solid', // Apply dynamic border color
                                objectFit: 'cover',
                              }}
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
            <Col sx={9} className="justify-content-center d-flex">
              {(event.owner !== Meteor.user()?.username) ? (
                <Button className="m-3" onClick={() => joinEvent(isParticipant, event)} variant={isParticipant ? 'danger' : 'info'} style={{ color: 'white', width: '160px' }}>
                  {isParticipant ? 'Unjoin' : 'Join'}
                </Button>
              ) : (<div />)}
            </Col>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

OtherUserEventCard.propTypes = {
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

};
export default OtherUserEventCard;
