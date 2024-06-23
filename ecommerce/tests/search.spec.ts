import { test } from './setup';
import { MainPage, searchValues } from '../pages/main.page';
import { SearchResultsPage } from '../pages/searchResults.page';
import { attachScreenshot } from '../utils/attachScreenshot';

const screenshotLabel = 'search-test';

test.describe('Search Test', () => {
  searchValues.forEach((searchValue) => {
    test(`should search successfully for: ${searchValue}`, async ({
      page,
      testInfo
    }) => {
      const mainPage = new MainPage(page);
      const searchResultsPage = new SearchResultsPage(page);

      await attachScreenshot(testInfo, page, screenshotLabel);

      await mainPage.fillSearch(searchValue);
      await page.waitForTimeout(1000);
      await mainPage.selectSearchButton();
      await page.waitForTimeout(1000);

      await attachScreenshot(testInfo, page, screenshotLabel);

      await searchResultsPage.verifySearchPageUrl();
      await searchResultsPage.verifyFilterHeader();
      await searchResultsPage.clickOutletFilter();
      await page.waitForTimeout(3000);

      await attachScreenshot(testInfo, page, screenshotLabel);

      await searchResultsPage.checkAllResultsContainOutlet();

      await attachScreenshot(testInfo, page, screenshotLabel);
    });
  });
});
