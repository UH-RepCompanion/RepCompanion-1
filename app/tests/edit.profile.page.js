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
    const interestSelector = Selector('#edit-form-interests'); // Update this selector
    await testController.click(interestSelector.withText(interests));
  }

  async selectTag(testController, tag) {
    const tagSelector = Selector('#edit-form-tags'); // Update this selector
    await testController.click(tagSelector);
    await testController.click(tagSelector.withText(tag));
  }

  /** Signs up a new user, then checks to see that they are logged in by checking the navbar. */
  async editProfile(testController, firstName, lastName, bio, major, interests, tag, picture) {
    await testController.typeText('#edit-form-first-name', firstName);
    await testController.typeText('#edit-form-last-name', lastName);
    await testController.typeText('#edit-form-bio', bio);
    await testController.typeText('#edit-form-major', major);
    await this.selectInterests(testController, interests);
    await this.selectTag(testController, tag);
    await testController.typeText('#edit-form-picture-link', picture);
    await testController.click('#edit-form-update input.btn.btn-primary');
  }
}

export const editProfilePage = new EditProfilePage();