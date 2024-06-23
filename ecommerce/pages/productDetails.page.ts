import { Page, Locator } from '@playwright/test';
import { addToBasketTxt } from '../dicts/productDetails-dict';
import { checkElement } from '../utils/checkElement';
import { verifyUrlContains } from '../utils/verifyUrlContains';
import { waitForElement } from '../utils/waitForElement';

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
      .getByRole('button', { name: 'Dodaj do koszyka' })
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

  // async verifyProductDetailsPage () {
  //     const elements= [
  //         {locator: this.productTitle},
  //         {locator: this.productPrice},
  //         {locator: this.addToBasketButton,text: addToBasketTxt, checkClick: true}
  //     ]

  //     for (const element of elements) {
  //         await checkElement(
  //             element.locator,
  //             element.text ?? null,
  //             element.checkClick ?? false,
  //         );
  //     }

  // }

  async clickAddToBasket() {
    await this.addToBasketButton.click();
  }
}
