import { Selector } from 'testcafe';

class EditProfilePage {
  constructor() {
    this.pageId = '#edit-profile-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Checks that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  async selectInterests(testController, interests) {
    // This assumes interests is a string or an array. Adjust accordingly if it's an array.
    const interestSelector = Selector('select').withAttribute('name', 'interests'); // Adjust the attribute to correctly target the interests dropdown
    await testController.click(interestSelector);
    // If interests is an array, iterate through interests and click each
    await testController.click(interestSelector.find('option').withText(interests));
  }

  async selectTag(testController, tag) {
    const tagSelector = Selector('select').withAttribute('name', 'tag'); // Adjust the attribute to correctly target the tags dropdown
    await testController.click(tagSelector);
    await testController.click(tagSelector.find('option').withText(tag));
  }

  /** Signs up a new user, then checks to see that they are logged in by checking the navbar. */
  async editProfile(testController, firstName, lastName, bio, major, interests, tag, picture) {
    await testController.typeText('#edit-form-first-name', firstName);
    await testController.typeText('#edit-form-last-name', lastName);
    await testController.typeText('#edit-form-bio', bio);
    await testController.typeText('#edit-form-major', major);
    await this.selectInterests(testController, interests);
    await testController.typeText('#edit-form-picture-link', picture);
    await testController.click('#edit-form-update input.btn.btn-primary');
    await testController.click('button.swal-button.swal-button--confirm');
  }
}

export const editProfilePage = new EditProfilePage();
