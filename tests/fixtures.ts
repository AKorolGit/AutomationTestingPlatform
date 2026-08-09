import { test as base, request as playwrightRequest } from '@playwright/test';
import * as fs from 'fs';
import { PlaywrightUIDriver, PlaywrightApiClient } from '@qa/adapters-playwright';
import { AzureWorkflowFactory, SalesOrdersApi, LoginPage } from '@qa/domain-azure';
import type { AzureAuthWorkflow} from '@qa/domain-azure';
import { IApiClient, IUIDriver } from '@qa/core';

type MyFixtures = {
  uiDriver: IUIDriver;
  azureAuthWorkflow: AzureAuthWorkflow;
  loginPage: LoginPage;
  azureApiClient: IApiClient;
  salesOrdersApi: SalesOrdersApi;
};

const apiTokenFile = 'playwright/.auth/azure-api-token.json';

function createApiFixture<T>(ApiClass: new (client: IApiClient) => T) {
  return async ({ azureApiClient }: { azureApiClient: IApiClient }, use: (r: T) => Promise<void>) => {
    await use(new ApiClass(azureApiClient));
  };
}

function createPageFixture<T>(PageClass: new (driver: IUIDriver) => T) {
  return async ({ uiDriver }: { uiDriver: IUIDriver }, use: (p: T) => Promise<void>) => {
    await use(new PageClass(uiDriver));
  };
}

export const test = base.extend<MyFixtures>({
  uiDriver: async ({ page }, use) => {
    await use(new PlaywrightUIDriver(page));
  },

  azureAuthWorkflow: async ({ uiDriver }, use) => {
    await use(AzureWorkflowFactory.create(uiDriver));
  },

  loginPage: createPageFixture(LoginPage),

  azureApiClient: async ({}, use) => {
    const { access_token } = JSON.parse(fs.readFileSync(apiTokenFile, 'utf-8'));
    const apiContext = await playwrightRequest.newContext({
      baseURL: process.env.AZURE_API_BASE_URL,
      extraHTTPHeaders: {
        Authorization: `Bearer ${access_token}`,
        Tenant: process.env.AZURE_TENANT_ID ?? '',
      },
    });
    await use(new PlaywrightApiClient(apiContext));
    await apiContext.dispose();
  },

  salesOrdersApi: createApiFixture(SalesOrdersApi),
});

export { expect } from '@playwright/test';