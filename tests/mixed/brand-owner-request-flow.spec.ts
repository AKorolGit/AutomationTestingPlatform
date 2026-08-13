import { test, expect } from '../fixtures';
import { Auth0Roles, Scopes, CreateRequestBuilder, RequestConsumptionBuilder } from '@qa/domain-auth0';
import { quoteRequestDetailsUrl } from '@qa/domain-azure';

test.describe('Brand Owner request — full cross-system flow', () => {
  test.use({ auth0Persona: { role: Auth0Roles.BoAdmin, scope: Scopes.Scope2 } });

  test('request flows from Auth0 creation to EcohzOnline order', async ({
    requestsApi, quoteRequestsApi, openAuth0Page, page, quoteRequestDetailsPage, loginPage, auth0Credentials,
  }) => {
    let createdRequestId: number;
    const boCode = auth0Credentials.assignment.ownerCode;

    await test.step('create request via API (Auth0)', async () => {
        const request = new CreateRequestBuilder()
            .withConsumption(new RequestConsumptionBuilder())
            .build();

        createdRequestId = await requestsApi.createRequest(request);
        expect(createdRequestId).toBeGreaterThan(0);
    });

    await test.step('verify request appears in Auth0 UI', async () => {
        const { page: auth0Page, requestsPage } = await openAuth0Page({
            role: Auth0Roles.BoAdmin, scope: Scopes.Scope2,
        });
        await auth0Page.goto('/requests');
        expect(await requestsPage.isLoaded()).toBe(true);
        expect(await requestsPage.isRequestVisible(createdRequestId)).toBe(true);
    });

    await test.step('verify request appears in EcohzOnline via API', async () => {
        const quoteRequests = await quoteRequestsApi.getByBoCodes([boCode]);
        const found = quoteRequests.find(qr => qr.id === createdRequestId);
        
        expect(found).toBeDefined();
        expect(found?.salesOrderID).toBeNull();
    });

    await test.step('add order via EcohzOnline UI', async () => {
        await page.goto(quoteRequestDetailsUrl(createdRequestId));
        await loginPage.ensureAppLoaded();
        await quoteRequestDetailsPage.clickAddNewOrder();
        await page.waitForURL(/\/sales\/orders\/order\?id=\d+/);
    });

    await test.step('verify order is now linked to the request via API', async () => {
        const quoteRequests = await quoteRequestsApi.getByBoCodes([boCode]);
        const updated = quoteRequests.find(qr => qr.id === createdRequestId);
        expect(updated?.salesOrderID).not.toBeNull();
    });
  });
});