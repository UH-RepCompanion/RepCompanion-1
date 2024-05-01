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
    const WorkoutSchema = new SimpleSchema({
      workout: {
        type: String,
      },
      sets: {
        type: Number,
        min: 1,
      },
      reps: {
        type: Number,
        min: 1,
      },
    });
    const DaySchema = new SimpleSchema({
      time: String,
      tasks: {
        type: Array,
      },
      'tasks.$': WorkoutSchema,
    });

    // Main schema for the ScheduleCollection
    this.schema = new SimpleSchema({
      owner: String,
      Sunday: {
        type: DaySchema,
        optional: true,
      },
      Monday: {
        type: DaySchema,
        optional: true,
      },
      Tuesday: {
        type: DaySchema,
        optional: true,
      },
      Wednesday: {
        type: DaySchema,
        optional: true,
      },
      Thursday: {
        type: DaySchema,
        optional: true,
      },
      Friday: {
        type: DaySchema,
        optional: true,
      },
      Saturday: {
        type: DaySchema,
        optional: true,
      },
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
