import { Page, Locator, expect } from '@playwright/test';
import { cookiePopUpHeaderTxt } from '../dicts/main-dict';
import { checkPlaceholder } from '../utils/checkPlaceholder';

export const searchValues = ['telefon komórkowy', 'apple watch'];

export class MainPage {
    readonly page: Page;
    // page has to be added below
    readonly url: string = '';
    readonly cookiesApproveButton: Locator;
    readonly userButton: Locator;
    readonly cookiesPopUp: Locator;
    readonly notificationPopUp: Locator;
    readonly noButton: Locator;
    readonly createAccountButton: Locator;
    readonly searchButton: Locator;
    readonly searchInput: Locator;

    constructor(page: Page) {
        this.page = page;
        // I know this locator is not the best, but I'm using it not to waist much time
        this.cookiesPopUp = page.getByRole('heading', {
            name: cookiePopUpHeaderTxt,
        });
        this.cookiesApproveButton = page.locator(
            '#onetrust-accept-btn-handler'
        );
        this.userButton = page.locator('.inline-flex').first();
        this.searchInput = page.locator('#wp-autocomplete').first();
        this.searchButton = page.locator(
            'button.w-11.h-11.rounded-r-md.outline-none.bg-main-gradient.hover\\:to-blue-smalt[aria-label="Wyszukaj"]'
        );
    }

    async goToMainPage() {
        await this.page.goto(this.url);
    }

    async checkPageTitle(expectedTitle: string) {
        const title = await this.page.title();
        expect(title).toBe(expectedTitle);
    }

    async clickLogInButton() {
        await this.userButton.click();
    }

    async checkUserStatus(
        loggedIn: boolean,
        logInTxt: string,
        yourAccountTxt: string
    ) {
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
