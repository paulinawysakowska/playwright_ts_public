import { Locator } from '@playwright/test';

export async function waitForElement(
  locator: Locator,
  timeout: number = 10000
) {
  await locator.waitFor({ state: 'visible', timeout });
  console.log(`Element ${locator} is now visible.`);
}
