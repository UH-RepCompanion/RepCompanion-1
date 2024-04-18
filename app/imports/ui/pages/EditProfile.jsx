import React from 'react';
import { AutoForm, TextField, LongTextField, SelectField, SubmitField } from 'uniforms-bootstrap5';
import { Container, Col, Card, Row } from 'react-bootstrap';
import swal from 'sweetalert';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';
import { useTracker } from 'meteor/react-meteor-data';
import { Profiles } from '../../api/profiles/Profiles';
import { ProfilesInterests } from '../../api/profiles/ProfilesInterests';
import { updateProfileMethod } from '../../startup/both/Methods';
import LoadingSpinner from '../components/LoadingSpinner';
import { pageStyle } from './pageStyles';
import { ComponentIDs, PageIDs } from '../utilities/ids';
import { ProfilesTags } from '../../api/profiles/ProfilesTags';

/* Create a schema to specify the structure of the data to appear in the form. */
const makeSchema = (allInterests, allTags) => new SimpleSchema({
  email: { type: String, label: 'Email', optional: true },
  firstName: { type: String, label: 'First', optional: true },
  lastName: { type: String, label: 'Last', optional: true },
  bio: { type: String, label: 'Biographical statement', optional: true },
  major: { type: String, label: 'Major', optional: true },
  picture: { type: String, label: 'Picture URL', optional: true },
  interests: { type: Array, label: 'Interests', optional: true },
  'interests.$': { type: String, allowedValues: allInterests },
  tag: { type: String, allowedValues: allTags, label: 'Tags', optional: true },
});

/* Renders the EditProfile Page: what appears after the user logs in. */
const EditProfile = () => {

  /* On submit, insert the data. */
  const submit = (data) => {
    // Created by chatgpt
    // Assume you have email stored in the component's state or fetched from Meteor.user()
    // For simplicity, let's fetch it directly from Meteor.user() if not already available
    // eslint-disable-next-line no-use-before-define
    const userEmail = email || Meteor.user()?.emails[0].address;

    // Append the email to the data object. Ensure userEmail is not undefined.
    if (userEmail) {
      const dataWithEmail = { ...data, email: userEmail };
      Meteor.call(updateProfileMethod, dataWithEmail, (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Profile updated successfully', 'success');
        }
      });
    } else {
      // Handle the case where the email is somehow still undefined
      swal('Error', 'Email is undefined.', 'error');
    }
  };
  const { ready, email } = useTracker(() => {
    // Ensure that minimongo is populated with all collections prior to running render().
    const sub2 = Meteor.subscribe(Profiles.userPublicationName);
    const sub3 = Meteor.subscribe(ProfilesInterests.userPublicationName);
    const sub4 = Meteor.subscribe(ProfilesTags.userPublicationName);
    return {
      ready: sub2.ready() && sub3.ready() && sub4.ready(),
      email: Meteor.user()?.username,
    };
  }, []);
  // Create the form schema for uniforms. Need to determine all interests and projects for muliselect list.
  const allInterests = Profiles.allowedInterests;
  const allTags = Profiles.allowedTags;
  const formSchema = makeSchema(allInterests, allTags);
  const bridge = new SimpleSchema2Bridge(formSchema);
  // Now create the model with all the user information.
  const tags = _.pluck(ProfilesTags.collection.find({ profile: email }).fetch(), 'tag');
  const interests = _.pluck(ProfilesInterests.collection.find({ profile: email }).fetch(), 'interest');
  const profile = Profiles.collection.findOne({ email });
  const model = _.extend({}, profile, { interests, tags });
  return ready ? (
    <Container id={PageIDs.homePage} className="justify-content-center" style={pageStyle}>
      <Col>
        <Col className="justify-content-center text-center"><h2 style={{ color: 'white' }}>Your Profile</h2></Col>
        <AutoForm model={model} schema={bridge} onSubmit={data => submit(data)}>
          <Card>
            <Card.Body>
              <Row>
                <Col xs={4}><TextField id={ComponentIDs.homeFormFirstName} name="firstName" showInlineError placeholder="First Name" /></Col>
                <Col xs={4}><TextField id={ComponentIDs.homeFormLastName} name="lastName" showInlineError placeholder="Last Name" /></Col>
                <Col xs={4}><TextField name="email" showInlineError placeholder="email" disabled /></Col>
              </Row>
              <LongTextField id={ComponentIDs.homeFormBio} name="bio" placeholder="Write a little bit about yourself." />
              <Row>
                <Col xs={6}><TextField name="major" showInlineError placeholder="Major" /></Col>
                <Col xs={6}><TextField name="picture" showInlineError placeholder="URL to picture" /></Col>
              </Row>
              <Row>
                <Col xs={6}><SelectField name="interests" showInlineError multiple /></Col>
                <Col xs={6}><SelectField name="tag" showInlineError /></Col>
              </Row>
              <SubmitField id={ComponentIDs.homeFormSubmit} value="Update" />
            </Card.Body>
          </Card>
        </AutoForm>
      </Col>
    </Container>
  ) : <LoadingSpinner />;
};

export default EditProfile;
