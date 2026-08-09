import { test as setup } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';
import { PlaywrightApiClient } from '@qa/adapters-playwright';
import { AzureAuthApi } from '@qa/domain-azure';

const apiTokenFile = 'playwright/.auth/azure-api-token.json';

setup('authenticate as Azure AD user (API)', async ({ playwright }) => {
  const apiContext = await playwright.request.newContext();
  const apiClient = new PlaywrightApiClient(apiContext);
  const authApi = new AzureAuthApi(apiClient);

  const tokenResponse = await authApi.loginWithPassword(
    process.env.AZURE_TEST_EMAIL ?? '', process.env.AZURE_TEST_PASSWORD ?? ''
  );

  fs.mkdirSync(path.dirname(apiTokenFile), { recursive: true });
  fs.writeFileSync(apiTokenFile, JSON.stringify({ access_token: tokenResponse.access_token }));
});