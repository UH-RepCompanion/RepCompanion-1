import { Card, Col, Container, Row, Table } from 'react-bootstrap';
import PropTypes from 'prop-types';
import React from 'react';
import { X } from 'react-bootstrap-icons';

const UserScheduleCard = ({ scheduleData, profile }) => (
  <Row className="justify-content-center align-items-center">
    <Col>
      <h2 style={{ color: 'white' }}>{profile?.firstName}&apos;s Schedule</h2>
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
                          <div key={index}>
                            <X color="red" /><strong>{task.workout}</strong> - {task.sets} X {task.reps}
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
    </Col>
  </Row>
);

UserScheduleCard.propTypes = {
  scheduleData: PropTypes.shape({
    sunday: PropTypes.string,
    monday: PropTypes.string,
    tuesday: PropTypes.string,
    wednesday: PropTypes.string,
    thursday: PropTypes.string,
    friday: PropTypes.string,
    saturday: PropTypes.string,
    owner: PropTypes.string,
  }).isRequired,
  profile: PropTypes.shape({
    firstName: PropTypes.string,
  }).isRequired,
};
export default UserScheduleCard;
