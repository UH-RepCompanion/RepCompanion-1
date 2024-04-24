import { Selector } from 'testcafe';

class UserEventPage {
  constructor() {
    this.pageId = '#event-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Checks that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }
}

export const userEventPage = new UserEventPage();
