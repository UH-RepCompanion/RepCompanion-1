import React from 'react';
import { AutoForm, TextField, LongTextField, SelectField, SubmitField } from 'uniforms-bootstrap5';
import { Container, Col, Card, Row } from 'react-bootstrap';
import swal from 'sweetalert';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { updateEventMethod } from '../../startup/both/Methods';
import LoadingSpinner from '../components/LoadingSpinner';
import { pageStyle } from './pageStyles';
import { Events } from '../../api/events/Events';

/* Create a schema to specify the structure of the data to appear in the form. */
const makeSchema = (allWorkouts) => new SimpleSchema({
  owner: { type: String, label: 'Owner', optional: true },
  description: { type: String, label: 'Description', optional: true },
  date: { type: Date, label: 'Date' },
  workouts: { type: Array, label: 'Workouts', optional: true },
  'workouts.$': { type: String, allowedValues: allWorkouts },
});

/* Renders the EditEvent Page: what appears after the user logs in. */
const AddEvent = () => {

  /* On submit, insert the data. */
  const submit = (data) => {
    // Created by chatgpt
    const userEmail = Meteor.user()?.username;

    // Append the email to the data object. Ensure userEmail is not undefined.
    if (userEmail) {
      const dataWithEmail = { ...data, owner: userEmail, eventId: Meteor.user()?._id };
      Meteor.call(updateEventMethod, dataWithEmail, (error) => {
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
  const { ready, event } = useTracker(() => {
    // Ensure that minimongo is populated with all collections prior to running render().
    const sub1 = Meteor.subscribe(Events.userPublicationName);
    const userEmail = Meteor.user()?.username;

    // Fetch the event data associated with the user
    let eventData = Events.collection.findOne({ email: userEmail });

    // Set the default date to the current date
    const defaultDate = new Date().toISOString().substring(0, 10);// Convert date to YYYY-MM-DD format

    if (eventData) {
      // If there is event data but no date, set the date to today
      eventData.date = eventData.date || defaultDate;
    } else {
      // If there's no event data, create a new object with the default date and other placeholders
      eventData = {
        date: defaultDate,
        description: '',
        workouts: [],
      };
    }
    return {
      ready: sub1.ready(),
      event: eventData,
    };
  }, []);
  // Create the form schema for uniforms. Need to determine all interests and projects for muliselect list.
  const allWorkouts = Events.allowedWorkouts;
  const formSchema = makeSchema(allWorkouts);
  const bridge = new SimpleSchema2Bridge(formSchema);
  // Now create the model with all the user information.
  return ready ? (
    <Container id="add-event-page" className="justify-content-center" style={pageStyle}>
      <Col>
        <Col className="justify-content-center text-center"><h2 style={{ color: 'white' }}>Your Event</h2></Col>
        <AutoForm model={event} schema={bridge} onSubmit={data => submit(data)}>
          <Card>
            <Card.Body>
              <Row>
                <Col xs={4}><TextField id="date-form-event" name="date" showInlineError placeholder="Event Date" type="date" /></Col>
              </Row>
              <LongTextField id="description-form-event" name="description" placeholder="Describe your workout routine." />
              <Row>
                <Col xs={6}><SelectField id="workout-form-event" name="workouts" showInlineError multiple /></Col>
              </Row>
              <SubmitField id="add-button" value="Add" />
            </Card.Body>
          </Card>
        </AutoForm>
      </Col>
    </Container>
  ) : <LoadingSpinner />;
};

export default AddEvent;
