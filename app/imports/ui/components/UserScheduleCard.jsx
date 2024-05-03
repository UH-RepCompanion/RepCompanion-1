import { Card, Container, Row, Table } from 'react-bootstrap';
import PropTypes from 'prop-types';
import React from 'react';
import { Meteor } from 'meteor/meteor';
import swal from 'sweetalert';
import { X } from 'react-bootstrap-icons';
import { removeScheduleMethod } from '../../startup/both/Methods';

const UserScheduleCard = ({ scheduleData, profile }) => {
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  // Calculate the maximum number of tasks in any single day
  const maxTasks = Math.max(7, daysOfWeek.reduce((max, day) => {
    const tasksLength = scheduleData && scheduleData[day] ? scheduleData[day].tasks.length : 0;
    return tasksLength > max ? tasksLength : max;
  }, 0));
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
                  {Array.from({ length: maxTasks }).map((_, rowIndex) => (
                    <tr key={rowIndex}>
                      {daysOfWeek.map(day => (
                        <td key={day} style={{ backgroundColor: 'lightcyan', border: '1px solid black', cursor: 'pointer', height: '51px' }}>
                          <div className="scrollable-content">
                            {scheduleData && scheduleData[day] && scheduleData[day].tasks[rowIndex] ? (
                              <div className="task-entry">
                                <div className="task-header">
                                  <span className="remove-task-icon">
                                    <X color="red" onClick={() => handleRemoveTask(day, rowIndex)} />
                                  </span>
                                  <strong>{scheduleData[day].tasks[rowIndex].workout}</strong>
                                  <div className="task-details">- {scheduleData[day].tasks[rowIndex].sets} X {scheduleData[day].tasks[rowIndex].reps}</div>
                                </div>
                              </div>
                            ) : (
                              <div className="empty-task-entry" /> // Display when there's no task
                            )}
                          </div>
                        </td>
                      ))}
                    </tr>
                  ))}
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
  scheduleData: PropTypes.shape({}).isRequired,
  profile: PropTypes.shape({
    firstName: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  }).isRequired,
};
export default UserScheduleCard;
