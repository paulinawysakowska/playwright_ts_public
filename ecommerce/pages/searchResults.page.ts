import { Page, Locator, expect } from '@playwright/test';
import { verifyUrlContains } from '../utils/verifyUrlContains';
import { verifyTextVisibleOrRetry } from '../utils/verifyTextVisibleOrRetry';
import { filterHeader, outletFilterTxt } from '../dicts/searchResults-dict';
import { clickElementAtIndex } from '../utils/clickElementAtIndex';
import { getElementTextAtIndex } from '../utils/getElementTextAtIndex';
import { getRandomIndex } from '../utils/getRandomIndex';

export class SearchResultsPage {
    readonly page: Page;
    readonly searchPageUrl: string = '/category';
    readonly outletFilter: Locator;
    readonly outletLinks: Locator;
    readonly productPrices: Locator;

    constructor(page: Page) {
        this.page = page;
        this.outletFilter = page.locator('label[for="6335"]');
        this.outletLinks = page.locator(`a:has-text("${outletFilterTxt}")`);
        this.productPrices = page.locator(
            'div.flex-col.mt-2.inline-flex.flex-wrap > div.text-3xl.font-bold.leading-8'
        );
    }

    async verifySearchPageUrl(timeout?: number) {
        await verifyUrlContains(this.page, this.searchPageUrl, timeout);
    }

    async verifyFilterHeader(maxRetries?: number) {
        await verifyTextVisibleOrRetry(this.page, filterHeader, maxRetries);
    }

    async clickOutletFilter() {
        await this.outletFilter.click();
    }

    async checkAllResultsContainOutlet(): Promise<number> {
        const count = await this.outletLinks.count();
        if (count === 0) {
            throw new Error('No search results found');
        }
        for (let i = 0; i < count; i++) {
            const resultText = await this.outletLinks.nth(i).textContent();
            expect(resultText).toContain(outletFilterTxt);
        }
        return count;
    }

    async getRandomOutletIndex() {
        return getRandomIndex(this.outletLinks);
    }

    async clickOutletLinkAtIndex(index: number) {
        await clickElementAtIndex(this.outletLinks, index);
    }

    async getProductTitleAtIndex(index: number) {
        return getElementTextAtIndex(this.outletLinks, index);
    }

    async getProductPriceAtIndex(index: number) {
        return getElementTextAtIndex(this.productPrices, index);
    }
}
