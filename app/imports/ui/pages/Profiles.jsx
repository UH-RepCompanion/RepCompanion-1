import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Row } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { Link } from 'react-router-dom';
import { Profiles } from '../../api/profiles/Profiles';
import LoadingSpinner from '../components/LoadingSpinner';
import { pageStyle } from './pageStyles';
import EventCard from '../components/EventCard';
import { Events } from '../../api/events/Events';
import ProfileCard from '../components/ProfileCard';

/* Renders the Profile Collection as a set of Cards. */
const ProfilesPage = () => {

  const { ready } = useTracker(() => {
    // Ensure that minimongo is populated with all collections prior to running render().
    const sub1 = Meteor.subscribe(Profiles.userPublicationName);
    const sub2 = Meteor.subscribe(Events.userPublicationName);
    return {
      ready: sub1.ready() && sub2.ready(),
    };
  }, []);
  const events = Events.collection.find({}).fetch();
  const profiles = events.map(event => Profiles.collection.findOne({ email: event.owner }));
  const profileData = Profiles.collection.find({}).fetch();
  return ready ? (
    <Container>
      <Container id="finder-page" style={pageStyle}>
        <Row xs={1} md={2} lg={3} className="g-2" style={{ paddingTop: '10px' }}>
          {profileData.map((profile, index) => (
            <Link key={index} to={`/${profile.firstName}`}>
              <ProfileCard key={index} profile={profile} />
            </Link>
          ))}
        </Row>
      </Container>
      <Container id="event-page" style={pageStyle}>
        <Row xs={1} md={2} lg={4} className="g-2">
          {events.map((event, index) => (<EventCard key={events._id} event={event} profile={profiles[index]} />))}
        </Row>
      </Container>
    </Container>
  ) : <LoadingSpinner />;
};

export default ProfilesPage;
