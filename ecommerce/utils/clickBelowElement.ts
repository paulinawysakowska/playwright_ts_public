import { Page, Locator } from '@playwright/test';

export async function clickBelowElement(
    page: Page,
    element: Locator | string,
    offset = 10
) {
    const elementHandle =
        typeof element === 'string'
            ? await page.waitForSelector(element)
            : element;
    const boundingBox = await elementHandle.boundingBox();

    if (boundingBox) {
        const x = boundingBox.x + boundingBox.width / 2;
        const y = boundingBox.y + boundingBox.height + offset;
        await page.mouse.click(x, y);
    } else {
        throw new Error(
            `Element with selector ${element} not found or not visible`
        );
    }
}
