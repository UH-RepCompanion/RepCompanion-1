import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Profiles } from '../../api/profiles/Profiles';
import LoadingSpinner from '../components/LoadingSpinner';
import { pageStyle } from './pageStyles';
import { Events } from '../../api/events/Events';
import UserProfileCard from '../components/UserProfileCard';
import UserEventCard from '../components/UserEventCard';
import { Schedules } from '../../api/schedule/Schedules';
import { ProfilesSchedules } from '../../api/profiles/ProfilesSchedules';
import { ProfilesEvents } from '../../api/profiles/ProfilesEvents';
import OtherUserEventCard from '../components/OtherUserEventCard';

const UserProfile = () => {
  const { ready, profile, event } = useTracker(() => {
    const sub = Meteor.subscribe(Profiles.userPublicationName);
    const sub2 = Meteor.subscribe(Events.userPublicationName);
    const sub3 = Meteor.subscribe(Schedules.userPublicationName);
    const sub4 = Meteor.subscribe(ProfilesSchedules.userPublicationName);
    const sub5 = Meteor.subscribe(ProfilesEvents.userPublicationName);
    const userProfile = Profiles.collection.findOne({ email: Meteor.user()?.username });
    const userEvent = Events.collection.findOne({ owner: Meteor.user()?.username });
    const userSchedule = Schedules.collection.findOne({ owner: Meteor.user()?.username });
    return {
      ready: sub.ready() && sub2.ready() && sub3.ready() && sub4.ready() && sub5.ready(),
      email: Meteor.user()?.username,
      profile: userProfile,
      event: userEvent,
      schedule: userSchedule,
    };
  }, []);
  return ready ? (
    <Container id="profile-page" className="d-flex flex-column justify-content-center align-items-center infofooter" style={pageStyle}>
      <Row>
        <UserProfileCard profile={profile} />
      </Row>
      <Row>
        {event ? <UserEventCard profile={profile} event={event} /> : <h2 style={{ color: 'white' }}>No Event</h2>}
      </Row>
    </Container>
  ) : <LoadingSpinner />;
};

export default UserProfile;
