import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Contacts } from '../../api/contact/Contacts';
import { Notes } from '../../api/note/Notes';
import { Interests } from '../../api/interests/Interests';
import { Profiles } from '../../api/profiles/Profiles';
import { ProfilesInterests } from '../../api/profiles/ProfilesInterests';
// eslint-disable-next-line import/named
import { Tags } from '../../api/tags/Tags';
import { ProjectsInterests } from '../../api/projects/ProjectsInterests';
import { TagsInterests } from '../../api/tags/TagsInterests';
import { ProfilesTags } from '../../api/profiles/ProfilesTags';

// User-level publication.
// If logged in, then publish documents owned by this user. Otherwise, publish nothing.

Meteor.publish(Contacts.userPublicationName, function () {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return Contacts.collection.find({ owner: username });
  }
  return this.ready();
});

Meteor.publish(Notes.userPublicationName, function () {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return Notes.collection.find({ owner: username });
  }
  return this.ready();
});

// Admin-level publication.
// If logged in and with admin role, then publish all documents from all users. Otherwise, publish nothing.
Meteor.publish(Contacts.adminPublicationName, function () {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return Contacts.collection.find();
  }
  return this.ready();
});

Meteor.publish(Notes.adminPublicationName, function () {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return Notes.collection.find();
  }
  return this.ready();
});
/** Define a publication to publish all interests. */
Meteor.publish(Interests.userPublicationName, () => Interests.collection.find());

/** Define a publication to publish all profiles. */
Meteor.publish(Profiles.userPublicationName, () => Profiles.collection.find());

/** Define a publication to publish this collection. */
Meteor.publish(ProfilesInterests.userPublicationName, () => ProfilesInterests.collection.find());

/** Define a publication to publish this collection. */
Meteor.publish(ProfilesTags.userPublicationName, () => ProfilesTags.collection.find());

/** Define a publication to publish all projects. */
Meteor.publish(Tags.userPublicationName, () => Tags.collection.find());

/** Define a publication to publish this collection. */
Meteor.publish(TagsInterests.userPublicationName, () => ProjectsInterests.collection.find());

// alanning:roles publication
// Recommended code to publish roles for each user.
Meteor.publish(null, function () {
  if (this.userId) {
    return Meteor.roleAssignment.find({ 'user._id': this.userId });
  }
  return this.ready();
});
