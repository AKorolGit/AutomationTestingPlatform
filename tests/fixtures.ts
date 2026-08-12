import { test as base, request as playwrightRequest } from '@playwright/test';
import * as fs from 'fs';
import { PlaywrightUIDriver, PlaywrightApiClient } from '@qa/adapters-playwright';
import { AzureWorkflowFactory, SalesOrdersApi, LoginPage } from '@qa/domain-azure';
import { AzureAuthWorkflow, CompaniesPage, NavigationMenu, SalesOrdersPage} from '@qa/domain-azure';
import { getRequiredEnv, IApiClient, IUIDriver } from '@qa/core';
import { Auth0Roles, Auth0WorkflowFactory, Scopes } from '@qa/domain-auth0';
import type { Auth0AuthWorkflow, Auth0Role, Scope } from '@qa/domain-auth0';
import { SuppliersApi } from '@qa/domain-auth0';

type MyOptions = {
  auth0Persona: { role: Auth0Role; scope: Scope };
};

type MyFixtures = {
  uiDriver: IUIDriver;
  azureAuthWorkflow: AzureAuthWorkflow;
  loginPage: LoginPage;
  azureApiClient: IApiClient;
  salesOrdersApi: SalesOrdersApi;
  navigationMenu: NavigationMenu;
  salesOrdersPage: SalesOrdersPage;
  companiesPage: CompaniesPage;
  auth0AuthWorkflow: Auth0AuthWorkflow;
  auth0ApiClient: IApiClient;
  suppliersApi: SuppliersApi;
};

const apiTokenFile = 'playwright/.auth/azure-api-token.json';

function createAzureApiFixture<T>(ApiClass: new (client: IApiClient) => T) {
  return async ({ azureApiClient }: { azureApiClient: IApiClient }, use: (r: T) => Promise<void>) => {
    await use(new ApiClass(azureApiClient));
  };
}

function createAuth0ApiFixture<T>(ApiClass: new (client: IApiClient) => T) {
  return async ({ auth0ApiClient }: { auth0ApiClient: IApiClient }, use: (r: T) => Promise<void>) => {
    await use(new ApiClass(auth0ApiClient));
  };
}

function createPageFixture<T>(PageClass: new (driver: IUIDriver) => T) {
  return async ({ uiDriver }: { uiDriver: IUIDriver }, use: (p: T) => Promise<void>) => {
    await use(new PageClass(uiDriver));
  };
}

export const test = base.extend<MyFixtures & MyOptions>({
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

  salesOrdersApi: createAzureApiFixture(SalesOrdersApi),
  navigationMenu: createPageFixture(NavigationMenu),
  salesOrdersPage: createPageFixture(SalesOrdersPage),
  companiesPage: createPageFixture(CompaniesPage),
  suppliersApi: createAuth0ApiFixture(SuppliersApi),

  auth0AuthWorkflow: async ({ uiDriver }, use) => {
    await use(Auth0WorkflowFactory.create(uiDriver));
  },

  auth0Persona: [{ role: Auth0Roles.BoAdmin, scope: Scopes.Scope2 }, { option: true }],

  auth0ApiClient: async ({ auth0Persona }, use) => {
    const { role, scope } = auth0Persona;
    const tokenFile = `playwright/.auth/auth0-api-${role}-${scope}.json`;
    const { access_token, assignment } = JSON.parse(fs.readFileSync(tokenFile, 'utf-8'));

    const headers = {
      Authorization: `Bearer ${access_token}`,
      'x-supply-chain-user-assignment': JSON.stringify(assignment),
    };

    const apiContext = await playwrightRequest.newContext({
      baseURL: getRequiredEnv('AUTH0_API_BASE_URL'),
      extraHTTPHeaders: headers,
    });

    await use(new PlaywrightApiClient(apiContext));
    await apiContext.dispose();
  },
});

export { expect } from '@playwright/test';