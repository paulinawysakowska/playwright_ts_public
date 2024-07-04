import { Page, Locator } from '@playwright/test';
import {
    createAccountTxt,
    logInButtonTxt,
    logInByFacebookTxt,
    logInByGoogleTxt,
    logInHeaderTxt,
    rememberMeTxt,
    resetPasswordTxt,
} from '../dicts/logInPopUp-dict';
import { checkElement } from '../utils/checkElement';
import * as fs from 'fs';

export class LogInPopUpPage {
    readonly page: Page;

    readonly createAccountButton: Locator;
    readonly closePopUpButton: Locator;
    readonly logInTopUpHeader: Locator;
    readonly loginField: Locator;
    readonly passwordField: Locator;
    readonly rememberMeCheckbox: Locator;
    readonly rememberMeLabel: Locator;
    readonly passwordRecoverLink: Locator;
    readonly logInByFacebookButton: Locator;
    readonly logInByGoogleButton: Locator;
    readonly logInButton: Locator;

    constructor(page: Page) {
        this.page = page;
        // I know this locator is not the best, but I'm using it not to waist much time
        this.closePopUpButton = page.locator(
            'button[ng-click="$ctrl.closeLayer()"] > i.i-close-circle'
        );
        this.logInTopUpHeader = page.getByRole('heading', {
            name: logInHeaderTxt,
        });
        this.loginField = page.locator('#login');
        this.passwordField = page.locator('#password');
        this.rememberMeCheckbox = page.getByRole('checkbox');
        this.rememberMeLabel = page.getByText(rememberMeTxt);
        this.passwordRecoverLink = page.locator(
            'u.text-gray-gravel.cursor-pointer[ng-click="$ctrl.openLayerPasswordReset()"]'
        );
        this.logInButton = page.locator(
            'button.px-8.h-12.text-sm.font-semibold.tracking-wide.rounded.text-white.bg-main-gradient.hover\\:to-blue-smalt.w-full[ng-click="$ctrl.recaptchaShow = true"]'
        );
        this.logInByFacebookButton = page.locator(
            'button.px-8.h-12.text-sm.font-semibold.tracking-wide.rounded.grow.px-2.bg-blue-clear[ng-click="$ctrl.loginByFb()"][ng-if="$ctrl.fbLoginEnabled==\'true\'"]'
        );
        this.logInByGoogleButton = page.locator(
            'button.px-8.h-12.text-sm.font-semibold.tracking-wide.rounded.grow.px-2.bg-red-pastel[ng-click="$ctrl.loginByGooglePlus()"][ng-if="$ctrl.googlePlusLoginEnabled==\'true\'"]'
        );
        this.createAccountButton = page.locator(
            'button.px-8.h-12.text-sm.font-semibold.tracking-wide.rounded.text-blue-smalt.border.border-blue-smalt.hover\\:bg-main-gradient.hover\\:text-white.w-full[ng-click="$ctrl.goToRegister($event)"]'
        );
    }

    async checkLogInPopup() {
        const elements = [
            { locator: this.closePopUpButton, checkClick: true },
            {
                locator: this.logInTopUpHeader,
                text: logInHeaderTxt,
            },
            { locator: this.loginField, checkClick: true },
            { locator: this.passwordField, checkClick: true },
            {
                locator: this.rememberMeCheckbox,
                isCheckbox: true,
                expectedChecked: true,
            },
            { locator: this.rememberMeLabel, text: rememberMeTxt },
            {
                locator: this.passwordRecoverLink,
                text: resetPasswordTxt,
                checkClick: true,
            },
            {
                locator: this.logInButton,
                text: logInButtonTxt,
                checkClick: true,
            },
            {
                locator: this.logInByFacebookButton,
                text: logInByFacebookTxt,
                checkClick: true,
            },
            {
                locator: this.logInByGoogleButton,
                text: logInByGoogleTxt,
                checkClick: true,
            },
            {
                locator: this.createAccountButton,
                text: createAccountTxt,
                checkClick: true,
            },
        ];

        for (const element of elements) {
            await checkElement(element.locator, {
                text: element.text,
                checkClick: element.checkClick,
                isCheckbox: element.isCheckbox,
                expectedChecked: element.expectedChecked,
            });
        }
    }

    async selectCreateAccountButton() {
        await this.createAccountButton.click();
    }

    async fillLogInForm() {
        const userData = JSON.parse(fs.readFileSync('userData.json', 'utf8'));

        await this.loginField.fill(userData.email);
        await this.passwordField.fill(userData.password);
    }

    async selectLogInButton() {
        await this.logInButton.click();
    }
}
