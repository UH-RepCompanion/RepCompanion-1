import { Selector } from 'testcafe';

class UserEventPage {
  constructor() {
    this.pageId = '#edit-profile-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Checks that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  async selectWorkout(testController, workout) {
    // This assumes interests is a string or an array. Adjust accordingly if it's an array.
    const workoutSelector = Selector('select').withAttribute('name', 'workouts'); // Adjust the attribute to correctly target the workouts dropdown
    await testController.click(workoutSelector);
    // If interests is an array, iterate through interests and click each
    await testController.click(workoutSelector.find('option').withText(workout));
  }

  /** Signs up a new user, then checks to see that they are logged in by checking the navbar. */
  async addEvent(testController, { date }, description, workout) {
    await testController.typeText('#date-form-event', date.day);
    await testController.typeText('#description-form-event', description);
    await this.selectWorkout(testController, workout);
    await testController.click('#add-button input.btn.btn-primary');
    await testController.click('button.swal-button.swal-button--confirm');
  }
}

export const userEventPage = new UserEventPage();
