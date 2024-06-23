import { Locator, expect } from '@playwright/test';

export async function checkPlaceholder(
  element: Locator,
  expectedPlaceholder: string
) {
  const placeholder = await element.getAttribute('placeholder');
  expect(placeholder).toBe(expectedPlaceholder);
}
