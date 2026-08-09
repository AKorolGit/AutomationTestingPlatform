import { defineConfig, devices } from '@playwright/test';
import 'dotenv/config';

export default defineConfig({
  testDir: './tests',
  timeout: 30_000,
  use: { baseURL: process.env.AZURE_APP_BASE_URL },
  projects: [
    { name: 'setup-ui', testMatch: /azure\.ui\.setup\.ts/ },
    { name: 'setup-api', testMatch: /azure\.api\.setup\.ts/ },

    {
      name: 'azure-api',
      testMatch: /e2e-azure\/api\/.*\.spec\.ts/,
      dependencies: ['setup-api'],
    },
    {
      name: 'azure-ui',
      testMatch: /e2e-azure\/ui\/.*\.spec\.ts/,
      use: { ...devices['Desktop Chrome'], storageState: 'playwright/.auth/azure-ui.json' },
      dependencies: ['setup-ui'],
    },
    {
      name: 'azure-mixed',
      testMatch: /mixed\/.*\.spec\.ts/,
      use: { ...devices['Desktop Chrome'], storageState: 'playwright/.auth/azure-ui.json' },
      dependencies: ['setup-ui', 'setup-api'],
    },
  ],
});