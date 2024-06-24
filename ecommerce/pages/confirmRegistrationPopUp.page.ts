import { Page, Locator } from '@playwright/test';
import {
    registrationPopUpButtonTxt,
    registrationPopUpHeaderTxt,
    registrationPopUpTxt,
} from '../dicts/confirmRegistrationPopUp-dict';
import { checkElement } from '../utils/checkElement';

export class ConfirmationPopUp {
    readonly page: Page;
    readonly sucessHeader: Locator;
    readonly successMessage: Locator;
    readonly understoodButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.sucessHeader = page.locator(
            'h2.pr-12.font-headline.text-lg.font-bold.lg\\:text-2xl'
        );
        this.successMessage = page.locator('p.mt-4.lg\\:mt-10.text-sm');
        this.understoodButton = page.locator(
            'button.px-8.h-12.text-sm.font-semibold.tracking-wide.rounded.text-white.bg-main-gradient.hover\\:to-blue-smalt.mt-4.w-full.lg\\:mt-6'
        );
    }

    async checkConfirmRegistrationPopUp() {
        const elements = [
            { locator: this.sucessHeader, text: registrationPopUpHeaderTxt },
            { locator: this.successMessage, text: registrationPopUpTxt },
            {
                locator: this.understoodButton,
                text: registrationPopUpButtonTxt,
                checkClick: true,
            },
        ];

        for (const element of elements) {
            await checkElement(
                element.locator,
                element.text ?? null,
                element.checkClick ?? false
            );
        }
    }

    async clickUnderstoodButton() {
        await this.understoodButton.click();
    }
}
