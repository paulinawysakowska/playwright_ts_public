import { Page, TestInfo } from '@playwright/test';

export async function attachScreenshot(
    testInfo: TestInfo,
    page: Page,
    label: string
) {
    await testInfo.attach(label, {
        body: await page.screenshot({ fullPage: true }),
        contentType: 'image/png',
    });
}
