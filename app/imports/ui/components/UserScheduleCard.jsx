import { Card, Col, Container, Row, Table } from 'react-bootstrap';
import PropTypes from 'prop-types';
import React from 'react';

const UserScheduleCard = ({ scheduleData, profile }) => (
  <Row className="justify-content-center align-items-center">
    <Col>
      <Col className="justify-content-center text-center"><h2 style={{ color: 'white' }}>{profile?.firstName}&apos;s Schedule</h2></Col>
      <Card style={{ width: '1200px', height: '600px', backgroundColor: 'white', border: '1px solid black' }}>
        <Card.Body className="d-flex flex-column justify-content-between" style={{ width: '800', height: 'auto' }}>
          <Container>
            <Table striped bordered hover>
              <thead>
                <tr>
                  {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map(day => (
                    <th key={day}>{day}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map(day => (
                    <td key={day} style={{ backgroundColor: 'lightcyan', border: '1px solid black', cursor: 'pointer', height: '50px' }}>
                      {scheduleData && scheduleData[day] && scheduleData[day].tasks.map((task, index) => (
                        <div key={index}>
                          <strong>{task.workout}</strong> - {task.reps} reps
                        </div>
                      ))}
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
  }).isRequired,
  profile: PropTypes.shape({
    firstName: PropTypes.string,
  }).isRequired,
};
export default UserScheduleCard;
