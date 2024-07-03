import { Page, Locator, expect } from '@playwright/test';
import { verifyUrlContains } from '../utils/verifyUrlContains';

export class BasketDetailsPage {
    readonly page: Page;
    readonly productTitle: Locator;
    readonly productPrice: Locator;
    readonly goToTheBasketButton: Locator;
    readonly basketPageUrl: string = '/cart';

    constructor(page: Page) {
        this.page = page;
        // I know this locator is not the best, but I'm using it not to waist much time
        this.productTitle = page.locator('a.cart-table__elem-name-title');
        this.productPrice = page.locator('strong.at-price-0');
    }

    async goToTheBasket() {
        await this.goToTheBasketButton.click();
    }

    async verifyBasketPageUrl(timeout?: number) {
        await verifyUrlContains(this.page, this.basketPageUrl, timeout);
    }

    async verifyProductDetailsInBasket(
        expectedTitle: string,
        expectedPrice: string
    ) {
        const basketTitle = await this.productTitle.textContent();
        const basketPrice = await this.productPrice.textContent();
        expect(basketTitle?.trim()).toBe(expectedTitle);
        expect(basketPrice?.trim()).toBe(expectedPrice);
    }
}
