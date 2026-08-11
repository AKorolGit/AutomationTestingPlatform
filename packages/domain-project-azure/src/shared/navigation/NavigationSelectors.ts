export const navigationSelectors = {
  companies: 'a[href$="/companies"]',
  salesSectionToggle: '.nav-collapse:has(.nav-link-icon.sales) > a',
  salesOrders: 'a[href$="/sales/orders"]',
  menuContainer: '.nav.vertical',
} as const;