import { test, expect } from '../../fixtures';

test.describe('Cross-feature navigation', () => {
  test('user can go from Sales Orders to Companies and start creating a new one', async ({
    page, navigationMenu, salesOrdersPage, companiesPage,
  }) => {
    await test.step('open Sales Orders page', async () => {
      await page.goto('/');
      await navigationMenu.goToSalesOrders();
      expect(await salesOrdersPage.isLoaded()).toBe(true);
    });

    await test.step('navigate to Companies and start creating a new one', async () => {
      await navigationMenu.goToCompanies();
      await companiesPage.clickCreateNew();
    });
  });
});