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
import UserScheduleCard from '../components/UserScheduleCard';
import { Schedules } from '../../api/schedule/Schedules';

const UserProfile = () => {
  const { ready, profile, event, schedule } = useTracker(() => {
    const sub = Meteor.subscribe(Profiles.userPublicationName);
    const sub2 = Meteor.subscribe(Events.userPublicationName);
    const sub3 = Meteor.subscribe(Schedules.userPublicationName);
    const userProfile = Profiles.collection.findOne({ email: Meteor.user()?.username });
    const userEvent = Events.collection.findOne({ owner: Meteor.user()?.username });
    const userSchedule = Schedules.collection.findOne({ owner: Meteor.user()?.username });
    return {
      ready: sub.ready() && sub2.ready() && sub3.ready(),
      email: Meteor.user()?.username,
      profile: userProfile,
      event: userEvent,
      schedule: userSchedule,
    };
  }, []);
  return ready ? (
    <Container id="profile-page" className="d-flex flex-column justify-content-center align-items-center infofooter" style={pageStyle}>
      <Row>
        <Col><UserProfileCard profile={profile} /></Col>
        <Col>{event ? <UserEventCard profile={profile} event={event} /> : (
          <Row className="justify-content-center align-items-center">
            <Col>
              <Col className="justify-content-center text-center"><h2 style={{ color: 'white' }}>{profile?.firstName}&apos;s Event</h2></Col>
              <Card style={{ width: '600px', height: '600px', backgroundColor: 'white', border: '1px solid black' }}>
                <Card.Body className="d-flex flex-column justify-content-between" style={{ width: '800', height: 'auto' }}>
                  <h2>No Event</h2>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        )}
        </Col>
      </Row>
      <Row>
        <UserScheduleCard scheduleData={schedule} profile={profile} />
      </Row>
    </Container>
  ) : <LoadingSpinner />;
};

export default UserProfile;
