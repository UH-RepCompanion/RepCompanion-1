import React from 'react';
import { Container } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Profiles } from '../../api/profiles/Profiles';
import LoadingSpinner from '../components/LoadingSpinner';
import { pageStyle } from './pageStyles';
import { Events } from '../../api/events/Events';
import UserEventCard from '../components/UserEventCard';
import OtherUserProfile from '../components/OtherUserProfile';

const UserProfile = () => {
  const { ready, profile, event } = useTracker(() => {
    const sub = Meteor.subscribe(Profiles.userPublicationName);
    const sub2 = Meteor.subscribe(Events.userPublicationName);
    const userProfile = Profiles.collection.findOne({ email: Meteor.user()?.username });
    const userEvent = Events.collection.findOne({ owner: Meteor.user()?.username });
    return {
      ready: sub.ready() && sub2.ready(),
      email: Meteor.user()?.username,
      profile: userProfile,
      event: userEvent,
    };
  }, []);
  return ready ? (
    <Container id="profile-page" className="d-flex flex-column justify-content-center align-items-center infofooter" style={pageStyle}>
      <OtherUserProfile profile={profile} />
      {event ? <UserEventCard profile={profile} event={event} /> : <h2 style={{ color: 'white' }}>No Event</h2>}
    </Container>
  ) : <LoadingSpinner />;
};

export default UserProfile;
