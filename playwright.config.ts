import { defineConfig, devices } from '@playwright/test';
import 'dotenv/config';

export default defineConfig({
  testDir: './tests',
  timeout: 30_000,
  projects: [
    { name: 'setup-ui', testMatch: /azure\.ui\.setup\.ts/, use: { baseURL: process.env.AZURE_APP_BASE_URL } },
    { name: 'setup-api', testMatch: /azure\.api\.setup\.ts/ },
    { name: 'setup-auth0', testMatch: /auth0\.ui\.setup\.ts/, use: { baseURL: process.env.AUTH0_APP_BASE_URL } },
    { name: 'setup-auth0-api', testMatch: /auth0\.api\.setup\.ts/ },

    {
      name: 'azure-api',
      testMatch: /e2e-azure\/api\/.*\.spec\.ts/,
      dependencies: ['setup-api'],
    },
    {
      name: 'azure-ui',
      testMatch: /e2e-azure\/ui\/.*\.spec\.ts/,
      use: { ...devices['Desktop Chrome'], baseURL: process.env.AZURE_APP_BASE_URL, storageState: 'playwright/.auth/azure-ui.json' },
      dependencies: ['setup-ui'],
    },
    {
      name: 'azure-mixed',
      testMatch: /mixed\/.*\.spec\.ts/,
      use: { ...devices['Desktop Chrome'], baseURL: process.env.AZURE_APP_BASE_URL, storageState: 'playwright/.auth/azure-ui.json' },
      dependencies: ['setup-ui', 'setup-api'],
    },
    {
      name: 'auth0-ui',
      testMatch: /e2e-auth0\/ui\/.*\.spec\.ts/,
      use: { ...devices['Desktop Chrome'], baseURL: process.env.AUTH0_APP_BASE_URL },
      dependencies: ['setup-auth0'],
    },
    {
      name: 'auth0-api',
      testMatch: /e2e-auth0\/api\/.*\.spec\.ts/,
      dependencies: ['setup-auth0-api'],
    },
  ],
});