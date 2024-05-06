import React, { useState, useEffect } from 'react';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { Container, Card, Row } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { _ } from 'meteor/underscore';
import { AutoForm, SelectField, SubmitField } from 'uniforms-bootstrap5';
import { Profiles } from '../../api/profiles/Profiles';
import { ProfilesInterests } from '../../api/profiles/ProfilesInterests';
import { ProfilesTags } from '../../api/profiles/ProfilesTags';
import { Schedules } from '../../api/schedule/Schedules';
import LoadingSpinner from '../components/LoadingSpinner';
import { useStickyState } from '../utilities/StickyState';
import { pageStyle } from './pageStyles';
import { ComponentIDs } from '../utilities/ids';
import ProfileCard from '../components/ProfileCard';

/* Create a schema to specify the structure of the data to appear in the form. */
const makeSchema = (allInterests, allTags, allDays) => new SimpleSchema({
  interests: { type: Array, label: 'Interests', optional: true },
  'interests.$': { type: String, allowedValues: allInterests },
  tags: { type: Array, label: 'Tags', optional: true },
  'tags.$': { type: String, allowedValues: allTags },
  days: { type: Array, label: 'Days', optional: true },
  'days.$': { type: String, allowedValues: allDays },
});

function getProfileData(email) {
  const data = Profiles.collection.findOne({ email });
  const interests = _.pluck(ProfilesInterests.collection.find({ profile: email }).fetch(), 'interest');
  const tags = _.pluck(ProfilesTags.collection.find({ profile: email }).fetch(), 'tag');
  return _.extend({}, data, { interests, tags });
}

const ProfileFilter = () => {
  const [interests, setInterests] = useStickyState('interests', []);
  const [tags, setTags] = useStickyState('tags', []);
  const [days, setDays] = useStickyState('days', []);
  const [profileData, setProfileData] = useState([]);

  const { ready, profileInterests, allProfiles, profileTags, schedules } = useTracker(() => {
    const sub1 = Meteor.subscribe(Profiles.userPublicationName);
    const sub2 = Meteor.subscribe(ProfilesInterests.userPublicationName);
    const sub3 = Meteor.subscribe(ProfilesTags.userPublicationName);
    const sub4 = Meteor.subscribe(Schedules.userPublicationName);
    return {
      ready: sub1.ready() && sub2.ready() && sub3.ready() && sub4.ready(),
      profileInterests: ProfilesInterests.collection.find().fetch(),
      allProfiles: Profiles.collection.find().fetch(),
      profileTags: ProfilesTags.collection.find().fetch(),
      schedules: Schedules.collection.find().fetch(),
    };
  }, []);

  const submit = (data) => {
    setInterests(data.interests || []);
    setTags(data.tags || []);
    setDays(data.days || []);
    let filteredEmails = allProfiles.map(profile => profile.email);

    if (data.interests?.length > 0) {
      filteredEmails = _.intersection(filteredEmails, _.pluck(profileInterests.filter(pI => data.interests.includes(pI.interest)), 'profile'));
    }

    if (data.tags?.length > 0) {
      filteredEmails = _.intersection(filteredEmails, _.pluck(profileTags.filter(pT => data.tags.includes(pT.tag)), 'profile'));
    }

    // Filter by days
    if (data.days?.length > 0) {
      const emailsOnDays = schedules.filter(schedule => data.days.some(day => schedule[day] && schedule[day].tasks.length > 0)).map(schedule => schedule.owner);
      filteredEmails = _.intersection(filteredEmails, emailsOnDays);
    }

    setProfileData(filteredEmails.map(email => getProfileData(email)));
  };

  useEffect(() => {
    if (ready) {
      setProfileData(allProfiles.map(profile => getProfileData(profile.email)));
    }
  }, [ready, allProfiles]);

  const allInterests = Profiles.allowedInterests;
  const allTags = Profiles.allowedTags;
  const allDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const formSchema = makeSchema(allInterests, allTags, allDays);
  const bridge = new SimpleSchema2Bridge(formSchema);

  return ready ? (
    <Container id="finder-page" style={pageStyle}>
      <h2 className="text-white">Find Profiles:</h2>
      <AutoForm schema={bridge} onSubmit={data => submit(data)} model={{ interests, tags, days }}>
        <Card>
          <Card.Body>
            <SelectField name="interests" multiple placeholder="Interests" checkboxes transform={label => ` ${label}`} />
            <SelectField name="tags" multiple placeholder="Tags" checkboxes transform={label => ` ${label}`} />
            <SelectField name="days" multiple placeholder="Days" checkboxes transform={label => ` ${label}`} />
            <SubmitField id={ComponentIDs.filterFormSubmit} value="Submit" />
          </Card.Body>
        </Card>
      </AutoForm>

      <Row xs={1} md={2} lg={3} className="g-2" style={{ paddingTop: '10px' }}>
        {profileData.map((profile, index) => <ProfileCard key={index} profile={profile} />)}
      </Row>
    </Container>
  ) : <LoadingSpinner />;
};

export default ProfileFilter;
