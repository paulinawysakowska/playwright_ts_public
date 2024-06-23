import { Locator } from '@playwright/test';

export async function getElementTextAtIndex(locator: Locator, index: number) {
  const element = locator.nth(index);
  const text = await element.textContent();
  if (!text) {
    throw new Error('Text not found');
  }
  return text.trim();
}
