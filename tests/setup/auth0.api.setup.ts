import { request, test as setup } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';
import { PlaywrightApiClient } from '@qa/adapters-playwright';
import { Auth0AuthApi, getAuth0Credentials, Scopes, Auth0Roles } from '@qa/domain-auth0';
import type { Scope, Auth0Role } from '@qa/domain-auth0';

function apiTokenFilePath(role: Auth0Role, scope: Scope): string {
  return `playwright/.auth/auth0-api-${role}-${scope}.json`;
}

async function authenticateAndSave(role: Auth0Role, scope: Scope) {
  const apiContext = await request.newContext();
  const apiClient = new PlaywrightApiClient(apiContext);
  const authApi = new Auth0AuthApi(apiClient);

  const creds = getAuth0Credentials(scope, role);
  const tokenResponse = await authApi.loginWithPassword(creds.auth0_username, creds.auth0_password);

  const filePath = apiTokenFilePath(role, scope);
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, JSON.stringify({
    access_token: tokenResponse.access_token,
    assignment: creds.assignment,
  }));

  await apiContext.dispose();
}

setup('authenticate API as bo_admin (scope_2)', async () => {
  await authenticateAndSave(Auth0Roles.BoAdmin, Scopes.Scope2);
});

setup('authenticate API as bo_user (scope_2)', async () => {
  await authenticateAndSave(Auth0Roles.BoUser, Scopes.Scope2);
});

setup('authenticate API as supplier_admin (scope_2)', async () => {
  await authenticateAndSave(Auth0Roles.SupplierAdmin, Scopes.Scope2);
});

setup('authenticate API as supplier_user (scope_2)', async () => {
  await authenticateAndSave(Auth0Roles.SupplierUser, Scopes.Scope2);
});

setup('authenticate API as bo_admin (scope_3)', async () => {
  await authenticateAndSave(Auth0Roles.BoAdmin, Scopes.Scope3);
});

setup('authenticate API as bo_user (scope_3)', async () => {
  await authenticateAndSave(Auth0Roles.BoUser, Scopes.Scope3);
});

setup('authenticate API as supplier_admin (scope_3)', async () => {
  await authenticateAndSave(Auth0Roles.SupplierAdmin, Scopes.Scope3);
});

setup('authenticate API as supplier_user (scope_3)', async () => {
  await authenticateAndSave(Auth0Roles.SupplierUser, Scopes.Scope3);
});