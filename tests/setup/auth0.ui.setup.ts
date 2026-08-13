import { test as setup } from '@playwright/test';
import { PlaywrightUIDriver } from '@qa/adapters-playwright';
import { Auth0WorkflowFactory, getAuth0Credentials, Scopes, Auth0Roles } from '@qa/domain-auth0';
import type { Scope, Auth0Role } from '@qa/domain-auth0';

function authFilePath(scope: Scope, role: Auth0Role): string {
  return `playwright/.auth/auth0-${role}-${scope}.json`;
}

setup('authenticate as bo_admin (scope_2)', async ({ page }) => {
  const driver = new PlaywrightUIDriver(page);
  const workflow = Auth0WorkflowFactory.create(driver);
  const creds = getAuth0Credentials(Scopes.Scope2, Auth0Roles.BoAdmin);

  await page.goto('/');
  await workflow.login(creds.auth0_username, creds.auth0_password);
  await page.context().storageState({ path: authFilePath(Scopes.Scope2, Auth0Roles.BoAdmin) });
});

setup('authenticate as bo_user (scope_2)', async ({ page }) => {
  const driver = new PlaywrightUIDriver(page);
  const workflow = Auth0WorkflowFactory.create(driver);
  const creds = getAuth0Credentials(Scopes.Scope2, Auth0Roles.BoUser);

  await page.goto('/');
  await workflow.login(creds.auth0_username, creds.auth0_password);
  await page.context().storageState({ path: authFilePath(Scopes.Scope2, Auth0Roles.BoUser) });
});

setup('authenticate as supplier_admin (scope_2)', async ({ page }) => {
  const driver = new PlaywrightUIDriver(page);
  const workflow = Auth0WorkflowFactory.create(driver);
  const creds = getAuth0Credentials(Scopes.Scope2, Auth0Roles.SupplierAdmin);

  await page.goto('/');
  await workflow.login(creds.auth0_username, creds.auth0_password);
  await page.context().storageState({ path: authFilePath(Scopes.Scope2, Auth0Roles.SupplierAdmin) });
});

setup('authenticate as supplier_user (scope_2)', async ({ page }) => {
  const driver = new PlaywrightUIDriver(page);
  const workflow = Auth0WorkflowFactory.create(driver);
  const creds = getAuth0Credentials(Scopes.Scope2, Auth0Roles.SupplierUser);

  await page.goto('/');
  await workflow.login(creds.auth0_username, creds.auth0_password);
  await page.context().storageState({ path: authFilePath(Scopes.Scope2, Auth0Roles.SupplierUser) });
});

setup('authenticate as bo_admin (scope_3)', async ({ page }) => {
  const driver = new PlaywrightUIDriver(page);
  const workflow = Auth0WorkflowFactory.create(driver);
  const creds = getAuth0Credentials(Scopes.Scope3, Auth0Roles.BoAdmin);

  await page.goto('/');
  await workflow.login(creds.auth0_username, creds.auth0_password);
  await page.context().storageState({ path: authFilePath(Scopes.Scope3, Auth0Roles.BoAdmin) });
});

setup('authenticate as bo_user (scope_3)', async ({ page }) => {
  const driver = new PlaywrightUIDriver(page);
  const workflow = Auth0WorkflowFactory.create(driver);
  const creds = getAuth0Credentials(Scopes.Scope3, Auth0Roles.BoUser);

  await page.goto('/');
  await workflow.login(creds.auth0_username, creds.auth0_password);
  await page.context().storageState({ path: authFilePath(Scopes.Scope3, Auth0Roles.BoUser) });
});

setup('authenticate as supplier_admin (scope_3)', async ({ page }) => {
  const driver = new PlaywrightUIDriver(page);
  const workflow = Auth0WorkflowFactory.create(driver);
  const creds = getAuth0Credentials(Scopes.Scope3, Auth0Roles.SupplierAdmin);

  await page.goto('/');
  await workflow.login(creds.auth0_username, creds.auth0_password);
  await page.context().storageState({ path: authFilePath(Scopes.Scope3, Auth0Roles.SupplierAdmin) });
});

setup('authenticate as supplier_user (scope_3)', async ({ page }) => {
  const driver = new PlaywrightUIDriver(page);
  const workflow = Auth0WorkflowFactory.create(driver);
  const creds = getAuth0Credentials(Scopes.Scope3, Auth0Roles.SupplierUser);

  await page.goto('/');
  await workflow.login(creds.auth0_username, creds.auth0_password);
  await page.context().storageState({ path: authFilePath(Scopes.Scope3, Auth0Roles.SupplierUser) });
});