import { test, expect } from '../../fixtures';

test.describe('Azure AD authenticated session', () => {
  test('user lands inside the app without seeing the login button', async ({ page, loginPage }) => {
    await page.goto('/');

    expect(await loginPage.isLoginButtonVisible()).toBe(false);
  });
});