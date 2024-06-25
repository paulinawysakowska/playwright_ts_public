import { Page, Locator, expect, FrameLocator } from '@playwright/test';
import { checkElement } from '../utils/checkElement';
import {
    additionalVerificationTxt,
    agreementTxt,
    emailPlaceholderTxt,
    pageHeaderTxt,
    passwordPlaceholderTxt,
    postalCodePlaceholderTxt,
} from '../dicts/register-dict';
import { faker } from '@faker-js/faker';
import * as fs from 'fs';
import { generatePassword } from '../utils/generatePassword';
import { verifyUrlContains } from '../utils/verifyUrlContains';
import { checkErrorMessage } from '../utils/checkErrorMessage';

export const invalidEmails = [
    '@mail.pl',
    'annanowakmail.pl',
    'anna.nowak@',
    'anna.nowak@mail',
    'anna.nowak!@mail.pl',
    'anna.nowak@ma!l.pl',
    'anna.nowak@.pl',
    // ''
];

export const invalidPasswords = [
    'a1',
    'ab1',
    // 'abc1',
    // 'abcd1',
    // 'abcde1',
    // 'abcdef',
    // 'password',
    // 'qwerty',
    // '123456',
    // '789012',
    // '000000',
    // '!!!!!!',
    // '@@@@@@',
];

export class RegisterPage {
    readonly page: Page;
    readonly registerUrl: string = '/register';
    readonly emailField: Locator;
    readonly passwordField: Locator;
    readonly postalCodeField: Locator;
    readonly captchaField: Locator;
    readonly checkboxField: Locator;
    readonly registerButton: Locator;
    readonly pageHeader: Locator;
    readonly additionalVerificationField: Locator;
    readonly captchaFrame: FrameLocator;
    readonly captchaCheckbox: Locator;
    readonly agreementLabel: Locator;

    public userEmail: string;
    public userPassword: string;
    public userPostalCode: string;
    readonly errorMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.pageHeader = page.locator('div.heading').first();
        this.emailField = page.locator('input[name="customer_login"]');
        this.passwordField = page.locator('input[name="customer_password"]');
        this.postalCodeField = page.locator(
            'input[name="customer_postal_code"]'
        );
        this.additionalVerificationField = page.locator(
            'div.heading.heading-regular'
        );
        this.captchaFrame = page
            .frameLocator('iframe[src*="recaptcha/api2"]')
            .first();
        this.captchaCheckbox = this.captchaFrame.locator('#recaptcha-anchor');
        this.agreementLabel = page.locator('label.text-low.at-company-rules');
        this.checkboxField = page.locator('.checkbox').first();
        this.registerButton = page.locator('button.btn.at-register-submit');
        this.errorMessage = page.locator(
            'div.form-alert.error[ng-message="pattern"]'
        );
    }

    async verifyRegisterPageUrl() {
        await verifyUrlContains(this.page, this.registerUrl);
    }

    async checkRegisterPage() {
        const elements = [
            { locator: this.pageHeader, text: pageHeaderTxt },
            {
                locator: this.emailField,
                checkClick: true,
                placeholder: emailPlaceholderTxt,
            },
            {
                locator: this.passwordField,
                checkClick: true,
                placeholder: passwordPlaceholderTxt,
            },
            {
                locator: this.postalCodeField,
                checkClick: true,
                placeholder: postalCodePlaceholderTxt,
            },
            {
                locator: this.additionalVerificationField,
                text: additionalVerificationTxt,
            },
            { locator: this.agreementLabel, text: agreementTxt },
            {
                locator: this.checkboxField,
                isCheckbox: true,
                expectedChecked: false,
            },
            { locator: this.registerButton, checkClick: true },
        ];

        for (const element of elements) {
            await checkElement(
                element.locator,
                element.text ?? null,
                element.checkClick ?? false,
                element.isCheckbox ?? false,
                element.expectedChecked ?? null
            );
        }
    }
    async simulateCaptcha() {
        await this.page.waitForSelector('iframe[src*="recaptcha/api2"]');
        await this.captchaCheckbox.click();
        await this.page.waitForTimeout(1000);
    }

    async fillRegistrationForm() {
        this.userEmail = faker.internet.email().toLowerCase();
        this.userPassword = generatePassword();
        let postalCode = faker.location.zipCode('#####');
        postalCode = `${postalCode.slice(0, 2)}-${postalCode.slice(2)}`;
        this.userPostalCode = postalCode;

        await this.emailField.fill(this.userEmail);
        await this.passwordField.fill(this.userPassword);
        await this.postalCodeField.fill(this.userPostalCode);

        const userData = {
            email: this.userEmail,
            password: this.userPassword,
            postalCode: this.userPostalCode,
        };

        fs.writeFileSync('userData.json', JSON.stringify(userData, null, 2));
    }

    async fillInvalidEmail(email: string) {
        await this.emailField.fill(email);
    }

    async fillInvalidPassword(password: string) {
        await this.passwordField.fill(password);
    }

    async checkEmailErrorMessage(expectedErrorMessage: string) {
        await checkErrorMessage(this.errorMessage, expectedErrorMessage);
    }

    async checkPasswordErrorMessage(expectedErrorMessage: string) {
        await checkErrorMessage(this.errorMessage, expectedErrorMessage);
    }

    async selectAgreementCheckbox() {
        await this.checkboxField.click();
    }

    async clickRegisterButton() {
        await this.registerButton.click();
    }

    async checkRegisterSuccess() {
        await this.page.waitForSelector('div.heading.heading-regular');
        const successMessage = await this.page
            .locator('div.heading.heading-regular')
            .textContent();
        expect(successMessage).toContain('Thank you for registering');
    }
}
