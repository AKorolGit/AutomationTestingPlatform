import { test, expect } from '../../fixtures';
import { Auth0Roles, Scopes } from '@qa/domain-auth0';

test.describe('Suppliers API — Supplier Admin / Scope 2', () => {
  test.use({ auth0Persona: { role: Auth0Roles.BoAdmin, scope: Scopes.Scope2 } });

  test('can fetch own supplier company', async ({ suppliersApi }) => {
    const supplier = await suppliersApi.getMySupplier();

    expect(supplier.id).toBeGreaterThan(0);
    expect(supplier.name).toBeTruthy();
  });
});