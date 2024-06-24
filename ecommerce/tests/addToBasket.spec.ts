import { expect } from '@playwright/test';
import { test } from '../fixtures/searchFixture';
import { searchValues } from '../pages/main.page';
import { ProductDetailsPage } from '../pages/productDetails.page';
import { SearchResultsPage } from '../pages/searchResults.page';
import { AddToTheBasketPopUp } from '../pages/addToTheBasketPopUp.page';
import { BasketDetailsPage } from '../pages/basketDetails.page';
import { attachScreenshot } from '../utils/attachScreenshot';

let productTitle: string;
let productPrice: string;

const screenshotLabel = 'add-to-basket-test';

test.describe('Add to the basket', () => {
    searchValues.forEach((searchValue) => {
        test(`should add successfully for ${searchValue}`, async ({
            page,
            performSearch,
            testInfo,
        }) => {
            const searchResultsPage = new SearchResultsPage(page);
            const productPage = new ProductDetailsPage(page);
            const addToBasketPopUp = new AddToTheBasketPopUp(page);
            const basketPage = new BasketDetailsPage(page);

            await attachScreenshot(testInfo, page, screenshotLabel);

            await performSearch(searchValue);

            const randomIndex = await searchResultsPage.getRandomOutletIndex();

            productTitle =
                await searchResultsPage.getProductTitleAtIndex(randomIndex);
            console.log(`Selected product title: ${productTitle}`);

            productPrice =
                await searchResultsPage.getProductPriceAtIndex(randomIndex);
            console.log(`Selected product price: ${productPrice}`);

            await searchResultsPage.clickOutletLinkAtIndex(randomIndex);

            await attachScreenshot(testInfo, page, screenshotLabel);

            await productPage.verifyProductDetailsPageUrl();
            await productPage.waitForProductTitle();

            const { title: fetchedTitle, price: fetchedPrice } =
                await productPage.getProductDetails();
            expect(fetchedTitle).toBe(productTitle);
            expect(fetchedPrice).toBe(productPrice);

            await productPage.clickAddToBasket();

            await attachScreenshot(testInfo, page, screenshotLabel);

            await addToBasketPopUp.verifyProductDetailsInPopUp(
                productTitle,
                productPrice
            );

            await addToBasketPopUp.goToTheBasket();

            await attachScreenshot(testInfo, page, screenshotLabel);

            await basketPage.verifyBasketPageUrl();
            await basketPage.verifyProductDetailsInBasket(
                productTitle,
                productPrice
            );
        });
    });
});
