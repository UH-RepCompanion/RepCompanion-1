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

  async selectInterests(testController, workout) {
    // This assumes interests is a string or an array. Adjust accordingly if it's an array.
    const interestSelector = Selector('select').withAttribute('name', 'interests'); // Adjust the attribute to correctly target the interests dropdown
    await testController.click(interestSelector);
    // If interests is an array, iterate through interests and click each
    await testController.click(interestSelector.find('option').withText(workout));
  }

  async selectTag(testController, tag) {
    const tagSelector = Selector('select').withAttribute('name', 'tag'); // Adjust the attribute to correctly target the tags dropdown
    await testController.click(tagSelector);
    await testController.click(tagSelector.find('option').withText(tag));
  }

  /** Signs up a new user, then checks to see that they are logged in by checking the navbar. */
  async addEvent(testController, date, description, workout) {
    await testController.typeText('#edit-form-first-name', date);
    await testController.typeText('#edit-form-last-name', description);
    await this.selectInterests(testController, workout);
    await testController.click('#add-button input.btn.btn-primary');
    await testController.click('button.swal-button.swal-button--confirm');
  }
}

export const userEventPage = new UserEventPage();
