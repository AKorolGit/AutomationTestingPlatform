export const quoteRequestDetailsPageSelectors = {
  addNewOrderButton: 'button.btnOnTab:has-text("Add New Order")',
} as const;

export function quoteRequestDetailsUrl(requestId: number): string {
  return `/t/ecohz_norway/requests-list/request?id=${requestId}`;
}