import { Locator, expect } from '@playwright/test';

export async function checkElement(locator: Locator, text: string | null = null, checkClick: boolean = false, isCheckbox: boolean = false, expectedChecked: boolean | null = null) {
    await expect(locator).toBeVisible();
    if (text !== null) {
        await expect(locator).toHaveText(text);
    }
    if (checkClick) {
        await expect(locator).toBeEnabled();
        try {
            await locator.click({ trial: true });
        } catch (e) {
            throw new Error(`Element is not clickable: ${e.message}`);
        }
    }
    if (isCheckbox && expectedChecked !== null) {
        const isChecked = await locator.isChecked();
        if (isChecked !== expectedChecked) {
            throw new Error(`Checkbox state is incorrect. Expected: ${expectedChecked}, Found: ${isChecked}`);
        }
    }
}
