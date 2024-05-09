import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import LoadingSpinner from '../components/LoadingSpinner';
import { pageStyle } from './pageStyles';
import { Events } from '../../api/events/Events';
import EventCard from '../components/EventCard';
import { Profiles } from '../../api/profiles/Profiles';
import { ProfilesEvents } from '../../api/profiles/ProfilesEvents';

const EventsPage = () => {
  const [showParticipating, setShowParticipating] = useState(false);
  const { ready, participant, profiles, events } = useTracker(() => {
    const sub = Meteor.subscribe(Events.userPublicationName);
    const sub2 = Meteor.subscribe(Profiles.userPublicationName);
    const sub3 = Meteor.subscribe(ProfilesEvents.userPublicationName);
    const userEmail = Meteor.user()?.username;
    const joinedEvents = ProfilesEvents.collection.find({ profile: userEmail }).fetch();
    const allEvents = Events.collection.find({}).fetch();
    const allProfiles = allEvents.map(event => Profiles.collection.findOne({ email: event.owner }));
    return {
      ready: sub.ready() && sub2.ready() && sub3.ready(),
      events: allEvents,
      profiles: allProfiles,
      participant: joinedEvents,

    };
  }, []);

  const toggleEventSet = () => {
    setShowParticipating(!showParticipating);
  };

  const displayedEvents = showParticipating ? participant.map(p => events.find(e => e._id === p.eventId)) : events;

  return ready ? (
    <Container id="event-page" style={pageStyle}>
      <Row className="py-3">
        <Col xs={2}>
          <Button onClick={toggleEventSet}>
            {showParticipating ? 'Show All Events' : 'Show Joined Events'}
          </Button>
        </Col>
      </Row>
      <Row xs={1} md={2} lg={3} className="g-2">
        {displayedEvents.map((event, index) => {
          const isParticipant = participant.some(p => p.eventId === event._id);
          const participantsProfiles = ProfilesEvents.collection.find({ eventId: event._id }).fetch();
          return <EventCard key={event._id} event={event} profile={profiles[index]} isParticipant={isParticipant} participantsProfiles={participantsProfiles} />;
        })}
      </Row>
    </Container>
  ) : <LoadingSpinner />;
};

export default EventsPage;
