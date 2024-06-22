import { test as baseTest } from '../tests/setup';
import { MainPage } from '../pages/main.page';
import { SearchResultsPage } from '../pages/searchResults.page';
import { searchPlaceholderTxt } from '../dicts/main-dict';

type SearchFixture = {
  searchValue: string;
  filteredResultCount: number;
  mainPage: MainPage;
  searchResultsPage: SearchResultsPage;
};

export const test = baseTest.extend<SearchFixture>({
  searchValue: '',
  mainPage: async ({ page }, use) => {
    const mainPage = new MainPage(page);
    await page.waitForSelector('#wp-autocomplete'); // Dodano oczekiwanie na element
    await mainPage.checkSearchPlaceholder(searchPlaceholderTxt);
    await use(mainPage);
  },
  searchResultsPage: async ({ page }, use) => {
    const searchResultsPage = new SearchResultsPage(page);
    await use(searchResultsPage);
  },
  filteredResultCount: async ({ page, mainPage, searchResultsPage, searchValue }, use) => {
    await mainPage.fillSearch(searchValue);
    await page.waitForTimeout(1000);
    await mainPage.selectSearchButton();
    await page.waitForTimeout(1000);
    await searchResultsPage.verifySearchPageUrl();
    await searchResultsPage.verifyFilterHeader();
    await searchResultsPage.clickOutletFilter();
    await page.waitForTimeout(3000);
    const resultCount = await searchResultsPage.checkAllResultsContainOutlet();
    await use(resultCount);
  }
});
