import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { Col, Container, Row, Card, Dropdown, Button } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { Funnel } from 'react-bootstrap-icons';
import LoadingSpinner from '../components/LoadingSpinner';
import { Profiles } from '../../api/profiles/Profiles';
import { ProfilesInterests } from '../../api/profiles/ProfilesInterests';
import { ProfilesTags } from '../../api/profiles/ProfilesTags';
import { ProfilesSchedules } from '../../api/profiles/ProfilesSchedules';
import ProfileCard from '../components/ProfileCard';

const BrowseProfiles = () => {

  const [interestFilter, setInterestFilter] = useState('all interests');
  const [tagFilter, setTagFilter] = useState('all tags');
  const [scheduleDayFilter, setScheduleDayFilter] = useState('all days');
  const [displayedProfiles, setDisplayedProfiles] = useState(6);

  const interests = ['all interests'].concat(Profiles.allowedInterests);
  const tags = ['all tags'].concat(Profiles.allowedTags);
  const scheduleDays = ['all days'].concat('Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday');

  const { ready } = useTracker(() => {
    const sub1 = Meteor.subscribe(Profiles.userPublicationName);
    const sub2 = Meteor.subscribe(ProfilesInterests.userPublicationName);
    const sub3 = Meteor.subscribe(ProfilesTags.userPublicationName);
    const sub4 = Meteor.subscribe(ProfilesSchedules.userPublicationName);
    return {
      ready: sub1.ready() && sub2.ready() && sub3.ready() && sub4.ready(),
    };
  }, []);

  const filterProfiles = () => {
    let profilesList = Profiles.collection.find().fetch(); // Start with all profiles.

    // Filter by interests if a specific interest is selected
    if (interestFilter !== 'all interests') {
      const filteredByInterest = ProfilesInterests.collection.find({ interest: interestFilter }).map(doc => doc.profile);
      profilesList = profilesList.filter(profile => filteredByInterest.includes(profile.email));
    }

    // Filter by tags if a specific tag is selected
    if (tagFilter !== 'all tags') {
      const filteredByTag = ProfilesTags.collection.find({ tag: tagFilter }).map(doc => doc.profile);
      profilesList = profilesList.filter(profile => filteredByTag.includes(profile.email));
    }

    // Filter by schedule days if a specific day is selected
    if (scheduleDayFilter !== 'all days') {
      const filteredByDay = ProfilesSchedules.collection.find({ scheduleDay: scheduleDayFilter }).map(doc => doc.profile);
      profilesList = profilesList.filter(profile => filteredByDay.includes(profile.email));
    }

    return profilesList; // Return the list of profiles that match all selected filters.
  };

  const resetFilters = () => {
    setInterestFilter('all interests');
    setTagFilter('all tags');
    setScheduleDayFilter('all days');
    setDisplayedProfiles(6);
  };

  const loadMore = () => {
    setDisplayedProfiles((prevCount) => prevCount + 6);
  };

  const filteredProfiles = filterProfiles();
  const visibleProfiles = filteredProfiles.slice(0, displayedProfiles);

  return ready ? (
    <Container id="browse-profiles-page" className="py-3">
      <h2 className="text-white">Find Profiles:</h2>
      <Row className="justify-content-center">
        <Col>
          <Card className="p-3 mb-3">
            <div className="filter-card">
              <Row>
                <Col className="text-start">
                  <h5>
                    <span style={{ paddingRight: '0.2em' }}>
                      <Funnel/>
                    </span>
                    Sort by:
                  </h5>
                </Col>
                <Col>
                  <Dropdown>
                    <Dropdown.Toggle
                      variant="outline-dark"
                      id="dropdown-location"
                      style={{ border: 'none', fontSize: '1rem', padding: '0.2rem 0.4rem' }}
                    >
                      {interestFilter !== 'all locations' ? interestFilter : 'All Locations'}
                    </Dropdown.Toggle>
                    <Dropdown.Menu style={{ fontSize: '0.8rem' }}>
                      {interests.map((interest, index) => (
                        <Dropdown.Item key={index} onClick={() => setInterestFilter(interest)}>
                          {interest}
                        </Dropdown.Item>
                      ))}
                    </Dropdown.Menu>
                  </Dropdown>
                </Col>
                <Col>
                  <Dropdown>
                    <Dropdown.Toggle
                      variant="outline-dark"
                      id="dropdown-taste"
                      style={{ border: 'none', fontSize: '1rem', padding: '0.2rem 0.4rem' }}
                    >
                      {tagFilter !== 'all tastes' ? tagFilter : 'All Tastes'}
                    </Dropdown.Toggle>
                    <Dropdown.Menu style={{ fontSize: '0.8rem' }}>
                      {tags.map((tag, index) => (
                        <Dropdown.Item key={index} onClick={() => setTagFilter(tag)}>
                          {tag}
                        </Dropdown.Item>
                      ))}
                    </Dropdown.Menu>
                  </Dropdown>
                </Col>
                <Col>
                  <Dropdown>
                    <Dropdown.Toggle
                      variant="outline-dark"
                      id="dropdown-instrument"
                      style={{ border: 'none', fontSize: '1rem', padding: '0.2rem 0.4rem' }}
                    >
                      {scheduleDayFilter !== 'all instruments' ? scheduleDayFilter : 'All Instruments'}
                    </Dropdown.Toggle>
                    <Dropdown.Menu style={{ fontSize: '0.8rem' }}>
                      {scheduleDays.map((scheduleDay, index) => (
                        <Dropdown.Item key={index} onClick={() => setScheduleDayFilter(scheduleDay)}>
                          {scheduleDay}
                        </Dropdown.Item>
                      ))}
                    </Dropdown.Menu>
                  </Dropdown>
                </Col>
                <Col className="mb-1">
                  <Button onClick={resetFilters} variant="outline-secondary" style={{ fontSize: '1rem', padding: '0.2rem 0.4rem' }}>
                    Reset Filters
                  </Button>
                </Col>
              </Row>
            </div>
          </Card>
          <div>{(filteredProfiles.length === 0) ?
            <h2>No profiles match this filtering</h2>
            : (
              <>
                <Row xs={1} md={2} lg={3} className="g-2">
                  {visibleProfiles.map((profile, index) => (
                    <Col key={index}>
                      <ProfileCard profile={profile}/>
                    </Col>
                  ))}
                </Row>
                {displayedProfiles < filteredProfiles.length && (
                  <Row className="justify-content-center mt-4">
                    <Button onClick={loadMore} variant="outline-primary" style={{ width: 'fit-content' }}>
                      Load More
                    </Button>
                  </Row>
                )}
              </>
            )}
          </div>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner/>;
};

export default BrowseProfiles;
