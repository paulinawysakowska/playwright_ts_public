import { Locator } from '@playwright/test';

export async function getRandomIndex(locator: Locator) {
    const count = await locator.count();
    if (count === 0) {
        throw new Error('No elements found');
    }
    const randomIndex = Math.floor(Math.random() * count);
    return randomIndex;
}
