import { test, expect } from '../../fixtures';
import { SalesOrdersRequestBuilder } from '@qa/domain-azure';

test.describe('Sales Orders API', () => {
  test('returns a non-empty list with default filters', async ({ salesOrdersApi }) => {
    const request = new SalesOrdersRequestBuilder().build();
    const response = await salesOrdersApi.getSalesOrders(request);
    expect(response.totalItems).toBeGreaterThan(0);
  });

  test('respects requested page size', async ({ salesOrdersApi }) => {
    const request = new SalesOrdersRequestBuilder().withSize(5).build();
    const response = await salesOrdersApi.getSalesOrders(request);
    expect(response.dataList.length).toBeLessThanOrEqual(5);
  });

//   test('can fetch a single order by id', async ({ salesOrdersApi }) => {
//     const list = await salesOrdersApi.getSalesOrders(new SalesOrdersRequestBuilder().withSize(1).build());
//     const firstId = Number(list.dataList[0].id);

//     const order = await salesOrdersApi.getSalesOrder(firstId);
//     expect(order.id).toBe(String(firstId));
//   });

  test('throws ApiError for a non-existent id', async ({ salesOrdersApi }) => {
    await expect(salesOrdersApi.getSalesOrder(999999999)).rejects.toThrow();
  });
});