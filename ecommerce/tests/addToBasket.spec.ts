import { test } from '../fixtures/searchFixture';

const searchValues = [
  'telefon komórkowy',
  // 'laptop',
];



test.describe('Add thing to the basket', () => {
  test('example additional test', async ({ filteredResultCount }) => {
    // Dodaj dodatkowe testy, które mają korzystać z wyników wyszukiwania i filtrowania
    console.log(`Number of results for additional test: ${filteredResultCount}`);
  });
});
