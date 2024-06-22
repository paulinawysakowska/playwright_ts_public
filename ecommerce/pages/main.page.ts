import { Page, Locator, expect } from '@playwright/test';
import { cookiePopUpHeaderTxt } from '../dicts/main-dict';
import { checkPlaceholder } from '../utils/checkPlaceholder';

export class MainPage {
    readonly page: Page;
    readonly url: string= 'https://www.komputronik.pl/';
    readonly cookiesApproveButton: Locator;
    readonly userButton: Locator;
    readonly cookiesPopUp: Locator;
    readonly notificationPopUp: Locator;
    readonly noButton: Locator;
    readonly createAccountButton: Locator;
    readonly searchButton: Locator;
    searchInput: Locator;

    constructor(page: Page) {
        this.page = page;
        this.cookiesPopUp = page.getByRole('heading', { name: cookiePopUpHeaderTxt})
        this.cookiesApproveButton = page.locator('#onetrust-accept-btn-handler');
        this.notificationPopUp = page.frameLocator('iframe[title="salesmanago-consent-form-title"]').getByText('Zezwól na otrzymywanie');
        this.noButton = page.frameLocator('iframe[title="salesmanago-consent-form-title"]').getByRole('button', { name: 'NIE' })
        this.userButton = page.locator('.inline-flex').first();
        this.createAccountButton = page.getByRole('button', { name: 'Załóż konto' }),
        this.searchInput = page.locator('#wp-autocomplete').first();
        this.searchButton = page.locator('button.w-11.h-11.rounded-r-md.outline-none.bg-main-gradient.hover\\:to-blue-smalt[aria-label="Wyszukaj"]');

    }

    async goToMainPage() {
        await this.page.goto(this.url);
    }

    async closeCookiesPopUp() {
        if (await this.cookiesPopUp.isVisible()) {
            await this.cookiesApproveButton.click();
            await expect(this.cookiesPopUp).not.toBeVisible();

        }
    }
    async checkPageTitle(expectedTitle: string) {
      const title = await this.page.title();
      expect(title).toBe(expectedTitle);
  }

    async closeNotificationPopUp() {
        if (await this.notificationPopUp.isVisible()) {
            await this.noButton.click();
            await expect(this.notificationPopUp).not.toBeVisible();
        }
     }

    async clickLogInButton() {
        await this.userButton.click();
    }

    async checkUserStatus(loggedIn: boolean, logInTxt: string, yourAccountTxt: string) {
        const userButtonText = await this.userButton.textContent();
        
        if (loggedIn) {
            expect(userButtonText).not.toContain(logInTxt);
            expect(userButtonText).toContain(yourAccountTxt);
        } else {
            expect(userButtonText).toContain(logInTxt);
            expect(userButtonText).not.toContain(yourAccountTxt);
        }
}
async checkSearchPlaceholder(expectedPlaceholder: string) {
    await checkPlaceholder(this.searchInput, expectedPlaceholder);
}

async fillSearch(searchValue: string) {
    await this.searchInput.fill(searchValue);
}

async selectSearchButton() {
    await this.searchButton.click();
}

}