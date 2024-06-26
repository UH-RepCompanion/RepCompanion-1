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

  async joinEvent(testController) {
    await testController.click('#join-button');
    await testController.click('button.swal-button.swal-button--confirm');
  }
}

export const userEventPage = new UserEventPage();
