import { Page, expect } from '@playwright/test';

export async function verifyTextVisibleOrRetry(page: Page, text: string, maxRetries: number = 3) {
    const locator = page.locator(`text=${text}`);
    let attempts = 0;
    while (attempts < maxRetries) {
        try {
            await expect(locator).toBeVisible(); 
            return; 
        } catch (error) {
            if (attempts < maxRetries - 1) { 
                console.log(`Text "${text}" not found, waiting and refreshing the page. Attempt ${attempts + 1} of ${maxRetries}.`);
                await page.waitForTimeout(1000);
                await page.reload();
            } else {
                throw error; 
            }
        }
        attempts++;
    }
}
