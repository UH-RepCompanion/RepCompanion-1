import { Selector } from 'testcafe';

class AddScheduleForm {
  constructor() {
    this.pageId = '#add-schedule-form';
    this.pageSelector = Selector(this.pageId);
  }

  /** Checks that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  async selectDay(testController, day) {
    // This assumes interests is a string or an array. Adjust accordingly if it's an array.
    const daySelector = Selector('select').withAttribute('id', 'day-form'); // Adjust the attribute to correctly target the interests dropdown
    await testController.click(daySelector);
    // If interests is an array, iterate through interests and click each
    await testController.click(daySelector.find('option').withText(day));
  }

  /** Signs up a new user, then checks to see that they are logged in by checking the navbar. */
  async addSchedule(testController, day, workout, sets, reps) {
    // await testController.click('#day-form');
    await this.selectDay(testController, day);
    // await this.selectWorkout(testController, workout);
    await testController.typeText('#workout-form', workout);
    await testController.typeText('#sets-form', sets);
    await testController.typeText('#reps-form', reps);
    await testController.click('#submit-button input.btn.btn-primary');
    await testController.click('button.swal-button.swal-button--confirm');
  }
}

export const addScheduleForm = new AddScheduleForm();
