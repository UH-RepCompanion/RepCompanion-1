import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Roles } from 'meteor/alanning:roles';
import { Contacts } from '../../api/contact/Contacts';
import { Profiles } from '../../api/profiles/Profiles';
import { ProfilesTags } from '../../api/profiles/ProfilesTags';
import { ProfilesInterests } from '../../api/profiles/ProfilesInterests';
import { Interests } from '../../api/interests/Interests';
import { TagsInterests } from '../../api/tags/TagsInterests';
// eslint-disable-next-line import/named
import { Tags } from '../../api/tags/Tags';

const addContacts = (contact) => {
  console.log(`  Adding: ${contact.lastName} (${contact.owner})`);
  Contacts.collection.insert(contact);
};

// Initialize the ContactsCollection if empty.
if (Contacts.collection.find().count() === 0) {
  if (Meteor.settings.defaultContacts) {
    console.log('Creating default contacts.');
    Meteor.settings.defaultContacts.forEach(contact => addContacts(contact));
  }
}
/** Define a user in the Meteor accounts package. This enables login. Username is the email address. */
function createUser(email, role) {
  const userID = Accounts.createUser({ username: email, email, password: 'foo' });
  if (role === 'admin') {
    Roles.createRole(role, { unlessExists: true });
    Roles.addUsersToRoles(userID, 'admin');
  }
}

/** Define an interest.  Has no effect if interest already exists. */
function addInterest(interest) {
  Interests.collection.update({ name: interest }, { $set: { name: interest } }, { upsert: true });
}

/** Defines a new user and associated profile. Error if user already exists. */
function addProfile({ firstName, lastName, bio, major, interests, tags, picture, email, role }) {
  console.log(`Defining profile ${email}`);
  // Define the user in the Meteor accounts package.
  createUser(email, role);
  // Create the profile.
  Profiles.collection.insert({ firstName, lastName, bio, major, picture, email });
  // Add interests and projects.
  interests.map(interest => ProfilesInterests.collection.insert({ profile: email, interest }));
  tags.map(tag => ProfilesTags.collection.insert({ profile: email, tag }));
  // Make sure interests are defined in the Interests collection if they weren't already.
  interests.map(interest => addInterest(interest));
}

/** Define a new project. Error if project already exists.  */
function addTag({ name, interests, picture }) {
  console.log(`Defining project ${name}`);
  Tags.collection.insert({ name, picture });
  interests.map(interest => TagsInterests.collection.insert({ tag: name, interest }));
  // Make sure interests are defined in the Interests collection if they weren't already.
  interests.map(interest => addInterest(interest));
}

/** Initialize DB if it appears to be empty (i.e. no users defined.) */
if (Meteor.users.find().count() === 0) {
  if (Meteor.settings.defaultTags && Meteor.settings.defaultProfiles) {
    console.log('Creating the default profiles');
    Meteor.settings.defaultProfiles.map(profile => addProfile(profile));
    console.log('Creating the default tags');
    Meteor.settings.defaultTags.map(tag => addTag(tag));
  } else {
    console.log('Cannot initialize the database!  Please invoke meteor with a settings file.');
  }
}
