import React from 'react';
import { AutoForm, TextField, LongTextField, SelectField, SubmitField } from 'uniforms-bootstrap5';
import { Container, Col, Card, Row } from 'react-bootstrap';
import swal from 'sweetalert';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { createEventMethod } from '../../startup/both/Methods';
import LoadingSpinner from '../components/LoadingSpinner';
import { pageStyle } from './pageStyles';
import { Events } from '../../api/events/Events';
import { Profiles } from '../../api/profiles/Profiles';
import UserEvent from './UserEvent';

/* Create a schema to specify the structure of the data to appear in the form. */
const makeSchema = (allWorkouts) => new SimpleSchema({
  owner: { type: String, label: 'Owner', optional: true },
  description: { type: String, label: 'Description', optional: true },
  date: { type: Date, label: 'Date' },
  workouts: { type: Array, label: 'Workouts', optional: true },
  'workouts.$': { type: String, allowedValues: allWorkouts },
  maxSize: { type: Number, label: 'Number of People', optional: false },
});

/* Renders the EditEvent Page: what appears after the user logs in. */
const AddEvent = () => {
  const submit = (data) => {
    // Created by chatgpt
    const userEmail = Meteor.user()?.username;
    if (userEmail) {
      const dataWithEmail = { ...data, owner: userEmail, eventId: Meteor.user()?._id };
      Meteor.call(createEventMethod, dataWithEmail, (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Event created successfully', 'success').then(() => {
          });
        }
      });
    } else {
      swal('Error', 'User is not logged in.', 'error');
    }
  };
  const { ready, event, profile } = useTracker(() => {
    const sub1 = Meteor.subscribe(Events.userPublicationName);
    const sub2 = Meteor.subscribe(Profiles.userPublicationName);
    const userEmail = Meteor.user()?.username;
    // Fetch the event data associated with the user
    const eventData = Events.collection.findOne({ owner: userEmail });
    const profileData = Profiles.collection.findOne({ email: userEmail });
    if (!eventData) {
      return {
        ready: sub1.ready(),
        event: {
          date: new Date().toISOString().substring(0, 10), // Convert date to YYYY-MM-DD format
        },
      };
    }
    eventData.date = new Date(eventData.date).toISOString().substring(0, 10);
    return {
      ready: sub1.ready() && sub2.ready(),
      event: eventData,
      profile: profileData,
    };
  }, []);
  // Create the form schema for uniforms. Need to determine all interests and projects for muliselect list.
  const allWorkouts = Events.allowedWorkouts;
  const formSchema = makeSchema(allWorkouts);
  const bridge = new SimpleSchema2Bridge(formSchema);

  if (ready) {
    return !event._id ? (
      <Container className="d-flex flex-column justify-content-center align-items-center infofooter">
        <Container id="add-event-page" className="justify-content-center" style={pageStyle}>
          <Col>
            <Col className="justify-content-center text-center"><h2 style={{ color: 'white' }}>Your Event</h2></Col>
            <AutoForm model={event} schema={bridge} onSubmit={data => submit(data)}>
              <Card>
                <Card.Body>
                  <Row>
                    <Col xs={4}><TextField id="event-form-date" name="date" showInlineError placeholder="Event Date" type="date" /></Col>
                  </Row>
                  <LongTextField id="event-form-description" name="description" placeholder="Describe your workout routine." />
                  <Row>
                    <Col xs={6}><SelectField id="event-form-workout" name="workouts" showInlineError multiple /></Col>
                    <Col xs={2}><TextField id="event-form-size" name="maxSize" placeholder="Maximum of 4" showInlineError multiple /></Col>
                  </Row>
                  <SubmitField id="add-button" value="Add" />
                </Card.Body>
              </Card>
            </AutoForm>
          </Col>
        </Container>
      </Container>
    ) : (
      <UserEvent profile={profile} event={event} />
    );
  } return <LoadingSpinner />;
};

export default AddEvent;
