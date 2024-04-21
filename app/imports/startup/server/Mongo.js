import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Roles } from 'meteor/alanning:roles';
import { Profiles } from '../../api/profiles/Profiles';
import { ProfilesTags } from '../../api/profiles/ProfilesTags';
import { ProfilesInterests } from '../../api/profiles/ProfilesInterests';
/** Define a user in the Meteor accounts package. This enables login. Username is the email address. */
function createUser(email, role) {
  const userID = Accounts.createUser({ username: email, email, password: 'foo' });
  if (role === 'admin') {
    Roles.createRole(role, { unlessExists: true });
    Roles.addUsersToRoles(userID, 'admin');
  }
}
/** Defines a new user and associated profile. Error if user already exists. */
function addProfile({ firstName, lastName, bio, major, interests, tag, picture, email, role }) {
  console.log(`Defining profile ${email}`);
  // Define the user in the Meteor accounts package.
  createUser(email, role);
  // Create the profile.
  Profiles.collection.insert({ firstName, lastName, bio, major, picture, tag, email, interests });
  // Add interests and projects.
  interests.map(interest => ProfilesInterests.collection.insert({ profile: email, interest }));
  ProfilesTags.collection.insert({ profile: email, tag });
  // Make sure interests are defined in the Interests collection if they weren't already.
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
