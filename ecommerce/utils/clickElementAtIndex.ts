import { Locator } from '@playwright/test';

export async function clickElementAtIndex(locator: Locator, index: number) {
    await locator.nth(index).click();
}