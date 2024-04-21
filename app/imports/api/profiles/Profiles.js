import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

/** Encapsulates state and variable values for this collection. */
class ProfilesCollection {
  constructor() {
    this.allowedInterests =
      ['Strength Training',
        'Power Lifting',
        'Core Training',
        'Cardio',
        'Yoga',
        'Balance Training'];

    this.allowedTags =
      ['Trainer',
        'Advanced',
        'Intermediate',
        'Newbie'];
    // The name of this collection.
    this.name = 'ProfilesCollection';
    // Define the Mongo collection.
    this.collection = new Mongo.Collection(this.name);
    // Define the structure of each document in the collection.
    this.schema = new SimpleSchema({
      email: { type: String, index: true, unique: true },
      firstName: { type: String, optional: true },
      lastName: { type: String, optional: true },
      bio: { type: String, optional: true },
      major: { type: String, optional: true },
      picture: { type: String, optional: true },
      interests: {
        type: Array,
        defaultValue: [],
      },
      'interests.$': {
        type: String,
        allowedValues: this.allowedInterests,
      },
      tag: {
        type: String,
        allowedValues: this.allowedTags,
      },
    });
    // Ensure collection documents obey schema.
    this.collection.attachSchema(this.schema);
    // Define names for publications and subscriptions
    this.userPublicationName = `${this.name}.publication.user`;
    this.adminPublicationName = `${this.name}.publication.admin`;
  }
}

export const Profiles = new ProfilesCollection();
