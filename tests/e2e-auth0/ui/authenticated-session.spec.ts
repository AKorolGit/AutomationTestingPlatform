import { test, expect } from '../../fixtures';

test.describe('Auth0 authenticated session — BO Admin / Scope 2', () => {
  test.use({ storageState: 'playwright/.auth/auth0-bo_admin-scope_2.json' });

  test('user lands inside the app without seeing the login form', async ({ page }) => {
    await page.goto('/');

    const loginForm = page.locator('form[data-form-primary="true"]');
    await expect(loginForm).not.toBeVisible();
  });
});