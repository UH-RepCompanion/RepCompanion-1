import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Row } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { _ } from 'meteor/underscore';
import LoadingSpinner from '../components/LoadingSpinner';
import { pageStyle } from './pageStyles';
import { PageIDs } from '../utilities/ids';
import { Events } from '../../api/events/Events';
import { Profiles } from '../../api/profiles/Profiles';
import EventCard from '../components/EventCard';
// eslint-disable-next-line import/named

/* Returns the Profile and associated Projects and Interests associated with the passed user email. */
function getEventData(event) {
  const data = Events.collection.findOne({ email });
  // console.log(_.extend({ }, data, { interests, projects: projectPictures }));
  return _.extend({}, data);
}

/* Renders the Profile Collection as a set of Cards. */
const EventsPage = () => {

  const { ready } = useTracker(() => {
    // Ensure that minimongo is populated with all collections prior to running render().
    const sub1 = Meteor.subscribe(Events.userPublicationName);
    const sub2 = Meteor.subscribe(Profiles.userPublicationName);
    return {
      ready: sub1.ready() && sub2.ready(),
    };
  }, []);
  const events = _.pluck(Events.collection.find().fetch(), 'owner');
  // There is a potential race condition. We might not be ready at this point.
  // Need to ensure that getProfileData doesn't throw an error on line 18.
  const profileData = events.map(email => getEventData(email));
  return ready ? (
    <Container id={PageIDs.EventPage} style={pageStyle}>
      <Row xs={1} md={2} lg={4} className="g-2">
        {profileData.map((event, index) => <EventCard key={index} event={event} />)}
      </Row>
    </Container>
  ) : <LoadingSpinner />;
};

export default EventsPage;
