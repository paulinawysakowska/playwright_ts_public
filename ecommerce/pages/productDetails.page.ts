import { Page, Locator } from '@playwright/test';
import { verifyUrlContains } from '../utils/verifyUrlContains';
import { waitForElement } from '../utils/waitForElement';
import { addToBasketTxt } from '../dicts/productDetails-dict';

export class ProductDetailsPage {
  readonly page: Page;
  readonly searchPageUrl: string = '/product';
  readonly productTitle: Locator;
  readonly productPrice: Locator;
  readonly addToBasketButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productTitle = page.locator('h1');
    this.productPrice = page
      .locator(
        'div.inline-flex.items-center.mt-2.flex-wrap > div.font-bold.leading-8.text-3xl'
      )
      .first();
    this.addToBasketButton = page
      .getByRole('button', { name: addToBasketTxt })
      .first();
  }

  async waitForProductTitle(timeout?: number) {
    await waitForElement(this.productTitle, timeout);
  }

  async verifyProductDetailsPageUrl(timeout?: number) {
    await verifyUrlContains(this.page, this.searchPageUrl, timeout);
  }

  async getProductDetails(): Promise<{ title: string; price: string }> {
    const title = (await this.productTitle.textContent())?.trim() || '';
    const price = (await this.productPrice.textContent())?.trim() || '';
    return { title, price };
  }

  async clickAddToBasket() {
    await this.addToBasketButton.click();
  }
}
