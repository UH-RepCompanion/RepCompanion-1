import React from 'react';
import { AutoForm, SubmitField, AutoField, ListField, NestField, ErrorsField } from 'uniforms-bootstrap5';
import swal from 'sweetalert';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';
import { useTracker } from 'meteor/react-meteor-data';
import { updateScheduleMethod } from '../../startup/both/Methods';
import LoadingSpinner from '../components/LoadingSpinner';
import { Schedules } from '../../api/schedule/Schedules';

/* Create a schema to specify the structure of the data to appear in the form. */
const WorkoutSchema = () => new SimpleSchema({
  workout: String,
  sets: Number,
  reps: Number,
});
const DaySchema = () => new SimpleSchema({
  dayOfWeek: {
    type: String,
    allowedValues: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  },
  time: String,
  tasks: Array,
  'tasks.$': WorkoutSchema,
});

const makeSchema = () => new SimpleSchema({
  owner: String,
  days: Array,
  'days.$': DaySchema,
});

/* Renders the EditSchedule Page: what appears after the user logs in. */
const EditSchedule = () => {

  /* On submit, insert the data. */
  const submit = (data) => {
    // Created by chatgpt
    const userEmail = Meteor.user()?.username;

    // Append the email to the data object. Ensure userEmail is not undefined.
    if (userEmail) {
      const dataWithEmail = { ...data, email: userEmail };
      Meteor.call(updateScheduleMethod, dataWithEmail, (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Schedule updated successfully', 'success');
        }
      });
    } else {
      // Handle the case where the email is somehow still undefined
      swal('Error', 'Email is undefined.', 'error');
    }
  };
  const { ready, email } = useTracker(() => {
    const sub1 = Meteor.subscribe(Schedules.userPublicationName);
    return {
      ready: sub1.ready(),
      email: Meteor.user()?.username,
    };
  }, []);
  // Create the form schema for uniforms. Need to determine all interests and projects for muliselect list.
  const formSchema = makeSchema();
  const bridge = new SimpleSchema2Bridge(formSchema);
  // Now create the model with all the user information.
  const schedule = Schedules.collection.findOne({ email });
  const model = _.extend({}, schedule);
  return ready ? (
    <AutoForm model={model} schema={bridge} onSubmit={data => submit(data)}>
      <AutoField name="owner" />
      <ListField name="days">
        <NestField>
          <AutoField name="dayOfWeek" />
          <AutoField name="time" />
          <ListField name="tasks">
            <NestField>
              <AutoField name="workout" />
              <AutoField name="sets" />
              <AutoField name="reps" />
            </NestField>
          </ListField>
        </NestField>
      </ListField>
      <ErrorsField />
      <SubmitField value="Submit Schedule" />
    </AutoForm>
  ) : <LoadingSpinner />;
};

export default EditSchedule;
