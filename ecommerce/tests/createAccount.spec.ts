import { test, expect } from '@playwright/test';
import { MainPage } from '../pages/main.page';
import { pageTitle } from '../dicts/main-dict';
import { LogInPopUpPage } from '../pages/logInPopUp.page';


test.beforeEach(async ({ page }) => {
  const mainPage = new MainPage(page);
  await mainPage.goToMainPage();
  await mainPage.closeCookiesPopUp();
  await mainPage.closeNotificationPopUp();
  await mainPage.checkPageTitle(pageTitle);
});

test('create new account', async ({ page }) => {
  const mainPage = new MainPage(page);
  const logInPopUp = new LogInPopUpPage(page);
  await mainPage.clickLogInButton()
  await logInPopUp.checkLogInPopup()
  await logInPopUp.createAccountButton.click()


});
