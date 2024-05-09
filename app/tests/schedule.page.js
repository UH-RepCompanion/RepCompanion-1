import { Selector } from 'testcafe';

class SchedulePage {
  constructor() {
    this.pageId = '#schedule-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Checks that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }
}

export const schedulePage = new SchedulePage();
