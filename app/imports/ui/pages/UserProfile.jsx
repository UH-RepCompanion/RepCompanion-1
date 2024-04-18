import React from 'react';
import { Container, Col, Card, Row, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Profiles } from '../../api/profiles/Profiles';
import LoadingSpinner from '../components/LoadingSpinner';
import { pageStyle } from './pageStyles';
import { PageIDs } from '../utilities/ids';

/* Renders the UserProfile Page: displays user information. */
/* Assisted by chatgpt generation */
const UserProfile = () => {
  const { ready, profile } = useTracker(() => {
    const sub2 = Meteor.subscribe(Profiles.userPublicationName);
    const userProfile = Profiles.collection.findOne({ email: Meteor.user()?.username });
    return {
      ready: sub2.ready(),
      email: Meteor.user()?.username,
      profile: userProfile,
    };
  }, []);

  return ready ? (
    <Container id={PageIDs.homePage} className="d-flex justify-content-center align-items-center" style={pageStyle}>
      <Row className="justify-content-center align-items-center">
        <Col>
          <Col className="justify-content-center text-center"><h2 style={{ color: 'white' }}>{profile?.firstName}&apos;s Profile</h2></Col>
          <Card style={{ width: '600px', height: '600px' }}>
            <Card.Body style={{ width: '800', height: 'auto' }}>
              <Row>
                <Col xs={6}><Image className="rounded-circle" src={profile?.picture} style={{ width: '200px', height: 'auto', marginBottom: '10px', borderRadius: '50%', border: '2px solid black' }} />
                  <Card.Title>{profile?.firstName} {profile?.lastName}</Card.Title>
                  <Card.Text style={{ marginTop: '50px', marginBottom: '20px' }}><strong>Major:</strong> {profile?.major}</Card.Text>
                </Col>
                <Col xs={6}><Card.Subtitle className="mb-2 text-muted">{profile?.email}</Card.Subtitle>
                  <Card.Text><strong>About Me: </strong></Card.Text>
                  {profile?.bio}
                </Col>
              </Row>
              <Row>
                <Col xs={6}><Card.Text style={{ marginBottom: '20px' }}><strong>Interests:</strong> {profile?.interests.join(', ')}</Card.Text></Col>
                <Col xs={6}><Card.Text style={{ marginBottom: '20px', color: 'black' }}><strong>Tags:</strong> {profile?.tag}</Card.Text></Col>
                <Link to="/editprofile" style={{ position: 'absolute', bottom: '10px', left: '500px' }}>Edit Profile</Link>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />;
};

export default UserProfile;
