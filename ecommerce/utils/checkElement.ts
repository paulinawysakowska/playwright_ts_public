import { Locator, expect } from '@playwright/test';

export async function checkElement(
    locator: Locator,
    text: string | null = null,
    checkClick = false,
    isCheckbox = false,
    expectedChecked: boolean | null = null,
    placeholder: string | null = null
) {
    // Scroll to the element to ensure it is in view
    await locator.scrollIntoViewIfNeeded();

    // Ensure the element is visible
    await expect(locator).toBeVisible();

    // Check the text content if provided
    if (text !== null) {
        await expect(locator).toHaveText(text);
    }

    // Check the placeholder attribute if provided
    if (placeholder !== null) {
        const actualPlaceholder = await locator.getAttribute('placeholder');
        if (actualPlaceholder !== placeholder) {
            throw new Error(
                `Placeholder is incorrect. Expected: ${placeholder}, Found: ${actualPlaceholder}`
            );
        }
    }

    // Check if the element can be clicked if required
    if (checkClick) {
        await expect(locator).toBeEnabled();
        try {
            await locator.click({ trial: true });
        } catch (e) {
            throw new Error(`Element is not clickable: ${e.message}`);
        }
    }

    // Check the checkbox state if it is a checkbox
    if (isCheckbox && expectedChecked !== null) {
        const isInputCheckbox = await locator.evaluate(
            (el: HTMLElement) =>
                el.tagName === 'INPUT' &&
                (el as HTMLInputElement).type === 'checkbox'
        );
        if (isInputCheckbox) {
            const isChecked = await locator.isChecked();
            if (isChecked !== expectedChecked) {
                throw new Error(
                    `Checkbox state is incorrect. Expected: ${expectedChecked}, Found: ${isChecked}`
                );
            }
        } else {
            const actualChecked = await locator.evaluate(
                (el: HTMLElement) => el.getAttribute('data-checked') === '1'
            );
            if (actualChecked !== expectedChecked) {
                throw new Error(
                    `Checkbox state is incorrect. Expected: ${expectedChecked}, Found: ${actualChecked}`
                );
            }
        }
    }
}
