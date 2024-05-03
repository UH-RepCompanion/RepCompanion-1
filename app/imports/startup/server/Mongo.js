import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Roles } from 'meteor/alanning:roles';
import { Profiles } from '../../api/profiles/Profiles';
import { ProfilesTags } from '../../api/profiles/ProfilesTags';
import { ProfilesInterests } from '../../api/profiles/ProfilesInterests';
import { Events } from '../../api/events/Events';
import { Schedules } from '../../api/schedule/Schedules';
import { ProfilesSchedules } from '../../api/profiles/ProfilesSchedules';
/** Define a user in the Meteor accounts package. This enables login. Username is the email address. */
function createUser(email, role) {
  const userID = Accounts.createUser({ username: email, email, password: 'foo' });
  if (role === 'admin') {
    Roles.createRole(role, { unlessExists: true });
    Roles.addUsersToRoles(userID, 'admin');
  }
}
/** Defines a new user and associated profile. Error if user already exists. */
function addProfile({ firstName, lastName, bio, major, interests, tag, picture, email, role, socialLinks }) {
  console.log(`Defining profile ${email}`);
  // Define the user in the Meteor accounts package.
  createUser(email, role);
  // Create the profile.
  Profiles.collection.insert({ firstName, lastName, bio, major, picture, tag, email, interests, socialLinks });
  // Add interests and projects.
  interests.map(interest => ProfilesInterests.collection.insert({ profile: email, interest }));
  ProfilesTags.collection.insert({ profile: email, tag });
  // Make sure interests are defined in the Interests collection if they weren't already.
}
function addEvent({ owner, description, workouts, date, createdAt }) {
  console.log(`Defining event ${owner}`);
  Events.collection.insert({ owner, description, workouts, date, createdAt });
}
function addSchedule({ owner, days, Sunday, Monday, Tuesday, Wednesday, Thursday, Friday, Saturday }) {
  console.log(`Defining schedule ${owner}`);
  Schedules.collection.insert({ owner, Sunday, Monday, Tuesday, Wednesday, Thursday, Friday, Saturday });
  days.map((day) => ProfilesSchedules.collection.insert({ profile: owner, scheduleDay: day }));
}
/** Initialize DB if it appears to be empty (i.e. no users defined.) */
if (Meteor.users.find().count() === 0) {
  if (Meteor.settings.defaultProfiles) {
    console.log('Creating the default profiles');
    Meteor.settings.defaultProfiles.map(profile => addProfile(profile));
  } else {
    console.log('Cannot initialize the database!  Please invoke meteor with a settings file.');
  }
}
if (Events.collection.find().count() === 0) {
  if (Meteor.settings.defaultEvents) {
    console.log('Creating the default events');
    Meteor.settings.defaultEvents.map(event => addEvent(event));
  } else {
    console.log('Cannot initialize the database!  Please invoke meteor with a settings file.');
  }
}
if (Schedules.collection.find().count() === 0) {
  if (Meteor.settings.defaultSchedules) {
    console.log('Creating the default schedules');
    Meteor.settings.defaultSchedules.map(schedule => addSchedule(schedule));
  } else {
    console.log('Cannot initialize the database!  Please invoke meteor with a settings file.');
  }
}
