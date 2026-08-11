import { test, expect } from '../../fixtures';

test.describe('Site-wide smoke check', () => {
  test('every menu link resolves without an error response', async ({ page, navigationMenu }) => {
    await page.goto('/');

    const links = await navigationMenu.getAllPageLinks();
    const uniqueHrefs = [...new Set(links.map(l => l.href))];

    for (const href of uniqueHrefs) {
      const response = await page.goto(href);
      expect.soft(response?.ok(), `${href} returned ${response?.status()}`).toBe(true);
    }
  });
});