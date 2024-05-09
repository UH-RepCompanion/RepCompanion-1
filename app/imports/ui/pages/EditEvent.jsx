import React from 'react';
import { AutoForm, TextField, LongTextField, SelectField, SubmitField, HiddenField } from 'uniforms-bootstrap5';
import { Container, Col, Card, Row } from 'react-bootstrap';
import swal from 'sweetalert';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';
import { useTracker } from 'meteor/react-meteor-data';
import { updateEventMethod } from '../../startup/both/Methods';
import LoadingSpinner from '../components/LoadingSpinner';
import { pageStyle } from './pageStyles';
import { ComponentIDs, PageIDs } from '../utilities/ids';
import { Events } from '../../api/events/Events';

const makeSchema = (allWorkouts) => new SimpleSchema({
  owner: { type: String, label: 'Owner', optional: true },
  description: { type: String, label: 'Description', optional: false },
  date: { type: Date, label: 'Date', optional: false },
  workouts: { type: Array, label: 'Workouts', optional: false },
  'workouts.$': { type: String, allowedValues: allWorkouts },
  maxSize: { type: Number, label: 'Number of People', optional: false },
});

const EditEvent = () => {

  const submit = (data) => {
    const userEmail = Meteor.user()?.username;

    if (userEmail) {
      const dataWithEmail = { ...data, owner: userEmail };
      Meteor.call(updateEventMethod, dataWithEmail, (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Event updated successfully', 'success');
        }
      });
    } else {
      swal('Error', 'Email is undefined.', 'error');
    }
  };
  const { ready, event } = useTracker(() => {
    const sub1 = Meteor.subscribe(Events.userPublicationName);
    const userEmail = Meteor.user()?.username;

    const eventData = Events.collection.findOne({ owner: userEmail });
    if (!eventData) {
      return {
        ready: sub1.ready(),
        event: {
          date: new Date().toISOString().substring(0, 10),
        },
      };
    }
    eventData.date = new Date(eventData.date).toISOString().substring(0, 10);
    return {
      ready: sub1.ready(),
      event: eventData,
    };

  }, []);
  const allWorkouts = Events.allowedWorkouts;
  const formSchema = makeSchema(allWorkouts);
  const bridge = new SimpleSchema2Bridge(formSchema);
  const model = _.extend({}, event);
  return ready ? (
    <Container id={PageIDs.homePage} className="justify-content-center" style={pageStyle}>
      <Col>
        <Col className="justify-content-center text-center"><h2 style={{ color: 'white' }}>Your Event</h2></Col>
        <AutoForm model={model} schema={bridge} onSubmit={data => submit(data)}>
          <Card>
            <Card.Body>
              <Row>
                <Col xs={4}><TextField id={ComponentIDs.homeFormFirstName} name="date" showInlineError placeholder="Event Date" type="date" /></Col>
              </Row>
              <LongTextField name="description" placeholder="Describe your workout routine." />
              <Row>
                <Col xs={6}><SelectField name="workouts" showInlineError multiple /></Col>
              </Row>
              <HiddenField name="maxSize" showInLineError />
              <SubmitField id={ComponentIDs.homeFormSubmit} value="Update" />
            </Card.Body>
          </Card>
        </AutoForm>
      </Col>
    </Container>
  ) : <LoadingSpinner />;
};

export default EditEvent;
