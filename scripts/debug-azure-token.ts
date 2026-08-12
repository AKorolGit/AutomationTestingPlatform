import 'dotenv/config';
import { request } from '@playwright/test';
import { PlaywrightApiClient } from '@qa/adapters-playwright';
import { AzureAuthApi } from '@qa/domain-azure';

async function main() {
  const apiContext = await request.newContext();
  const apiClient = new PlaywrightApiClient(apiContext);
  const authApi = new AzureAuthApi(apiClient);

  const tokenResponse = await authApi.loginWithPassword(
    process.env.AZURE_TEST_EMAIL ?? '',
    process.env.AZURE_TEST_PASSWORD ?? ''
  );

  await apiContext.dispose();
}

main();