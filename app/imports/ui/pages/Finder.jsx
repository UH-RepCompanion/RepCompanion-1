import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Row, Dropdown } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import LoadingSpinner from '../components/LoadingSpinner';
import { Contacts } from '../../api/contact/Contacts';
import { Notes } from '../../api/note/Notes';

const Finder = () => {
  const { ready } = useTracker(() => {
    const subscription = Meteor.subscribe(Contacts.userPublicationName);
    const subscription2 = Meteor.subscribe(Notes.userPublicationName);
    const rdy = subscription.ready() && subscription2.ready();
    const contactItems = Contacts.collection.find({}).fetch();
    const noteItems = Notes.collection.find({}).fetch();
    return {
      contacts: contactItems,
      notes: noteItems,
      ready: rdy,
    };
  }, []);

  // State to keep track of the selected dropdown item
  const [selectedItem, setSelectedItem] = useState('Select an item');

  // Function to handle item selection
  const handleSelect = (eventKey, event) => {
    setSelectedItem(event.target.textContent);
  };

  return (ready ? (
    <Container className="py-3">
      <Row className="justify-content-center">
        <h5>Filter Your Workouts:</h5>
        {/* Dropdown with selection state */}
        <Dropdown onSelect={handleSelect}>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            {selectedItem} {/* Display the selected item text */}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item href="#/action-1">Legs</Dropdown.Item>
            <Dropdown.Item href="#/action-2">Chest</Dropdown.Item>
            <Dropdown.Item href="#/action-3">Shoulder</Dropdown.Item>
            <Dropdown.Item href="#/action-3">Back</Dropdown.Item>
            <Dropdown.Item href="#/action-3">Arms</Dropdown.Item>
            <Dropdown.Item href="#/action-3">Core</Dropdown.Item>
            <Dropdown.Item href="#/action-3">Cardio</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Row>
    </Container>
  ) : <LoadingSpinner />);
};

export default Finder;
