import { test as baseTest } from '@playwright/test';

export const test = baseTest.extend({
  page: async ({ page }, use) => {
    await page.context().clearCookies();
    await page.context().clearPermissions();
    await page.context().storageState();


    await use(page);
  },
});
