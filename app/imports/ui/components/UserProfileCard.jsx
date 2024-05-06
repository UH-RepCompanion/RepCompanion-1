import { Card, Col, Image, Button, Row, Container, Table } from 'react-bootstrap';
import PropTypes from 'prop-types';
import React from 'react';
import { Discord, Facebook, Instagram, Linkedin, Snapchat, Twitter } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';
import { pageStyle } from '../pages/pageStyles';
import { Schedules } from '../../api/schedule/Schedules';

const UserProfileCard = ({ profile }) => {
// Function to determine border color based on the profile's tag
  const renderWorkoutIcon = (day) => {
    // Fetch the schedule for the current user
    const userSchedule = Schedules.collection.findOne({ owner: profile.email });

    // Check if the schedule exists for the user and the specified day
    if (userSchedule && userSchedule[day] && userSchedule[day].tasks && userSchedule[day].tasks.length > 0) {
      return (
        <Image src="../images/purple-dumbbell-icon.png" style={{ width: '30px', height: 'auto' }} />
      );
    }
    return null;
  };

  const renderIconForSocialLink = (platform, link) => {
    if (link) {
      let IconComponent;
      let url;

      switch (platform) {
      case 'Instagram':
        IconComponent = Instagram;
        url = `https://instagram.com/${link}`;
        break;
      case 'Discord':
        IconComponent = Discord;
        url = `https://discord.com/${link}`;
        break;
      case 'LinkedIn':
        IconComponent = Linkedin;
        // eslint-disable-next-line no-unused-vars
        url = `https://linkedin.com/in/${link}`;
        break;
      case 'Snapchat':
        IconComponent = Snapchat;
        url = `https://www.snapchat.com/add/${link}`;
        break;
      case 'Facebook':
        IconComponent = Facebook;
        url = `https://www.facebook.com/${link}`;
        break;
      case 'Twitter':
        IconComponent = Twitter;
        // eslint-disable-next-line no-unused-vars
        url = `https://twitter.com/${link}`;
        break;
      default:
        // If the platform is not recognized, return null
        return null;
      }

      // Render the icon with the corresponding link
      return (
        <Col xs="auto" className="text-center" key={platform}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <a href={link} target="_blank" rel="noopener noreferrer">
            <IconComponent className="mt-2 icon" />
          </a>
        </Col>
      );
    }
    return null; // Return null if the link is not present

  };

  // Function to render icon links based on social media platforms
  const renderSocialLinks = () => (
    <Row>
      {profile && (
        <>
          {renderIconForSocialLink('Instagram', profile.socialLink1)}
          {renderIconForSocialLink('Discord', profile.socialLink2)}
          {renderIconForSocialLink('LinkedIn', profile.socialLink3)}
          {renderIconForSocialLink('Snapchat', profile.socialLink4)}
          {renderIconForSocialLink('Facebook', profile.socialLink5)}
          {renderIconForSocialLink('Twitter', profile.socialLink6)}
          {/* Add more social links as needed */}
        </>
      )}
    </Row>
  );
  return (
    <Container id="profile-page" className="d-flex justify-content-center align-items-center infofooter" style={pageStyle}>
      <Row className="justify-content-center align-items-center">
        <Col>
          <Col className="justify-content-center text-center"><h2 style={{ color: 'white' }}>{profile?.firstName}&apos;s Profile</h2></Col>
          <Card style={{ width: '600px', height: '600px', backgroundColor: 'white', border: '1px solid black' }}>
            <Card.Body style={{ width: '800', height: 'auto' }}>
              <Row className="justify-content-center">
                <Col xs={6}>
                  <Image className="rounded-circle" src={profile?.picture} style={{ width: '200px', height: '200px', marginBottom: '10px', borderRadius: '50%', border: '3px solid black' }} />
                  <Card.Title>{profile?.firstName} {profile?.lastName}</Card.Title>
                  {renderSocialLinks()}
                  <Card.Text style={{ marginTop: '40px', marginBottom: '20px' }}><strong>Major:</strong> {profile?.major}</Card.Text>
                </Col>
                <Col xs={6}>
                  <Card.Subtitle className="mb-2 text-muted">{profile?.email}</Card.Subtitle>
                  <Card.Text><strong>About Me: </strong></Card.Text>
                  <Card.Text>{profile?.bio}</Card.Text>
                </Col>
              </Row>
              <Row>
                <Col xs={6}><Card.Text style={{ marginBottom: '0px' }}><strong>Interests:</strong> {profile?.interests.join(', ')}</Card.Text></Col>
                <Col xs={6}><Card.Text style={{ marginBottom: '0px', color: 'black' }}><strong>Tags:</strong> {profile?.tag}</Card.Text></Col>
              </Row>
              <Row>
                <Container className="d-flex justify-content-center align-items-center square-card">
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th style={{ backgroundColor: 'darkcyan', border: '1px solid black' }}>Sun</th>
                        <th style={{ backgroundColor: 'darkcyan', border: '1px solid black' }}>Mon</th>
                        <th style={{ backgroundColor: 'darkcyan', border: '1px solid black' }}>Tues</th>
                        <th style={{ backgroundColor: 'darkcyan', border: '1px solid black' }}>Wed</th>
                        <th style={{ backgroundColor: 'darkcyan', border: '1px solid black' }}>Thurs</th>
                        <th style={{ backgroundColor: 'darkcyan', border: '1px solid black' }}>Fri</th>
                        <th style={{ backgroundColor: 'darkcyan', border: '1px solid black' }}>Sat</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                        <td
                          style={{ backgroundColor: 'lightcyan', border: '1px solid black', cursor: 'pointer', height: '50px' }}
                        >
                          {renderWorkoutIcon('Sunday')}
                        </td>
                        {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                        <td
                          style={{ backgroundColor: 'lightcyan', border: '1px solid black', cursor: 'pointer', height: '50px' }}
                        >
                          {renderWorkoutIcon('Monday')}
                        </td>
                        {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                        <td
                          style={{ backgroundColor: 'lightcyan', border: '1px solid black', cursor: 'pointer', height: '50px' }}
                        >
                          {renderWorkoutIcon('Tuesday')}
                        </td>
                        {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                        <td
                          style={{ backgroundColor: 'lightcyan', border: '1px solid black', cursor: 'pointer', height: '50px' }}
                        >
                          {renderWorkoutIcon('Wednesday')}
                        </td>
                        {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                        <td
                          style={{ backgroundColor: 'lightcyan', border: '1px solid black', cursor: 'pointer', height: '50px' }}
                        >
                          {renderWorkoutIcon('Thursday')}
                        </td>
                        {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                        <td
                          style={{ backgroundColor: 'lightcyan', border: '1px solid black', cursor: 'pointer', height: '50px' }}
                        >
                          {renderWorkoutIcon('Friday')}
                        </td>
                        {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                        <td
                          style={{ backgroundColor: 'lightcyan', border: '1px solid black', cursor: 'pointer', height: '50px' }}
                        >
                          {renderWorkoutIcon('Saturday')}
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </Container>
                <Button className="text-start mt-5" variant="dark" id="edit-profile-button" style={{ position: 'absolute', bottom: '10px', left: '465px', color: 'white', width: '120px' }} as={Link} to="/editprofile">Edit Profile</Button>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

UserProfileCard.propTypes = {
  profile: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    bio: PropTypes.string,
    picture: PropTypes.string,
    major: PropTypes.string,
    socialLink1: PropTypes.string,
    socialLink2: PropTypes.string,
    socialLink3: PropTypes.string,
    socialLink4: PropTypes.string,
    socialLink5: PropTypes.string,
    socialLink6: PropTypes.string,
    interests: PropTypes.arrayOf(PropTypes.string),
    tag: PropTypes.string,
    progress: PropTypes.number,
    email: PropTypes.string,
  }).isRequired,
};

export default UserProfileCard;
