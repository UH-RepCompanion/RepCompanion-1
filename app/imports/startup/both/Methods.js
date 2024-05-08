import { Meteor } from 'meteor/meteor';
import { Profiles } from '../../api/profiles/Profiles';
import { ProfilesInterests } from '../../api/profiles/ProfilesInterests';
import { ProfilesTags } from '../../api/profiles/ProfilesTags';
import { Events } from '../../api/events/Events';
import { Schedules } from '../../api/schedule/Schedules';
import { ProfilesSchedules } from '../../api/profiles/ProfilesSchedules';
import { ProfilesEvents } from '../../api/profiles/ProfilesEvents';

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
  'Profiles.update'({ email, firstName, lastName, bio, major, picture, socialLink1, socialLink2, socialLink3, socialLink4, socialLink5, socialLink6, interests, tag }) {
    Profiles.collection.update({ email }, { $set: { email, firstName, lastName, bio, major, picture, tag, interests, socialLink1, socialLink2, socialLink3, socialLink4, socialLink5, socialLink6 } }, { upsert: true });
    ProfilesInterests.collection.remove({ profile: email });
    ProfilesTags.collection.remove({ profile: email });
    interests.map((interest) => ProfilesInterests.collection.insert({ profile: email, interest }));
    ProfilesTags.collection.insert({ profile: email, tag });
  },
});
const removeUserMethod = 'User.remove';

Meteor.methods({
  'User.remove'({ email }) {
    Profiles.collection.remove({ email: email });
    ProfilesInterests.collection.remove({ profile: email });
    ProfilesTags.collection.remove({ profile: email });
    Events.collections.remove({ owner: email });
    Meteor.user.remove({ username: email });
  },
});

const updateEventMethod = 'Events.update';

Meteor.methods({
  'Events.update'({ owner, date, workouts, description, maxSize }) {
    Events.collection.update({ owner }, { $set: { owner, date, workouts, description, maxSize } }, { upsert: true });
  },
});
const createEventMethod = 'Events.create';

Meteor.methods({
  'Events.create'({ owner, date, workouts, description, maxSize }) {
    Events.collection.remove({ owner });
    Events.collection.insert({ owner, date, workouts, description, maxSize });
  },
});
const removeEventMethod = 'Events.remove';

Meteor.methods({
  'Events.remove'({ owner, eventId }) {
    Events.collection.remove({ owner });
    ProfilesEvents.collection.remove({ eventId: eventId });
  },
});

const joinEventMethod = 'Events.join';

Meteor.methods({
  'Events.join'({ owner, currentSize, profile, eventId }) {
    Events.collection.update({ owner }, { $set: { currentSize: currentSize + 1 } });
    ProfilesEvents.collection.insert({ profile: profile, eventId: eventId });
  },
});

const unjoinEventMethod = 'Events.unjoin';

Meteor.methods({
  'Events.unjoin'({ owner, currentSize, profile, eventId }) {
    Events.collection.update({ owner }, { $set: { currentSize: currentSize - 1 } });
    ProfilesEvents.collection.remove({ profile: profile, eventId: eventId });
  },
});

const updateScheduleMethod = 'Schedules.update';

Meteor.methods({
  'Schedules.update'({ owner, day, task }) {
    const dayField = `${day}.tasks`; // This will create a string like 'Monday.tasks'
    Schedules.collection.update({ owner }, { $push: { [dayField]: task } }, { upsert: true });
    ProfilesSchedules.collection.update({ profile: owner, scheduleDay: day }, { $set: { profile: owner, scheduleDay: day } }, { upsert: true });
  },
});
const removeScheduleMethod = 'Schedules.remove';

Meteor.methods({
  'Schedules.remove'({ owner, day, tasks }) {
    const updateField = {};
    updateField[`${day}.tasks`] = tasks;
    Schedules.collection.update({ owner }, { $set: updateField });
    if (tasks && tasks.length > 0) {
      ProfilesSchedules.collection.update({ profile: owner, scheduleDay: day }, { $set: { profile: owner, scheduleDay: day } }, { upsert: true });
    } else {
      ProfilesSchedules.collection.remove({ profile: owner, scheduleDay: day });
    }
  },
});

export { updateProfileMethod, removeUserMethod, updateEventMethod, createEventMethod, removeEventMethod, updateScheduleMethod, removeScheduleMethod, joinEventMethod, unjoinEventMethod };
