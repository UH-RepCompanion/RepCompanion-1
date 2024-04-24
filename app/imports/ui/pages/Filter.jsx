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
import LoadingSpinner from '../components/LoadingSpinner';
import { useStickyState } from '../utilities/StickyState';
import { pageStyle } from './pageStyles';
import { ComponentIDs, PageIDs } from '../utilities/ids';
import { ProfilesTags } from '../../api/profiles/ProfilesTags';
import ProfileCard from '../components/ProfileCard';

/* Create a schema to specify the structure of the data to appear in the form. */
const makeSchema = (allInterests) => new SimpleSchema({
  interests: { type: Array, label: 'Interests', optional: true },
  'interests.$': { type: String, allowedValues: allInterests },
});

function getProfileData(email) {
  const data = Profiles.collection.findOne({ email });
  const interests = _.pluck(ProfilesInterests.collection.find({ profile: email }).fetch(), 'interest');
  const tags = _.pluck(ProfilesTags.collection.find({ profile: email }).fetch(), 'tag');
  return _.extend({}, data, { interests, tags });
}

const Filter = () => {
  const [interests, setInterests] = useStickyState('interests', []);
  const [profileData, setProfileData] = useState([]);

  const { ready, profileInterests, allProfiles } = useTracker(() => {
    const sub1 = Meteor.subscribe(Profiles.userPublicationName);
    const sub2 = Meteor.subscribe(ProfilesInterests.userPublicationName);
    const sub3 = Meteor.subscribe(ProfilesTags.userPublicationName);
    return {
      ready: sub1.ready() && sub2.ready() && sub3.ready(),
      profileInterests: ProfilesInterests.collection.find().fetch(),
      allProfiles: Profiles.collection.find().fetch(),
    };
  }, []);

  const submit = (data) => {
    setInterests(data.interests || []);
    const filteredEmails = data.interests?.length > 0
      ? _.uniq(_.pluck(profileInterests.filter(pI => data.interests.includes(pI.interest)), 'profile'))
      : _.uniq(_.pluck(allProfiles, 'email'));
    setProfileData(filteredEmails.map(email => getProfileData(email)));
  };

  useEffect(() => {
    // Load all profiles initially
    if (ready && interests.length === 0) {
      setProfileData(allProfiles.map(profile => getProfileData(profile.email)));
    }
  }, [ready, allProfiles]);

  const allInterests = Profiles.allowedInterests;
  const formSchema = makeSchema(allInterests);
  const bridge = new SimpleSchema2Bridge(formSchema);

  return ready ? (
    <Container id={PageIDs.filterPage} style={pageStyle}>
      <AutoForm schema={bridge} onSubmit={data => submit(data)} model={{ interests }}>
        <Card>
          <Card.Body id={ComponentIDs.filterFormInterests}>
            <SelectField
              name="interests"
              multiple
              placeholder="Interests"
              checkboxes
              transform={label => ` ${label}`} // Adds a space before the label text
            />
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

export default Filter;
