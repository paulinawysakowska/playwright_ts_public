import {
    RegisterPage,
    invalidEmails,
    invalidPasswords,
} from '../../pages/register.page';
import { test } from '../setup';
import { attachScreenshot } from '../../utils/attachScreenshot';
import { MainPage } from '../../pages/main.page';
import { LogInPopUpPage } from '../../pages/logInPopUp.page';
import { clickBelowElement } from '../../utils/clickBelowElement';
import { invalidEmailTxt, invalidPasswordTxt } from '../../dicts/register-dict';

const screenshotLabel = 'registration-form-validation-test';

test.beforeEach(async ({ page }, testInfo) => {
    const mainPage = new MainPage(page);
    const logInPopUp = new LogInPopUpPage(page);

    await attachScreenshot(testInfo, page, screenshotLabel);

    await mainPage.clickLogInButton();
    await logInPopUp.checkLogInPopup();
    await logInPopUp.selectCreateAccountButton();

    await attachScreenshot(testInfo, page, screenshotLabel);
});

test.describe('Email Validation', () => {
    invalidEmails.forEach((invalidEmail) => {
        test(`should show validation error for invalid email: "${invalidEmail}"`, async ({
            page,
        }, testInfo) => {
            const registerPage = new RegisterPage(page);
            await registerPage.fillInvalidEmail(invalidEmail);
            await clickBelowElement(page, registerPage.emailField);

            await attachScreenshot(testInfo, page, screenshotLabel);

            await registerPage.checkEmailErrorMessage(invalidEmailTxt);
        });
    });
});

test.describe('Password Validation', () => {
    invalidPasswords.forEach((invalidPassword) => {
        test(`should show validation error for invalid password: "${invalidPassword}"`, async ({
            page,
        }, testInfo) => {
            const registerPage = new RegisterPage(page);
            await registerPage.fillInvalidPassword(invalidPassword);
            await clickBelowElement(page, registerPage.passwordField);

            await attachScreenshot(testInfo, page, screenshotLabel);

            await registerPage.checkPasswordErrorMessage(invalidPasswordTxt);
        });
    });
});
