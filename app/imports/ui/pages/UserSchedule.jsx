import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Profiles } from '../../api/profiles/Profiles';
import LoadingSpinner from '../components/LoadingSpinner';
import { pageStyle } from './pageStyles';
import UserScheduleCard from '../components/UserScheduleCard';
import { Schedules } from '../../api/schedule/Schedules';
import AddNote from '../components/AddNote';

const UserSchedule = () => {
  const { ready, profile, schedule, email } = useTracker(() => {
    const sub1 = Meteor.subscribe(Profiles.userPublicationName);
    const sub2 = Meteor.subscribe(Schedules.userPublicationName);
    const userProfile = Profiles.collection.findOne({ email: Meteor.user()?.username });
    const userSchedule = Schedules.collection.findOne({ owner: Meteor.user()?.username });
    return {
      ready: sub1.ready() && sub2.ready(),
      email: Meteor.user()?.username,
      profile: userProfile,
      schedule: userSchedule,
    };
  }, []);
  return ready ? (
    <Container id="profile-page" className="d-flex flex-column justify-content-center align-items-center infofooter" style={pageStyle}>
      <Row>
        <Col><UserScheduleCard scheduleData={schedule} profile={profile} /></Col>
        <Col><AddNote owner={email} /></Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />;
};

export default UserSchedule;
