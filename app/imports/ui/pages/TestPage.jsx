import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
import { useTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Container, Row } from 'react-bootstrap';
import { Events } from '../../api/events/Events';
import { pageStyle } from './pageStyles';
import OtherUserProfile from '../components/OtherUserProfile';
import LoadingSpinner from '../components/LoadingSpinner';
import { ProfilesEvents } from '../../api/profiles/ProfilesEvents';
import OtherUserEventCard from '../components/OtherUserEventCard';

const ViewUserProfile = () => {
  const location = useLocation();
  const [profile, setProfile] = useState(null);
  useEffect(() => {
    const profileQuery = queryString.parse(location.search);
    const interests = Array.isArray(profileQuery.interests) ? profileQuery.interests : [profileQuery.interests];
    const updatedProfile = { ...profileQuery, interests };
    setProfile(updatedProfile);
  }, [location]);

  const { ready, event, participant } = useTracker(() => {
    const userEmail = Meteor.user()?.username;
    const sub2 = Meteor.subscribe(Events.userPublicationName);
    const sub3 = Meteor.subscribe(ProfilesEvents.userPublicationName);
    const ownerUsername = profile?.email;
    const userEvent = Events.collection.findOne({ owner: ownerUsername });
    const joinedEvents = ProfilesEvents.collection.find({ profile: userEmail }).fetch();
    return {
      ready: sub2.ready() && sub3.ready(),
      event: userEvent,
      participant: joinedEvents,
    };
  }, []);

  if (!profile) {
    return <div>Loading...</div>;
  }

  const isParticipant = participant.some(p => p.eventId === event._id);
  return ready ? (
    <Container id="profile-page" className="d-flex flex-column justify-content-center align-items-center infofooter" style={pageStyle}>
      <Row>
        <OtherUserProfile profile={profile} />
      </Row>
      <Row>
        {event ? <OtherUserEventCard profile={profile} event={event} isParticipant={isParticipant} /> : <h2 style={{ color: 'white' }}>No Event</h2>}
      </Row>
    </Container>
  ) : <LoadingSpinner />;
};

export default ViewUserProfile;
