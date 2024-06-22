import { test } from './setup';
import { MainPage } from '../pages/main.page';
import { searchPlaceholderTxt } from '../dicts/main-dict';
import { SearchResultsPage } from '../pages/searchResults.page';

const searchValues = [
  'telefon komórkowy',
  // 'laptop',
];

test.beforeEach(async ({ page }) => {
  const mainPage = new MainPage(page);
  await mainPage.checkSearchPlaceholder(searchPlaceholderTxt);
});

test.describe('Search Test', () => {
  searchValues.forEach((searchValue) => {
    test(`should search successfully for ${searchValue}`, async ({ page }) => {
      const mainPage = new MainPage(page);
      const searchResultsPage = new SearchResultsPage(page);

      await mainPage.fillSearch(searchValue);
      await page.waitForTimeout(1000);
      await mainPage.selectSearchButton();
      await page.waitForTimeout(1000);
      await searchResultsPage.verifySearchPageUrl();
      await searchResultsPage.verifyFilterHeader();
      await searchResultsPage.clickOutletFilter();
      await page.waitForTimeout(3000);
      const resultCount = await searchResultsPage.checkAllResultsContainOutlet();

      console.log(`Number of results containing '[oferta Outlet]': ${resultCount}`);
    });
  });
});
