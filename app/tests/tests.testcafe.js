import { landingPage } from './landing.page';
import { signinPage } from './signin.page';
import { signoutPage } from './signout.page';
import { navBar } from './navbar.component';
import { finderPage } from './finder.page';
import { signupPage } from './signup.page';
import { editProfilePage } from './edit.profile.page';
import { profileUserPage } from './profile.page';
import { userEventPage } from './event.page';

/* global fixture:false, test:false */

/** Credentials for one of the sample users defined in settings.development.json. */
const credentialsOne = {
  username: 'johnson@hawaii.edu',
  password: 'foo',
  firstName: 'Test',
  lastName: 'Test',
  bio: 'test test test',
  major: 'Computer Science',
  interests: 'Cardio',
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
  interests: 'Yoga',
  tag: 'Trainer',
  picture: 'https://github.com/philipmjohnson.png',
};

const testDate = new Date(2024, 11, 11);

const credentialsEvent = {
  date: testDate,
  description: 'flat bench, inclined bench, chest flies, triceps',
  workout: 'Barbell',
};

fixture('uh-repcompanion localhost test with default db')
  .page('http://localhost:3000');

test('Test that landing page shows up', async (testController) => {
  await landingPage.isDisplayed(testController);
});
test('Test that a new account can be registered', async (testController) => {
  await navBar.gotoSignUpPage(testController);
  await signupPage.signupUser(testController, credentialsTwo.username, credentialsTwo.password);
  await navBar.isLoggedIn(testController, credentialsTwo.username);
  await editProfilePage.editProfile(testController, credentialsTwo.firstName, credentialsTwo.lastName, credentialsTwo.bio, credentialsTwo.major, credentialsTwo.interests, credentialsTwo.tag, credentialsTwo.picture);
  await navBar.isLoggedIn(testController, credentialsTwo.username);
  await navBar.logout(testController);
  await signoutPage.isDisplayed(testController);
});

test('Test editing an existing profile', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, credentialsOne.username, credentialsOne.password);
  await navBar.gotoProfilePage(testController);
  await profileUserPage.userEditProfile(testController);
  await editProfilePage.editProfile(testController, credentialsOne.firstName, credentialsOne.lastName, credentialsOne.bio, credentialsOne.major, credentialsOne.interests, credentialsOne.tag, credentialsOne.picture);
  await navBar.isLoggedIn(testController, credentialsOne.username);
  await navBar.logout(testController);
  await signoutPage.isDisplayed(testController);
});

test.only('Test that an event can be added', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, credentialsOne.username, credentialsOne.password);
  await navBar.gotoAddEventPage(testController);
  await userEventPage.addEvent(
    testController,
    credentialsEvent.date,
    credentialsEvent.description,
    credentialsEvent.workout,
  );
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
});
