import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Col, Container, Row } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import LoadingSpinner from '../components/LoadingSpinner';
import { Contacts } from '../../api/contact/Contacts';
import ContactAdmin from '../components/ContactAdmin';

/* Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
const ListContactsAdmin = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { ready, contacts } = useTracker(() => {
    // Note that this subscription will get cleaned up
    // when your component is unmounted or deps change.
    // Get access to Stuff documents.
    const subscription = Meteor.subscribe(Contacts.adminPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the Stuff documents
    const contactItems = Contacts.collection.find({}).fetch();
    return {
      contacts: contactItems,
      ready: rdy,
    };
  }, []);
  return (ready ? (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col>
          <Col className="text-center">
            <h2>List Contacts (Admin)</h2>
          </Col>
          <Row xs={1} md={2} lg={3}>
            {contacts.map((contact) => (<Col key={contact._id}><ContactAdmin contact={contact} /></Col>))}
          </Row>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />);
};

export default ListContactsAdmin;
