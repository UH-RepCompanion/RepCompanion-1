import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Row } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { _ } from 'meteor/underscore';
import { Profiles } from '../../api/profiles/Profiles';
import { ProfilesInterests } from '../../api/profiles/ProfilesInterests';
import LoadingSpinner from '../components/LoadingSpinner';
import { pageStyle } from './pageStyles';
import { PageIDs } from '../utilities/ids';
import ProfileCard from '../components/ProfileCard';
import { ProfilesTags } from '../../api/profiles/ProfilesTags';
// eslint-disable-next-line import/named

/* Returns the Profile and associated Projects and Interests associated with the passed user email. */
function getProfileData(email) {
  const data = Profiles.collection.findOne({ email });
  const interests = _.pluck(ProfilesInterests.collection.find({ profile: email }).fetch(), 'interest');
  const tag = _.pluck(ProfilesTags.collection.find({ profile: email }).fetch(), 'tag');
  // console.log(_.extend({ }, data, { interests, projects: projectPictures }));
  return _.extend({}, data, { interests, tag });
}

/* Renders the Profile Collection as a set of Cards. */
const ProfilesPage = () => {

  const { ready } = useTracker(() => {
    // Ensure that minimongo is populated with all collections prior to running render().
    const sub1 = Meteor.subscribe(Profiles.userPublicationName);
    const sub2 = Meteor.subscribe(ProfilesInterests.userPublicationName);
    const sub3 = Meteor.subscribe(ProfilesTags.userPublicationName);
    return {
      ready: sub1.ready() && sub2.ready() && sub3.ready(),
    };
  }, []);
  const emails = _.pluck(Profiles.collection.find().fetch(), 'email');
  // There is a potential race condition. We might not be ready at this point.
  // Need to ensure that getProfileData doesn't throw an error on line 18.
  const profileData = emails.map(email => getProfileData(email));
  return ready ? (
    <Container id={PageIDs.profilesPage} style={pageStyle}>
      <Row xs={1} md={2} lg={4} className="g-2">
        {profileData.map((profile, index) => <ProfileCard key={index} profile={profile} />)}
      </Row>
    </Container>
  ) : <LoadingSpinner />;
};

export default ProfilesPage;
