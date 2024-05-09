import React from 'react';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { AutoForm, ErrorsField, HiddenField, SelectField, SubmitField, TextField } from 'uniforms-bootstrap5';
import swal from 'sweetalert';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { updateScheduleMethod } from '../../startup/both/Methods';

const formSchema = new SimpleSchema({
  day: {
    type: String,
    allowedValues: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    label: 'Select a Day',
  },
  owner: String,
  workout: String,
  sets: Number,
  reps: Number,
});

const bridge = new SimpleSchema2Bridge(formSchema);

const AddToSchedule = ({ owner }) => {
  const submit = (data) => {
    const { day, workout, sets, reps } = data;
    const taskData = {
      workout,
      sets,
      reps,
    };
    const updateData = {
      owner,
      day,
      task: taskData };
    Meteor.call(updateScheduleMethod, updateData, (error) => {
      if (error) {
        swal('Error', error.message, 'error');
      } else {
        swal('Success', 'Added to schedule', 'success');
      }
    });
  };
  return (
    <Container id="add-schedule-form" className="py-3">
      <Row className="justify-content-center">
        <Col xs={12} md={10}>
          <Card>
            <Card.Body>
              <h4 className="text-center">Add Workout To Schedule</h4>
              <AutoForm schema={bridge} onSubmit={data => submit(data)}>
                <Row>
                  <Col xs={12} sm={6} md={4}>
                    <SelectField id="day-form" name="day" placeholder="Select Day" showInlineError />
                  </Col>
                  <Col xs={12} sm={6} md={4}>
                    <TextField id="workout-form" name="workout" placeholder="Workout" />
                  </Col>
                  <Col xs={6} sm={3} md={2}>
                    <TextField id="sets-form" name="sets" placeholder="Sets" />
                  </Col>
                  <Col xs={6} sm={3} md={2}>
                    <TextField id="reps-form" name="reps" placeholder="Reps" />
                  </Col>
                </Row>
                <Row>
                  <Col xs={12}>
                    <SubmitField id="submit-button" value="Submit" />
                    <ErrorsField />
                    <HiddenField name="owner" value={owner} />
                  </Col>
                </Row>
              </AutoForm>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

AddToSchedule.propTypes = {
  owner: PropTypes.string.isRequired,
};

export default AddToSchedule;
