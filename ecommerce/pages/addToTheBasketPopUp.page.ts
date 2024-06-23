import { Page, Locator, expect } from '@playwright/test';

export class AddToTheBasketPopUp {
  readonly page: Page;
  readonly productTitle: Locator;
  readonly productPrice: Locator;
  readonly goToTheBasketButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productTitle = page.locator('span.text-sm.font-semibold');
    this.productPrice = page.locator('div.text-base.font-bold.lg\\:text-2xl');
    this.goToTheBasketButton = page.locator(
      'button.px-8.h-12.text-sm.font-semibold.tracking-wide.rounded.text-white.bg-main-gradient.hover\\:to-blue-smalt.w-full.px-2.sm\\:w-56.sm\\:justify-self-end'
    );
  }

  async goToTheBasket() {
    await this.goToTheBasketButton.click();
  }

  async verifyProductDetailsInPopUp(
    expectedTitle: string,
    expectedPrice: string
  ) {
    const popUpTitle = await this.productTitle.textContent();
    const popUpPrice = await this.productPrice.textContent();
    expect(popUpTitle?.trim()).toBe(expectedTitle);
    expect(popUpPrice?.trim()).toBe(expectedPrice);
  }
}
