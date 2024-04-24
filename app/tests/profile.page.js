import { Selector } from 'testcafe';

class ProfileUserPage {
  constructor() {
    this.pageId = '#profile-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Checks that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  /** Fills out and submits the form to signin, then checks to see that login was successful. */
  async userEditProfile(testController) {
    await this.isDisplayed(testController);
    await testController.click('#edit-profile-button');
  }
}

export const profileUserPage = new ProfileUserPage();
