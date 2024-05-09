import { Meteor } from 'meteor/meteor';
import { Profiles } from '../../api/profiles/Profiles';
import { ProfilesInterests } from '../../api/profiles/ProfilesInterests';
import { ProfilesTags } from '../../api/profiles/ProfilesTags';
import { Events } from '../../api/events/Events';
import { Schedules } from '../../api/schedule/Schedules';
import { ProfilesSchedules } from '../../api/profiles/ProfilesSchedules';
import { ProfilesEvents } from '../../api/profiles/ProfilesEvents';

// User-level publication.

Meteor.publish(Profiles.userPublicationName, () => Profiles.collection.find());

/** Define a publication to publish this collection. */
Meteor.publish(ProfilesInterests.userPublicationName, () => ProfilesInterests.collection.find());

/** Define a publication to publish this collection. */
Meteor.publish(ProfilesTags.userPublicationName, () => ProfilesTags.collection.find());

Meteor.publish(Events.userPublicationName, () => Events.collection.find());

Meteor.publish(Schedules.userPublicationName, () => Schedules.collection.find());

Meteor.publish(ProfilesSchedules.userPublicationName, () => ProfilesSchedules.collection.find());

Meteor.publish(ProfilesEvents.userPublicationName, () => ProfilesEvents.collection.find());
// alanning:roles publication
// Recommended code to publish roles for each user.
Meteor.publish(null, function () {
  if (this.userId) {
    return Meteor.roleAssignment.find({ 'user._id': this.userId });
  }
  return this.ready();
});
