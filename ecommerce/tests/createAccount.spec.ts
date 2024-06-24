import { test } from './setup';
import { MainPage } from '../pages/main.page';
import { LogInPopUpPage } from '../pages/logInPopUp.page';
import { RegisterPage } from '../pages/register.page';
import { ConfirmationPopUp } from '../pages/confirmRegistrationPopUp.page';
import { attachScreenshot } from '../utils/attachScreenshot';

const screenshotLabel = 'create-account-test';

test('create new account', async ({ page, testInfo }) => {
    const mainPage = new MainPage(page);
    const logInPopUp = new LogInPopUpPage(page);
    const registerPage = new RegisterPage(page);
    const confirmarionPopUp = new ConfirmationPopUp(page);

    await attachScreenshot(testInfo, page, screenshotLabel);

    await mainPage.clickLogInButton();

    await attachScreenshot(testInfo, page, screenshotLabel);

    await logInPopUp.checkLogInPopup();
    await logInPopUp.selectCreateAccountButton();

    await attachScreenshot(testInfo, page, screenshotLabel);

    await registerPage.verifyRegisterPageUrl();
    await registerPage.checkRegisterPage();
    await registerPage.fillRegistrationForm();

    await attachScreenshot(testInfo, page, screenshotLabel);

    await registerPage.selectAgreementCheckbox();

    await attachScreenshot(testInfo, page, screenshotLabel);

    await registerPage.simulateCaptcha();
    // await page.waitForTimeout(10000);

    await attachScreenshot(testInfo, page, screenshotLabel);

    await registerPage.clickRegisterButton();

    await attachScreenshot(testInfo, page, screenshotLabel);

    await confirmarionPopUp.checkConfirmRegistrationPopUp();

    await attachScreenshot(testInfo, page, screenshotLabel);

    await confirmarionPopUp.clickUnderstoodButton();

    await attachScreenshot(testInfo, page, screenshotLabel);
});
