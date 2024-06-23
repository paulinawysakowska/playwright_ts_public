import { expect } from '@playwright/test';
import { test } from '../fixtures/searchFixture'; 
import { searchValues } from '../pages/main.page';
import { ProductDetailsPage } from '../pages/productDetails.page';
import { SearchResultsPage } from '../pages/searchResults.page';
import { AddToTheBasketPopUp } from '../pages/addToTheBasketPopUp.page';
import { BasketDetailsPage } from '../pages/basketDetails.page';

let productTitle: string;
let productPrice: string;

test.describe('Add to the basket', () => {
  searchValues.forEach((searchValue) => {
    test(`should add successfully for ${searchValue}`, async ({ page, performSearch }) => {
      const searchResultsPage = new SearchResultsPage(page);
      const productPage = new ProductDetailsPage(page);
      const addToBasketPopUp = new AddToTheBasketPopUp(page);
      const basketPage = new BasketDetailsPage(page);

      await performSearch(searchValue);

      const randomIndex = await searchResultsPage.getRandomOutletIndex();

      productTitle = await searchResultsPage.getProductTitleAtIndex(randomIndex);
      console.log(`Selected product title: ${productTitle}`);

      productPrice = await searchResultsPage.getProductPriceAtIndex(randomIndex);
      console.log(`Selected product price: ${productPrice}`);

      await searchResultsPage.clickOutletLinkAtIndex(randomIndex);

      await productPage.verifyProductDetailsPageUrl();
      await productPage.waitForProductTitle();

      const { title: fetchedTitle, price: fetchedPrice } = await productPage.getProductDetails();
      expect(fetchedTitle).toBe(productTitle);
      expect(fetchedPrice).toBe(productPrice);

      // Kliknij "Dodaj do koszyka"
      await productPage.clickAddToBasket();

      // Weryfikacja wartości w okienku "Dodano do koszyka"
      await addToBasketPopUp.verifyProductDetailsInPopUp(productTitle, productPrice);

      // Kliknij "Przejdź do koszyka"
      await addToBasketPopUp.goToTheBasket();
      console.log("Product added to basket and navigated to basket successfully");

      // Weryfikacja na stronie koszyka
      await basketPage.verifyBasketPageUrl();
      await basketPage.verifyProductDetailsInBasket(productTitle, productPrice);
    });
  });
});
