import { Page, Locator, expect } from '@playwright/test';
import { verifyUrlContains } from '../utils/verifyUrlContains';
import { verifyTextVisibleOrRetry } from '../utils/verifyTextVisibleOrRetry';
import { filterHeader } from '../dicts/searchResults-dict';



export class SearchResultsPage {
    readonly page: Page;
    readonly searchPageUrl: string= '/category';
    readonly outletFilter: Locator;
    outletLinks: Locator;


    constructor(page: Page) {
        this.page = page;
        this.outletFilter = page.locator('label[for="6335"]');
        this.outletLinks = page.locator('a:has-text("[oferta Outlet]")');
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
            expect(resultText).toContain('[oferta Outlet]');
        }
        return count;
    }

    async clickRandomOutletLink(): Promise<void> {
        const count = await this.checkAllResultsContainOutlet();
        const randomIndex = Math.floor(Math.random() * count);
        await this.outletLinks.nth(randomIndex).click();
      }
}
