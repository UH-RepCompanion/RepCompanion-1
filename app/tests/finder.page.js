import { Selector } from 'testcafe';

class FinderPage {
  constructor() {
    this.pageId = '#finder-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }
}

export const finderPage = new FinderPage();
