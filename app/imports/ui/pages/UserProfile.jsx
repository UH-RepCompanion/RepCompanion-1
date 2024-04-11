import React from 'react';
import { Container, Col, Card, Row, Image } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Interests } from '../../api/interests/Interests';
import { Profiles } from '../../api/profiles/Profiles';
import { ProfilesInterests } from '../../api/profiles/ProfilesInterests';
import { Tags } from '../../api/tags/Tags';
import LoadingSpinner from '../components/LoadingSpinner';
import { pageStyle } from './pageStyles';
import { PageIDs } from '../utilities/ids';

/* Renders the UserProfile Page: displays user information. */
/* Assisted by chatgpt generation */
const UserProfile = () => {
  const { ready, profile, interests, tags } = useTracker(() => {
    const sub1 = Meteor.subscribe(Interests.userPublicationName);
    const sub2 = Meteor.subscribe(Profiles.userPublicationName);
    const sub3 = Meteor.subscribe(ProfilesInterests.userPublicationName);
    const sub4 = Meteor.subscribe(Tags.userPublicationName);
    const userProfile = Profiles.collection.findOne({ email: Meteor.user()?.username });
    const userInterests = ProfilesInterests.collection.find({ profile: userProfile?.email }).fetch();
    const userTags = userInterests.map(({ tag }) => tag);
    const userInterestsNames = userInterests.map(({ interest }) => {
      const interestDoc = Interests.collection.findOne({ _id: interest });
      return interestDoc?.name;
    });
    return {
      ready: sub1.ready() && sub2.ready() && sub3.ready() && sub4.ready(),
      email: Meteor.user()?.username,
      profile: userProfile,
      interests: userInterestsNames,
      tags: userTags,
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
                <Col xs={6}><Image src={profile?.picture} style={{ width: '200px', height: 'auto', marginBottom: '10px' }} />
                  <Card.Title>{profile?.firstName} {profile?.lastName}</Card.Title>
                  <Card.Text style={{ marginTop: '50px', marginBottom: '20px' }}><strong>Major:</strong> {profile?.major}</Card.Text>
                </Col>
                <Col xs={6}><Card.Subtitle className="mb-2 text-muted">{profile?.email}</Card.Subtitle>
                  <Card.Text><strong>About Me: </strong></Card.Text>
                  {profile?.bio}
                </Col>
              </Row>
              <Row>
                <Col xs={6}><Card.Text style={{ marginBottom: '20px' }}><strong>Interests:</strong> {interests.join(', ')}</Card.Text></Col>
                <Col xs={6}><Card.Text style={{ marginBottom: '20px' }}><strong>Tags:</strong> {tags.join(', ')}</Card.Text></Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />;
};

export default UserProfile;
