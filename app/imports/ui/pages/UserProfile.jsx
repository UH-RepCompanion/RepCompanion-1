import React from 'react';
import { Container, Col, Card, Row } from 'react-bootstrap';
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
    <Container id={PageIDs.homePage} className="justify-content-center" style={pageStyle}>
      <Col>
        <Col className="justify-content-center text-center"><h2 style={{ color: 'white' }}>Your Profile</h2></Col>
        <Card>
          <Card.Body>
            <Row>
              <Col xs={4}><Card.Title>{profile?.firstName} {profile?.lastName}</Card.Title></Col>
              <Col xs={4}><Card.Subtitle className="mb-2 text-muted">{profile?.email}</Card.Subtitle></Col>
            </Row>
            <Card.Text>{profile?.bio}</Card.Text>
            <Row>
              <Col xs={6}><Card.Text><strong>Major:</strong> {profile?.major}</Card.Text></Col>
              <Col xs={6}><Card.Text><strong>Picture URL:</strong> {profile?.picture}</Card.Text></Col>
            </Row>
            <Row>
              <Col xs={6}><Card.Text><strong>Interests:</strong> {interests.join(', ')}</Card.Text></Col>
              <Col xs={6}><Card.Text><strong>Tags:</strong> {tags.join(', ')}</Card.Text></Col>
            </Row>
          </Card.Body>
        </Card>
      </Col>
    </Container>
  ) : <LoadingSpinner />;
};

export default UserProfile;
