import { test } from '../fixtures/searchFixture'; 
import { searchValues } from '../pages/main.page';
import { SearchResultsPage } from '../pages/searchResults.page';

test.describe('Add to the basket', () => {
  searchValues.forEach((searchValue) => {
    test(`should add successfully for ${searchValue}`, async ({ page, performSearch }) => {
      const searchResultsPage = new SearchResultsPage(page);

      await performSearch(searchValue);
      await searchResultsPage.clickRandomOutletLink();
    });
  });
});
