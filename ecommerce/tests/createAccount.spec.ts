import { test } from './setup';
import { MainPage } from '../pages/main.page';
// import { pageTitle } from '../dicts/main-dict';
import { LogInPopUpPage } from '../pages/logInPopUp.page';
import { RegisterPage } from '../pages/register.page';
import { ConfirmationPopUp } from '../pages/confirmRegistrationPopUp.page';

// test.beforeEach(async ({ page }) => {
//   const mainPage = new MainPage(page);
//   await mainPage.goToMainPage();
//   await mainPage.closeCookiesPopUp();
//   await mainPage.closeNotificationPopUp();
//   await mainPage.checkPageTitle(pageTitle);
// });

test('create new account', async ({ page }) => {
  const mainPage = new MainPage(page);
  const logInPopUp = new LogInPopUpPage(page);
  const registerPage = new RegisterPage(page);
  const confirmarionPopUp = new ConfirmationPopUp(page);

  await mainPage.clickLogInButton();
  await logInPopUp.checkLogInPopup();
  await logInPopUp.selectCreateAccountButton();
  await registerPage.checkRegisterPage();
  await registerPage.fillRegistrationForm();
  await registerPage.selectAgreementCheckbox();
  // await registerPage.simulateCaptcha();
  // await page.waitForTimeout(10000); 
  // await registerPage.clickRegisterButton();
  // await confirmarionPopUp.checkConfirmRegistrationPopUp();
  // await confirmarionPopUp.clickUnderstoodButton();
});
