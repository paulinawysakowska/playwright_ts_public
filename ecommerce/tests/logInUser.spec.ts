import { test } from './setup';
import { MainPage } from '../pages/main.page';
import { LogInPopUpPage } from '../pages/logInPopUp.page';
import { logInTxt, yourAccountTxt } from '../dicts/main-dict';
import { attachScreenshot } from '../utils/attachScreenshot';

const screenshotLabel = 'log-in-test';

test.beforeEach(async ({ page }, testInfo) => {
    const mainPage = new MainPage(page);
    const logInPopUp = new LogInPopUpPage(page);

    await attachScreenshot(testInfo, page, screenshotLabel);

    await mainPage.clickLogInButton();
    await logInPopUp.checkLogInPopup();

    await attachScreenshot(testInfo, page, screenshotLabel);
});

test('check user credentials', async ({ page }, testInfo) => {
    const mainPage = new MainPage(page);
    const logInPopUp = new LogInPopUpPage(page);

    await attachScreenshot(testInfo, page, screenshotLabel);

    await logInPopUp.fillLogInForm();

    await attachScreenshot(testInfo, page, screenshotLabel);

    await logInPopUp.selectLogInButton();
    await page.waitForTimeout(10000);

    await attachScreenshot(testInfo, page, screenshotLabel);

    await mainPage.checkUserStatus(true, logInTxt, yourAccountTxt);

    await attachScreenshot(testInfo, page, screenshotLabel);
});
