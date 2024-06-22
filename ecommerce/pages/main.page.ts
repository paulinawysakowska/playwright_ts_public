import { Page, Locator, expect } from '@playwright/test';
import { cookiePopUpHeaderTxt, logInTxt } from '../dicts/main-dict';

export class MainPage {
    readonly page: Page;
    readonly url: string= 'https://www.komputronik.pl/';
    readonly cookiesApproveButton: Locator;
    readonly logInButton: Locator;
    readonly cookiesPopUp: Locator;
  notificationPopUp: Locator;
  noButton: Locator;
  createAccountButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.cookiesPopUp = page.getByRole('heading', { name: cookiePopUpHeaderTxt})
        this.cookiesApproveButton = page.locator('#onetrust-accept-btn-handler');
        this.notificationPopUp = page.frameLocator('iframe[title="salesmanago-consent-form-title"]').getByText('Zezwól na otrzymywanie');
        this.noButton = page.frameLocator('iframe[title="salesmanago-consent-form-title"]').getByRole('button', { name: 'NIE' })
        this.logInButton = page.locator('.inline-flex').first();
        this.createAccountButton = page.getByRole('button', { name: 'Załóż konto' })
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
        await this.logInButton.click();
    }

}
