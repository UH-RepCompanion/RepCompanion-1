import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Row } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import LoadingSpinner from '../components/LoadingSpinner';
import { pageStyle } from './pageStyles';
import { Events } from '../../api/events/Events';
import EventCard from '../components/EventCard';
import { Profiles } from '../../api/profiles/Profiles';
/* Renders the Profile Collection as a set of Cards. */
const EventsPage = () => {

  const { ready } = useTracker(() => {
    const sub = Meteor.subscribe(Events.userPublicationName);
    const sub2 = Meteor.subscribe(Profiles.userPublicationName);
    return {
      ready: sub.ready() && sub2.ready(),
    };
  }, []);
  const events = Events.collection.find({}).fetch();
  const profiles = events.map(event => Profiles.collection.findOne({ email: event.owner }));
  return ready ? (
    <Container style={pageStyle}>
      <Row xs={1} md={2} lg={4} className="g-2">
        {events.map((event, index) => (<EventCard key={events._id} event={event} profile={profiles[index]} />))}
      </Row>
    </Container>
  ) : <LoadingSpinner />;
};

export default EventsPage;
