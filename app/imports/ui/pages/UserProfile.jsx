import React, { useState } from 'react';
import { Container, Col, Card, Row, Image, Button, Table, Form, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Instagram, Github, Discord } from 'react-bootstrap-icons';
import { Profiles } from '../../api/profiles/Profiles';
import LoadingSpinner from '../components/LoadingSpinner';
import { pageStyle } from './pageStyles';
import { PageIDs } from '../utilities/ids';
import { Notes } from '../../api/note/Notes';

/* Renders the UserProfile Page: displays user information. */
/* Assisted by chatgpt generation */
const UserProfile = () => {
  const { ready, profile } = useTracker(() => {
    const sub = Meteor.subscribe(Profiles.userPublicationName);
    const userProfile = Profiles.collection.findOne({ email: Meteor.user()?.username });
    return {
      ready: sub.ready(),
      email: Meteor.user()?.username,
      profile: userProfile,
    };
  }, []);

  const [showWorkoutModal, setShowWorkoutModal] = useState(false);
  const [selectedDay, setSelectedDay] = useState('');
  const [workout, setWorkout] = useState('');

  const handleAddWorkout = (day) => {
    // Handle adding the workout here
    Notes.addWorkout(Meteor.userId(), day, workout);
    setWorkout('');
    setShowWorkoutModal(false);
  };

  const openModalForDay = (day) => {
    Meteor.call('notes.addWorkout', Meteor.userId(), selectedDay, workout);
    setSelectedDay(day); // Set the selected day when clicking on a th
    setShowWorkoutModal(true);
  };

  const getWorkoutForDay = (day) => Notes.getWorkoutForDay(Meteor.userId(), day);

  return ready ? (
    <Container id={PageIDs.homePage} className="d-flex justify-content-center align-items-center infofooter" style={pageStyle}>
      <Row className="justify-content-center align-items-center">
        <Col>
          <Col className="justify-content-center text-center"><h2 style={{ color: 'white' }}>{profile?.firstName}&apos;s Profile</h2></Col>
          <Card style={{ width: '600px', height: '600px', backgroundColor: 'azure', border: '1px solid black' }}>
            <Card.Body style={{ width: '800', height: 'auto' }}>
              <Row>
                <Col xs={6}><Image className="rounded-circle" src={profile?.picture} style={{ width: '200px', height: 'auto', marginBottom: '10px', borderRadius: '50%', border: '3px solid black' }} />
                  <Card.Title>{profile?.firstName} {profile?.lastName}</Card.Title>
                  <Card.Text style={{ marginTop: '50px', marginBottom: '20px' }}><strong>Major:</strong> {profile?.major}</Card.Text>
                </Col>
                <Col xs={6}><Card.Subtitle className="mb-2 text-muted">{profile?.email}</Card.Subtitle>
                  <Card.Text><strong>About Me: </strong></Card.Text>
                  <Card.Text>{profile?.bio}</Card.Text>
                  <Col className="mb-4 mt-4 icon"><Instagram /></Col>
                  <Col className="mb-4 icon"><Discord /></Col>
                  <Col className="mb-4 icon"><Github /></Col>
                </Col>
              </Row>
              <Row>
                <Col xs={6}><Card.Text style={{ marginBottom: '20px' }}><strong>Interests:</strong> {profile?.interests.join(', ')}</Card.Text></Col>
                <Col xs={6}><Card.Text style={{ marginBottom: '20px', color: 'black' }}><strong>Tags:</strong> {profile?.tag}</Card.Text></Col>
              </Row>
              <Row>
                <Container className="d-flex justify-content-center align-items-center square-card">
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th style={{ backgroundColor: 'darkcyan', border: '1px solid black' }}>Sun</th>
                        <th style={{ backgroundColor: 'darkcyan', border: '1px solid black' }}>Mon</th>
                        <th style={{ backgroundColor: 'darkcyan', border: '1px solid black' }}>Tues</th>
                        <th style={{ backgroundColor: 'darkcyan', border: '1px solid black' }}>Wed</th>
                        <th style={{ backgroundColor: 'darkcyan', border: '1px solid black' }}>Thurs</th>
                        <th style={{ backgroundColor: 'darkcyan', border: '1px solid black' }}>Fri</th>
                        <th style={{ backgroundColor: 'darkcyan', border: '1px solid black' }}>Sat</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th style={{ backgroundColor: 'lightcyan', border: '1px solid black' }} onClick={() => openModalForDay('Sunday')}>{getWorkoutForDay('Sunday')}</th>
                        <th style={{ backgroundColor: 'lightcyan', border: '1px solid black' }} onClick={() => openModalForDay('Monday')}>{getWorkoutForDay('Monday')}</th>
                        <th style={{ backgroundColor: 'lightcyan', border: '1px solid black' }} onClick={() => openModalForDay('Tuesday')}>{getWorkoutForDay('Tuesday')}</th>
                        <th style={{ backgroundColor: 'lightcyan', border: '1px solid black' }} onClick={() => openModalForDay('Wednesday')}>{getWorkoutForDay('Wednesday')}</th>
                        <th style={{ backgroundColor: 'lightcyan', border: '1px solid black' }} onClick={() => openModalForDay('Thursday')}>{getWorkoutForDay('Thursday')}</th>
                        <th style={{ backgroundColor: 'lightcyan', border: '1px solid black' }} onClick={() => openModalForDay('Friday')}>{getWorkoutForDay('Friday')}</th>
                        <th style={{ backgroundColor: 'lightcyan', border: '1px solid black' }} onClick={() => openModalForDay('Saturday')}>{getWorkoutForDay('Saturday')}</th>
                      </tr>
                    </tbody>
                  </Table>
                </Container>
                <Button className="text-start" variant="dark" id="landing-page-button" style={{ position: 'absolute', bottom: '10px', left: '465px', color: 'white', width: '120px' }} as={Link} to="/editprofile">Edit Profile</Button>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Modal show={showWorkoutModal} onHide={() => setShowWorkoutModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Workout for {selectedDay}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="workoutText">
              <Form.Label>Details</Form.Label>
              <Form.Control as="textarea" rows={3} value={workout} onChange={(e) => setWorkout(e.target.value)} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="light" onClick={() => setShowWorkoutModal(false)}>Cancel</Button>
          <Button variant="dark" onClick={handleAddWorkout}>Add Workout</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  ) : <LoadingSpinner />;
};

export default UserProfile;
