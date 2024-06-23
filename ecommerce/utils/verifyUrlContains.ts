import { Page, expect } from '@playwright/test';

export async function verifyUrlContains(page: Page, urlPart: string, timeout?: number) {
    await expect(page).toHaveURL(new RegExp(urlPart), { timeout: timeout || 1000 }); 
}
