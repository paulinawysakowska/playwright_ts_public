import { Locator, expect } from '@playwright/test';

export async function scrollToElement(locator: Locator) {
    await locator.scrollIntoViewIfNeeded();
}

export async function ensureElementVisible(locator: Locator) {
    await expect(locator).toBeVisible();
}

export async function checkTextContent(locator: Locator, text: string) {
    await expect(locator).toHaveText(text);
}

export async function checkPlaceholder(locator: Locator, placeholder: string) {
    const actualPlaceholder = await locator.getAttribute('placeholder');
    if (actualPlaceholder !== placeholder) {
        throw new Error(
            `Placeholder is incorrect. Expected: ${placeholder}, Found: ${actualPlaceholder}`
        );
    }
}

export async function checkClickability(locator: Locator) {
    await expect(locator).toBeEnabled();
    try {
        await locator.click({ trial: true });
    } catch (e) {
        throw new Error(`Element is not clickable: ${e.message}`);
    }
}

export async function checkCheckboxState(locator: Locator, expectedChecked: boolean) {
    const isChecked = await locator.isChecked();
    if (isChecked !== expectedChecked) {
        throw new Error(
            `Checkbox state is incorrect. Expected: ${expectedChecked}, Found: ${isChecked}`
        );
    }
}

export async function checkElement(
    locator: Locator,
    options: {
        text?: string,
        checkClick?: boolean,
        isCheckbox?: boolean,
        expectedChecked?: boolean,
        placeholder?: string
    } = {}
) {
    const {
        text,
        checkClick = false,
        isCheckbox = false,
        expectedChecked,
        placeholder
    } = options;

    await scrollToElement(locator);
    await ensureElementVisible(locator);

    if (text) {
        await checkTextContent(locator, text);
    }

    if (placeholder) {
        await checkPlaceholder(locator, placeholder);
    }

    if (checkClick) {
        await checkClickability(locator);
    }

    if (isCheckbox && expectedChecked !== undefined) {
        await checkCheckboxState(locator, expectedChecked);
    }
}
