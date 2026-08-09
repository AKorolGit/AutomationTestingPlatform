import { test as setup } from '@playwright/test';
import { PlaywrightUIDriver } from '@qa/adapters-playwright';
import { AzureWorkflowFactory } from '@qa/domain-azure';

const uiAuthFile = 'playwright/.auth/azure-ui.json';

setup('authenticate as Azure AD user (UI)', async ({ page }) => {
  const driver = new PlaywrightUIDriver(page);
  const workflow = AzureWorkflowFactory.create(driver);

  await page.goto('/');
  await workflow.login(process.env.AZURE_TEST_EMAIL ?? '', process.env.AZURE_TEST_PASSWORD ?? '');
  await page.context().storageState({ path: uiAuthFile });
});