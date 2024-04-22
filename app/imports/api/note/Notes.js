import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

/**
 * The NotesCollection. It encapsulates state and variable values for stuff.
 */
class NotesCollection {
  constructor() {
    // The name of this collection.
    this.name = 'NotesCollection';
    // Define the Mongo collection.
    this.collection = new Mongo.Collection(this.name);
    // Define the structure of each document in the collection.
    this.schema = new SimpleSchema({
      note: String,
      owner: String,
      day: String, // Add a field to store the day
      createdAt: Date,
    });
    // Attach the schema to the collection, so all attempts to insert a document are checked against schema.
    this.collection.attachSchema(this.schema);
    // Define names for publications and subscriptions
    this.userPublicationName = `${this.name}.publication.user`;
    this.adminPublicationName = `${this.name}.publication.admin`;
  }

  /**
   * Method to add a workout note for a specific day and owner.
   * @param {string} owner - The owner's ID.
   * @param {string} day - The day for which the workout note is added.
   * @param {string} note - The workout note.
   */
  addWorkout(owner, day, note) {
    this.collection.insert({
      note,
      owner,
      day,
      createdAt: new Date(),
    });
  }

  /**
   * Method to get workout notes for a specific day and owner.
   * @param {string} owner - The owner's ID.
   * @param {string} day - The day for which to retrieve workout notes.
   * @returns {Array} - Array of workout notes for the specified day and owner.
   */
  getWorkoutForDay(owner, day) {
    const workoutNote = this.collection.findOne({ owner, day });
    return workoutNote ? workoutNote.note : '';
  }
}

/**
 * The singleton instance of the NotesCollection.
 * @type {NotesCollection}
 */
export const Notes = new NotesCollection();
