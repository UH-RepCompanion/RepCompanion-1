import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

/**
 * The SchedulesCollection. It encapsulates state and variable values for stuff.
 */
class SchedulesCollection {
  constructor() {
    // The name of this collection.
    this.name = 'SchedulesCollection';
    // Define the Mongo collection.
    this.collection = new Mongo.Collection(this.name);
    // Define the structure of each document in the collection.
    this.schema = new SimpleSchema({
      owner: String,
      scheduleId: String,
      scheduleDay: {
        type: String,
        allowedValues: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      },
      scheduleTasks: { type: Array },
      'tasks.$': {
        type: Object,
      },
      'tasks.$.time': {
        type: String, // could use a more structured Time type here
      },
      'tasks.$.description': {
        type: String,
      },
      time: Date,
    });
    // Attach the schema to the collection, so all attempts to insert a document are checked against schema.
    this.collection.attachSchema(this.schema);
    // Define names for publications and subscriptions
    this.userPublicationName = `${this.name}.publication.user`;
    this.adminPublicationName = `${this.name}.publication.admin`;
  }
}

/**
 * The singleton instance of the SchedulesCollection.
 * @type {SchedulesCollection}
 */
export const Schedules = new SchedulesCollection();
