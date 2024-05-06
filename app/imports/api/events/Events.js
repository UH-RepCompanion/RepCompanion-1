import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

/** Encapsulates state and variable values for this collection. */
class EventsCollection {
  constructor() {
    this.allowedWorkouts =
      ['Dumbbells',
        'Barbell',
        'Treadmill',
        'Weight Bench',
        'Leg Press',
        'Smith Machine',
        'Cable Machine'];
    // The name of this collection.
    this.name = 'EventsCollection';
    // Define the Mongo collection.
    this.collection = new Mongo.Collection(this.name);
    // Define the structure of each document in the collection.
    this.schema = new SimpleSchema({
      owner: { type: String, index: true, unique: true },
      date: Date,
      createdAt: {
        type: Date,
        // eslint-disable-next-line consistent-return
        autoValue() {
          if (this.isInsert) {
            return new Date();
          } if (this.isUpsert) {
            return { $setOnInsert: new Date() };
          }
          this.unset();
        },
      },
      workouts: {
        type: Array,
        defaultValue: [],
        optional: true,
      },
      'workouts.$': {
        type: String,
        allowedValues: this.allowedWorkouts,
      },
      description: { type: String, optional: true },
      currentSize: { type: Number, defaultValue: 0 },
      maxSize: { type: Number, optional: false },
    });
    // Ensure collection documents obey schema.
    this.collection.attachSchema(this.schema);
    // Define names for publications and subscriptions
    this.userPublicationName = `${this.name}.publication.user`;
    this.adminPublicationName = `${this.name}.publication.admin`;
  }
}

export const Events = new EventsCollection();
