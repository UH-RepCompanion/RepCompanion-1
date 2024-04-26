import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Container, Image, Row, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Discord, Instagram, Linkedin, Snapchat, Facebook, Twitter } from 'react-bootstrap-icons';
import { Profiles } from '../../api/profiles/Profiles';
import LoadingSpinner from '../components/LoadingSpinner';
import { pageStyle } from './pageStyles';

const UserProfile = () => {
  const { ready, profile } = useTracker(() => {
    const sub = Meteor.subscribe(Profiles.userPublicationName);
    const userProfile = Profiles.collection.findOne({ email: Meteor.user()?.username });
    return {
      ready: sub.ready(),
      email: Meteor.user()?.username,
      profile: userProfile,
    };
  }, []);

  // Initialize image visibility state from local storage or default to false
  const [imageVisibility, setImageVisibility] = useState(() => ({
    cell1: JSON.parse(localStorage.getItem('cell1Visible')) || false,
    cell2: JSON.parse(localStorage.getItem('cell2Visible')) || false,
    cell3: JSON.parse(localStorage.getItem('cell3Visible')) || false,
    cell4: JSON.parse(localStorage.getItem('cell4Visible')) || false,
    cell5: JSON.parse(localStorage.getItem('cell5Visible')) || false,
    cell6: JSON.parse(localStorage.getItem('cell6Visible')) || false,
    cell7: JSON.parse(localStorage.getItem('cell7Visible')) || false,
  }));

  // Update local storage whenever image visibility state changes
  useEffect(() => {
    localStorage.setItem('cell1Visible', JSON.stringify(imageVisibility.cell1));
    localStorage.setItem('cell2Visible', JSON.stringify(imageVisibility.cell2));
    localStorage.setItem('cell3Visible', JSON.stringify(imageVisibility.cell3));
    localStorage.setItem('cell4Visible', JSON.stringify(imageVisibility.cell4));
    localStorage.setItem('cell5Visible', JSON.stringify(imageVisibility.cell5));
    localStorage.setItem('cell6Visible', JSON.stringify(imageVisibility.cell6));
    localStorage.setItem('cell7Visible', JSON.stringify(imageVisibility.cell7));
  }, [imageVisibility]);

  // Function to toggle the visibility of the image for a specific cell
  const toggleImageVisibility = (cellName) => {
    setImageVisibility((prevState) => ({
      ...prevState,
      [cellName]: !prevState[cellName],
    }));
  };

  // Function to render icon links based on social media platforms
  const renderSocialLinks = () => (
    <Row>
      {profile?.socialLinks.map((link, index) => {
        let IconComponent;
        let url;

        switch (link.platform) {
        case 'Instagram':
          IconComponent = Instagram;
          url = `https://instagram.com/${link.url}`;
          break;
        case 'Discord':
          IconComponent = Discord;
          url = `https://discord.com/${link.url}`;
          break;
        case 'LinkedIn':
          IconComponent = Linkedin;
          url = `https://linkedin.com/in/${link.url}`;
          break;
        case 'Snapchat':
          // Assuming link.url contains the Snapchat username
          IconComponent = Snapchat; // Replace with appropriate icon component for Snapchat
          url = `https://www.snapchat.com/add/${link.url}`;
          break;
        case 'Facebook':
          // Assuming link.url contains the Facebook username or profile ID
          IconComponent = Facebook; // Replace with appropriate icon component for Facebook
          url = `https://www.facebook.com/${link.url}`;
          break;
        case 'Twitter':
          // Assuming link.url contains the Twitter username
          IconComponent = Twitter; // Replace with appropriate icon component for Twitter
          url = `https://twitter.com/${link.url}`;
          break;
        default:
          // If the platform is not recognized, return null
          return null;
        }

        return (
          <Col xs="auto" className="text-center" key={index}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <a href={url} target="_blank" rel="noopener noreferrer">
              <IconComponent className="mt-2 icon" />
            </a>
          </Col>
        );
      })}
    </Row>
  );

  return ready ? (
    <Container id="profile-page" className="d-flex justify-content-center align-items-center infofooter" style={pageStyle}>
      <Row className="justify-content-center align-items-center">
        <Col>
          <Col className="justify-content-center text-center"><h2 style={{ color: 'white' }}>{profile?.firstName}&apos;s Profile</h2></Col>
          <Card style={{ width: '600px', height: '600px', backgroundColor: 'white', border: '1px solid black' }}>
            <Card.Body style={{ width: '800', height: 'auto' }}>
              <Row className="justify-content-center">
                <Col xs={6}>
                  <Image className="rounded-circle" src={profile?.picture} style={{ width: '200px', height: 'auto', marginBottom: '10px', borderRadius: '50%', border: '3px solid black' }} />
                  <Card.Title>{profile?.firstName} {profile?.lastName}</Card.Title>
                  <Row>
                    <Col xs="auto" className="text-center mt-2 icon">{profile?.socialLinks && renderSocialLinks()}</Col>
                  </Row>
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
                          onClick={() => toggleImageVisibility('cell1')} // Add onClick handler
                        >
                          {/* Render image conditionally based on visibility state */}
                          {imageVisibility.cell1 && (
                            <Image src="../images/purple-dumbbell-icon.png" style={{ width: '30px', height: 'auto' }} />
                          )}
                        </td>
                        {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                        <td
                          style={{ backgroundColor: 'lightcyan', border: '1px solid black', cursor: 'pointer' }}
                          onClick={() => toggleImageVisibility('cell2')} // Add onClick handler
                        >
                          {/* Render image conditionally based on visibility state */}
                          {imageVisibility.cell2 && (
                            <Image src="../images/purple-dumbbell-icon.png" style={{ width: '30px', height: 'auto' }} />
                          )}
                        </td>
                        {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                        <td
                          style={{ backgroundColor: 'lightcyan', border: '1px solid black', cursor: 'pointer' }}
                          onClick={() => toggleImageVisibility('cell3')} // Add onClick handler
                        >
                          {/* Render image conditionally based on visibility state */}
                          {imageVisibility.cell3 && (
                            <Image src="../images/purple-dumbbell-icon.png" style={{ width: '30px', height: 'auto' }} />
                          )}
                        </td>
                        {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                        <td
                          style={{ backgroundColor: 'lightcyan', border: '1px solid black', cursor: 'pointer' }}
                          onClick={() => toggleImageVisibility('cell4')} // Add onClick handler
                        >
                          {/* Render image conditionally based on visibility state */}
                          {imageVisibility.cell4 && (
                            <Image src="../images/purple-dumbbell-icon.png" style={{ width: '30px', height: 'auto' }} />
                          )}
                        </td>
                        {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                        <td
                          style={{ backgroundColor: 'lightcyan', border: '1px solid black', cursor: 'pointer' }}
                          onClick={() => toggleImageVisibility('cell5')} // Add onClick handler
                        >
                          {/* Render image conditionally based on visibility state */}
                          {imageVisibility.cell5 && (
                            <Image src="../images/purple-dumbbell-icon.png" style={{ width: '30px', height: 'auto' }} />
                          )}
                        </td>
                        {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                        <td
                          style={{ backgroundColor: 'lightcyan', border: '1px solid black', cursor: 'pointer' }}
                          onClick={() => toggleImageVisibility('cell6')} // Add onClick handler
                        >
                          {/* Render image conditionally based on visibility state */}
                          {imageVisibility.cell6 && (
                            <Image src="../images/purple-dumbbell-icon.png" style={{ width: '30px', height: 'auto' }} />
                          )}
                        </td>
                        {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                        <td
                          style={{ backgroundColor: 'lightcyan', border: '1px solid black', cursor: 'pointer' }}
                          onClick={() => toggleImageVisibility('cell7')} // Add onClick handler
                        >
                          {/* Render image conditionally based on visibility state */}
                          {imageVisibility.cell7 && (
                            <Image src="../images/purple-dumbbell-icon.png" style={{ width: '30px', height: 'auto' }} />
                          )}
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
  ) : <LoadingSpinner />;
};

export default UserProfile;
