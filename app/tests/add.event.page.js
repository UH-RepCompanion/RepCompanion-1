import { Selector } from 'testcafe';

class UserAddEventPage {
  constructor() {
    this.pageId = '#add-event-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Checks that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  async selectWorkout(testController, workout) {
    // This assumes interests is a string or an array. Adjust accordingly if it's an array.
    const interestSelector = Selector('select').withAttribute('id', 'event-form-workout'); // Adjust the attribute to correctly target the interests dropdown
    await testController.click(interestSelector);
    // If interests is an array, iterate through interests and click each
    await testController.click(interestSelector.find('option').withText(workout));
  }

  /** Signs up a new user, then checks to see that they are logged in by checking the navbar. */
  async addEvent(testController, description, workout, maxSize) {
    await testController.typeText('#event-form-description', description);
    await this.selectWorkout(testController, workout);
    await testController.typeText('#event-form-size', maxSize);
    await testController.click('#add-button input.btn.btn-primary');
    await testController.click('button.swal-button.swal-button--confirm');
  }
}

export const userAddEventPage = new UserAddEventPage();
