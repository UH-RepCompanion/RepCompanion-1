import React from 'react';
import { Container, Col, Card, Row, Image, Button, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Instagram, Snapchat, Discord } from 'react-bootstrap-icons';
import { Profiles } from '../../api/profiles/Profiles';
import LoadingSpinner from '../components/LoadingSpinner';
import { pageStyle } from './pageStyles';
import { PageIDs } from '../utilities/ids';

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
                  <Col className="mb-4 icon"><Snapchat /></Col>
                  <Col className="mb-4 icon"><Discord /></Col>
                </Col>
              </Row>
              <Row>
                <Col xs={6}><Card.Text style={{ marginBottom: '20px' }}><strong>Interests:</strong> {profile?.interests.join(', ')}</Card.Text></Col>
                <Col xs={6}><Card.Text style={{ marginBottom: '20px', color: 'black' }}><strong>Tags:</strong> {profile?.tag}</Card.Text></Col>
                <Container className="d-flex justify-content-center align-items-center square-card">
                  <Table striped bordered hover style={{ width: '100%' }}>
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
                        <th style={{ backgroundColor: 'lightcyan', border: '1px solid black' }}>*</th>
                        <th style={{ backgroundColor: 'lightcyan', border: '1px solid black' }}>*</th>
                        <th style={{ backgroundColor: 'lightcyan', border: '1px solid black' }}>*</th>
                        <th style={{ backgroundColor: 'lightcyan', border: '1px solid black' }}>*</th>
                        <th style={{ backgroundColor: 'lightcyan', border: '1px solid black' }}>*</th>
                        <th style={{ backgroundColor: 'lightcyan', border: '1px solid black' }}>*</th>
                        <th style={{ backgroundColor: 'lightcyan', border: '1px solid black' }}>*</th>
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
    </Container>
  ) : <LoadingSpinner />;
};

export default UserProfile;
