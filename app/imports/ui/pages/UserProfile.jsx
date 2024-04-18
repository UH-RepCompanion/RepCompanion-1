import React from 'react';
import { Container, Col, Card, Row, Image, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Interests } from '../../api/interests/Interests';
import { Profiles } from '../../api/profiles/Profiles';
import { ProfilesInterests } from '../../api/profiles/ProfilesInterests';
import { ProfilesTags } from '../../api/profiles/ProfilesTags';
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
    const sub5 = Meteor.subscribe(ProfilesTags.userPublicationName);
    const userProfile = Profiles.collection.findOne({ email: Meteor.user()?.username });
    const userInterests = ProfilesInterests.collection.find({ profile: userProfile?.email }).fetch();
    const userTags = ProfilesTags.collection.find({ profile: userProfile?.email }).fetch();
    const userInterestsNames = userInterests.map(({ interest }) => {
      const interestDoc = Interests.collection.findOne({ name: interest });
      return interestDoc?.name;
    });
    const userTagsNames = userTags.map(({ tag }) => {
      const tagDoc = Tags.collection.findOne({ name: tag });
      return tagDoc?.name;
    });
    return {
      ready: sub1.ready() && sub2.ready() && sub3.ready() && sub4.ready() && sub5.ready(),
      email: Meteor.user()?.username,
      profile: userProfile,
      interests: userInterestsNames,
      tags: userTagsNames,
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
                  {profile?.bio}
                </Col>
              </Row>
              <Row>
                <Col xs={6}><Card.Text style={{ marginBottom: '20px' }}><strong>Interests:</strong> {interests.join(', ')}</Card.Text></Col>
                <Col xs={6}><Card.Text style={{ marginBottom: '20px', color: 'black' }}><strong>Tags:</strong> {tags.join(', ')}</Card.Text></Col>
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
