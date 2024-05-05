import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

/** Encapsulates state and variable values for this collection. */
class ProfilesEventsCollection {
  constructor() {
    // The name of this collection.
    this.name = 'ProfilesEventsCollection';
    // Define the Mongo collection.
    this.collection = new Mongo.Collection(this.name);
    // Define the structure of each document in the collection.
    this.schema = new SimpleSchema({
      profile: String,
      eventId: String,
    });
    // Ensure collection documents obey schema.
    this.collection.attachSchema(this.schema);
    // Define names for publications and subscriptions
    this.userPublicationName = `${this.name}.publication.user`;
    this.adminPublicationName = `${this.name}.publication.admin`;
  }
}

export const ProfilesEvents = new ProfilesEventsCollection();
