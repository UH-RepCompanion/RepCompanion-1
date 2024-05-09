import { landingPage } from './landing.page';
import { signinPage } from './signin.page';
import { signoutPage } from './signout.page';
import { navBar } from './navbar.component';
import { finderPage } from './finder.page';
import { signupPage } from './signup.page';
import { editProfilePage } from './edit.profile.page';
import { profileUserPage } from './profile.page';
import { userAddEventPage } from './add.event.page';
import { userAboutPage } from './about.page';
import { userEventPage } from './event.page';
import { schedulePage } from './schedule.page';
import { addScheduleForm } from './add.schedule.form';

/* global fixture:false, test:false */

/** Credentials for one of the sample users defined in settings.development.json. */
const credentialsOne = {
  username: 'johnson@hawaii.edu',
  password: 'foo',
  firstName: 'Test',
  lastName: 'Test',
  bio: 'test test test',
  major: 'Computer Science',
  interests: 'Yoga',
  tag: 'Newbie',
  picture: 'test',
};

const credentialsTwo = {
  username: 'test@test.com',
  password: 'test',
  firstName: 'John',
  lastName: 'Foo',
  bio: 'I have no interests because Im just a test.',
  major: 'Computer Science',
  interests: 'Cardio',
  tag: 'Trainer',
  picture: 'https://github.com/philipmjohnson.png',
};

const credentialsEvent = {
  description: 'flat bench, inclined bench, chest flies, triceps',
  workout: 'Barbell',
  maxSize: '3',
};

const credentialsSchedule = {
  day: 'Sunday',
  workout: 'flat-bench',
  sets: '5',
  reps: '10',
};

fixture('uh-repcompanion localhost test with default db')
  .page('http://localhost:3000');

test('Test that landing page shows up', async (testController) => {
  await landingPage.isDisplayed(testController);
});
test.skip('Test that a new account can be registered', async (testController) => {
  await navBar.gotoSignUpPage(testController);
  await signupPage.signupUser(testController, credentialsTwo.username, credentialsTwo.password);
  await navBar.isLoggedIn(testController, credentialsTwo.username);
  await editProfilePage.editProfile(testController, credentialsTwo.firstName, credentialsTwo.lastName, credentialsTwo.bio, credentialsTwo.major, credentialsTwo.interests, credentialsTwo.tag, credentialsTwo.picture);
  await navBar.isLoggedIn(testController, credentialsTwo.username);
  await navBar.logout(testController);
  await signoutPage.isDisplayed(testController);
});

test.only('Test editing an existing profile', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, credentialsOne.username, credentialsOne.password);
  await navBar.gotoProfilePage(testController);
  await profileUserPage.userEditProfile(testController);
  await editProfilePage.editProfile(testController, credentialsOne.firstName, credentialsOne.lastName, credentialsOne.bio, credentialsOne.major, credentialsOne.interests, credentialsOne.tag, credentialsOne.picture);
  await navBar.isLoggedIn(testController, credentialsOne.username);
  await navBar.logout(testController);
  await signoutPage.isDisplayed(testController);
});

test('Test that the event list page will show', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, credentialsOne.username, credentialsOne.password);
  await navBar.gotoListEventPage(testController);
  await userEventPage.isDisplayed(testController);
});

test('Test that an event can be added', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, credentialsOne.username, credentialsOne.password);
  await navBar.gotoAddEventPage(testController);
  await userAddEventPage.addEvent(testController, credentialsEvent.description, credentialsEvent.workout, credentialsEvent.maxSize);
  await navBar.isLoggedIn(testController, credentialsOne.username);
  await navBar.logout(testController);
  await signoutPage.isDisplayed(testController);
});

test('Test that signin and signout work', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, credentialsOne.username, credentialsOne.password);
  await navBar.isLoggedIn(testController, credentialsOne.username);
  await navBar.logout(testController);
  await signoutPage.isDisplayed(testController);
});

test('Test that the finder page shows up', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, credentialsOne.username, credentialsOne.password);
  await navBar.gotoFinderPage(testController);
  await finderPage.isDisplayed(testController);
  await navBar.isLoggedIn(testController, credentialsOne.username);
  await navBar.logout(testController);
  await signoutPage.isDisplayed(testController);
});

test('Test that the About page shows up', async (testController) => {
  await navBar.gotoAboutPage(testController);
  await userAboutPage.isDisplayed(testController);
});

test('Test that the schedule page shows up', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, credentialsOne.username, credentialsOne.password);
  await navBar.gotoSchedulePage(testController);
  await schedulePage.isDisplayed(testController);
});

test('Test that you can add an event to the schedule page', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, credentialsOne.username, credentialsOne.password);
  await navBar.gotoSchedulePage(testController);
  await schedulePage.isDisplayed(testController);
  await addScheduleForm.isDisplayed(testController);
  await addScheduleForm.addSchedule(testController, credentialsSchedule.day, credentialsSchedule.workout, credentialsSchedule.sets, credentialsSchedule.reps);
});

test('Test that you can join an existing event', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, credentialsOne.username, credentialsOne.password);
  await navBar.gotoListEventPage(testController);
  await userEventPage.isDisplayed(testController);
  await userEventPage.joinEvent(testController);
});
