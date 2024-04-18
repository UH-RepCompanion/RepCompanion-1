import React from 'react';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { Container, Card, Row } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { _ } from 'meteor/underscore';
import { AutoForm, SelectField, SubmitField } from 'uniforms-bootstrap5';
import { Interests } from '../../api/interests/Interests';
import { Profiles } from '../../api/profiles/Profiles';
import { ProfilesInterests } from '../../api/profiles/ProfilesInterests';
import LoadingSpinner from '../components/LoadingSpinner';
import { useStickyState } from '../utilities/StickyState';
import { pageStyle } from './pageStyles';
import { ComponentIDs, PageIDs } from '../utilities/ids';
import { ProfilesTags } from '../../api/profiles/ProfilesTags';
import { Tags } from '../../api/tags/Tags';
import ProfileCard from '../components/ProfileCard';

const makeSchema = (allInterests) => new SimpleSchema({
  interests: { type: Array, label: 'Interests', optional: true },
  'interests.$': { type: String, allowedValues: allInterests },
});

function getProfileData(email) {
  const data = Profiles.collection.findOne({ email });
  const interests = _.pluck(ProfilesInterests.collection.find({ profile: email }).fetch(), 'interest');
  const tags = _.pluck(ProfilesTags.collection.find({ profile: email }).fetch(), 'tag');
  const projectPictures = tags.map(tag => Tags.collection.findOne({ name: tag }).picture);
  return _.extend({}, data, { interests, tags: projectPictures });
}

const Filter = () => {
  const [selectedInterests, setSelectedInterests] = useStickyState('selectedInterests', []);

  const { ready, interestDocs, profileData } = useTracker(() => {
    const sub1 = Meteor.subscribe(Profiles.userPublicationName);
    const sub2 = Meteor.subscribe(ProfilesInterests.userPublicationName);
    const sub3 = Meteor.subscribe(ProfilesTags.userPublicationName);
    const sub4 = Meteor.subscribe(Tags.userPublicationName);
    const sub5 = Meteor.subscribe(Interests.userPublicationName);

    const allProfiles = Profiles.collection.find().fetch().map(profile => getProfileData(profile.email));
    return {
      ready: sub1.ready() && sub2.ready() && sub3.ready() && sub4.ready() && sub5.ready(),
      interestDocs: Interests.collection.find().fetch(),
      profileData: allProfiles,
    };
  }, []);

  const submit = (data) => {
    setSelectedInterests(data.interests || []);
  };

  const filteredProfiles = selectedInterests.length > 0
    ? profileData.filter(profile => profile.interests.some(interest => selectedInterests.includes(interest)))
    : profileData;

  const allInterests = _.pluck(interestDocs, 'name');
  const formSchema = makeSchema(allInterests);
  const bridge = new SimpleSchema2Bridge(formSchema);

  const transformLabel = (label) => ` ${label}`;

  return ready ? (
    <Container id={PageIDs.filterPage} style={pageStyle}>
      <AutoForm schema={bridge} onSubmit={data => submit(data)} model={{ interests: selectedInterests }}>
        <Card>
          <Card.Body id={ComponentIDs.filterFormInterests}>
            <SelectField name="interests" multiple placeholder="Select Interests" checkboxes transform={transformLabel} />
            <SubmitField id={ComponentIDs.filterFormSubmit} value="Submit" />
          </Card.Body>
        </Card>
      </AutoForm>
      <Row xs={1} md={2} lg={4} className="g-4" style={{ paddingTop: '10px' }}>
        {filteredProfiles.map((profile, index) => <ProfileCard key={index} profile={profile} />)}
      </Row>
    </Container>
  ) : <LoadingSpinner />;
};

export default Filter;
