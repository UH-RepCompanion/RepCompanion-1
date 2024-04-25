import { Meteor } from 'meteor/meteor';
import { Profiles } from '../../api/profiles/Profiles';
import { ProfilesInterests } from '../../api/profiles/ProfilesInterests';
import { ProfilesTags } from '../../api/profiles/ProfilesTags';
import { Events } from '../../api/events/Events';

/**
 * In Bowfolios, insecure mode is enabled, so it is possible to update the server's Mongo database by making
 * changes to the client MiniMongo DB.
 *
 * However, updating the database via client-side calls can be inconvenient for two reasons:
 *   1. If we want to update multiple collections, we need to use nested callbacks in order to trap errors, leading to
 *      the dreaded "callback hell".
 *   2. For update and removal, we can only provide a docID as the selector on the client-side, making bulk deletes
 *      hard to do via nested callbacks.
 *
 * A simple solution to this is to use Meteor Methods (https://guide.meteor.com/methods.html). By defining and
 * calling a Meteor Method, we can specify code to be run on the server-side but invoked by clients. We don't need
 * to use callbacks, because any errors are thrown and sent back to the client. Also, the restrictions on the selectors
 * are removed for server-side code.
 *
 * Meteor Methods are commonly introduced as the necessary approach to updating the DB once the insecure package is
 * removed, and that is definitely true, but Bowfolios illustrates that they can simplify your code significantly
 * even when prototyping. It turns out that we can remove insecure mode if we want, as we use Meteor methods to update
 * the database.
 *
 * Note that it would be even better if each method was wrapped in a transaction so that the database would be rolled
 * back if any of the intermediate updates failed. Left as an exercise to the reader.
 */

const updateProfileMethod = 'Profiles.update';

/**
 * The server-side Profiles.update Meteor Method is called by the client-side EditProfile page after pushing the update button.
 * Its purpose is to update the Profiles, ProfilesInterests, and ProfilesProjects collections to reflect the
 * updated situation specified by the user.
 */
Meteor.methods({
  'Profiles.update'({ email, firstName, lastName, bio, major, picture, interests, tag }) {
    Profiles.collection.update({ email }, { $set: { email, firstName, lastName, bio, major, picture, tag, interests } }, { upsert: true });
    ProfilesInterests.collection.remove({ profile: email });
    ProfilesTags.collection.remove({ profile: email });
    interests.map((interest) => ProfilesInterests.collection.insert({ profile: email, interest }));
    ProfilesTags.collection.insert({ profile: email, tag });
  },
});

const updateEventMethod = 'Events.update';

Meteor.methods({
  'Events.update'({ owner, eventId, date, workouts, description }) {
    Events.collection.update({ owner }, { $set: { owner, eventId, date, workouts, description } }, { upsert: true });
  },
});
const createEventMethod = 'Events.create';
Meteor.methods({
  'Events.create'({ owner, eventId, date, workouts, description }) {
    Events.collection.remove({ owner });
    Events.collection.insert({ owner, eventId, date, workouts, description });
  },
});
const removeEventMethod = 'Events.remove';
Meteor.methods({
  'Events.remove'({ owner }) {
    Events.collection.remove({ owner });
  },
});

export { updateProfileMethod, updateEventMethod, createEventMethod, removeEventMethod };
