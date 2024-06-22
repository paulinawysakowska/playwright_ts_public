import { test } from './setup';
import { MainPage } from '../pages/main.page';
// import { pageTitle } from '../dicts/main-dict';
import { LogInPopUpPage } from '../pages/logInPopUp.page';
import { logInTxt, yourAccountTxt } from '../dicts/main-dict';

test.beforeEach(async ({ page }) => {
  const mainPage = new MainPage(page);
  const logInPopUp = new LogInPopUpPage(page);

  await mainPage.clickLogInButton();
  await logInPopUp.checkLogInPopup();
});

test('check user credentials', async ({ page }) => {
  const mainPage = new MainPage(page);
  const logInPopUp = new LogInPopUpPage(page);
  
  await logInPopUp.fillLogInForm();
  await logInPopUp.selectLogInButton();
  await page.waitForTimeout(10000); 
  await mainPage.checkUserStatus(true, logInTxt, yourAccountTxt);

  // add cleaning strings
});
