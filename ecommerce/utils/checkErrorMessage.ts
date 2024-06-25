import { Locator, expect } from '@playwright/test';

export async function checkErrorMessage(
    errorMessageLocator: Locator,
    expectedErrorMessage: string
) {
    await errorMessageLocator.waitFor({ state: 'visible' });
    const errorMessageText = await errorMessageLocator.textContent();
    expect(errorMessageText).toContain(expectedErrorMessage);
}
