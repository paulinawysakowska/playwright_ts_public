import { test as base } from '../tests/setup';
import { MainPage } from '../pages/main.page';
import { searchPlaceholderTxt } from '../dicts/main-dict';
import { SearchResultsPage } from '../pages/searchResults.page';
import { searchValues } from '../pages/main.page';

type Fixtures = {
  performSearch: (searchValue: string) => Promise<void>;
};

const test = base.extend<Fixtures>({
  performSearch: async ({ page }, use) => {
    await use(async (searchValue: string) => {
      const mainPage = new MainPage(page);
      const searchResultsPage = new SearchResultsPage(page);

      await mainPage.checkSearchPlaceholder(searchPlaceholderTxt);
      await mainPage.fillSearch(searchValue);
      await page.waitForTimeout(1000);
      await mainPage.selectSearchButton();
      await page.waitForTimeout(1000);
      await searchResultsPage.verifySearchPageUrl();
      await searchResultsPage.verifyFilterHeader();
      await searchResultsPage.clickOutletFilter();
      await page.waitForTimeout(3000);
      await searchResultsPage.checkAllResultsContainOutlet();
    });
  }
});

export { test };
