export const Auth0Roles = {
  BoAdmin: 'bo_admin',
  BoUser: 'bo_user',
  SupplierAdmin: 'supplier_admin',
  SupplierUser: 'supplier_user',
} as const;

export type Auth0Role = typeof Auth0Roles[keyof typeof Auth0Roles];