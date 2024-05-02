import { Card, Container, Row, Table } from 'react-bootstrap';
import PropTypes from 'prop-types';
import React from 'react';
import { Meteor } from 'meteor/meteor';
import swal from 'sweetalert';
import { X } from 'react-bootstrap-icons';
import { removeScheduleMethod } from '../../startup/both/Methods';

const UserScheduleCard = ({ scheduleData, profile }) => {
  const handleRemoveTask = (day, taskIndex) => {
    const newTasks = [...scheduleData[day].tasks];
    newTasks.splice(taskIndex, 1);

    Meteor.call(removeScheduleMethod, { owner: profile.email, day, tasks: newTasks }, (error) => {
      if (error) {
        swal('Error', error.message, 'error');
      }
    });
  };
  return (
    <Row className="justify-content-center align-items-center">
      <Row className="text-center">
        <h2 style={{ color: 'white' }}>{profile?.firstName}&apos;s Schedule</h2>
      </Row>
      <Row>
        <Card style={{ width: '1200px', height: 'auto', margin: 'auto', backgroundColor: 'white', border: '1px solid black' }}>
          <Card.Body className="d-flex flex-column justify-content-between" style={{ height: 'auto' }}>
            <Container className="scrollable-table">
              <Table striped bordered hover style={{ width: '100%', margin: 'auto' }}>
                <thead>
                  <tr>
                    {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map(day => (
                      <th key={day} style={{ width: '14.28%' }} className="text-center">{day}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map(day => (
                      <td key={day} style={{ backgroundColor: 'lightcyan', border: '1px solid black', cursor: 'pointer', height: '50px' }}>
                        <div className="scrollable-content">
                          {scheduleData && scheduleData[day] && scheduleData[day].tasks.map((task, index) => (
                            <div key={index} className="task-entry">
                              <div className="task-header">
                                <span className="remove-task-icon">
                                  <X color="red" onClick={() => handleRemoveTask(day, index)} />
                                </span>
                                <strong>{task.workout}</strong>
                              </div>
                              <div className="task-details">- {task.sets} X {task.reps}</div>
                            </div>
                          ))}
                        </div>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </Table>
            </Container>
          </Card.Body>
        </Card>
      </Row>
    </Row>
  );
};

UserScheduleCard.propTypes = {
  scheduleData: PropTypes.shape({
    Sunday: PropTypes.shape({
      tasks: PropTypes.arrayOf(PropTypes.shape({
        workout: PropTypes.string.isRequired,
        sets: PropTypes.number.isRequired,
        reps: PropTypes.number.isRequired,
      })),
    }),
    Monday: PropTypes.shape({
      tasks: PropTypes.arrayOf(PropTypes.shape({
        workout: PropTypes.string.isRequired,
        sets: PropTypes.number.isRequired,
        reps: PropTypes.number.isRequired,
      })),
    }),
    // Repeat the same pattern for the other days
    Tuesday: PropTypes.shape({
      tasks: PropTypes.arrayOf(PropTypes.shape({
        workout: PropTypes.string.isRequired,
        sets: PropTypes.number.isRequired,
        reps: PropTypes.number.isRequired,
      })),
    }),
    Wednesday: PropTypes.shape({
      tasks: PropTypes.arrayOf(PropTypes.shape({
        workout: PropTypes.string.isRequired,
        sets: PropTypes.number.isRequired,
        reps: PropTypes.number.isRequired,
      })),
    }),
    Thursday: PropTypes.shape({
      tasks: PropTypes.arrayOf(PropTypes.shape({
        workout: PropTypes.string.isRequired,
        sets: PropTypes.number.isRequired,
        reps: PropTypes.number.isRequired,
      })),
    }),
    Friday: PropTypes.shape({
      tasks: PropTypes.arrayOf(PropTypes.shape({
        workout: PropTypes.string.isRequired,
        sets: PropTypes.number.isRequired,
        reps: PropTypes.number.isRequired,
      })),
    }),
    Saturday: PropTypes.shape({
      tasks: PropTypes.arrayOf(PropTypes.shape({
        workout: PropTypes.string.isRequired,
        sets: PropTypes.number.isRequired,
        reps: PropTypes.number.isRequired,
      })),
    }),
  }).isRequired,
  profile: PropTypes.shape({
    firstName: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  }).isRequired,
};
export default UserScheduleCard;
