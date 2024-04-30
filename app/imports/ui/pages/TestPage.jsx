import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
import { useTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Container } from 'react-bootstrap';
import { Events } from '../../api/events/Events';
import { pageStyle } from './pageStyles';
import OtherUserProfile from '../components/OtherUserProfile';
import UserEventCard from '../components/UserEventCard';

const TestPage = () => {
  const location = useLocation();
  const [profile, setProfile] = useState(null);
  useEffect(() => {
    const profileQuery = queryString.parse(location.search);
    const interests = Array.isArray(profileQuery.interests) ? profileQuery.interests : [profileQuery.interests];
    const updatedProfile = { ...profileQuery, interests };
    setProfile(updatedProfile);
  }, [location]);

  if (!profile) {
    return <div>Loading...</div>;
  }
  return (
    <Container id="profile-page" className="d-flex flex-column justify-content-center align-items-center infofooter" style={pageStyle}>
      <OtherUserProfile profile={profile} />
    </Container>
  );
};

export default TestPage;
