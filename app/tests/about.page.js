import { Selector } from 'testcafe';

class UserAboutPage {
  constructor() {
    this.pageId = '#about-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }
}

export const userAboutPage = new UserAboutPage();
