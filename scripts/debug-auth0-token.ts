import 'dotenv/config';
import { request } from '@playwright/test';
import { PlaywrightApiClient } from '@qa/adapters-playwright';
import { getAuth0Credentials, Scopes, Auth0Roles } from '@qa/domain-auth0';
import { Auth0AuthApi } from '@qa/domain-auth0';

async function main() {
  const apiContext = await request.newContext();
  const apiClient = new PlaywrightApiClient(apiContext);
  const authApi = new Auth0AuthApi(apiClient);

  const creds = getAuth0Credentials(Scopes.Scope2, Auth0Roles.BoAdmin);
  const tokenResponse = await authApi.loginWithPassword(creds.auth0_username, creds.auth0_password);

  await apiContext.dispose();
}

main();