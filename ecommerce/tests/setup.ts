import { test as baseTest } from '@playwright/test';
import { MainPage } from '../pages/main.page';
import {
  logInTxt,
  pageTitle,
  searchPlaceholderTxt,
  yourAccountTxt
} from '../dicts/main-dict';

export const test = baseTest.extend({
  page: async ({ page }, use) => {
    await page.context().clearCookies();
    await page.context().clearPermissions();
    await page.context().storageState();

    const mainPage = new MainPage(page);
    await mainPage.goToMainPage();
    await mainPage.closeCookiesPopUp();
    await mainPage.closeNotificationPopUp();
    await mainPage.checkPageTitle(pageTitle);
    await mainPage.checkUserStatus(false, logInTxt, yourAccountTxt);
    await mainPage.checkSearchPlaceholder(searchPlaceholderTxt);

    await use(page);
  }
});
